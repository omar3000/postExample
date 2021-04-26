import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload
        )
      };
    case "DELETE_POST":
        return {
          ...state,
          posts: state.posts.filter(
            post => post.id !== action.payload
          )
        };
    case "ADD_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };

    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id
            ? (post = action.payload)
            : post
        )
      };
    case "UPDATE_COMMENT":
        return {
          ...state,
          comments: state.comments.map(comment =>
            comment.id === action.payload.id
              ? (comment = action.payload)
              : comment
          )
        };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    posts: [],
    comments: [],

    dispatch: action => this.setState(state => reducer(state, action))
  };

  // componentDidUpdate() {
  //   console.log("component didUpdate");
  // }

  // componentWillUpdate() {
  //   console.log("component WillUpdate");
  // }

  //using jsonplaceholder for dummy dataset. we can use fetch in place of axios
  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");

    this.setState({ posts: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
