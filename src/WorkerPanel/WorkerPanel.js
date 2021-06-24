import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import WorkerCarousel from "../elements/Carousel/WorkerCarousel";
import { Progress } from "reactstrap";
import CreateWork from "../elements/CreateWork/CreateWork";

class WorkerPanel extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <WorkerCarousel />
            <br />
            <CreateWork />
          </div>

          {/* About Worker */}
          <div className="col-md-4">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">
                  Welcome back, {this.props.auth.user.name}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {this.props.auth.user.phone}
                </h6>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="/worker-dashboard" className="card-link">
                  Card link
                </a>
                <a href="/worker-dashboard" className="card-link">
                  Another link
                </a>
                <p className="card-text">Your Account Completion</p>
                <Progress value="60"> 60% </Progress>
              </div>
            </div>
            <br />
            {/* On Going Works */}
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">On Going Works</h5>

                <div className="card">
                  <div className="card-header">Masonry</div>
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p>I will make an apartment to lowest price</p>
                      <footer className="blockquote-footer">
                        Mr.
                        <cite title="Source Title">Hirer Name</cite>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WorkerPanel.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(WorkerPanel);
