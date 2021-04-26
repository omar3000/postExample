import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
// import uuid from "uuid";
import axios from "axios";


class EditComment extends Component {
  state = {
    name: "",
    body: "",
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/comments/${id}`
    );

    const comment = res.data;
    this.setState({
      name: comment.name,
      body: comment.body

    });
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, body } = this.state;

    if (name === "") {
      this.setState({ errors: { name: "name is required!" } });
      return;
    }
    if (body === "") {
      this.setState({ errors: { email: "body  is required!" } });
      return;
    }


    const updateComment = {
      name,
      body
    };
    const { id } = this.props.match.params;
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/comments/${id}`,
      updateComment
    );

    

    dispatch({ type: "UPDATE_COMMENT", payload: res.data });
    this.setState({
      name: "",
      body: "",
      errors: {}
    });

    //redirect after adding
    this.props.history.goBack();
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, body, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3 ">
              <div className="card-header ">
                <h3 className="card-title">Edit Comment:</h3>
                <h6 className="card-subtitle text-muted">
                  Edit Comment Details:
                </h6>
              </div>

              <div className="card-body">
                <form action="" onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="enter name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
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
                    value="Update Comment "
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

export default EditComment;