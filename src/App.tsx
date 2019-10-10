import React, { Component } from "react";
import "./App.scss";

/** Third party libraries**/
import { Provider } from "mobx-react";

/** Componets **/
import Header from "./components/Header";
import Episodes from "./components/Episodes";

/**Utility Fucntion **/
import { setUpMovieStore } from "./api/setup";
interface Props {}
interface State {
  movieStore: any;
}

export default class App extends Component<Props, State> {
  state = {
    movieStore: null
  };

  componentDidMount = (): void => {
    const { movieStore } = setUpMovieStore();
    this.setState({ movieStore });
  };
  render() {
    const { movieStore } = this.state;
    if (!movieStore) return null;

    return (
      <Provider movieStore={movieStore}>
        <div className="App">
          <Header />
          <Episodes />
        </div>
      </Provider>
    );
  }
}
