import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomeScreen, NotFoundScreen } from '../modules/system/containers'
import { CharactersScreen, CharacterScreen } from '../modules/characters/containers'
import { ComicsScreen, ComicScreen } from '../modules/comics/containers'

const Navigation = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={HomeScreen} />
        <Route path='/characters' exact component={CharactersScreen} />
        <Route path='/characters/:id' exact component={CharacterScreen} />
        <Route path='/comics/:id' exact component={ComicScreen} />
        <Route path='/comics' exact component={ComicsScreen} />
        <Route component={NotFoundScreen} />
      </Switch>
    </Router>
  )
}

export default Navigation
