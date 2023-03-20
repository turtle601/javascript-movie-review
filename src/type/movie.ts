type MovieApiType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type MovieListApiType = {
  page: number;
  results: MovieApiType[];
  total_pages: number;
  total_results: number;
};

type MovieType = {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
};

export type MovieListType = MovieType[];

export default MovieListApiType;
