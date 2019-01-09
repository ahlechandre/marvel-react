import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MarvelFooter from './MarvelFooter'

export default class Character extends Component {
  componentDidMount() {
    this.props.fetchCharacter()
  }

  render() {
    const { character } = this.props

    return (
      <div>
        <h3>
          <Link to='/'>MarvelReact</Link> / <Link to='/characters'>Characters</Link>
        </h3>

        <h1>{character ? character.name : 'Loading...'}</h1>

        <MarvelFooter attributionText={this.props.attributionText} />
      </div>
    )
  }
}
