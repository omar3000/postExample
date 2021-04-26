import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import Comment from "../comments/comment";
// import uuid from "uuid";
import axios from "axios";

class EditPost extends Component {
  state = {
    title: "",
    body: "",
    comments: [],
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    const res_comments = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );

    const post = res.data;
    const comments = res_comments.data
    this.setState({
      title: post.title,
      body: post.body,
      comments: comments

    });
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { title, body } = this.state;

    if (title === "") {
      this.setState({ errors: { name: "title is required!" } });
      return;
    }
    if (body === "") {
      this.setState({ errors: { email: "body  is required!" } });
      return;
    }


    const updatePost = {
      title,
      body
    };
    const { id } = this.props.match.params;
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      updatePost
    );

    

    dispatch({ type: "UPDATE_POST", payload: res.data });
    this.setState({
      title: "",
      body: "",
      errors: {}
    });

    //redirect after adding
    this.props.history.push("../../");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { title,body, comments, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3 ">
              <div className="card-header ">
                <h3 className="card-title">Edit Post:</h3>
                <h6 className="card-subtitle text-muted">
                  Edit Post Details:
                </h6>
              </div>

              <div className="card-body">
                <form action="" onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Title"
                    name="title"
                    placeholder="enter title"
                    value={title}
                    onChange={this.onChange}
                    error={errors.title}
                  />

                  <TextInputGroup
                    label="Body"
                    name="body"
                    type="body"
                    placeholder="enter body"
                    value={body}
                    onChange={this.onChange}
                    error={errors.body}
                  />


                  <input
                    type="submit"
                    value="Update Post "
                    className="btn btn-block btn-primary"
                  />
                </form>
              </div>
              <h3 className="card-title">Comments:</h3>
              <React.Fragment>
                {comments.map(comment => (
                  <Comment key={comment.id} comment={comment} />
                ))}
                </React.Fragment>
            </div>





          );
        }}
      </Consumer>
    );
  }
}

export default EditPost;
