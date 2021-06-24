import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import Work from "../Work/Work";

class WorkByArea extends Component {
  state = {
    query: "",
    works: [],
    worker: [],
  };

  componentDidMount() {
    const userData = {
      area: this.props.auth.user.area,
    };
    axios.post("/works/area", userData).then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
        this.setState({
          works: response.data,
        });
      }
    });
  }

  renderWorks = (works) => {
    return (
      <div>
        {works.map((work, index) => {
          const posterId = work.postedBy ? work.postedBy._id : "No Id";
          const posterName = work.postedBy ? work.postedBy.name : "";
          const posterPhone = work.postedBy ? work.postedBy.phone : "";
          // <p>{new Date(work.created).toDateString()}</p>;
          // const posterProfPic = work.postedBy
          //   ? work.postedBy.profilePicture
          //   : "";

          return (
            <div
              className="card"
              style={{ textAlign: "left", marginBottom: "2rem" }}
            >
              <div className="row">
                <div className="col-md-4">
                  <img
                    className="card-img-top"
                    src={work.images[0]}
                    alt="image1"
                    width="auto"
                    height="500px"
                  />
                </div>
                <div className="col-md-4">
                  <img
                    className="card-img-top"
                    src={work.images[1]}
                    alt="image2"
                    width="auto"
                    height="500px"
                  />
                </div>
                <div className="col-md-4">
                  <img
                    className="card-img-top"
                    src={work.images[2]}
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
                <li className="list-group-item">Phone No - {posterPhone}</li>
                <li className="list-group-item">
                  Worker Name -{" "}
                  <Link to={`/worker/${posterId}`}>{posterName}</Link>
                </li>
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
      <div className="container">
        <h2 style={{ textAlign: "left" }}> Nearest Works..</h2>
        <hr />
        {this.renderWorks(works)}
        <div>
          <Work />
        </div>
      </div>
    );
  }
}
WorkByArea.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(WorkByArea);
