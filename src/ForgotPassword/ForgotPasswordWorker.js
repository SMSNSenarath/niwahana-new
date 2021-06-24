import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetPasswordWorker } from "../actions/authActions";

import "../Login/Login.css";

class ForgotPasswordWorker extends Component {
  state = {
    email: "",
    errors: {},
  };

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/worker-dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/worker-dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  redirectToWorker = () => {
    window.location = "/worker-register";
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const workerData = {
      email: this.state.email,
    };
    console.log(workerData);

    this.props.resetPasswordWorker(workerData);
  };

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="login-form">
            <div>
              <form className="login-form-inner" onSubmit={this.onSubmit}>
                <img
                  src="logo.png"
                  style={{ width: "200px", height: "auto" }}
                  alt=""
                />
                <h1 style={{ marginBottom: "30px" }}>Forgot Password</h1>
                <div className="form-group">
                  <input
                    className="form-control shadow"
                    type="text"
                    id="email"
                    placeholder="Type the email you provided"
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary login-button shadow">
                    Send a verification Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ForgotPasswordWorker.propTypes = {
  resetPasswordWorker: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { resetPasswordWorker })(
  ForgotPasswordWorker
);
