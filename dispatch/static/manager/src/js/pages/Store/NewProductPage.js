import React from 'react'

import ProductEditor from '../../components/ProductEditor'

export default function NewProductPage(props) {
  return (
    <ProductEditor
      isNew={true}
      goBack={props.router.goBack}
      route={props.route} />
  )
}