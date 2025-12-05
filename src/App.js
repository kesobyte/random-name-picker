// import { RandomNamePicker } from "./component/RandomNamePicker/RandomNamePicker";
// import bg from "./images/xmas-bg.jpg";

// function App() {
//   return (
//     <div
//       className="min-h-screen flex flex-col items-center justify-center"
//       style={{
//         backgroundImage: `url(${bg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="w-full h-full absolute top-0 left-[-20%]">
//         <RandomNamePicker />
//       </div>
//     </div>
//   );
// }

// export default App;

// src/App.jsx
import { RandomNamePicker } from "./component/RandomNamePicker/RandomNamePicker";
import bg from "./images/xmas-bg.jpg";

function App() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "2rem", // Optional: adds breathing room on small screens
      }}
    >
      {/* ✅ Centered container */}
      <div className="w-full max-w-md">
        <RandomNamePicker />
      </div>
    </div>
  );
}

export default App;
