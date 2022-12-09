import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { useSudokuContext } from "./../context/SudokuContext";

type BoxProps = {
  i: number;
  index: number;
};

export function Box({ i, index }: BoxProps) {
  const [buttonValue, changeButtonValue] = useState(i);
  const {
    updateErrors,
    getCurrentBoard,
    getGameBoard,
    getNewBoard,
    getOpacity,
    updateOpacity,
    getErrors,
    updateCorrectInputs,
    returnCorrectInputs,
    returnHoleCount,
    updateShowState,
    resetBoard,
  } = useSudokuContext();

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>): void {
    let isNumber = isFinite(Number(e.key));

    if (isNumber && getErrors() < 4) {
      if (buttonValue === 0) {
        if (Number(e.key) !== getNewBoard().flat()[index]) {
          updateErrors();
        } else {
          changeButtonValue(Number(e.key));
          updateCorrectInputs();
          if (returnCorrectInputs() === returnHoleCount()) {
            updateShowState();
          }
        }
      }
    }
  }
  return (
    <>
      <Button
        variant={i === 0 ? "outline-light" : "light"}
        style={{
          backgroundImage: i !== 0 ? "black" : "white",
          height: "48px",
          width: "48px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          color: i === 0 ? "white" : "black",
          // fontWeight: "bold",
          fontFamily: "'Zen Dots', cursive",
        }}
        disabled={i === 0 ? false : true}
        onKeyDown={(e) => handleKeyDown(e)}
      >
        {buttonValue === 0 ? "" : buttonValue}
      </Button>
    </>
  );
}
