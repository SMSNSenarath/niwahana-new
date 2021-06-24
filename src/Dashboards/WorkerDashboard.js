import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { logoutWorker } from "../actions/authActions";
import WorkerNavBar from "../elements/WorkerNavBar/WorkerNavBar";
import Profile from "../Profile/Profile";
import WorkerPanel from "../WorkerPanel/WorkerPanel";
import WorkerStats from "../Stats/WorkerStats";

class WorkerDashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutWorker();
  };
  render() {
    // const worker = this.props.auth.user;

    return (
      <BrowserRouter>
        <div>
          <div>
            <WorkerNavBar />
          </div>
          <br />
          <br />
          <br />
          <br />

          <div className="container">
            <Switch>
              <Route exact path="/worker-dashboard" component={WorkerPanel} />
              <Route path="/profile/:id" exact component={Profile} />
              <Route path="/stats/:id" exact component={WorkerStats} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
WorkerDashboard.propTypes = {
  logoutWorker: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutWorker })(WorkerDashboard);
