import {
  REQUEST_ENTITY,
  END_ENTITY_SEARCH,
  REQUEST_ENTITY_SEARCH,
  RECEIVE_ENTITY_SEARCH,
  RECEIVE_ENTITY_RESOURCE,
  RECEIVE_ENTITY_RESOURCES,
} from '../constants'

const resourcesInitialState = {
  isFetching: false,
  isSearching: false,
  attributionText: null,
  items: [],
  pagination: {
    offset: 0,
    limit: 20,
  },
  search: {
    term: '',
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
const resources = (state = resourcesInitialState, action) => {
  switch(action.type) {
    case REQUEST_ENTITY:
      return {
        ...state,
        isFetching: true
      }
    case REQUEST_ENTITY_SEARCH:
      return {
        ...state,
        isFetching: true,
        isSearching: true,
        search: {
          ...resourcesInitialState.search,
          term: action.term
        }
      }
    case END_ENTITY_SEARCH:
      return {
        ...state,
        isSearching: false,
        search: resourcesInitialState.search
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
        search: {
          ...state.search,
          items: action.resources.map(item => item.id),
          pagination: action.pagination,
          term: action.term
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
    case END_ENTITY_SEARCH:
    case RECEIVE_ENTITY_RESOURCE:
    case RECEIVE_ENTITY_RESOURCES:
    case RECEIVE_ENTITY_SEARCH:
      return {
        ...state,
        [action.entity]: resources(state[action.entity], action)
      }
    default:
      return state 
  }
}

export default resourcesByEntity
