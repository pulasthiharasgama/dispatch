import React from 'react'
import { connect } from 'react-redux'

import productsActions from '../../actions/ProductsActions'
import ProductForm from './ProductForm'

import ItemEditor from '../ItemEditor'

const TYPE = 'Product'
const AFTER_DELETE = 'store'

const mapStateToProps = (state) => {
  return {
    listItem: state.app.products.single,
    entities: {
      remote: state.app.entities.products,
      local: state.app.entities.local.products,
    },
    token: state.app.auth.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListItem: (token, productId) => {
      dispatch(productsActions.get(token, productId))
    },
    setListItem: (product) => {
      dispatch(productsActions.set(product))
    },
    saveListItem: (token, productId, data) => {
      dispatch(productsActions.save(token, productId, data))
    },
    createListItem: (token, data) => {
      dispatch(productsActions.create(token, data, AFTER_DELETE))
    },
    deleteListItem: (token, productId, next) => {
      dispatch(productsActions.delete(token, productId, next))
    }
  }
}

function ProductEditorComponent(props) {
  return (
    <ItemEditor
      type={TYPE}
      itemId={props.productId}
      afterDelete={AFTER_DELETE}
      form={ProductForm}
      displayField='name'
      {... props} />
  )
}

const ProductEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductEditorComponent)

export default ProductEditor