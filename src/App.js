import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomeScreen from './containers/HomeScreen'
import NotFoundScreen from './containers/NotFoundScreen'
import ComicsScreen from './containers/ComicsScreen'
import CharactersScreen from './containers/CharactersScreen'
import CharacterScreen from './containers/CharacterScreen'
import ComicScreen from './containers/ComicScreen'

const App = () => {
  const store = createStore(reducer, applyMiddleware(
    thunkMiddleware
  ))
  
  store.subscribe(() => console.log(store.getState()))
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App
