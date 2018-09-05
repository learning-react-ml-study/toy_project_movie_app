import React, { Component, Fragment } from "react";
import GetMovies from "./GetMovies";

class Movies extends Component {
  state = {
    page : 1,
    countPage : 10
  }

  _pagination = (page,countPage) => {
    let startPage = ((page-1)/countPage)*countPage + 1;
    let endPage = startPage + countPage - 1;
  
    let pageList = undefined;
    
    for(let i = 1 ; i < 10 ; i++){
      pageList += <button onClick={this._changePage(i)}>i</button>;
    }
  
    return pageList;
  }

  _changePage = (page)=>{
    this.setState({page});
  }

  render() {
    const {page, countPage} = this.state;
    return (
        <Fragment>
          <GetMovies page={page}/>
          <div>
          {this._pagination(page,countPage)}
          </div>
        </Fragment>
    );
  }
}

export default Movies;