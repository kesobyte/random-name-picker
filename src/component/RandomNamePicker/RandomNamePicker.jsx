import { useState, useEffect } from "react";
import Modal from "react-modal";
import Confetti from "react-confetti";
import giftbox from "../../images/xmas-gift.png";
import drumrollSound from "../../assets/sounds/drumroll.mp3";

Modal.setAppElement("#root");

export const RandomNamePicker = () => {
  const [names, setNames] = useState(() => {
    const savedNames = JSON.parse(localStorage.getItem("names"));
    return savedNames || [];
  });

  const [winners, setWinners] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("winners"));
    return saved || [];
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
  const [audio] = useState(new Audio(drumrollSound)); // Initialize the drumroll sound

  useEffect(() => {
    localStorage.setItem("names", JSON.stringify(names));
    localStorage.setItem("winners", JSON.stringify(winners));
    setTextAreaValue(names.join("\n"));
  }, [names, winners]);

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
    audio.play(); // Start playing the drumroll sound

    const duration = 4500;
    let timeElapsed = 0;
    let currentSpeed = 1;

    const roll = () => {
      if (timeElapsed >= duration) {
        const randomIndex = Math.floor(Math.random() * names.length);
        const selectedName = names[randomIndex];
        setPickedName(selectedName);
        setRollingName(selectedName);
        setNames(names.filter((name) => name !== selectedName));

        setIsRolling(false);
        audio.pause();
        audio.currentTime = 0;

        // ✅ 2-second delay before showing winner
        setTimeout(() => {
          setIsModalOpen(true);
          setWinners((prev) => [selectedName, ...prev]);
        }, 2000); // 2 seconds

        return;
      }

      const randomIndex = Math.floor(Math.random() * names.length);
      setRollingName(names[randomIndex]);

      timeElapsed += currentSpeed;
      currentSpeed += (150 - currentSpeed) / 10;
      setTimeout(roll, currentSpeed);
    };

    roll();
  };

  const closeModal = () => setIsModalOpen(false);

  const resetWinners = () => {
    setWinners([]);
    localStorage.removeItem("winners");
  };

  return (
    <div className="flex flex-col items-center justify-start py-6 px-4 min-h-screen w-full max-w-md mx-auto">
      {/* Main Title */}
      <p
        className="text-3xl md:text-4xl font-black mb-1"
        style={{
          fontFamily: "'Mountains of Christmas', cursive",
          color: "#d32f2f",
        }}
      >
        Christmas Raffle 2025
      </p>

      <h1
        className="text-6xl md:text-7xl lg:text-8xl mb-4 text-center px-2"
        style={{
          fontFamily: "'Mountains of Christmas', cursive",
          fontWeight: "900",
          color: "#1b5e20",
          textShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        Merry Christmas!
      </h1>

      {isRolling ? (
        <div
          className="text-6xl md:text-7xl py-4 px-8 rounded-xl bg-gray-200 text-center mb-4"
          style={{
            fontFamily: "'Mountains of Christmas', cursive",
            color: "#c62828",
          }}
        >
          {rollingName || "✨ Choosing..."}
        </div>
      ) : (
        <button
          onClick={handleRoll}
          className="p-3 rounded-full hover:scale-105 transition-transform focus:outline-none mb-4"
        >
          <img src={giftbox} alt="Christmas gift" className="h-48 md:h-52" />
        </button>
      )}

      {/* "Recent Winners" */}
      {winners.length > 0 && (
        <div className="mt-2 flex flex-col items-center">
          <div className="text-center mb-2">
            <span className="text-sm font-bold underline text-gray-700">
              Recent Winners
            </span>
            <button
              onClick={resetWinners}
              className="ml-2 text-xs underline"
              style={{ color: "#d32f2f" }}
            >
              Reset All
            </button>
          </div>
          {/**/}
          <div className="bg-gray-100 rounded-lg p-3 border border-gray-300 max-w-[280px] w-full">
            {winners.map((name, index) => (
              <div
                key={index}
                className="py-1 text-base text-center whitespace-nowrap overflow-hidden text-ellipsis px-1"
                style={{
                  fontFamily: "'Mountains of Christmas', cursive",
                  color: "#1b5e20",
                }}
              >
                🎅🏼🎁 {name}
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setShowTextarea((prev) => !prev)}
        className="mt-4 text-sm font-bold underline text-gray-700 hover:text-gray-900"
      >
        {showTextarea ? "Hide Names" : "Edit Names"}
      </button>

      {showTextarea && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-4 w-full max-w-xs p-4">
          <div className="bg-white rounded-xl shadow-lg p-4 border w-full max-w-xs">
            <textarea
              value={textAreaValue}
              onChange={handleTextAreaChange}
              placeholder="Enter names (one per line or comma-separated)"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows="5"
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: "1rem",
              }}
            />
            <button
              onClick={updateNames}
              className="mt-3 w-full py-2.5 rounded-lg font-bold"
              style={{
                backgroundColor: "#2e7d32",
                color: "white",
              }}
            >
              Update Names
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white rounded-2xl shadow-xl px-6 py-5 mx-auto max-w-sm outline-none relative z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
      >
        <div className="text-center">
          <h2
            className="text-2xl mb-2"
            style={{
              fontFamily: "'Mountains of Christmas', cursive",
              color: "#d32f2f",
            }}
          >
            🎉 Congratulations Ho Ho Ho! 🎄
          </h2>
          <h1
            className="p-3 text-5xl md:text-6xl font-black"
            style={{
              fontFamily: "'Mountains of Christmas', cursive",
              color: "#1b5e20",
            }}
          >
            {pickedName}
          </h1>

          <div className="fixed inset-0 pointer-events-none -z-10">
            <Confetti
              width={typeof window !== "undefined" ? window.innerWidth : 500}
              height={typeof window !== "undefined" ? window.innerHeight : 800}
              numberOfPieces={200}
              gravity={0.05}
              opacity={0.85}
              recycle={true}
              colors={["#d32f2f", "#1b5e20", "#ffd700", "#ffffff"]}
            />
          </div>

          <button
            onClick={closeModal}
            className="mt-3 px-5 py-1.5 rounded-full font-bold text-sm"
            style={{
              fontFamily: "'Patrick Hand', cursive",
              backgroundColor: "#c62828",
              color: "white",
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};
