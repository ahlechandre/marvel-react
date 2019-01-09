import { connect } from 'react-redux'
import Characters from '../components/Characters'
import { fetchEntityResources } from '../actions'

const mapStateToProps = state => {
  const initialProps = {
    isFetching: false,
    characters: [],
    attributionText: null
  }

  if (!state.resourcesByEntity.characters) {
    return initialProps
  }
  const {
    items,
    isFetching,
    attributionText
  } = state.resourcesByEntity.characters

  return {
    attributionText,
    isFetching,
    characters: items.map(item => state.entities.characters[item])
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCharacters: () => dispatch(fetchEntityResources('characters')),
  fetchCharactersNextPage: () => dispatch(fetchEntityResources('characters', true))
})

export default connect(mapStateToProps, mapDispatchToProps)(Characters)
