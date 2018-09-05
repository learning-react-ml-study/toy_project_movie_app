import React, { Component } from 'react'
import './App.css'
import Movie from './Movie'
import Search from './Search'

class App extends Component {
  // Render: componentWillMount() -> render() -> componentDidMount()
  // Update componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  state = {
    isLoading: true,
    inputValue: 'r'
  }

  componentDidMount() {
    this._getMovies()
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
      )
    })
    return movies
  }

  _getMovies = async () => {
    const movies = await this._callApi()
    this.setState({
      movies,
      isLoading: !this.state.isLoading
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
      .then(potato => potato.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err))
  }

  _handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  _handleClick = e => {
    this._searchMovies()
  }

  _searchMovies = async () => {
    const { inputValue } = this.state
    const movies = await this._callSearchApi(inputValue)
    this.setState({
      movies
    })
  }

  _callSearchApi = value => {
    return fetch(`https://yts.am/api/v2/list_movies.json?query_term=${value}&sort_by=download_count`)
      .then(potato => potato.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err))
  }

  render() {
    const { movies, inputValue, isLoading } = this.state
    return isLoading ? (
      <div className="App--loading">...loading</div>
    ) : (
      <div className="wrapper">
        <Search inputValue={inputValue} _handleChange={this._handleChange} _handleClick={this._handleClick} />
        <div className="App">{movies ? this._renderMovies() : '영화가 없습니다.'}</div>
      </div>
    )
  }
}

export default App
