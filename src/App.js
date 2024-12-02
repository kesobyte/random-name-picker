import { RandomNamePicker } from "./component/RandomNamePicker/RandomNamePicker";
import bg from "./images/xmas-bg.jpg";

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
      <RandomNamePicker />
    </div>
  );
}

export default App;
