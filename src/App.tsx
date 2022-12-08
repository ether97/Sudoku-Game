import { Board } from "./components/Board";
import { SudokuProvider } from "./context/SudokuContext";

function App() {
  return (
    <SudokuProvider>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          margin: "0px",
          padding: "0px",
          backgroundImage: "linear-gradient(to right, #434343 0%, black 100%)",
        }}
      >
        <Board />
      </div>
    </SudokuProvider>
  );
}

export default App;
