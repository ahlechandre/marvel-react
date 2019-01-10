import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CharactersList from './CharactersList'
import MarvelFooter from './MarvelFooter'
import Search from './Search'

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

    if (term.length) {
      searchCharacters(term)
      return
    }
    fetchCharacters()
  }

  onSearch(term) {
    const { push } = this.props.history
    const updateCharacters = () => {
      const {
        fetchCharacters,
        searchCharacters
      } = this.props
      searchCharacters(term)
      fetchCharacters()
    }

    if (term.length) {
      push({
        search: `?${
          (new URLSearchParams({ q: term })).toString()
        }`
      })
      updateCharacters()

      return
    }
    push({
      search: ''
    })
    updateCharacters()
  }

  render() {
    const {
      term,
      isSearching,
      isFetching,
      characters,
      charactersFromSearch,
      fetchCharactersNextPage,
      searchCharactersNextPage,
    } = this.props
    const charactersToRender = isSearching ? charactersFromSearch : characters
    const onLoadMoreCharacters = () => (
      isSearching ? searchCharactersNextPage(term) : fetchCharactersNextPage()
    )

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
          resultsCount={isSearching ? charactersToRender.length : null}
        />
        <CharactersList
          characters={charactersToRender}
          isFetching={isFetching}
          onLoadMore={onLoadMoreCharacters}
        />

        <MarvelFooter attributionText={this.props.attributionText} />
      </div>
    )
  }
}
