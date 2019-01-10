import {
  REQUEST_ENTITY,
  RECEIVE_ENTITY_RESOURCE,
  RECEIVE_ENTITY_RESOURCES,
  RECEIVE_ENTITY_SEARCH,
  REQUEST_ENTITY_SEARCH
} from './constants'
import { entitiesUrl, entityUrl } from './services/api/marvel'

/**
 * 
 * @param {string} entity 
 */
const requestEntity = entity => ({
  type: REQUEST_ENTITY,
  entity
})

/**
 * 
 * @param {string} entity 
 */
const requestEntitySearch = (entity, isValidSearch) => ({
  type: REQUEST_ENTITY_SEARCH,
  isValidSearch,
  entity
})

/**
 * 
 * @param {string} entity 
 * @param {Object} json 
 */
const receiveEntityResource = (entity, json) => ({
  type: RECEIVE_ENTITY_RESOURCE,
  entity,
  attributionText: json.attributionText,
  resource: json.data.results[0] || null
})

/**
 * 
 * @param {string} entity 
 * @param {Object} json 
 */
const receiveEntityResources = (entity, json) => ({
  type: RECEIVE_ENTITY_RESOURCES,
  entity,
  attributionText: json.attributionText,
  resources: json.data.results,
  pagination: {
    offset: json.data.offset,
    limit: json.data.limit,
    total: json.data.total,
  }
})

/**
 * 
 * @param {string} entity 
 * @param {Object} json 
 */
const receiveEntitySearch = (entity, json) => ({
  type: RECEIVE_ENTITY_SEARCH,
  entity,
  attributionText: json.attributionText,
  resources: json.data.results,
  pagination: {
    offset: json.data.offset,
    limit: json.data.limit,
    total: json.data.total,
  }
})

/**
 * 
 * @param {Object} state 
 * @param {string} entity 
 */
const shouldFetchEntityResources = (state, entity) => {
  const resources = state.resourcesByEntity[entity]
  
  return (
    !resources ||
    !resources.isFetching ||
    !resources.items.length ||
    resources.items.length < resources.pagination.limit
  )
}

/**
 * 
 * @param {Object} state 
 * @param {string} entity 
 */
const shouldFetchEntityResource = (state, entity, id) => (
  !state.entities[entity] ||
  !state.resourcesByEntity[entity].isFetching ||
  !state.entities[entity][id]
)

/**
 * 
 * @param {string} entity 
 * @param {boolean} nextPage 
 */
export const fetchEntityResources = (entity, nextPage = false) => {
  return (dispatch, getState) => {
    /** Starts the fetching process. */
    if (nextPage || shouldFetchEntityResources(getState(), entity)) {
      dispatch(requestEntity(entity))
      const { limit, offset } = getState().resourcesByEntity[entity].pagination
      const nextOffset = nextPage ? limit + offset : offset
      const endpoint = entitiesUrl(entity, limit, nextOffset)

      /** Sends the HTTP request to Marvel's API. */
      return fetch(endpoint)
        .then(response => response.json(), error => console.error(error))
        .then(json => dispatch(receiveEntityResources(entity, json)))
    }

    /** Tells the calling code that there's nothing to wait for. */
    return Promise.resolve()
  }
}

/**
 * 
 * @param {string} entity 
 * @param {string|number} id 
 */
export const fetchEntityResource = (entity, id) => {
  return (dispatch, getState) => {
    if (shouldFetchEntityResource(getState(), entity, id)) {
      /** Starts the fetching process. */
      dispatch(requestEntity(entity))
      const endpoint = entityUrl(entity, id)

      /** Sends the HTTP request to Marvel's API. */
      return fetch(endpoint)
        .then(response => response.json(), error => console.error(error))
        .then(json => dispatch(receiveEntityResource(entity, json)))
    }

    /** Tells the calling code that there's nothing to wait for. */
    return Promise.resolve()
  }
}

/**
 * 
 * @param {string} entity 
 * @param {boolean} nextPage 
 */
export const searchEntityResources = options => {
  return (dispatch, getState) => {
    const {
      entity,
      term,
      nextPage,
      searchFor
    } = options
    const isValidSearch = !!term.trim().length
    dispatch(requestEntitySearch(entity, isValidSearch))

    /** Starts the fetching process. */
    if (isValidSearch) {
      const { limit, offset } = getState().resourcesByEntity[entity].pagination
      const nextOffset = nextPage ? limit + offset : offset
      const endpointUrl = new URL(entitiesUrl(entity, limit, nextOffset))
      endpointUrl.searchParams.append(searchFor, term)
      const endpoint = endpointUrl.toString()

      /** Sends the HTTP request to Marvel's API. */
      return fetch(endpoint)
        .then(response => response.json(), error => console.error(error))
        .then(json => dispatch(receiveEntitySearch(entity, json)))
    }

    /** Tells the calling code that there's nothing to wait for. */
    return Promise.resolve()
  }
}