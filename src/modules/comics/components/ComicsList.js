import React from 'react'
import { Link } from 'react-router-dom'
import LoadMoreButton from '../../system/components/LoadMoreButton'

const ComicsList = ({ comics, onLoadMore, isFetching }) => {
  const mapComicToLink = (comic, index) => (
    <li key={index}>
      <Link to={`/comics/${comic.id}`}>{comic.title}</Link>
    </li>
  )

  return (
    <div>
      <ul>
        {comics.map(mapComicToLink)}
      </ul>
      {
        isFetching ? (
          <h3>Loading...</h3>
        ) : null
      }
      {
        onLoadMore ?
          <LoadMoreButton
            onClick={onLoadMore}
            disabled={isFetching}
          /> : null
      }
    </div>
  )
}

export default ComicsList
