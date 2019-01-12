import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ComicsList from './ComicsList'
import MarvelFooter from '../../system/components/MarvelFooter'
import Search from '../../system/components/Search'

export default class Comics extends Component {
  constructor(props) {
    super(props)

    this.onSearch = this.onSearch.bind(this)
  }
  
  componentDidMount() {
    const { term, fetchComics, searchComics } = this.props
    searchComics(term)
      .then(() => fetchComics())
  }

  onSearch(term) {
    const { push } = this.props.history
    const { fetchComics, searchComics } = this.props
    searchComics(term)
      .then(() => fetchComics())

    if (term.length) {
      push({
        search: (new URLSearchParams({ q: term })).toString()
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
      comics,
      isFetching,
      isSearching,
      attributionText,
      fetchComicsNextPage,
    } = this.props

    return (
      <div>
        <h3>
          <Link to='/'>MarvelReact</Link>
        </h3>
        <h1>Comics</h1>
        <Search
          onSearch={this.onSearch}
          term={term}
          isFetching={isFetching}
          resultsCount={isSearching ? comics.length : 0}
        />
        <ComicsList
          comics={comics}
          isFetching={isFetching}
          onLoadMore={isSearching ? null : () => fetchComicsNextPage()}
        />

        <MarvelFooter attributionText={attributionText} /> 
      </div>
    )
  }
}
