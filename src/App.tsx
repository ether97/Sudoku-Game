import { Board } from "./components/Board";

function App() {
  return (
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
      }}
    >
      <Board />
    </div>
  );
}

export default App;
