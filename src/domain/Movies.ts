import { makeParams, makeURL, getApiData } from '../utils/apiHelper';

import Observable from './Observable';
import MovieListApiType from '../type/movie';

class Movies extends Observable {
  private popularPage = 1;
  private searchPage = 1;
  private isSearched = false;
  private isEnd = false;
  private query = '';

  constructor() {
    super();

    this.setMovies();
  }

  getIsEnd() {
    return this.isEnd;
  }

  getTitle() {
    return this.isSearched
      ? `"${this.query}" 검색 결과`
      : '가장 인기 있는 영화';
  }

  getIsSearched() {
    return this.isSearched;
  }

  getQuery() {
    return this.query;
  }

  isEndOfPage(totalPage: number, page: number) {
    return totalPage === page;
  }

  async setMovies() {
    this.notify('loading');

    const popularMovies = await getApiData<MovieListApiType>(
      makeURL('movie/popular'),
      makeParams({ page: this.popularPage })
    );

    const refineMovies = popularMovies?.results.map(
      ({ id, poster_path, title, vote_average }) => {
        return { id, poster_path, title, vote_average };
      }
    );

    const totalPage = popularMovies?.total_pages;

    this.isEnd = this.isEndOfPage(totalPage, this.popularPage);
    this.popularPage += 1;
    this.isSearched = false;

    this.notify('movies', refineMovies);
  }

  async searchMovies(query: string) {
    this.notify('loading');

    if (this.query !== query) this.searchPage = 1;
    this.query = query;

    const searchMovies = await getApiData<MovieListApiType>(
      makeURL('search/movie'),
      makeParams({ query, page: this.searchPage })
    );

    const refineMovies = searchMovies?.results.map(
      ({ id, poster_path, title, vote_average }) => {
        return { id, poster_path, title, vote_average };
      }
    );

    const totalPage = searchMovies?.total_pages;
    if (!totalPage) return;
    this.isEnd = this.isEndOfPage(totalPage, this.searchPage);

    this.searchPage++;
    this.isSearched = true;
    this.notify('movies', refineMovies);
  }
}

const movies = new Movies();
export default movies;
