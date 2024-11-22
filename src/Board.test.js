import React from "react";
import Board from "./Board";
import { render, fireEvent } from "@testing-library/react";

describe("Component: <Board />", () => {
  it("smoke test: renders without crashing", () => {
    render(<Board />);
  });

  it("snapshot: matches the snapshot of a full board", () => {
    const { asFragment } = render(
      <Board alwaysWinnable={false} chanceLightStartsOn={1} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("snapshot: matches the snapshot of a full board", () => {
    const { asFragment } = render(
      <Board alwaysWinnable={false} chanceLightStartsOn={0} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows that it wins", () => {
    const { getByText } = render(
      <Board alwaysWinnable={false} chanceLightStartsOn={0} />
    );
    expect(getByText("You Won!!")).toBeInTheDocument();
  });

  it("should have the correct class on each cell - all lit", () => {
    const { container } = render(
      <Board alwaysWinnable={false} chanceLightStartsOn={1} />
    );
    const cells = container.querySelectorAll("td");
    const litCells = Array.from(cells).filter((cell) =>
      cell.classList.contains("Cell-lit")
    );
    expect(litCells.length).toEqual(25);
  });
  it("should have the correct class on each cell- all unlit", () => {
    const { container } = render(
      <Board alwaysWinnable={false} chanceLightStartsOn={0} />
    );
    const cells = container.querySelectorAll("td");
    cells.forEach((cell) => {
      expect(cell).not.toHaveClass("Cell Cell-lit");
    });
    const litCells = Array.from(cells).filter((cell) =>
      cell.classList.contains("Cell-lit")
    );
    expect(litCells.length).toEqual(0);
  });

  it("flips the correct cells when clicked", () => {
    const { container } = render(
      <Board
        alwaysWinnable={false}
        chanceLightStartsOn={1}
        ncols={3}
        nrows={3}
      />
    );
    const cells = container.querySelectorAll("td");
    // click the middle cell
    fireEvent.click(cells[4]);

    // check for the correct number of lit and unlit cells
    const litCells = Array.from(cells).filter((cell) =>
      cell.classList.contains("Cell-lit")
    );
    expect(litCells.length).toEqual(4);
    const unlitCells = Array.from(cells).filter(
      (cell) => !cell.classList.contains("Cell-lit")
    );
    expect(litCells.length).toEqual(4);
    expect(unlitCells.length).toEqual(5);

    // check individual cell
    expect(cells[0]).toHaveClass("Cell Cell-lit");
    expect(cells[1]).toHaveClass("Cell");
    expect(cells[2]).toHaveClass("Cell Cell-lit");
    expect(cells[3]).toHaveClass("Cell");
    expect(cells[4]).toHaveClass("Cell");
    expect(cells[5]).toHaveClass("Cell");
    expect(cells[6]).toHaveClass("Cell Cell-lit");
    expect(cells[7]).toHaveClass("Cell");
    expect(cells[8]).toHaveClass("Cell Cell-lit");
  });
});
