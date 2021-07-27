import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginWorker } from "../actions/authActions";
import classnames from "classnames";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Link } from "react-router-dom";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Login.css";

class WorkerLogin extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    modalIsOpen: false,
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

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  };

  redirectToWorker = () => {
    window.location = "/worker-register";
  };
  redirectToHirer = () => {
    window.location = "/hirer-register";
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangePhone = (phone) => {
    this.setState({
      phone: phone,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const workerData = {
      phone: this.state.phone,
      password: this.state.password,
    };
    console.log(workerData);

    this.props.loginWorker(workerData); //
  };

  render() {
    const { errors } = this.state;
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
                <h1 style={{ marginBottom: "30px" }}>Login as a Worker</h1>
                <div className="form-group">
                  <PhoneInput
                    defaultCountry="LK"
                    className={classnames("form-control shadow", {
                      invalid: errors.phone || errors.phonenotfound,
                    })}
                    id="phone"
                    error={errors.phone}
                    placeholder="Mobile Number"
                    onChange={this.onChangePhone}
                    value={this.state.phone}
                  />
                  <span className="red-text">
                    {errors.phone}
                    {errors.phonenotfound}
                  </span>
                </div>
                <div className="form-group">
                  <input
                    className={classnames("form-control shadow", {
                      invalid: errors.password || errors.passwordincorrect,
                    })}
                    type="password"
                    id="password"
                    error={errors.password}
                    placeholder="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                  />
                  <span className="red-text">
                    {errors.password}
                    {errors.passwordincorrect}
                  </span>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary login-button shadow">
                    Login
                  </button>
                </div>
                <Link to="/worker-forgot-password">Forgot Password?</Link>
              </form>
            </div>
          </div>
          <div>
            <button
              href="/"
              className="btn btn-link"
              onClick={this.toggleModal.bind(this)}
            >
              <h3>Create an Account?</h3>
            </button>
          </div>
          <Modal isOpen={this.state.modalIsOpen}>
            <ModalHeader toggle={this.toggleModal.bind(this)}>
              Sign Up
            </ModalHeader>
            <ModalBody>How do you want to sign up as?</ModalBody>
            <ModalFooter>
              <button
                className="btn btn-primary"
                onClick={this.redirectToHirer}
              >
                Sign as Hirer
              </button>
              <button
                className="btn btn-primary"
                onClick={this.redirectToWorker}
              >
                Sign as Worker
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

WorkerLogin.propTypes = {
  loginWorker: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginWorker })(WorkerLogin);
