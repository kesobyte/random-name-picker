import { RandomNamePicker } from "./component/RandomNamePicker/RandomNamePicker";
import bg from "./images/liz-day.png";

function App() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-full absolute top-0 left-[-20%]">
        <RandomNamePicker />
      </div>
    </div>
  );
}

export default App;
