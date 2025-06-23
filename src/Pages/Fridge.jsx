import React, { useEffect, useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import FoodItemCard from "../Components/FoodItemCard";
import { BiSolidCommentError } from "react-icons/bi";

import axios from "axios";
import Loading from "./Loading";
const Fridge = () => {
  const [allFoodsItems, setAllFoodsItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
    const delay = setTimeout(() => {
      const fetchFoods = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/allFoodsItems`,
            {
              params: {
                search: searchText,
                category: selectedCategory !== "All" ? selectedCategory : "",
              },
            }
          );
          setAllFoodsItems(res.data);
        } catch (err) {
          console.error("Error fetching food items", err);
        } finally {
          setLoading(false);
        }
      };
      fetchFoods();
    }, 600);

    return () => clearTimeout(delay);
  }, [searchText, selectedCategory]);

  const filteredFoods = allFoodsItems;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-11/12 mx-auto py-24 font-roboto">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded shadow-sm">
        <div className="text-gray-700 font-medium text-base">
          Showing {filteredFoods.length} result
          {filteredFoods.length !== 1 && "s"}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <BsFillGrid3X3GapFill
            size={30}
            className="text-gray-600 hidden md:inline-block"
          />

          {/* Sort Dropdown */}
          <select
            name="foodCategory"
            id="foodCategory"
            className="select select-bordered text-sm w-40"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Food Items</option>
            <option value="Grain">Grains</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Snacks">Snacks</option>
          </select>

          {/* Search Input */}
          <label className="input input-bordered flex items-center gap-2 w-64">
            <svg
              className="h-4 w-4 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="grow"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="pt-8">
        {filteredFoods.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center bg-red-50 text-gray-600 p-6 py-12 rounded-lg shadow-md space-y-4 relative">
              <BiSolidCommentError
                className="absolute top-2 left-1/2"
                size={30}
              />
              <h2 className="text-xl font-semibold">No food items found</h2>
              <p>No results match your selected category or search term.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentFoods.map((foodItem) => (
                <FoodItemCard key={foodItem._id} foodItem={foodItem} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-4 py-2 border rounded ${
                      currentPage === i + 1
                        ? "bg-[#0a472e] text-white"
                        : "bg-white"
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Fridge;
