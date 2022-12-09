import { Box } from "./Box";
import { useSudokuContext } from "../context/SudokuContext";
import { SudokuModal } from "./SudokuModal";
import { Button } from "react-bootstrap";

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
    updateHoleCount,
    returnCorrectInputs,
    returnHoleCount,
    getShowState,
    newGame,
    handleClick,
  } = useSudokuContext();

  if (!getCheck()) {
    newGame();
    updateCheck();
  }

  return (
    <>
      <h1
        style={{
          position: "absolute",
          top: "70px",
          textAlign: "center",
          color: "white",
          fontFamily: "'Zen Dots', cursive",
        }}
      >
        {getErrors() < 4 ? `Errors: ${getErrors()}` : "Game Over"}
      </h1>
      <Button
        variant="light"
        style={{
          position: "absolute",
          top: "130px",
          fontFamily: "'Zen Dots', cursive",
          color: "black",
        }}
        onClick={handleClick}
      >
        NEW GAME
      </Button>
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
      {getShowState() && <SudokuModal />}
    </>
  );
}
