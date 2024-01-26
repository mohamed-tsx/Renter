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
    images: "",
    previewImage: null, // Added for image preview
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
      // Update Redux state instead of reloading the entire page
      // dispatch(actionToUpdatePropertiesList);
    }
  }, [isError, isSuccess, message, closeModal]);

  const handleInputChange = (e) => {
    const { name, files } = e.target;

    if (name === "images") {
      const file = files[0];

      if (file) {
        const MAX_FILE_SIZE = 5 * 1024 * 1024;

        if (file.size > MAX_FILE_SIZE) {
          toast.error(
            `File size should be less than ${MAX_FILE_SIZE / (1024 * 1024)} MB`
          );
          return;
        }

        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
          toast.error("Invalid file type. Please upload a valid image.");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setNewHouse((prev) => ({
            ...prev,
            [name]: file.name,
            previewImage: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setNewHouse((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericFields = ["price", "number_of_bedrooms"];
    for (const field of numericFields) {
      if (isNaN(parseFloat(newHouse[field]))) {
        toast.error(`Please enter a valid number for ${field}`);
        return;
      }
    }

    try {
      const { previewImage, ...propertyWithoutPreviewImage } = newHouse;
      await dispatch(addProperty(propertyWithoutPreviewImage));
    } catch (error) {
      toast.error(error.message || "Failed to add property");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <Toaster richColors position="top-right" />
      <div className="absolute bg-gray-900 opacity-75 w-full h-full"></div>
      <div className="z-10 bg-white p-3 w-[590px] rounded shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-2">Add a New House</h2>
          <button onClick={closeModal} className="mb-2 focus:outline-none">
            <IoMdClose className="text-gray-500" />
          </button>
        </div>
        <form
          action="addproperty"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-grow">
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
                  className="mt-1 border w-full p-2 rounded"
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
                  className="mt-1 border w-full p-2 rounded"
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
                  className="mt-1 border w-full p-2 rounded"
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
                  className="mt-1 border w-full p-2 rounded"
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
                  className="mt-1 border w-full p-2 rounded"
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
                  className="mt-1 border w-full p-2 rounded"
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
                  className="mt-1 border w-full p-2 rounded"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="images" className="block text-gray-700">
                Images
              </label>
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={handleInputChange}
                className="mt-1 border w-full p-2 rounded"
              />
              {newHouse.previewImage && (
                <img
                  src={newHouse.previewImage}
                  alt="Preview"
                  className="mt-2 max-w-full h-auto"
                />
              )}
            </div>
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
