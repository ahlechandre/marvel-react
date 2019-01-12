import {
  RECEIVE_ENTITY_SEARCH,
  RECEIVE_ENTITY_RESOURCE,
  RECEIVE_ENTITY_RESOURCES,
} from '../constants'

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

export default entities
