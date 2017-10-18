import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import {Link} from 'react-router-dom'; //renders as an <a> tag

class PostsIndex extends Component {
  // Life Cycle Method are called automatically with React when the site is loaded
  componentDidMount(){
    this.props.fetchPosts()
  }

  renderPosts(){
    // due to it being an object, lodash is used to give the map functions
    return _.map(this.props.posts, post => {
      return(
        <Link to={`/posts/${post.id}`}>
          <li className='list-group-item' key={post.id}>
            {post.title}
          </li>
        </Link>
      )
    })
  }

  render(){
    console.log(this.renderPosts());
    return(
      <div>
        <div className = 'text-xs-right'>
          <Link className='btn btn-danger' to='/posts/new'>
            Add a Post
          </Link>
        </div>

        <h3>Posts</h3>
        <ul className='list-group'>
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {posts: state.posts}
}

export default connect(mapStateToProps, {fetchPosts:  fetchPosts})(PostsIndex)
