import { connect } from 'react-redux'
import Comics from '../components/Comics'
import { fetchEntityResources } from '../actions'

const mapStateToProps = state => {
  const initialProps = {
    isFetching: false,
    comics: [],
    attributionText: null
  }

  if (!state.resourcesByEntity.comics) {
    return initialProps
  }
  const {
    items,
    isFetching,
    attributionText
  } = state.resourcesByEntity.comics

  return {
    attributionText,
    isFetching,
    comics: items.map(item => state.entities.comics[item])
  }
}

const mapDispatchToProps = dispatch => ({
  fetchComics: () => dispatch(fetchEntityResources('comics')),
  fetchComicsNextPage: () => dispatch(fetchEntityResources('comics', true))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comics)
