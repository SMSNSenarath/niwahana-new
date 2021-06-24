import React, { Component } from "react";
import axios from "axios";
import { like, unlike } from "./apiWorker";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";

class SingleWorker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      area: "",
      email: "",
      like: false,
      likes: 0,
      works: [],
      onGoingWorks: [],
      comments: [],
    };
  }

  componentDidMount() {
    axios.get("/workers/" + this.props.match.params.id).then((response) => {
      console.log(response.data);
      this.setState({
        name: response.data.name,
        phone: response.data.phone,
        area: response.data.area,
        email: response.data.email,
        onGoingWorks: response.data.onGoingWorks,
        likes: response.data.likes.length,
        like: this.checkLike(response.data.likes),
        comments: response.data.comments,
      });
    });

    axios
      .get("/works/my-posts/" + this.props.match.params.id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          works: response.data,
        });
      });
  }

  checkLike = (likes) => {
    const hirerId = this.props.auth.user.id;
    let match = likes.indexOf(hirerId) !== -1;
    return match;
  };

  updateComments = (comments) => {
    this.setState({ comments });
  };

  likeToggle = () => {
    let callApi = this.state.like ? unlike : like;

    const hirerId = this.props.auth.user.id;
    const workerId = this.props.match.params.id;

    callApi(hirerId, workerId).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          like: !this.state.like,
          likes: data.likes.length,
        });
      }
    });
  };

  renderWorks = (works) => {
    return (
      <div>
        {works.map((work, index) => {
          // <p>{new Date(work.created).toDateString()}</p>;
          // const posterProfPic = work.postedBy
          //   ? work.postedBy.profilePicture
          //   : "";

          return (
            <div
              className="container"
              style={{ textAlign: "left", marginBottom: "2rem" }}
            >
              <div className="row">
                <div className="col-md-4">
                  <img
                    className="card-img-top"
                    src={"/" + work.images[0]}
                    alt="image1"
                    width="auto"
                    height="500px"
                  />
                </div>
                <div className="col-md-4">
                  <img
                    className="card-img-top"
                    src={"/" + work.images[1]}
                    alt="image2"
                    width="auto"
                    height="500px"
                  />
                </div>
                <div className="col-md-4">
                  <img
                    className="card-img-top"
                    src={"/" + work.images[2]}
                    alt="image3"
                    width="auto"
                    height="500px"
                  />
                </div>
              </div>

              <div className="card-body">
                <h5 className="card-title">{work.title}</h5>
                <p className="card-subtitle mb-2 text-muted">
                  Rs. {work.fee} per day
                </p>
                <p className="card-subtitle mb-2 text-muted">{work.category}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Area - {work.area}</li>
              </ul>
              <div className="card-body">
                <Link
                  to={`/works/${work._id}`}
                  className="btn btn-primary mr-3"
                >
                  View Work
                </Link>
                <a href="/hirer-dashboard" className="btn btn-danger">
                  Rate Work
                </a>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { works } = this.state;
    return (
      <div className="container" style={{ textAlign: "left" }}>
        <div className="row">
          <div className="col-md-6">
            <h1>{this.state.name}</h1>
            <h3>{this.state.phone}</h3>
            <h3>{this.state.area}</h3>
            <hr />
            <div>
              {this.state.like ? (
                <h5 onClick={this.likeToggle}>
                  <i
                    className="fa fa-thumbs-up text-success"
                    aria-hidden="true"
                    style={{ padding: "10px" }}
                  />
                  <span className="badge badge-success">Liked</span>
                </h5>
              ) : (
                <h5 onClick={this.likeToggle}>
                  <i
                    className="fa fa-thumbs-up text-danger"
                    aria-hidden="true"
                    style={{ padding: "10px" }}
                  />
                  <span className="badge badge-danger">Like</span>
                </h5>
              )}
              <b>{this.state.likes} Likes</b>
              <hr />
            </div>
          </div>
          <div className="col-md-6">
            <Comment
              workerId={this.props.match.params.id}
              comments={this.state.comments}
              updateComments={this.updateComments}
            />
          </div>
        </div>
        <b>
          {this.state.name}'s all works({this.state.works.length})
        </b>
        <hr />
        <div className="container">{this.renderWorks(works)}</div>
      </div>
    );
  }
}

SingleWorker.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(SingleWorker);
