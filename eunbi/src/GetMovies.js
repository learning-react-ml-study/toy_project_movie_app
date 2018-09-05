import React, { Component } from "react";
import Movie from "./Movie";
import PropTypes from "prop-types"; 

class GetMovies extends Component {
    
    state = {
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
        const {page, search} = this.props;
        let url = `https://yts.am/api/v2/list_movies.json?sort_by=download_count&limit=10&page=${page}`;
        url += (search? `&query_term=${""}`:"");
        return fetch(
            url
        )
        .then(potato => potato.json())
        .then(json => json.data.movies)
        .catch(err => console.log(err));
    };
    
    render() {
        const {movies} = this.state;
        return (
            <div className={movies ? "App" : "App--loading"}>
            {movies ? this._renderMovies() : "Loading"}
        </div>
      );
    }
}

GetMovies.PropTypes = {
    page : PropTypes.number.isRequired
}

export default GetMovies;