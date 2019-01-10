import { connect } from 'react-redux'
import Characters from '../components/Characters'
import { fetchEntityResources, searchEntityResources } from '../actions'

const mapStateToProps = (state, ownProps) => {
  const initialProps = {
    isFetching: false,
    isSearching: false,
    characters: [],
    attributionText: null,
    term: (new URLSearchParams(ownProps.location.search)).get('q') || '',
  }

  if (!state.resourcesByEntity.characters) {
    return initialProps
  }
  const {
    items,
    isFetching,
    isSearching,
    attributionText,
    search
  } = state.resourcesByEntity.characters
  const mapItemToCharacter = item => state.entities.characters[item]

  return {
    ...initialProps,
    attributionText,
    isFetching,
    isSearching,
    characters: isSearching ?
      search.items.map(mapItemToCharacter) :
      items.map(mapItemToCharacter),
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Characters)
