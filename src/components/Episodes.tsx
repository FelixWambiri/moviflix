import React from "react";

/** CSS **/
import "./Episodes.scss";

/** Third Party Libraries**/
import { inject, observer } from "mobx-react";

/** Components **/
import Episode from "./Episode";

/** Model Typings **/
import { Movie } from "../api/moviesApi";

const Episodes: React.FC = (props: any): JSX.Element => {
  const { movieStore } = props;
  return (
    <div className="episodes-container">
      {movieStore.ifMoviesFound ? (
        movieStore.movies.map((movie: Movie) => {
          return <Episode key={movie.show.id} movie={movie} />;
        })
      ) : movieStore.errors ? (
        <p>Something went wrong</p>
      ) : (
        <div>Type name of series in the Search Bar and Enter</div>
      )}
    </div>
  );
};

export default inject("movieStore")(observer(Episodes));
