import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Pages/Loading";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import ExpiredFoodItemCard from "./ExpiredFoodItemCard";
const ExpiredFoodItems = () => {
  const [expiredFoods, setExpiredFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/expired-food-items`)
      .then((res) => {
        setExpiredFoods(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching expired foods:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading></Loading>;

  return (
    <div className="w-11/12 mx-auto pb-24">
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold pb-2 text-center">
          Expired Food Items
        </h1>
        <p className="md:w-3/5 mx-auto pt-6 text-gray-700 pb-6 text-center">
          Below are food items that have passed their expiry dates. Review and
          remove them to maintain a clean and up-to-date inventory, and ensure
          food safety.
        </p>
      </div>
      {expiredFoods.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-green-100 rounded-lg shadow-sm md:w-1/2 md:mx-auto">
          <MdOutlineAssignmentTurnedIn className="text-5xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">
            No Expired Food Items
          </h2>
          <p className="text-sm text-gray-500">
            Great job! You have no expired food items at the moment.
          </p>
        </div>
      ) : expiredFoods.length < 4 ? (
        <div className="flex flex-wrap justify-center gap-4">
          {expiredFoods.map((food) => (
            <ExpiredFoodItemCard key={food._id} food={food} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {expiredFoods.map((food) => (
            <ExpiredFoodItemCard key={food._id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpiredFoodItems;
