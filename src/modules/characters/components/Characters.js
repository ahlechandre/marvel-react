import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CharactersList from './CharactersList'
import MarvelFooter from '../../system/components/MarvelFooter'
import Search from '../../system/components/Search'

export default class Characters extends Component {
  constructor(props) {
    super(props)
    
    this.onSearch = this.onSearch.bind(this)
  }

  componentDidMount() {
    const {
      fetchCharacters,
      searchCharacters,
      term
    } = this.props
    searchCharacters(term)
      .then(() => fetchCharacters())
  }

  onSearch(term) {
    const { push } = this.props.history
    const {
      fetchCharacters,
      searchCharacters
    } = this.props
    searchCharacters(term)
      .then(() => fetchCharacters())

    if (term.length) {
      push({
        search: `?${
          (new URLSearchParams({ q: term })).toString()
        }`
      })

      return
    }
    push({
      search: ''
    })
  }

  render() {
    const {
      term,
      isFetching,
      isSearching,
      characters,
      fetchCharactersNextPage,
      attributionText
    } = this.props

    return (
      <div>
        <h3>
          <Link to='/'>MarvelReact</Link>
        </h3>
        <h1>
          Characters
        </h1>
        <Search
          onSearch={this.onSearch}
          term={term}
          isFetching={isFetching}
          resultsCount={isSearching ? characters.length : 0}
        />
        <CharactersList
          characters={characters}
          isFetching={isFetching}
          onLoadMore={isSearching ? null : () => fetchCharactersNextPage()}
        />

        <MarvelFooter attributionText={attributionText} />
      </div>
    )
  }
}
