import React from "react";
import Cell from "./Cell";
import { render, cleanup } from "@testing-library/react";

describe("Component: <Cell />", () => {
  let container;
  beforeEach(() => {
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    const tr = document.createElement("tr");
    table.appendChild(tbody);
    tbody.appendChild(tr);
    container = tr;
    document.body.appendChild(table);
  });
  afterEach(() => {
    cleanup();
    container = null;
  });
  it("smoke test: renders without crashing", () => {
    render(<Cell />, { container });
  });

  it("matches snapshot: isLit=false", () => {
    const { asFragment } = render(<Cell isLit={false} />, { container });
    expect(asFragment()).toMatchSnapshot();
  });
  it("matches snapshot: isLit=true", () => {
    const { asFragment } = render(<Cell isLit />, { container });
    expect(asFragment()).toMatchSnapshot();
  });
});
