import { Box } from "./Box";

export function Board() {
  const BLANK_BOARD = [
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

  let counter: number = 0;
  let check: number[];
  const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function shuffle(array: number[][]) {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

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

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
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
    let test = puzzleArray.flat();
    let firstZero = test.indexOf(0);
    if (firstZero < 81) {
      let row = firstZero % 9;
      let col = firstZero;
      emptyCell.rowIndex = row;
      emptyCell.colIndex = col;
      return emptyCell;
    }
    return emptyCell;
  }

  console.log(nextEmptyCell(BLANK_BOARD));

  // function fillPuzzle(puzzleArray: number[][]): number[][] {
  //   if (nextEmptyCell(puzzleArray).colIndex === -1) return puzzleArray;

  //   let emptyCell = nextEmptyCell(puzzleArray);
  //   for (var num of numArray) {
  //     if (safeToPlace(puzzleArray, emptyCell, num)) {
  //       puzzleArray[emptyCell.rowIndex][emptyCell.colIndex] = num;
  //       return fillPuzzle(puzzleArray);
  //     }
  //   }

  //   return BLANK_BOARD;
  // }

  // let test = fillPuzzle(BLANK_BOARD);

  return (
    <div
      style={{
        height: "450px",
        width: "450px",
        display: "grid",
        gap: "10px",
        gridTemplateColumns: "repeat(9,50px)",
        gridTemplateRows: "repeat(9,50px)",
      }}
    >
      {BLANK_BOARD.flat().map((item) => (
        <Box i={item} />
      ))}
    </div>
  );
}
