import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const Home = () => {
  return (
    <div>
      <Logo />

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
