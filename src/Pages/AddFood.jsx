import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
const AddFood = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const handleAddFood = (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(form);
    const newFoodData = Object.fromEntries(formdata.entries());
    newFoodData.addedDate = new Date().toISOString();

    axiosSecure
      .post(`/added-food`, newFoodData)
      .then((response) => {
        if (response.data.insertedId) {
          Swal.fire({
            title: "Food Added Successfully!",
            icon: "success",
            draggable: true,
          }).then(() => {
            navigate("/myItems");
          });
          form.reset();
        }
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message ||
            "Failed to create task. Please try again."
        );
      });
  };
  return (
    <div>
      <div className="w-11/12 mx-auto pb-24 font-roboto">
        <div className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-bold pb-2">
            🥕 Add Your Food, Track Your Food, Save More, Waste Less!
          </h1>
          <p className="md:w-3/5 mx-auto pt-6 text-gray-700 ">
            Enter your food details to never miss an expiry. Small steps today,{" "}
            <br /> fresher meals tomorrow.
          </p>
        </div>
        <form onSubmit={handleAddFood}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Food Image URL */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label text-gray-900 ">FOOD IMAGE URL</label>
              <input
                type="text"
                id="url"
                name="foodImageUrl"
                className="input w-full"
                placeholder="Enter Food Image Url"
              />
            </fieldset>
            {/* Food Title */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label text-gray-900 ">FOOD TITLE</label>
              <input
                type="text"
                id="foodtitle"
                name="title"
                className="input w-full"
                placeholder="Enter Food Title"
              />
            </fieldset>

            {/* Food Category */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label text-gray-900" htmlFor="foodCategory">
                FOOD CATEGORY
              </label>
              <select
                name="foodCategory"
                id="category"
                className="select w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Food Category
                </option>
                <option value="Grain">Grains</option>
                <option value="Dairy">Dairy</option>
                <option value="Meat">Meat</option>
                <option value="Fruit">Fruit</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Snacks">Snacks</option>
              </select>
            </fieldset>

            {/* Quantity */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label text-gray-900">QUANTITY</label>
              <input
                type="number"
                id="foodquantity"
                name="quantity"
                className="input w-full"
                placeholder="Enter Food Quantity"
              />
            </fieldset>

            {/* Expiry Date */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label text-gray-900" htmlFor="expiryDate">
                EXPIRY DATE
              </label>
              <input
                type="date"
                name="expiryDate"
                id="expiryDate"
                className="input w-full"
              />
            </fieldset>

            {/* Email */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label text-gray-900">YOUR EMAIL</label>
              <input
                type="email"
                id="useremail"
                name="email"
                className="input w-full"
                value={user?.email || ""}
                readOnly
              />
            </fieldset>

            {/* Task Description */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 col-span-1 md:col-span-2 ">
              <label className="label text-gray-900">FOOD DESCRIPTION</label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full min-h-[150px] md:min-h-[200px]"
                placeholder="Write Detail about Food"
              ></textarea>
            </fieldset>
          </div>

          <input
            className="border bg-gray-100 border-[#0a472e] text-[#0a472e] hover:bg-[#0a472e] hover:text-white py-2 rounded-full w-3/5 mx-auto mt-8 block"
            type="submit"
            value="Add Food"
          />
        </form>
      </div>
    </div>
  );
};

export default AddFood;
