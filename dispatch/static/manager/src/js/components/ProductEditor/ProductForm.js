import React from 'react'
import R from 'ramda'

import { FormInput, TextInput, TextAreaInput, ImageInput } from '../inputs'
import { TagSelectInput } from '../inputs/selects'

require('../../../styles/components/person_form.scss')

export default class ProductForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayImg: null,
    }
  }

  updateImage(imageId) {
    if (imageId) {
      return this.props.update(
        'image',
        R.merge(this.props.listItem.image, { image: imageId })
      )
    } else {
      return this.props.update(
        'image',
        null
      )
    }
  }

  renderSelect() {
    return (
      <ImageInput
        onChange={imageId => this.updateImage(imageId)} />
    )

  }

  renderImage() {
    return (
      <ImageInput
        removable={true}
        selected={this.props.listItem.image.image.id}
        onChange={imageId => this.updateImage(imageId)} />
    )
  }

  render() {

    return (
      <form onSubmit={e => e.preventDefault()}>
        <FormInput
          label='Product Name'
          padded={false}
          error={this.props.errors.name}>
          <TextInput
            placeholder='Product Name'
            value={this.props.listItem.name || ''}
            fill={true}
            onChange={e => this.props.update('name', e.target.value)} />
        </FormInput>

        <FormInput
          label='Image'
          padded={false}
          error={this.props.errors.image} >
          {this.props.listItem.image && this.props.listItem.image.image ? this.renderImage() : this.renderSelect()}
        </FormInput>

        <FormInput
          label='Description'
          padded={false}
          error={this.props.errors.description}>
          <TextAreaInput
            placeholder='Description'
            value={this.props.listItem.description || ''}
            fill={true}
            onChange={e => this.props.update('description', e.target.value)} />
        </FormInput>
        <FormInput
          label='Price'
          padded={false}
          error={this.props.errors.price}>
          <TextInput
            placeholder={0}
            unit={'$'}
            type={'Number'}
            step={.01}
            value={this.props.listItem.price || 0}
            fill={true}
            onChange={e => this.props.update('price', e.target.value)} />
        </FormInput>
        <FormInput
          label='Size Options'
          padded={false}
          error={this.props.errors.size} />
        <FormInput
          label='Quantity'
          padded={false}
          error={this.props.errors.quantity}>
          <TextInput
            placeholder={0}
            type={'Number'}
            value={this.props.listItem.quantity || 0}
            fill={true}
            onChange={e => this.props.update('quantity', e.target.value)} />
        </FormInput>
        <FormInput
          label='Tags'
          error={this.props.errors.tag_ids}
          padded={false}>
          <TagSelectInput
            selected={this.props.listItem.tags || []}
            update={tags => this.props.update('tags', tags)} />
        </FormInput>
      </form>
    )
  }
}
