import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

class NewPasswordHirer extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.token);
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/hirer-dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/hirer-dashboard"); //Push user to dashboard when they login
    }
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

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      token: this.props.match.params.token,
      password: this.state.password,
    };
    console.log(userData);

    axios
      .post("/hirers/new-password", userData)
      .then((res) => {
        alert("Password Updated");
        console.log(res);
      })
      .then((window.location = "/hirer-login"))
      .catch((err) => console.log(err));

    // this.props.newPasswordWorker(userData);
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
                <h1 style={{ marginBottom: "30px" }}>New Password</h1>
                <div className="form-group">
                  <input
                    className="form-control shadow"
                    type="password"
                    id="password"
                    placeholder="Type a New Password"
                    onChange={this.onChange}
                    value={this.state.password}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary login-button shadow">
                    Update
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

NewPasswordHirer.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(NewPasswordHirer);
