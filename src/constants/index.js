// All entities available for app.
export const ENTITIES = {
  CHARACTERS: 'characters',
  COMICS: 'comics'
}

// Action type of starting to fetch (HTTP request) an entity.
export const REQUEST_ENTITY = 'REQUEST_ENTITY'

// Action type of starting to fetch (HTTP request) an entity search.
export const REQUEST_ENTITY_SEARCH = 'REQUEST_ENTITY_SEARCH'

// Action type of ending a search process.
export const END_ENTITY_SEARCH = 'END_ENTITY_SEARCH'

// Action type of receiving entity multiple resources.
export const RECEIVE_ENTITY_RESOURCES = 'RECEIVE_ENTITY_RESOURCES'

// Action type of receiving entity single resource.
export const RECEIVE_ENTITY_RESOURCE = 'RECEIVE_ENTITY_RESOURCE'

// Action type of receiving an entity search.
export const RECEIVE_ENTITY_SEARCH = 'RECEIVE_ENTITY_SEARCH'
