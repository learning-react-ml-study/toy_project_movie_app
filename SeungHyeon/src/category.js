import React, {Component} from 'react';


class Category extends Component{
    
    _ListingData = (target) => target.map( e => {
        <option value={e} />
    });

    render(){
        const {_handleSubmit, _handleChange} = this.props;
        const { value } = this.props;
        return(
           <div>
               <label>
                   선택할 장르를 입력하세요:
                   <input list="test" onchange={_handleChange}/>
                    <datalist id="test">
                        {/* <option value="A" />
                        <option value="B" />
                        <option value="C" /> */}
                        <option name="action" value="Action" />
                        <option name="adventure" value="Adventure" />
                        <option name="animation" value="Animation" />
                        <option name="biography" value="Biography" />
                        <option name="comedy" value="Comedy" />
                        <option name="crime" value="Crime" />
                        <option name="documentary" value="Documentary" />
                        <option name="drama" value="Drama" />
                        <option name="family" value="Family" />
                        <option name="fantasy" value="Fantasy" />
                        <option name="film+noir" value="Film Noir" /> 
                        <option name="history" value="History" />
                        <option name="horror" value="Horror" />
                        <option name="music" value="Music" />
                        <option name="musical" value="Musical" />
                        <option name="mystery" value="Mystery" />
                        <option name="romance" value="Romance" />
                        <option name="sci+fi" value="Sci-Fi" />
                        <option name="short" value="Short" />
                        <option name="sport" value="Sport" />
                        <option name="superhero" value="Superhero" />
                        <option name="thriller" value="Thriller" />
                        <option name="war" value="War" />
                        <option name="western" value="Western" />
                    </datalist>
               </label>
               <input type="submit" onclick={_handleSubmit}/>
            </div>
        );
    }
}

export default Category;