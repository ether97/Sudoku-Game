import { Box } from "./Box";
import { useSudokuContext } from "../context/SudokuContext";
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
    setDifficultyAndUpdate,
    getCheck,
    updateCheck,
  } = useSudokuContext();

  let NEW_BOARD = getNewBoard();
  let GAME_BOARD = getGameBoard();

  while (!getCheck()) {
    fillBoard(NEW_BOARD);
    GAME_BOARD = NEW_BOARD.map((row) => [...row]); // deep copy
    makeHoles(GAME_BOARD, "EASY");
    updateCurrentBoard(GAME_BOARD);
    updateCheck();
  }

  return (
    <>
      <h1>{getErrors()}</h1>
      <div
        style={{
          height: "450px",
          width: "450px",
          display: "inline-grid",
          gap: "10px",
          gridTemplateColumns: "repeat(9,50px)",
          gridTemplateRows: "repeat(9,50px)",
          position: "absolute",
          top: "200px",
          left: "0px",
          right: "0px",
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
            height: "3px",
            backgroundColor: "black",
            position: "absolute",
            width: "530px",
            top: "172px",
          }}
        ></div>
        <div
          style={{
            height: "3px",
            backgroundColor: "black",
            position: "absolute",
            width: "530px",
            top: "352px",
          }}
        ></div>
        <div
          style={{
            width: "3px",
            backgroundColor: "black",
            position: "absolute",
            height: "530px",
            left: "172px",
          }}
        ></div>
        <div
          style={{
            width: "3px",
            backgroundColor: "black",
            position: "absolute",
            height: "530px",
            left: "352px",
          }}
        ></div>
        <div
          style={{
            width: "530px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="success"
            onClick={() => setDifficultyAndUpdate("EASY")}
          >
            EASY
          </Button>
          <Button
            variant="info"
            onClick={() => setDifficultyAndUpdate("MEDIUM")}
          >
            MEDIUM
          </Button>
          <Button
            variant="warning"
            onClick={() => setDifficultyAndUpdate("HARD")}
          >
            HARD
          </Button>
          <Button
            variant="danger"
            onClick={() => setDifficultyAndUpdate("IMPOSSIBLE")}
          >
            IMPOSSIBLE
          </Button>
        </div>
      </div>
    </>
  );
}
