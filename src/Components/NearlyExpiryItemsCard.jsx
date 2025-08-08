import React, { useState } from "react";
import { RiShoppingBasket2Fill } from "react-icons/ri";
import ExpireIcon from "/expireDate.png";
import { Link } from "react-router";
const NearlyExpiryItemsCard = ({ item }) => {
  const { foodImageUrl, title, foodCategory, quantity, expiryDate } = item;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group bg-base-200 px-4 space-y-4 rounded hover:shadow-2xl font-lexend relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        className="w-72 h-60 py-8 mx-auto"
        src={foodImageUrl}
        alt={title}
        animate={
          hovered
            ? {
                y: [0, -6, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
            : { y: 0 }
        }
      />

      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex justify-between text-lg">
        <div className="flex gap-1 items-center text-green-700">
          <img className="w-5" src={ExpireIcon} alt="expiry_date_icon" />
          {expiryDate
            ? new Date(expiryDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Date not available"}
        </div>
        <span>Category: {foodCategory}</span>
      </div>

      <div className="flex justify-between items-center pb-6">
        <Link to={`/foodDetails/${item._id}`}>
          <button className="bg-[#4e852646] border border-green-900 text-green-950 hover:bg-[#4d8526] hover:text-white px-4 py-2 rounded-full">
            See Details
          </button>
        </Link>
        <div className="flex items-center gap-6">
          <div className="bg-[#4e852646] rounded-full px-1 py-1">
            <RiShoppingBasket2Fill size={25} />
          </div>
          <p className="bg-[#4e852646] rounded-full px-2 text-lg">{quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default NearlyExpiryItemsCard;
