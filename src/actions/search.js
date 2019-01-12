import {
  END_ENTITY_SEARCH,
  REQUEST_ENTITY_SEARCH,
  RECEIVE_ENTITY_SEARCH,
} from '../constants'
import { entitiesUrl } from '../services/api/marvel'

/**
 * 
 * @param {string} entity 
 */
const requestEntitySearch = (entity, term) => ({
  type: REQUEST_ENTITY_SEARCH,
  entity,
  term
})

/**
 * 
 * @param {string} entity 
 */
const endEntitySearch = entity => ({
  type: END_ENTITY_SEARCH,
  entity
})

/**
 * 
 * @param {string} entity 
 * @param {Object} json 
 */
const receiveEntitySearch = (entity, term, json) => ({
  type: RECEIVE_ENTITY_SEARCH,
  entity,
  term,
  attributionText: json.attributionText,
  resources: json.data.results,
  pagination: {
    offset: json.data.offset,
    limit: json.data.limit,
    total: json.data.total,
  }
})

const searchEntityResourcesOptions = {
  term: '',
  entity: '',
  searchFor: '',
  nextPage: false
}

/**
 * 
 * @param {Object} options 
 */
export const searchEntityResources = (options = searchEntityResourcesOptions) => {
  return (dispatch, getState) => {
    const { term, entity, nextPage, searchFor } = options
    const resources = getState().resourcesByEntity[entity]
    // Should end a search if the term was cleared.
    const shouldEnd = resources && resources.isSearching && !term.length

    if (shouldEnd) {
      dispatch(endEntitySearch(entity))

      // Tells the calling code that there's nothing to wait for.
      return Promise.resolve()
    }
    // Should ignore a search if the term is empty or 
    // it's already fetching or
    // term is the same from previous search.
    const shouldIgnore = !term.length || (resources && (
      resources.isFetching ||
      (term === resources.search.term)
    ))

    if (shouldIgnore) {
      // Does nothing.
      return Promise.resolve()
    }

    // Starts the fetching process.
    dispatch(requestEntitySearch(entity, term))
    const { limit, offset } = getState().resourcesByEntity[entity].search.pagination
    // Calculates the range of items to fetch.
    const nextOffset = nextPage ? limit + offset : offset
    const endpointUrl = new URL(entitiesUrl(entity, limit, nextOffset))
    endpointUrl.searchParams.append(searchFor, term)
    const endpoint = endpointUrl.toString()

    // Sends the HTTP request to Marvel's API.
    return fetch(endpoint)
      .then(response => response.json(), error => console.error(error))
      .then(json => dispatch(receiveEntitySearch(entity, term, json)))
  }
}
