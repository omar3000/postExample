import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import uuid from "uuid";
import axios from "axios";

class AddPost extends Component {
  state = {
    title: "",
    body: "",
    errors: {}
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { title, body } = this.state;

    if (title === "") {
      this.setState({ errors: { title: "Title is required!" } });
      return;
    }
    else if (body === "") {
      this.setState({ errors: { body: "Body is required!" } });
      return;
    }


    //es6 stntax : if the key and value are the same you dont need to write it as name: name etc
    const newPost = {
      id: uuid(),
      title,
      body
    };

    const res = await axios.post(
      `https://jsonplaceholder.typicode.com/posts`,
      newPost
    );
    dispatch({ type: "ADD_POST", payload: res.data });

    //clear state after adding
    this.setState({
      title: "",
      body: "",
      errors: {}
    });

    //redirect after adding
    this.props.history.push("../");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { title, body, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3 ">
              <div className="card-header ">
                <h3 className="card-title">Add Post</h3>
                <h6 className="card-subtitle text-muted">
                  Enter post details...
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
                    value="Add Post "
                    className="btn btn-block btn-primary"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddPost;
