import React from 'react'

import ItemSelectInput from '../inputs/selects/ItemSelectInput'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl']

const entities = [
  {id: 'xs', value:'xs'}, 
  {id: 'sm', value:'xs'}, 
  {id: 'md', value:'xs'}, 
  {id: 'lg', value:'xs'}, 
  {id: 'xl', value:'xs'}
]

class SizeSelect extends React.Component {

  createSize(name, cb) {
    console.log('create size')
  }

  update(selected) {

  }

  render() {
    console.log(this.props)
    return (
      <ItemSelectInput
        selected={this.props.sizes}
        results={sizes}
        entities={entities}
        onChange={(selected) => this.update(selected)}
        create={(name, cb) => this.createSize({ name }, cb)}
        attribute='value'
        editMessage={this.props.sizes.length ? 'Edit Size' : 'Add Size'} />
    )
  }

}

export default SizeSelect
