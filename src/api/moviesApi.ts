import { types, flow, Instance } from "mobx-state-tree";
import api, { AxiosResponse } from "axios";

const BASE_URL: string = "https://api.tvmaze.com/search/shows?q=";

const ExternalsModel = types.model({
  tvrage: types.maybeNull(types.number),
  thetvdb: types.maybeNull(types.number),
  imdb: types.maybeNull(types.string)
});

const ImageModel = types.model({
  medium: types.string,
  original: types.string
});

const CountrySubModel = types.model({
  code: types.string,
  name: types.string,
  timezone: types.string
});

const NetworkModel = types.model({
  id: types.number,
  name: types.string,
  country: CountrySubModel
});

const RatingsModel = types.model({
  average: types.maybeNull(types.number)
});

const ScheduleModel = types.model({
  time: types.string,
  days: types.array(types.string)
});

const LinkSubModel = types.model({
  href: types.string
});

const LinksModel = types.model({
  self: types.maybeNull(LinkSubModel),
  previousepisode: types.maybeNull(LinkSubModel)
});

const WebChannelModel = types.model({
  country: types.maybeNull(CountrySubModel),
  id: types.maybeNull(types.number),
  name: types.maybeNull(types.string)
});

const ShowModel = types.model({
  externals: ExternalsModel,
  genres: types.array(types.string),
  id: types.number,
  image: types.maybeNull(ImageModel),
  language: types.string,
  name: types.string,
  network: types.maybeNull(NetworkModel),
  officialSite: types.maybeNull(types.string),
  premiered: types.maybeNull(types.string),
  rating: RatingsModel,
  runtime: types.maybeNull(types.number),
  schedule: ScheduleModel,
  status: types.string,
  summary: types.maybeNull(types.string),
  type: types.string,
  updated: types.number,
  url: types.string,
  webChannel: types.maybeNull(WebChannelModel),
  weight: types.number,
  _links: types.maybeNull(LinksModel)
});

const MovieModel = types.model("MovieModel", {
  score: types.number,
  show: ShowModel
});

export const MoviesModel = types
  .model("Movies", {
    movies: types.optional(types.array(MovieModel), []),
    errors: types.string
  })
  .actions(self => {
    const getMovies = flow<
      Promise<AxiosResponse<{ data: { movies: any } }>>,
      [string]
    >(function* getMovies(searchParameters: string) {
      try {
        let response = yield api
          .get(`${BASE_URL}${searchParameters}`)
          .then(res => res.data);

        self.movies = response as any;
      } catch (error) {
        self.errors = "Something went wrong";
      }
    });

    return { getMovies };
  })
  .views(self => ({
    get ifMoviesFound() {
      return self.movies.length > 0 ? true : false;
    }
  }));

// Extract typescript typings from the models/nodes
export type Movies = Instance<typeof MoviesModel>;
export type Movie = Instance<typeof MovieModel>;
