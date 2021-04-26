import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import { Link } from "react-router-dom";
import axios from "axios";

class Comment extends Component {
  state = {
    showCommentinfo: false
  };

  displayInfo = () => {
    this.setState({ showCommentinfo: !this.state.showCommentinfo });

    document.getElementById("info").style.transform = this.state.showCommentinfo
      ? "rotate(0deg)"
      : "rotate(180deg)";
  };

  onClickDelete = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`);
      dispatch({ type: "DELETE_COMMENT", payload: id });
    } catch (e) {
      alert(e);
      dispatch({ type: "DELETE_COMMENT", payload: id });
    }

    this.state.showCommentinfo = false;
  };

  render() {
    const { id, name, body } = this.props.comment;
    const { showCommentinfo } = this.state;
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
                {name}
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
                  <Link to={`/comment/edit/${id}`}>
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
              <br></br>
              {showCommentinfo ? (
                <ul className="list-group">
                  <li className="list-group-item"> id : {id}</li>
                  <li className="list-group-item"> name : {name}</li>
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

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};

export default Comment;
