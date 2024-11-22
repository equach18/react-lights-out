import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({
  nrows = 5,
  ncols = 5,
  alwaysWinnable,
  chanceLightStartsOn = 0.2,
}) {
  const [board, setBoard] = useState(() => createBoard());

  /** createBoard: create an initial board with the given props */
  function createBoard() {
    let initialBoard=[];
    // if alwaysWinnable, create an array-of-arrays of true values then randomly flip cells (~33% of total cells)
    if (alwaysWinnable) {
      initialBoard = Array.from({ length: nrows }).map(() =>
      Array.from({ length: ncols }, () => true)
      );
      const numFlips = Math.floor((nrows * ncols) / 3);
      for (let i = 0; i < numFlips; i++) {
        const randX = Math.floor(Math.random() * ncols);
        const randY = Math.floor(Math.random() * nrows);
        initialBoard = flipCellsAround(`${randY}-${randX}`, initialBoard);
      }
      // if alwaysWinnable is false, create array-of-arrays of true/false values based on chanceLightStartsOn
    } else {
      initialBoard = Array.from({ length: nrows }).map(() =>
        Array.from({ length: ncols }, () => Math.random() < chanceLightStartsOn)
      );
    }
    return initialBoard;
  }

  function hasWon() {
    // check the board in state to determine whether the player has won.
    return board.every((row) => row.every((cell) => !cell));
  }
  /**flipCellsAround: flips the cell and its adjacent cells on the board */
  function flipCellsAround(coord, board) {
    const [y, x] = coord.split("-").map(Number);

    const flipCell = (y, x, boardCopy) => {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        boardCopy[y][x] = !boardCopy[y][x];
      }
    };

    const boardCopy = board.map(row => [...row]);

    // flip the adjacent cells
    flipCell(y, x, boardCopy);
    flipCell(y - 1, x, boardCopy);
    flipCell(y + 1, x, boardCopy);
    flipCell(y, x + 1, boardCopy);
    flipCell(y, x - 1, boardCopy);

    // return the board
    return boardCopy;
  }

  /** updateBoard: updates the board by flipping the cells */
  function updateBoard(coord) {
    setBoard((oldBoard) => {
      // create a deep copy of the old board so that old board doesnt mutate
      return flipCellsAround(coord, oldBoard);
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div>You Won!!</div>;
  }

  // make table board
  const tableBoard = (
    <table>
      <tbody>
        {board.map((row, y) => (
          <tr key={y}>
            {row.map((cell, x) => {
              let coord = `${y}-${x}`;
              return (
                <Cell
                  key={coord}
                  isLit={cell}
                  flipCellsAroundMe={(e) => updateBoard(coord)}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return tableBoard;
}

export default Board;
