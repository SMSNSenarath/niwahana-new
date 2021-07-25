import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { logoutHirer } from "../actions/authActions";
import HirerNavBar from "../elements/HirerNavBar/HirerNavBar";
import WorksList from "../elements/WorksList/WorksList";
import SingleWork from "../elements/SingleWork/SingleWork";
import SingleWorker from "../elements/SingleWorker/SingleWorker";
import HirerProfile from "../Profile/HirerProfile";

import Packages from "../elements/Packages/Packages";

import Footer from "../elements/Footer/Footer";
import SinglePackage from "../elements/SinglePackage/SinglePackage";

class HirerDashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutHirer();
  };
  render() {
    console.log(this.props);
    return (
      <BrowserRouter>
        <div className="App">
          <HirerNavBar />
          <Switch>
            <Route exact path="/hirer-dashboard" component={WorksList} />
            <Route path="/works/:id" exact component={SingleWork} />
            <Route path="/worker/:id" exact component={SingleWorker} />
            <Route path="/hirer-profile/:id" exact component={HirerProfile} />
            <Route path="/packages" exact component={Packages} />
            <Route path="/packages/:id" exact component={SinglePackage} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
HirerDashboard.propTypes = {
  logoutHirer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutHirer })(HirerDashboard);
