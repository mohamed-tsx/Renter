// src/components/Dashboard.js
import React, { useState } from "react";
import Modal from "./Modals/AddHouseModal";
import { useSelector } from "react-redux";
import PropertyCards from "../Components/PropertyCards";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Dashboard</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Houses Posted */}
        <div className="bg-black text-white p-4 text-center outline-double outline-2 outline-gray-600 rounded-md">
          <p className="text-2xl font-semibold">
            {user?.ownedProperties.length}
          </p>
          <p>Houses Posted</p>
        </div>

        {/* Money Earned */}
        <div className="bg-black text-white p-4 text-center outline-double outline-2 outline-gray-600 rounded-md">
          <p className="text-2xl font-semibold">
            $ {user?.ownedProperties.length}
          </p>
          <p>Money Earned</p>
        </div>

        {/* Cards of Houses */}
        <div className="bg-black text-white p-4 text-center outline-double outline-2 outline-gray-300 rounded-md">
          <p className="text-2xl font-semibold">
            {user?.ownedProperties.length}
          </p>
          <p>Cards of Houses</p>
        </div>
      </div>

      {/* Button to Add a New House */}
      <button
        className="bg-black text-white py-2 px-4 rounded-md"
        onClick={openModal}
      >
        + Add New House
      </button>

      {/* Modal for Adding a New House */}
      {isModalOpen && <Modal closeModal={closeModal} />}
      <hr className="mt-3" />
      <div className="mt-3">
        <PropertyCards />
      </div>
    </div>
  );
};

export default Dashboard;
