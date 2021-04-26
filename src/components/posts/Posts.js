import React, { Component } from "react";
import Post from "./Post";
import { Consumer } from "../../context";

class Posts extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { posts } = value;
          return (
            <React.Fragment>
              <h1 className="display-5 margin-3">
                <span className="text-warning">Blog</span> Post
              </h1>
              {posts.map(post => (
                <Post key={post.id} post={post} />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Posts;
