import React from 'react'
import PropTypes from 'prop-types'

function Search({ inputValue, _handleChange, _handleClick }) {
  return (
    <div className="Search">
      <input className="Search__input" name="inputValue" value={inputValue} onChange={_handleChange} />
      <button className="Search__btn" onClick={_handleClick}>
        검색
      </button>
    </div>
  )
}

export default Search
