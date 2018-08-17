import React from 'react'
import { connect } from 'react-redux'

import ItemIndexPage from '../ItemIndexPage'
import { TagsFilterInput }  from '../../components/inputs/filters/'
import productsActions from '../../actions/ProductsActions'
import { humanizeDatetime } from '../../util/helpers'

const mapStateToProps = (state) => {
  return {
    token: state.app.auth.token,
    listItems: state.app.products.list,
    entities: {
      listItems: state.app.entities.products,
      images: state.app.entities.images
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listListItems: (token, query) => {
      dispatch(productsActions.list(token, query))
    },
    toggleListItem: (articleId) => {
      dispatch(productsActions.toggle(articleId))
    },
    toggleAllListItems: (articleIds) => {
      dispatch(productsActions.toggleAll(articleIds))
    },
    clearSelectedListItems: () => {
      dispatch(productsActions.clearSelected())
    },
    clearListItems: () => {
      dispatch(productsActions.clearAll())
    },
    deleteListItems: (token, articleIds) => {
      dispatch(productsActions.deleteMany(token, articleIds))
    },
    searchProducts: (tags, query) => {
      dispatch(productsActions.search(tags, query))
    }
  }
}

const renderThumb = (url) => {
  return (
    <div className={'c-image-page-thumb'} style={{backgroundImage: 'url(' + url + ')'}} />
  )
}

function ProductsPageComponent(props) {
  const title = 'Store'

  const filters = [
    <TagsFilterInput
      key={'tagsFilter'}
      selected={props.location.query.tags}
      update={(tags) => props.searchProducts(tags, props.location.query.q)} />
  ]

  return (
    <ItemIndexPage
      pageTitle={title}
      typePlural='store'
      typeSingular='product'
      displayColumn='name'
      filters={filters}
      headers={[ 'Name', 'Preview', 'Quantity', 'Tags', 'Created', '']}
      extraColumns={[
        item => (renderThumb(item.image.image.url_thumb)),
        item => item.quantity,
        item => item.tags,
        item => item.created_at ? humanizeDatetime(item.created_at) : '',
        item => item.updated_at ? humanizeDatetime(item.updated_at) : ''
      ]}
      shouldReload={(prevProps, props) => {
        return (
          (prevProps.location.query.tags !== props.location.query.tags)
        )
      }}
      queryHandler={(query, props) => {
        if (props.location.query.tags) {
          query.tags = props.location.query.tags
        }
        return query
      }}
      searchListItems={(query) => props.searchProducts( props.location.query.tags, query)}
      {...props} />
  )
}


const ProductsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPageComponent)

export default ProductsPage
