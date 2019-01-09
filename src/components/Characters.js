import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CharactersList from './CharactersList'
import MarvelFooter from './MarvelFooter'

export default class Characters extends Component {
  componentDidMount() {
    this.props.fetchCharacters()
  }

  render() {
    return (
      <div>
        <h3>
          <Link to='/'>MarvelReact</Link>
        </h3>
        <h1>
          Characters
        </h1>

        <CharactersList
          characters={this.props.characters}
          isFetching={this.props.isFetching}
          onLoadMore={() => this.props.fetchCharactersNextPage()}
        />

        <MarvelFooter attributionText={this.props.attributionText} />
      </div>
    )
  }
}
