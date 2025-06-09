import { useState, useEffect } from "react";
import Modal from "react-modal";
import Confetti from "react-confetti";
import giftbox from "../../images/gift.png";

Modal.setAppElement("#root");

export const RandomNamePicker = () => {
  const [names, setNames] = useState(() => {
    const savedNames = JSON.parse(localStorage.getItem("names"));
    return savedNames || [];
  });

  const [textAreaValue, setTextAreaValue] = useState(() => {
    const savedNames = JSON.parse(localStorage.getItem("names"));
    return savedNames ? savedNames.join("\n") : "";
  });

  const [pickedName, setPickedName] = useState("");
  const [isRolling, setIsRolling] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false);
  const [rollingName, setRollingName] = useState("");

  useEffect(() => {
    localStorage.setItem("names", JSON.stringify(names));
    setTextAreaValue(names.join("\n"));
  }, [names]);

  const handleTextAreaChange = (e) => {
    setTextAreaValue(e.target.value);
  };

  const updateNames = () => {
    const inputNames = textAreaValue
      .split(/[\n,]+/)
      .map((name) => name.trim())
      .filter((name) => name !== "");
    setNames(inputNames);
    setShowTextarea(false);
  };

  const handleRoll = () => {
    if (names.length === 0) return;

    setIsRolling(true);

    const duration = 5000;
    const initialSpeed = 1; // Initial rolling speed in ms
    const finalSpeed = 150; // Final rolling speed in ms

    let timeElapsed = 0;
    let currentSpeed = initialSpeed;

    const roll = () => {
      if (timeElapsed >= duration) {
        const randomIndex = Math.floor(Math.random() * names.length);
        const selectedName = names[randomIndex];
        setPickedName(selectedName);
        setRollingName(selectedName);
        setNames(names.filter((name) => name !== selectedName));

        //2-second pause before showing the modal para exciting
        setTimeout(() => {
          setIsRolling(false);
          setIsModalOpen(true);
        }, 2000);

        return;
      }

      const randomIndex = Math.floor(Math.random() * names.length);
      setRollingName(names[randomIndex]);

      timeElapsed += currentSpeed;
      currentSpeed += (finalSpeed - currentSpeed) / 10;

      setTimeout(roll, currentSpeed);
    };

    roll();
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="text-4xl font-bold text-blue-500 mb-3 font-poppins">
        {/* Birthday Party Raffle */}
        생일 파티 추첨
      </p>
      <h1 className="text-7xl font-light mb-8 font-oi">
        <span className="bg-gradient-to-r from-pink-300 to-pink-400 bg-clip-text text-transparent">
          Happy Liz Day!
          {/* 리즈의 날 축하드립니다! */}
        </span>
      </h1>

      {isRolling ? (
        <div className="text-8xl font-extrabold text-gray-800 py-6 px-12">
          {rollingName || "Rolling..."}
        </div>
      ) : (
        <button
          onClick={handleRoll}
          className="p-5 uppercase text-white text-9xl font-semibold rounded-full hover:bg-blue-400 hover:bg-opacity-30 flex items-center justify-center"
        >
          <img src={giftbox} alt="giftbox" className="h-52" />
        </button>
      )}

      <button
        onClick={() => setShowTextarea((prev) => !prev)}
        className="uppercase mt-6 text-[12px] font-light underline font-poppins"
      >
        {showTextarea ? "Hide Names" : "Edit Names"}
      </button>

      {showTextarea && (
        <div className="absolute">
          <div className="relative bottom-0 mt-4 w-full max-w-md bg-white shadow-md rounded-lg p-4">
            <textarea
              value={textAreaValue}
              onChange={handleTextAreaChange}
              placeholder="Enter names separated by commas or new lines"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows="6"
            />
            <button
              onClick={updateNames}
              className="mt-4 w-full py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
            >
              Update Names
            </button>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Picked Name"
        className="bg-white rounded-2xl shadow-lg px-14 py-8 mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-green-500 mb-4">
            🎉 Congratulations! 🎉
          </h2>
          <h1 className="p-5 text-8xl font-extrabold bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent">
            {pickedName}
          </h1>
          <Confetti />
          <button
            onClick={closeModal}
            className="mt-6 bg-red-400 text-white px-5 py-1 rounded-lg hover:bg-red-500"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};
