import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";

import { SearchComponent } from "../components/SearchComponent";

afterEach(cleanup);

describe("<SearchComponent/>", () => {
  function renderSearchComponent() {
    return render(<SearchComponent />);
  }
  test("matches snapshot", () => {
    const { asFragment } = renderSearchComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  test("should display a blank search bar input field by default", async () => {
    const { findByTestId } = renderSearchComponent();
    const searchFormInput = (await findByTestId(
      "searchTerm"
    )) as HTMLInputElement;

    expect(searchFormInput.value).toBe("");
  });

  test("should allow entering a search term", async () => {
    const { findByTestId } = renderSearchComponent();
    const searchTerm = (await findByTestId("searchTerm")) as HTMLInputElement;

    fireEvent.change(searchTerm, { target: { value: "Gotham" } });
    expect(searchTerm.value).toBe("Gotham");
  });
});

describe("<SearchComponent/>", () => {
  function renderSearchComponent(movieStore: any) {
    return render(<SearchComponent movieStore={movieStore} />);
  }
  test("should submit the form with the search term", async () => {
    const getMovies = jest.fn();
    const { findByTestId } = renderSearchComponent({ getMovies });

    const searchTerm = (await findByTestId("searchTerm")) as HTMLInputElement;
    const submit = await findByTestId("submit");

    fireEvent.change(searchTerm, { target: { value: "Power" } });
    fireEvent.click(submit);
    expect(getMovies).toHaveBeenCalledWith("Power");
  });
});
