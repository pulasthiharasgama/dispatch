import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title';

import * as articlesActions from '../actions/ArticlesActions'
import * as modalActions from '../actions/ModalActions'

import ArticleToolbar from './ArticleToolbar.jsx';
import ArticleContentEditor from './ArticleContentEditor.jsx'
import ArticleSidebar from './ArticleSidebar.jsx'

const NEW_ARTICLE_ID = 'new'

class ArticleEditorComponent extends React.Component {

  constructor(props) {
    super(props)

    this.handleSave = this.handleSave.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentWillMount() {
    if (this.props.isNew) {
      // Create empty article
      this.props.setArticle({ id: NEW_ARTICLE_ID })
    } else {
      // Fetch article
      this.props.fetchArticle(this.props.token, this.props.articleId)
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isNew) {
      // Fetch article
      if (prevProps.articleId !== this.props.articleId) {
        this.props.fetchArticle(this.props.token, this.props.articleId)
      }
    }
  }

  getArticle() {
    if (this.props.isNew) {
      return this.props.entities.article[NEW_ARTICLE_ID]
    } else {
      return this.props.entities.article[this.props.articleId] ||
        this.props.entities.articles[this.props.articleId] || false
    }
  }

  handleSave() {
    if (this.props.isNew) {
      this.props.createArticle(this.props.token, this.getArticle())
    } else {
      this.props.saveArticle(
        this.props.token,
        this.props.articleId,
        this.getArticle()
      )
    }
  }

  handleUpdate(field, value) {
    this.props.setArticle(R.assoc(field, value, this.getArticle()))
  }

  render() {

    const article = this.getArticle()

    if (!article) {
      return (<div>Loading</div>)
    }

    const title = this.props.isNew ? 'New article' : `Edit - ${article.headline}`

    return (
      <DocumentTitle title={title}>
        <div className='u-container-main'>
          <ArticleToolbar
            save={this.handleSave}
            article={article} />
          <div className='u-container-editor'>
            <ArticleContentEditor
              isNew={this.props.isNew}
              article={article}
              update={this.handleUpdate}
              openModal={this.props.openModal}
              closeModal={this.props.closeModal} />
            <ArticleSidebar
              article={article}
              update={this.handleUpdate} />
          </div>
        </div>
      </DocumentTitle>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    article: state.app.articles.article,
    entities: {
      articles: state.app.entities.articles,
      article: state.app.entities.article
    },
    token: state.app.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticle: (token, articleId) => {
      dispatch(articlesActions.fetchArticle(token, articleId))
    },
    setArticle: (article) => {
      dispatch(articlesActions.setArticle(article))
    },
    saveArticle: (token, articleId, data) => {
      dispatch(articlesActions.saveArticle(token, articleId, data))
    },
    createArticle: (token, data) => {
      dispatch(articlesActions.createArticle(token, data))
    },
    openModal: (component, props) => {
      dispatch(modalActions.openModal(component, props))
    },
    closeModal: () => {
      dispatch(modalActions.closeModal())
    }
  }
}

const ArticleEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleEditorComponent)

export default ArticleEditor