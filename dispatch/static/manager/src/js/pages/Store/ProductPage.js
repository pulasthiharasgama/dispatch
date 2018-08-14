import React from 'react'

import ProductEditor from '../../components/ProductEditor'

export default function ProductPage(props) {
  return (
    <ProductEditor
      itemId={props.params.productId}
      location={props.location}
      goBack={props.router.goBack}
      route={props.route} />
  )
}