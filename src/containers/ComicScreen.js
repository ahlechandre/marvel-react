import { connect } from 'react-redux'
import Comic from '../components/Comic'
import { fetchEntityResource } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const initialProps = {
    id,
    comic: null,
    isFetching: false
  }

  if (!state.entities.comics) {
    return initialProps
  }
  const { isFetching, attributionText } = state.resourcesByEntity.comics

  return {
    ...initialProps,
    comic: state.entities.comics[id],
    isFetching,
    attributionText
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchComic: () => dispatch(
    fetchEntityResource('comics', ownProps.match.params.id)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(Comic)
