import { combineReducers } from 'redux'
import {
  REQUEST_ENTITY,
  RECEIVE_ENTITY_RESOURCE,
  RECEIVE_ENTITY_RESOURCES,
  RECEIVE_ENTITY_SEARCH,
  REQUEST_ENTITY_SEARCH
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
    case RECEIVE_ENTITY_SEARCH:
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
  searches: {
    isSearching: false,
    items: [],
    pagination: {
      offset: 0,
      limit: 20,
    },
  }
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
    case REQUEST_ENTITY_SEARCH:
      return {
        ...state,
        isFetching: action.isValidSearch,
        searches: {
          ...resourceShape.searches,
          isSearching: action.isValidSearch
        }
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
    case RECEIVE_ENTITY_SEARCH:
      return {
        ...state,
        isFetching: false,
        attributionText: action.attributionText,
        searches: {
          ...state.searches,
          isSearching: true,
          items: action.resources.map(item => item.id),
          pagination: action.pagination
        }
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
    case REQUEST_ENTITY_SEARCH:
    case RECEIVE_ENTITY_RESOURCE:
    case RECEIVE_ENTITY_RESOURCES:
    case RECEIVE_ENTITY_SEARCH:
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
