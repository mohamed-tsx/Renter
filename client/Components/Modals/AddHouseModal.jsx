// src/components/Modal.js
import { addProperty } from "@/Redux/Features/property/propertySlice";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";

const Modal = ({ closeModal }) => {
  const [newHouse, setNewHouse] = useState({
    title: "",
    city: "",
    description: "",
    price: "",
    number_of_bedrooms: "",
    number_of_kitchens: "",
    number_of_toilets: "",
  });

  const dispatch = useDispatch();
  const { isError, isSuccess, isLoading, properties, message } = useSelector(
    (state) => state.properties
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      closeModal();
      window.location.reload();
    }
  }, [properties, isError, isSuccess, message, isLoading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHouse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericFields = ["price", "number_of_bedrooms"];
    for (const field of numericFields) {
      if (isNaN(parseFloat(newHouse[field]))) {
        toast.error(`${field} must be a valid number`);
        return;
      }
    }
    try {
      await dispatch(addProperty(newHouse));
    } catch (error) {
      toast.error(error.message || "Failed to add property");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <Toaster richColors position="top-right" />
      <div className="absolute bg-gray-900 opacity-75 w-full h-full"></div>
      <div className="z-10 bg-white p-4 rounded shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-2">Add a New House</h2>
          <button onClick={closeModal} className="mb-2">
            <IoMdClose />
          </button>
        </div>
        {/* Add your form elements here */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newHouse.title}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={newHouse.city}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newHouse.description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={newHouse.price}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">
              Number of bedrooms
            </label>
            <input
              type="number"
              id="number_of_bedrooms"
              name="number_of_bedrooms"
              value={newHouse.number_of_bedrooms}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Number of kitchens
            </label>
            <input
              type="text"
              id="number_of_kitchens"
              name="number_of_kitchens"
              value={newHouse.number_of_kitchens}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Number of toiltes
            </label>
            <input
              type="text"
              id="number_of_toilets"
              name="number_of_toilets"
              value={newHouse.number_of_toilets}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
