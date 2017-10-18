import React, { Component } from 'react';
// this reduxForm connects to the formReducer in ./reducer/index file
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field){
    // the meta value is made available from the reduxForm module
    const{ meta } = field
    // const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger': ''}` ... doesn't neccessarily need to be destructured but can for this example purpose
    const className = `form-group ${meta.touched && meta.error ? 'has-danger':''}`
    
    return(
      <div className={className}>
        <label>{field.label}</label>
        <input className='form-control' type = 'text' {...field.input}/>
        <div className = 'text-help'>
          {meta.touched ? meta.error : ''}
        </div>
        {/* the meta.error tag pulls the error message from the validate function */}
      </div>
    )
  }

  onSubmit(values){
    // on the submit, the app will navigate to the location after the post is successfully run
    this.props.createPost(values, () => {
      this.props.history.push('/')
    })
  }

  render(){
    const { handleSubmit } = this.props

    return(
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label = 'Title'
            name = 'title' // what is being edited
            component = {this.renderField}
          />
          <Field
            label = 'Categories'
            name = 'categories'
            component = {this.renderField}
          />
          <Field
            label = 'Post Content'
            name = 'content'
            component = {this.renderField}
          />
          <button className ='btn btn-success' type='submit'>
            Submit
          </button>
          <Link className = 'btn btn-danger' to='/'>
            Cancel
          </Link>
        </form>
    )
  }
}

function validate(values){
  // If console logged, the return value should be an object that highlights all of the values from the inputs
  const errors = {} // validates inputs from values
  if (!values.title) {
    errors.title = 'Enter a title!'
  }

  // Example on setting a validation on input length
  // if (values.title.length < 5) {
  //   errors.title = 'Enter a title thats longer than 5 characters!'
  // }

  if (!values.categories) {
    errors.categories = 'Enter some categories!';
  }
  if (!values.content) {
    errors.content = 'Enter some content please!'
  }
  return errors
}

// to use multiple export helpers, use this exaple:
export default reduxForm({
  // THis value for the form key MUST be unique to prevent further issues
  validate: validate,
  form: 'PostsNewForm'
})(
  connect(null, {createPost})(PostsNew)
)
