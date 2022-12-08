import { Box } from "./Box";
import { useSudokuContext } from "../context/SudokuContext";

export function Board() {
  const {
    getErrors,
    updateCurrentBoard,
    getCurrentBoard,
    getGameBoard,
    getNewBoard,
    makeHoles,
    fillBoard,
    getCheck,
    updateCheck,
  } = useSudokuContext();

  let NEW_BOARD = getNewBoard();
  let GAME_BOARD = getGameBoard();
  let difficulty = "MEDIUM";

  while (!getCheck()) {
    fillBoard(NEW_BOARD);
    console.log(NEW_BOARD);
    GAME_BOARD = NEW_BOARD.map((row) => [...row]); // deep copy
    makeHoles(GAME_BOARD, difficulty);
    updateCurrentBoard(GAME_BOARD);
    updateCheck();
  }

  return (
    <>
      <h1
        style={{
          position: "absolute",
          top: "100px",
          textAlign: "center",
          color: "white",
        }}
      >
        {getErrors() < 4 ? `Errors: ${getErrors()}` : "Game Over"}
      </h1>
      <div
        style={{
          height: "450px",
          width: "450px",
          display: "inline-grid",
          gap: "20px",
          gridTemplateColumns: "repeat(9,50px)",
          gridTemplateRows: "repeat(9,50px)",
          position: "absolute",
          top: "200px",
          left: "-150px",
          right: "0",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {getCurrentBoard()
          .flat()
          .map((item, index) => (
            <Box i={item} index={index} />
          ))}
        <div
          style={{
            height: "5px",
            backgroundColor: "black",
            position: "absolute",
            width: "610px",
            top: "197px",
          }}
        ></div>
        <div
          style={{
            height: "5px",
            backgroundColor: "black",
            position: "absolute",
            width: "610px",
            top: "408px",
          }}
        ></div>
        <div
          style={{
            width: "5px",
            backgroundColor: "black",
            position: "absolute",
            height: "610px",
            left: "197px",
          }}
        ></div>
        <div
          style={{
            width: "5px",
            backgroundColor: "black",
            position: "absolute",
            height: "610px",
            left: "408px",
          }}
        ></div>
      </div>
    </>
  );
}
