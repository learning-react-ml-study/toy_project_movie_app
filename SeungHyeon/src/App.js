import React, { Component } from "react";
import "./App.css";
import Movie from "./Movie";
import styled from 'styled-components';

//styled component 실습
const ThemeBtn = styled.button`
  background-color:white;
  border-radius:4px;
  border: 1px solid #34495e;
  padiing: 5px;
  margin: 5px;

  :hover{
    background-color: #34495e;
    color:white;
  }
`;

function pageControl(plusOrMinus){
  return function calculate(state){
    if(state.page === 1 && plusOrMinus === -1){
      return { page: 1 };
    }
    else return {
      page: state.page + plusOrMinus
    };
}
}

class App extends Component {

  state = {
    page: 1
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
    const api = `https://yts.am/api/v2/list_movies.json?sort_by=download_count&page=${this.state.page}`;
    return fetch(api)
      .then(potato => potato.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err));
  };

    Increase = () => {
      this.setState(pageControl(1), this._getMovies);
    }

    Decrease = () => {
      this.setState(pageControl(-1), this._getMovies);
    }

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies? this._renderMovies() : "Loading"}
        <div>
        <ThemeBtn onClick={this.Decrease}>Previous Page</ThemeBtn>
        <span>{this.state.page} page</span>
        <ThemeBtn onClick={this.Increase}>Next Page</ThemeBtn>
      </div>
      </div>
    );
      
  }
}

export default App;
