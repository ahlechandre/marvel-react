import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ComicsList from './ComicsList'
import MarvelFooter from './MarvelFooter'

export default class Comics extends Component {
  componentDidMount() {
    this.props.fetchComics()
  }

  render() {
    return (
      <div>
        <h3>
          <Link to='/'>MarvelReact</Link>
        </h3>
        <h1>Comics</h1>

        <ComicsList
          comics={this.props.comics}
          onLoadMore={() => this.props.fetchComicsNextPage()}
          isFetching={this.props.isFetching}
        />
        
        <MarvelFooter attributionText={this.props.attributionText} />  
      </div>
    )
  }
}
