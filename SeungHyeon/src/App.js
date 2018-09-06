import React, { Component } from "react";
import "./App.css";
import Movie from "./Movie";
import Category from './category';

class App extends Component {
  // Render: componentWillMount() -> render() -> componentDidMount()
  // Update componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  state = {
    value: ``

  };

  componentDidMount() {
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return (
        <Movie
          title={movie.title_english}
          poster={movie.large_cover_image}
          key={movie.id}
          genres={movie.genres}
          synopsis={movie.synopsis}
        />
      );
    });
    return movies;
  };

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies
    });
  };

  _callApi = () => {
    return fetch(
      "https://yts.am/api/v2/list_movies.json?sort_by=download_count"
    )
      .then(potato => potato.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err));
  };

  _SearchMovies = async () => {
    const movies = await this._SearchApi();
    this.setState({
      movies
    });
  }

  _SearchApi = () => {
    return fetch(
      `https://yts.am/api/v2/list_movies.json?sort_by=download_count&genre=${this.state.value}`)
      .then(potato => potato.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err));
  }

  _handleChange = (event) => {
    this.setState({value: event.target.value});
  }
  _handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    this._SearchMovies();
  }

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : "Loading"}
        <Category _handleChange={this._handleChange} value={this.state.value} _handleSubmit={this._handleSubmit} />
      </div>
    );
  }
}

export default App;
