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

  renderNearestWorks = (works) => {
    return (
      <div className="row">
        {works.map((work, index) => {
          return (
            <div class="card" style={{ width: "18rem", marginRight: "2rem" }}>
              <div>
                <img
                  class="card-img-top"
                  src={work.images[0]}
                  style={{ height: "12rem" }}
                  alt="Card image cap"
                />
                <div class="card-body">
                  <h5 class="card-title">{work.title}</h5>
                  <p class="card-text">
                    {work.area} | {work.category}{" "}
                  </p>
                  <p class="card-text"></p>
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
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { works } = this.state;

    let worksByArea;

    if (this.state.works.length == 0) {
      worksByArea = (
        <div>
          <b>Sorry! Unfortunately, No works in your area !</b>
        </div>
      );
    } else {
      worksByArea = <div> {this.renderNearestWorks(works)} </div>;
    }

    return (
      <div className="container">
        <h2 style={{ textAlign: "left", marginTop: "2rem" }}>
          Nearest Works..
        </h2>
        <hr />
        {worksByArea}
        <div style={{ marginTop: "3rem" }}>
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
