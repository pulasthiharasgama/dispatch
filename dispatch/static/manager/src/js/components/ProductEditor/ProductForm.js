import React from 'react'
import Dropzone from 'react-dropzone'
import { AnchorButton } from '@blueprintjs/core'

import { FormInput, TextInput, TextAreaInput } from '../inputs'
import { TagSelectInput } from '../inputs/selects'

require('../../../styles/components/person_form.scss')

export default class ProductForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayImg: null,
    }
  }

  onDrop(files) {
    this.props.update('image', files[0])
    this.setState({ displayImg: files[0].preview })
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
          error={this.props.errors.image} />
        <Dropzone
          ref={(node) => { this.dropzone = node }}
          className='c-person-form__image__dropzone'
          onDrop={(files) => this.onDrop(files)}
          disableClick={true}
          activeClassName='c-person-form__image__dropzone--active'
          multiple={false}>
          <div
            className='c-person-form__images__container'>
            {this.state.displayImg || this.props.listItem.image_url ? null :
              <div className='c-person-form__image__dropzone__text'>
                Drop Image Here
              </div>}
            <img
              className='c-person-form__images'
              src={this.state.displayImg || this.props.listItem.image_url} />
          </div>
          </Dropzone>
        <div className='c-person-form__image__button'>
          <AnchorButton
            onClick={() => this.dropzone.open()}>Select Image</AnchorButton>
        </div>

        {this.props.errors.detail ?
          <div className='pt-callout pt-intent-danger c-person-form__image__error'>
            {this.props.errors.detail}
          </div> : null}

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
