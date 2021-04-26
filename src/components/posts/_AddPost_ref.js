import React, { Component } from "react";

class AddPost extends Component {
  
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.bodyInput = React.createRef();
  }
  onSubmit = e => {
    e.preventDefault();
    const post = {
      title: this.titleInput.current.value,
      body: this.bodyInput.current.value
    };
    console.log(post);
  };

  static defaultProps = {
    title: "example",
    body: "this is a example"
  };
  render() {
    const { title, body } = this.props;
    return (
      <div className="card mb-3 ">
        <div className="card-header ">
          <h3 className="card-title">Add Post</h3>
          <h6 className="card-subtitle text-muted">Enter post details...</h6>
        </div>

        <div className="card-body">
          <form action="" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Title </label>
              <input
                type="text"
                className="form-control form-control-lg"
                name="title"
                placeholder="Enter title..."
                defaultValue={title}
                ref={this.titleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Body </label>
              <input
                type="text"
                className="form-control form-control-lg"
                name="body"
                placeholder="Enter body..."
                defaultValue={body}
                ref={this.bodyInput}
              />
            </div>

            <input
              type="submit"
              value="Add Post "
              className="btn btn-block btn-info"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default AddPost;
