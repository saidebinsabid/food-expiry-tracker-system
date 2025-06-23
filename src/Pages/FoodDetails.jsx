import React, { useEffect, useState, useContext, useMemo} from "react";
import { useParams } from "react-router";
import axios from "axios";
import Countdown from "react-countdown";
import Loading from "./Loading";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const FoodDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_API_URL}/added-food/${id}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        const food = res.data;
        food.notes = food.notes || [];
        setFoodItem(food);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          toast.error("Failed to load food details.");
          console.error(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => source.cancel("Request canceled on unmount.");
  }, [id]);

  const isCreator = useMemo(() => {
    if (!user?.email || !foodItem?.email) return false;
    const userEmail = user.email.trim().toLowerCase();
    const foodEmail = foodItem.email.trim().toLowerCase();
    // console.log(
    //   "Checking creator: userEmail =",
    //   userEmail,
    //   "foodEmail =",
    //   foodEmail
    // );
    return userEmail === foodEmail;
  }, [user?.email, foodItem?.email]);

  // Debug noteText and disabling condition
  // console.log(
  //   "NoteText:",
  //   noteText,
  //   "| Trimmed:",
  //   noteText.trim(),
  //   "| Disabled:",
  //   submitting || !noteText.trim() || !isCreator
  // );
  // console.log("User email:", user?.email);

  const handleAddNote = () => {
    if (!noteText.trim() || !isCreator) return;
    setSubmitting(true);

    axiosSecure
      .post(`/added-food/${id}/notes`, {
        note: noteText.trim(),
        userEmail: user.email,
      })
      .then(() => {
        setFoodItem((prev) => ({
          ...prev,
          notes: [
            ...(prev.notes || []),
            { note: noteText.trim(), postedDate: new Date().toISOString() },
          ],
        }));
        setNoteText("");
        toast.success("Note successfully added!");
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ||
            "Failed to add note. Please try again."
        );
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-red-500 font-semibold">Expired</span>;
    }
    return (
      <span className="text-green-600 font-semibold">
        {days}d {hours}h {minutes}m {seconds}s left
      </span>
    );
  };

  if (loading) return <Loading />;
  if (!foodItem)
    return <p className="text-center mt-10">Food item not found</p>;

  return (
    <div className="w-11/12 mx-auto py-24 font-roboto">
      <div className="flex flex-wrap gap-12">
        <img
          src={foodItem.foodImageUrl}
          alt={foodItem.title}
          className="flex-1 bg-base-200 rounded-2xl hover:shadow-2xl"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-3xl md:text-5xl font-bold">{foodItem.title}</h2>
          <p className="text-gray-600">{foodItem.description}</p>

          <p className="text-lg">
            <strong>Expires in:</strong>{" "}
            <Countdown
              date={new Date(foodItem.expiryDate)}
              renderer={countdownRenderer}
            />
          </p>

          <div>
            <h3 className="text-xl font-semibold mb-2">Notes</h3>
            {foodItem.notes.length > 0 ? (
              <ul className="list-disc pl-6 space-y-1 max-h-48 overflow-y-auto">
                {foodItem.notes.map((note, i) => (
                  <li key={i}>
                    {note.note}{" "}
                    <p className="text-xs text-gray-500">
                      [{new Date(note.postedDate).toLocaleString()}]
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No notes added yet.</p>
            )}
          </div>

          {user?.email ? (
            <div className="mt-4 p-4 border border-gray-200 rounded bg-gray-50">
              <textarea
                rows="3"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write your note..."
                className="w-full border border-gray-300 p-2 rounded focus:outline-green-400"
                disabled={!isCreator}
              />
              <button
                onClick={handleAddNote}
                disabled={submitting || !noteText.trim() || !isCreator}
                className={`mt-3 px-8 py-2 rounded ${
                  isCreator
                    ? "text-black border border-green-600 hover:bg-green-700 hover:text-white"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                title={
                  !noteText.trim()
                    ? "Please enter a note"
                    : submitting
                    ? "Submitting..."
                    : !isCreator
                    ? "Only the creator can add notes"
                    : ""
                }
              >
                {isCreator
                  ? submitting
                    ? "Adding..."
                    : "Add Note"
                  : "Add Note"}
              </button>
            </div>
          ) : null}

          <p>
            <strong>Category:</strong> {foodItem.foodCategory}
          </p>
          <p>
            <strong>Quantity:</strong> {foodItem.quantity}
          </p>
          <p>
            <strong>Expiry Date:</strong>{" "}
            {new Date(foodItem.expiryDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
