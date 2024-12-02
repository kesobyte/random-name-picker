import React, { useState } from "react";
import Modal from "react-modal";
import Confetti from "react-confetti";

Modal.setAppElement("#root");

const RandomNamePicker = () => {
  const [names, setNames] = useState([]);
  const [inputName, setInputName] = useState("");
  const [pickedName, setPickedName] = useState("");
  const [isRolling, setIsRolling] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddName = () => {
    if (inputName.trim() && !names.includes(inputName)) {
      setNames([...names, inputName.trim()]);
      setInputName("");
    }
  };

  const handleRoll = () => {
    if (names.length === 0) return;
    setIsRolling(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      const selectedName = names[randomIndex];
      setPickedName(selectedName);
      setIsRolling(false);
      setIsModalOpen(true);

      setNames(names.filter((name) => name !== selectedName));
    }, 3000);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Enter Participant Names:
      </h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Enter name"
          className="flex-grow border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleAddName}
          className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600"
        >
          Add
        </button>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          Participants:
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          {names.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleRoll}
        disabled={isRolling || names.length === 0}
        className={`w-full mt-4 py-2 font-bold text-white rounded-lg ${
          isRolling || names.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isRolling ? "Rolling..." : "Start Picking"}
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Picked Name"
        className="bg-white rounded-lg shadow-lg p-8 max-w-sm mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            🎉 The Winner is 🎉
          </h2>
          <h1 className="text-4xl font-extrabold text-gray-800">
            {pickedName}
          </h1>
          <Confetti />
          <button
            onClick={closeModal}
            className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RandomNamePicker;
