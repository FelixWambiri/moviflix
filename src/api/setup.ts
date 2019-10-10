import { MoviesModel } from "./moviesApi";

export const setUpMovieStore = () => {
  const movieStore = MoviesModel.create({
    movies: [],
    errors: "",
    isResponseBlank: ""
  });

  return { movieStore };
};
