import React from 'react'

const Search = ({ term, onSearch, resultsCount }) => {
  return (
    <div>
      <input
        type='search'
        name='q'
        placeholder='Search'
        defaultValue={term}
        onKeyUp={event => onSearch(event.target.value.trim())}
      />
      {
        term ? (
          <p>{resultsCount} results for "{term}"</p>
        ) : null
      }
    </div>
  )
}

export default Search
