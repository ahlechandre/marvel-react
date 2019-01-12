import React from 'react'
import { Link } from 'react-router-dom'
import LoadMoreButton from '../../system/components/LoadMoreButton'

const CharactersList = ({ characters, onLoadMore, isFetching }) => {
  const mapCharacterToLink = (character, index) => (
    <li key={index}>
      <Link to={`/characters/${character.id}`}>{character.name}</Link>
    </li>
  )

  return (
    <div>
      <ul>
        {characters.map(mapCharacterToLink)}
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

export default CharactersList
