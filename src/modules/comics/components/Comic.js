import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MarvelFooter from '../../system/components/MarvelFooter'

export default class Comic extends Component {
  componentDidMount() {
    this.props.fetchComic()
  }

  render() {
    const { comic } = this.props

    return (
      <div>
        <h3>
          <Link to='/'>MarvelReact</Link> / <Link to='/comics'>Comics</Link>
        </h3>

        <h1>{comic ? comic.title : 'Loading...'}</h1>

        <MarvelFooter attributionText={this.props.attributionText} />
      </div>
    )
  }
}
