import { combineReducers } from 'redux'
import {
  REQUEST_ENTITY,
  RECEIVE_ENTITY_RESOURCE,
  RECEIVE_ENTITY_RESOURCES
} from './constants'
/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 */
const entities = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ENTITY_RESOURCE:
      return {
        ...state,
        [action.entity]: {
          ...state[action.entity],
          [action.resource.id]: action.resource
        }
      }
    case RECEIVE_ENTITY_RESOURCES:
      const reduceResources = (resources, resource) => ({
        ...resources,
        [resource.id]: resource
      })
      const nextResources = action.resources.reduce(reduceResources, {})

      return {
        ...state,
        [action.entity]: {
          ...state[action.entity],
          ...nextResources
        }
      }
    default:
      return state
  }
}
const resourceShape = {
  isFetching: false,
  items: [],
  pagination: {
    offset: 0,
    limit: 20,
  },
}
/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 */
const resource = (state = resourceShape, action) => {
  switch(action.type) {
    case REQUEST_ENTITY:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_ENTITY_RESOURCE:
      return {
        ...state,
        attributionText: action.attributionText,
        isFetching: false
      }
    case RECEIVE_ENTITY_RESOURCES:
      return {
        ...state,
        isFetching: false,
        attributionText: action.attributionText,
        items: [
          ...state.items,
          ...action.resources
            .map(resource => resource.id)
            .filter(id => !state.items.includes(id))
        ],
        pagination: action.pagination
      }
    default:
      return state
  }
}
/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 */
const resourcesByEntity = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_ENTITY:
    case RECEIVE_ENTITY_RESOURCE:
    case RECEIVE_ENTITY_RESOURCES:
      return {
        ...state,
        [action.entity]: resource(state[action.entity], action)
      }
    default:
      return state 
  }
}

export default combineReducers({
  entities,
  resourcesByEntity
})
