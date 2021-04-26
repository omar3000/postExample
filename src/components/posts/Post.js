import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import { Link } from "react-router-dom";
import axios from "axios";

class Post extends Component {
  state = {
    showPostinfo: false
  };

  displayInfo = () => {
    this.setState({ showPostinfo: !this.state.showPostinfo });

    document.getElementById("info").style.transform = this.state.showPostinfo
      ? "rotate(0deg)"
      : "rotate(180deg)";
  };

  onClickDelete = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      dispatch({ type: "DELETE_POST", payload: id });
    } catch (e) {
      alert(e);
      dispatch({ type: "DELETE_POST", payload: id });
    }
  };

  render() {
    const { id, title, body } = this.props.post;
    const { showPostinfo } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                <i
                  id="info"
                  onClick={this.displayInfo}
                  className="fas fa-chevron-circle-down"
                  style={{ cursor: "pointer", color: "#007bff" }}
                />
                &nbsp;
                {title}
                <div style={{ float: "right" }}>
                  <i
                    className="fas fa-times"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "grey"
                    }}
                    onClick={this.onClickDelete.bind(this, id, dispatch)}
                  />
                  &nbsp;&nbsp;
                  <Link to={`/post/edit/${id}`}>
                    <i
                      className="fas fa-edit"
                      style={{
                        cursor: "pointer",
                        float: "left",
                        color: "#007bff"
                      }}
                    />
                  </Link>
                </div>
              </h4>
              {showPostinfo ? (
                <ul className="list-group">
                  <li className="list-group-item"> id : {id}</li>
                  <li className="list-group-item"> title : {title}</li>
                  <li className="list-group-item"> body : {body}</li>

                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};

export default Post;
