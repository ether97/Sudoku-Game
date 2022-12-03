import { Box } from "./Box";
import { useState } from "react";

export function Board() {
  const [errors, changeErrors] = useState(0);
  let BLANK_BOARD = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  let NEW_BOARD = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  let GAME_BOARD = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  let DIFFICULTY = {
    EASY: 5,
    MEDIUM: 10,
    HARD: 15,
  };

  let counter: number = 0;
  let check: number[];
  const numArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function rowSafe(
    puzzleArray: number[][],
    emptyCell: { rowIndex: number; colIndex: number },
    num: number
  ): boolean {
    return puzzleArray[emptyCell.rowIndex].indexOf(num) == -1;
  }

  function colSafe(
    puzzleArray: number[][],
    emptyCell: { rowIndex: number; colIndex: number },
    num: number
  ): boolean {
    let test = puzzleArray.flat();
    for (let i = emptyCell.colIndex; i < test.length; i += 9) {
      if (test[i] === num) {
        return false;
      }
    }
    return true;
  }

  function regionSafe(
    puzzleArray: number[][],
    emptyCell: { rowIndex: number; colIndex: number },
    num: number
  ): boolean {
    const rowStart: number = emptyCell.rowIndex - (emptyCell.rowIndex % 3);
    const colStart: number = emptyCell.colIndex - (emptyCell.colIndex % 3);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (puzzleArray[rowStart + i][colStart + j] === num) {
          return false;
        }
      }
    }
    return true;
  }

  console.log(rowSafe(BLANK_BOARD, { rowIndex: 4, colIndex: 6 }, 5));
  console.log(colSafe(BLANK_BOARD, { rowIndex: 2, colIndex: 3 }, 4));
  console.log(regionSafe(BLANK_BOARD, { rowIndex: 5, colIndex: 6 }, 5));

  function safeToPlace(
    puzzleArray: number[][],
    emptyCell: { rowIndex: number; colIndex: number },
    num: number
  ): boolean {
    return (
      regionSafe(puzzleArray, emptyCell, num) &&
      rowSafe(puzzleArray, emptyCell, num) &&
      colSafe(puzzleArray, emptyCell, num)
    );
  }

  console.log(safeToPlace(BLANK_BOARD, { rowIndex: 5, colIndex: 6 }, 5));

  function nextEmptyCell(puzzleArray: number[][]): {
    colIndex: number;
    rowIndex: number;
  } {
    let emptyCell = { rowIndex: -1, colIndex: -1 };
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (puzzleArray[i][j] === 0) {
          return { rowIndex: i, colIndex: j };
        }
      }
    }
    return emptyCell;
  }

  function shuffle(array: number[]): number[] {
    // using Array sort and Math.random

    let shuffledArr = array.sort(() => 0.5 - Math.random());
    return shuffledArr;
  }

  function fillBoard(puzzleArray: number[][]): boolean {
    if (nextEmptyCell(puzzleArray).colIndex === -1) return true;

    let emptyCell = nextEmptyCell(puzzleArray);

    for (var num in shuffle(numArray)) {
      if (safeToPlace(puzzleArray, emptyCell, numArray[num])) {
        puzzleArray[emptyCell.rowIndex][emptyCell.colIndex] = numArray[num];
        if (fillBoard(puzzleArray)) return true;
      }
    }

    puzzleArray[emptyCell.rowIndex][emptyCell.colIndex] = 0;

    return false;
  }

  fillBoard(NEW_BOARD);
  GAME_BOARD = NEW_BOARD.map((row) => [...row]); // deep copy

  function makeHoles(array: number[][], difficulty: String): void {
    array.forEach((row, rowIndex) =>
      row.forEach((col, colIndex) => {
        for (let i = 0; i < getDifficulty(difficulty); i++) {
          let random = Math.floor(Math.random() * 10);
          if (array[rowIndex][colIndex] === random) {
            array[rowIndex][colIndex] = 0;
          }
        }
      })
    );
  }

  function getDifficulty(difficulty: String): number {
    switch (difficulty) {
      case "EASY":
        return 5;
      case "MEDIUM":
        return 10;
      case "HARD":
        return 15;
      case "IMPOSSIBLE":
        return 20;
      default:
        return 10;
    }
  }

  makeHoles(GAME_BOARD, "EASY");
  console.log(GAME_BOARD.flat());
  console.log(NEW_BOARD.flat());

  return (
    <>
      <h1>{errors}</h1>
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
        {GAME_BOARD.flat().map((item, index) => (
          <Box
            i={item}
            index={index}
            GAME_BOARD={GAME_BOARD}
            NEW_BOARD={NEW_BOARD}
            changeErrors={changeErrors}
            errors={errors}
          />
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
      </div>
    </>
  );
}
