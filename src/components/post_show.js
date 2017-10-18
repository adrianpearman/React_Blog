import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostShow extends Component{
  componentDidMount(){
    // this if statement is not neccessarily needed, but if network performance is a concern, then this should used
    if (!this.props.post) {
      const {id} = this.props.match.params
      this.props.fetchPost(id)
    }
  }

  onDeleteClick(){
    const {id} = this.props.match.params
    this.props.deletePost(id, () => {
      this.props.history.push('/')
    });
  }

  render(){
    const {post} = this.props;
    // posts[this.props.posts.params.id]  - is alternative way to show but will load slower as the whole list is loaded

    if (!post) {
      return(
        <div>Loading...</div>
      )
    }


    return(
    <div>
      <Link to='/' className='btn btn-success'>Back to Index</Link>
      <button
        className = 'btn btn-danger pull-xs-right'
        onClick={this.onDeleteClick.bind(this)}>
        Delete Post
      </button>
      <h3>{post.title}</h3>
      <h5>Categories: {post.categories}</h5>
      <h6>Content:</h6>
      <p>{post.content}</p>
    </div>
    )
  }
}

function mapStateToProps({posts}, ownProps){
  // this returns the specific list item we are looking for. loads quicker
  return { post: posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostShow)
