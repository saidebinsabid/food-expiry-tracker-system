import React, { useEffect, useState } from "react";

const UpdateItemModal = ({ show, onClose, item, user, onUpdate }) => {
  const [formData, setFormData] = useState({
    foodImageUrl: "",
    title: "",
    foodCategory: "",
    quantity: "",
    expiryDate: "",
    description: "",
    email: "",
  });

  useEffect(() => {
    if (item && user && show) {
      const formatDate = (isoString) => {
        return isoString ? isoString.split("T")[0] : "";
      };
      setFormData({
        foodImageUrl: item.foodImageUrl || "",
        title: item.title || "",
        foodCategory: item.foodCategory || "",
        description: item.description || "",
        quantity: item.quantity || "",
        expiryDate: formatDate(item.expiryDate) || "",
      });
    }
  }, [item, user, show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };
  return (
    <div className="font-roboto">
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(0.5px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            UPDATE FOOD ITEM
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium" htmlFor="foodImageUrl">
                Food Image Url
              </label>
              <input
                id="foodImageUrl"
                type="text"
                name="foodImageUrl"
                value={formData.foodImageUrl}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            {/* Title */}
            <div>
              <label className="block mb-1 font-medium" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-medium" htmlFor="foodCategory">
                Category
              </label>
              <select
                id="foodCategory"
                name="foodCategory"
                value={formData.foodCategory}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Grain">Grains</option>
                <option value="Dairy">Dairy</option>
                <option value="Meat">Meat</option>
                <option value="Fruit">Fruit</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={4}
              />
            </div>

            {/* quantity */}
            <div>
              <label className="block mb-1 font-medium" htmlFor="quantity">
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* expiryDate */}
            <div>
              <label className="block mb-1 font-medium" htmlFor="expiryDate">
                expiryDate
              </label>
              <input
                id="expiryDate"
                name="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateItemModal;
