import { combineReducers } from 'redux'
import entities from './entities'
import resourcesByEntity from './resourcesByEntity'

export default combineReducers({
  entities,
  resourcesByEntity
})
