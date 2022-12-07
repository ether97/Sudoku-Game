import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { useSudokuContext } from "./../context/SudokuContext";

type BoxProps = {
  i: number;
  index: number;
};

export function Box({ i, index }: BoxProps) {
  const [buttonValue, changeButtonValue] = useState(i);
  const { updateErrors, getCurrentBoard, getGameBoard } = useSudokuContext();

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>): void {
    e.preventDefault();
    if (Number(e.key) !== getGameBoard().flat()[index]) {
      console.log(e.key);
      console.log(getGameBoard());
      updateErrors();
    } else {
      changeButtonValue(Number(e.key));
    }
  }
  return (
    <>
      <Button
        variant={i === 0 ? "outline-dark" : "dark"}
        style={{
          height: "48px",
          width: "48px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
        }}
        disabled={i === 0 ? false : true}
        onKeyDown={(e) => handleKeyDown(e)}
      >
        {buttonValue === 0 ? "" : buttonValue}
      </Button>
    </>
  );
}
