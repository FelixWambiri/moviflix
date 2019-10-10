import React from "react";
import { render, cleanup } from "@testing-library/react";

import App from "../App";

afterEach(cleanup);

describe("<App/>", () => {
  function renderAppComponent() {
    return render(<App />);
  }
  test("should match snapshot", () => {
    const {asFragment} = renderAppComponent()
    expect(asFragment()).toMatchSnapshot()
  });
});
