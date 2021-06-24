import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import axios from "axios";
import { Link } from "react-router-dom";
import { comment, uncomment } from "../SingleWorker/apiWorker";

class Comment extends Component {
  state = {
    text: "",
    error: "",
  };

  onChangeText = (e) => {
    this.setState({
      error: "",
    });
    this.setState({
      text: e.target.value,
    });
  };

  isValid = () => {
    if (!this.state.text.length > 0 || this.state.text.length > 200) {
      this.setState({
        error:
          "Comment should not be empty and should be less than 200 characters",
      });
      return false;
    }
    return true;
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.isValid()) {
      const hirerId = this.props.auth.user.id;
      const workerId = this.props.workerId;
      const commentBody = { text: this.state.text };
      console.log(commentBody);

      comment(hirerId, workerId, commentBody).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          this.setState({ text: "" });

          this.props.updateComments(data.comments);
        }
      });
    }
  };

  deleteComment = (comment) => {
    const hirerId = this.props.auth.user.id;
    const workerId = this.props.workerId;
    uncomment(hirerId, workerId, comment).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.props.updateComments(data.comments);
      }
    });
  };

  deleteConfirmed = (comment) => {
    let answer = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (answer) {
      this.deleteComment(comment);
    }
  };

  render() {
    const { comments } = this.props;
    const { error } = this.state;
    return (
      <div className="container" style={{ textAlign: "left" }}>
        <form onSubmit={this.onSubmit}>
          <div class="form-group">
            <textarea
              className="form-control"
              onChange={this.onChangeText}
              value={this.state.text}
              rows="3"
              placeholder="Write a review..."
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </form>
        <div
          className="alert alert-danger mt-2"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        <hr />
        <div className="card shadow">
          <div className="card-body">
            <div className="card-title">
              <b>{comments.length} Comments</b>
              <hr />
            </div>

            {comments.map((comment, i) => (
              <div className="row" key={i}>
                <div className="col-md-6 col-xs-6">
                  <Link to="/dashboard">
                    <h5 className="card-subtitle">{comment.postedBy.name}</h5>
                  </Link>

                  {/* <img
                    src={"/" + comment.postedBy.profilePicture}
                    width="40px"
                    height="auto"
                    alt="Not found"
                  /> */}
                  <i>
                    <p style={{ fontSize: "10px" }}>
                      {new Date(comment.created).toDateString()}
                    </p>
                  </i>
                  <p>{comment.text}</p>
                </div>

                <div className="col-md-6 col-xs-6">
                  {this.props.auth.user.id === comment.postedBy._id && (
                    <>
                      <span
                        className="text-danger float-right mr-1"
                        onClick={() => this.deleteConfirmed(comment)}
                      >
                        Remove
                      </span>
                    </>
                  )}
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Comment);
