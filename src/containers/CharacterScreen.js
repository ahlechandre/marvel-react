import { connect } from 'react-redux'
import Character from '../components/Character'
import { fetchEntityResource } from '../actions';
import { ENTITIES } from '../constants';

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const initialProps = {
    id,
    character: null,
    isFetching: false
  }

  if (!state.entities.characters) {
    return initialProps
  }
  const { isFetching, attributionText } = state.resourcesByEntity.characters

  return {
    ...initialProps,
    character: state.entities.characters[id],
    isFetching,
    attributionText
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCharacter: () => dispatch(
    fetchEntityResource({
      entity: ENTITIES.CHARACTERS,
      id: ownProps.match.params.id
    })
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(Character)
