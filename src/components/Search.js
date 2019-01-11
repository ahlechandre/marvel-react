import React from 'react'

const Search = ({ term, onSearch, resultsCount, delay = 500, isFetching }) => {
  const debounce = delay => {
    let timer

    return event => {
      const liveTerm = event.target.value.trim()
      clearTimeout(timer)
      timer = setTimeout(() => {
        onSearch(liveTerm)
      }, delay)
    }
  }

  return (
    <div>
      <input
        type='search'
        name='q'
        placeholder='Search'
        defaultValue={term}
        onChange={debounce(delay)}
      />
      {
        !isFetching && term ? (
          <p>{resultsCount} results for "{term}"</p>
        ) : null
      }
    </div>
  )
}

export default Search
