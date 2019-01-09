import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>
        MarvelReact
      </h1>

      <ul>
        <li>
          <Link to='/characters'>Characters</Link>
        </li>
        <li>
          <Link to='/comics'>Comics</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
