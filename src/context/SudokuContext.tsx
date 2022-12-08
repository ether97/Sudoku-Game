import { createContext, useContext, useRef, useState } from "react";

type SudokuProviderProps = {
  children: React.ReactNode;
};

type emptyCell = {
  rowIndex: number;
  colIndex: number;
};

type SudokuContext = {
  getCheck: () => boolean;
  getErrors: () => number;
  updateErrors: () => void;
  updateCheck: () => void;
  updateCurrentBoard: (params: number[][]) => void;
  getCurrentBoard: () => number[][];
  rowSafe: (params: number[][], {}: emptyCell, num: number) => boolean;
  colSafe: (params: number[][], {}: emptyCell, num: number) => boolean;
  regionSafe: (params: number[][], {}: emptyCell, num: number) => boolean;
  safeToPlace: (params: number[][], {}: emptyCell, num: number) => boolean;
  nextEmptyCell: (params: number[][]) => emptyCell;
  shuffle: (params: number[]) => number[];
  fillBoard: (params: number[][]) => boolean;
  makeHoles: (params: number[][], difficulty: String) => void;
  getDifficulty: (params: string) => number;
  getNewBoard: () => number[][];
  getGameBoard: () => number[][];
  setDifficultyAndUpdate: (params: string) => void;
  updateNewBoard: (params: number[][]) => void;
  getOpacity: () => number;
  updateOpacity: (params: number) => void;
};

const SudokuContext = createContext({} as SudokuContext);

export function useSudokuContext() {
  return useContext(SudokuContext);
}

export function SudokuProvider({ children }: SudokuProviderProps) {
  const [errors, setErrors] = useState<number>(0);

  const opacity = useRef(0);
  const check = useRef(false);
  const currentBoard = useRef([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

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

  const NEW_BOARD = useRef([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

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

  const numArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function getErrors() {
    return errors;
  }

  function getOpacity() {
    return opacity.current;
  }

  function updateOpacity(decimal: number) {
    opacity.current += decimal;
  }

  function getCheck() {
    return check.current;
  }

  function updateCheck() {
    check.current = true;
  }

  function updateErrors() {
    setErrors((errors) => (errors += 1));
  }

  function getNewBoard() {
    return NEW_BOARD.current;
  }

  function getGameBoard() {
    return GAME_BOARD;
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

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (puzzleArray[rowStart + i][colStart + j] === num) {
          return false;
        }
      }
    }
    return true;
  }

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

  function setDifficultyAndUpdate(difficulty: string): void {
    fillBoard(NEW_BOARD.current);
    // GAME_BOARD = NEW_BOARD.map((row) => [...row]); // deep copy
    makeHoles(GAME_BOARD, difficulty);
    updateCurrentBoard(GAME_BOARD);
  }

  function updateCurrentBoard(newBoard: number[][]) {
    currentBoard.current = newBoard;
  }

  function getCurrentBoard(): number[][] {
    return currentBoard.current;
  }

  function updateNewBoard(board: number[][]): void {
    NEW_BOARD.current = board;
  }

  return (
    <SudokuContext.Provider
      value={{
        getErrors,
        updateErrors,
        getCheck,
        updateCheck,
        updateCurrentBoard,
        getCurrentBoard,
        rowSafe,
        colSafe,
        regionSafe,
        safeToPlace,
        nextEmptyCell,
        shuffle,
        fillBoard,
        makeHoles,
        getDifficulty,
        getNewBoard,
        getGameBoard,
        setDifficultyAndUpdate,
        updateNewBoard,
        getOpacity,
        updateOpacity,
      }}
    >
      {children}
    </SudokuContext.Provider>
  );
}
