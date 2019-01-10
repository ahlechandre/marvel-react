import { connect } from 'react-redux'
import Characters from '../components/Characters'
import { fetchEntityResources, searchEntityResources } from '../actions'

const mapStateToProps = (state, ownProps) => {
  const initialProps = {
    isFetching: false,
    characters: [],
    attributionText: null,
    term: (new URLSearchParams(ownProps.location.search)).get('q') || '',
    isSearching: false
  }

  if (!state.resourcesByEntity.characters) {
    return initialProps
  }
  const {
    items,
    isFetching,
    attributionText
  } = state.resourcesByEntity.characters
  const { isSearching } = state.resourcesByEntity.characters.searches
  const mapItemToCharacter = item => state.entities.characters[item]

  return {
    ...initialProps,
    characters: items.map(mapItemToCharacter),
    attributionText,
    isFetching,
    isSearching,
    charactersFromSearch: state.resourcesByEntity
      .characters
      .searches
      .items
      .map(mapItemToCharacter)
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCharacters: () => dispatch(fetchEntityResources('characters')),
  fetchCharactersNextPage: () => dispatch(fetchEntityResources('characters', true)),
  searchCharacters: term => dispatch(searchEntityResources({
    entity: 'characters',
    searchFor: 'name',
    term
  })),
  searchCharactersNextPage: term => dispatch(searchEntityResources({
    entity: 'characters',
    searchFor: 'name',
    term,
    nextPage: true
  }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Characters)
