import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'

const logger = createLogger({
  collapsed: true,
  timestamp: false
})

export default createStore(reducer, applyMiddleware(
  thunk, logger
))
