import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutHirer } from "../../actions/authActions";
import { Link } from "react-router-dom";

class HirerNavBar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutHirer();
  };
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top fixed-top">
        <a className="navbar-brand" href="/">
          <img src="/logo.png" width="100px" height="auto" alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/hirer-dashboard">
                Home
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={"/hirer-profile/" + this.props.auth.user.id}
              >
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Stats
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/" onClick={this.onLogoutClick}>
                Logout <b>{this.props.auth.user.name}</b>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

HirerNavBar.propTypes = {
  logoutHirer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutHirer })(HirerNavBar);
