import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerWorker } from "../actions/authActions";
import classnames from "classnames";
import "./Register.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

class WorkerRegister extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      phone: "",
      areas: [
        "Colombo",
        "Gampaha",
        "Kaluthara",
        "Ratnapura",
        "Galle",
        "Matara",
        "Anuradhapura",
        "Polonnaruwa",
        "Kandy",
        "Kegalle",
        "Kurunegala",
        "Hambanthota",
        "Trincomalee",
        "Jaffna",
        "Batticoloa",
        "Mannar",
      ],
      password: "",
      password2: "",
      errors: {},
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/worker-dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  onChangePhone = (phone) => {
    this.setState({
      phone: phone,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newWorker = {
      name: this.state.name,
      phone: this.state.phone,
      area: this.state.area,
      password: this.state.password,
      password2: this.state.password2,
    };
    console.log(newWorker);

    this.props.registerWorker(newWorker, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <img
            src="logo.png"
            style={{ width: "300px", height: "auto" }}
            alt=""
          />
          <h1 style={{ marginBottom: "30px" }}>Register as a Worker</h1>
          <div className="register-form">
            <form className="register-form-inner" onSubmit={this.onSubmit}>
              {/* phone */}
              <div className="form-group">
                <PhoneInput
                  defaultCountry="LK"
                  onChange={this.onChangePhone}
                  value={this.state.phone}
                  className={classnames("form-control shadow", {
                    invalid: errors.phone,
                  })}
                  type="text"
                  placeholder="Enter Mobile Number"
                  error={errors.phone}
                  id="phone"
                  style={{ width: "350px" }}
                />
                <span className="red-text">{errors.phone}</span>
              </div>

              {/* name */}
              <div className="form-group">
                <input
                  onChange={this.onChange}
                  className={classnames("form-control shadow", {
                    invalid: errors.name,
                  })}
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  id="name"
                  style={{ width: "350px" }}
                  value={this.state.name}
                />
                <span className="red-text">{errors.name}</span>
              </div>

              <div className="form-group">
                <select
                  required
                  className={classnames(
                    "",
                    { invalid: errors.area },
                    "form-control shadow"
                  )}
                  value={this.state.area}
                  placeholder="District"
                  error={errors.area}
                  id="area"
                  onChange={this.onChange}
                >
                  {this.state.areas.map(function (area) {
                    return (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    );
                  })}
                </select>
                <span className="text-danger">{errors.degree}</span>
              </div>

              {/* password */}

              <div className="form-group">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  className={classnames("form-control shadow", {
                    invalid: errors.password,
                  })}
                  type="password"
                  placeholder="Password"
                  id="password"
                  style={{ width: "350px" }}
                />
                <span className="red-text">{errors.password}</span>
              </div>

              {/* password2 */}
              <div className="form-group">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  className={classnames("form-control shadow", {
                    invalid: errors.password2,
                  })}
                  type="password"
                  placeholder="Confirm Password"
                  id="password2"
                  style={{ width: "350px" }}
                />

                <span className="red-text">{errors.password2}</span>
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary login-button shadow"
                  style={{ width: "200px" }}
                >
                  Register
                </button>
              </div>
            </form>
          </div>

          <br />

          <a href="/">Forgot Password?</a>
          <div>
            <button href="/" className="btn btn-link">
              <h4>Already Have an Account? Click Here to Login</h4>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

WorkerRegister.propTypes = {
  registerWorker: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerWorker })(
  withRouter(WorkerRegister)
);
