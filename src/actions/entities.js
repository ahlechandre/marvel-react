import {
  REQUEST_ENTITY,
  RECEIVE_ENTITY_RESOURCE,
  RECEIVE_ENTITY_RESOURCES
} from '../constants'
import { entityUrl, entitiesUrl } from '../services/api/marvel'

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
 * @param {Object} state 
 * @param {string} entity 
 */
const shouldFetchEntityResources = (state, entity) => {
  const resources = state.resourcesByEntity[entity]
  
  return !resources || (
    !resources.isFetching &&
    !resources.isSearching &&
    !resources.items.length
  )
}

/**
 * 
 * @param {Object} state 
 * @param {string} entity 
 * @param {number} id 
 */
const shouldFetchEntityResource = (state, entity, id) => (
  !state.entities[entity] ||
  !state.resourcesByEntity[entity].isFetching ||
  !state.entities[entity][id]
)

const fetchEntityResourcesOptions = {
  entity: '',
  nextPage: false
}

/**
 * 
 * @param {Object} options 
 */
export const fetchEntityResources = (options = fetchEntityResourcesOptions) => {
  return (dispatch, getState) => {
    const { entity, nextPage } = options

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

const fetchEntityResourceOptions = {
  entity: '',
  id: null
}

/**
 * 
 * @param {Object} options 
 */
export const fetchEntityResource = (options = fetchEntityResourceOptions) => {
  return (dispatch, getState) => {
    const { entity, id } = options

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
