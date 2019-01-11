import { connect } from 'react-redux'
import Comics from '../components/Comics'
import { fetchEntityResources, searchEntityResources } from '../actions'
import { ENTITIES } from '../constants'

const mapStateToProps = (state, ownProps) => {
  const initialProps = {
    isFetching: false,
    isSearching: false,
    comics: [],
    attributionText: null,
    term: (new URLSearchParams(ownProps.location.search)).get('q') || '',
  }

  if (!state.resourcesByEntity.comics) {
    return initialProps
  }
  const {
    items,
    isFetching,
    isSearching,
    attributionText,
    search
  } = state.resourcesByEntity.comics
  const mapItemToComic = item => state.entities.comics[item]

  return {
    ...initialProps,
    attributionText,
    isFetching,
    isSearching,
    comics: isSearching ?
      search.items.map(mapItemToComic) :
      items.map(mapItemToComic),
  }
}

const mapDispatchToProps = dispatch => ({
  fetchComics: () => dispatch(fetchEntityResources({
    entity: ENTITIES.COMICS
  })),
  fetchComicsNextPage: () => dispatch(fetchEntityResources({
    entity: ENTITIES.COMICS,
    nextPage: true
  })),
  searchComics: term => dispatch(searchEntityResources({
    entity: ENTITIES.COMICS,
    term,
    searchFor: 'title'
  }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comics)
