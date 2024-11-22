import React from "react";
import App from "./App"
import {render} from "@testing-library/react"

describe("Component: <App />", () => {
    it("renders without crashing", () => {
        render(<App/>)
    })
})