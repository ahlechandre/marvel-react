import React from 'react'

const LoadMoreButton = ({ onClick, disabled }) => {
  return (
    <div>
      <button onClick={onClick} disabled={disabled}>Load more</button>
    </div>
  )
}

export default LoadMoreButton
