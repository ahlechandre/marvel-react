import { connect } from 'react-redux'
import Characters from '../components/Characters'
import { fetchEntityResources, searchEntityResources } from '../../../actions'
import { ENTITIES } from '../../../constants'

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
  fetchCharacters: () => dispatch(fetchEntityResources({
    entity: ENTITIES.CHARACTERS
  })),
  fetchCharactersNextPage: () => dispatch(fetchEntityResources({
    entity: ENTITIES.CHARACTERS,
    nextPage: true
  })),
  searchCharacters: term => dispatch(searchEntityResources({
    entity: ENTITIES.CHARACTERS,
    searchFor: 'name',
    term
  }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Characters)
