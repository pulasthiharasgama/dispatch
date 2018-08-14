import R from 'ramda'
import { push } from 'react-router-redux'

import * as types from '../constants/ActionTypes'
import { productSchema } from '../constants/Schemas'
import DispatchAPI from '../api/dispatch'

import { ResourceActions } from '../util/redux'

class ProductsActions extends ResourceActions {

  toRemote(data) {
    data = R.clone(data)

    data.tag_ids = data.tags

    return data
  }

  search(tags, query) {
    let queryObj = {}

    if (query) {
      queryObj.q = query
    }

    if (tags) {
      queryObj.tags = tags
    }

    return (dispatch) => {
      dispatch(push({ pathname: '/store/', query: queryObj }))
    }
  }

}

export default new ProductsActions(
  types.PRODUCTS,
  DispatchAPI.products,
  productSchema
)
