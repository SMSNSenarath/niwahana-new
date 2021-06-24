import React, { Component } from "react";
import axios from "axios";

class HirerProfile extends Component {
  state = {
    name: "",
    phone: "",
    area: "",
    email: "",
    works: [],
  };
  componentDidMount() {
    axios.get("/hirers/" + this.props.match.params.id).then((response) => {
      console.log(response.data);
      this.setState({
        name: response.data.name,
        phone: response.data.phone,
        area: response.data.area,
        email: response.data.email,
        works: response.data.hired,
      });
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newHirer = {
      name: this.state.name,
      phone: this.state.phone,
      area: this.state.area,
      email: this.state.email,
    };

    axios
      .put("/hirers/edit/" + this.props.match.params.id, newHirer)
      .then((res) => console.log(res.data))
      .catch((err) => {
        alert(err);
      });

    window.location = "/hirer-dashboard";
  };

  renderWorks = (works) => {
    return (
      <div>
        {works.map((work, index) => {
          return (
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">My Jobs</h5>
                <div className="card">
                  <div className="card-header">{work.category}</div>
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p>{work.title}</p>
                      <footer className="blockquote-footer">
                        Mr.
                        <cite title="Source Title">{work.postedBy.name}</cite>
                      </footer>
                    </blockquote>
                  </div>
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
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4" style={{ alignItems: "center" }}>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">
                  Hi {this.state.name}, This is your Profile
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {this.state.phone}
                </h6>
                <p className="card-text">{this.state.email}</p>
                <p className="card-text">From {this.state.area}</p>
                {/* <a href="/worker-dashboard" className="card-link">
                  Card link
                </a>
                <a href="/worker-dashboard" className="card-link">
                  Another link
                </a> */}
                <p className="card-text">Your Account Completion</p>
              </div>
            </div>
            <br />
            <div>{this.renderWorks(works)}</div>
          </div>
          <div className="col-md-8">
            <h3>Edit Profile</h3>
            <form encType="multipart/form-data">
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.phone}
                  id="phone"
                  type="tel"
                />
              </div>
              <div className="form-group">
                <label style={{ textAlign: "left" }}>Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label style={{ textAlign: "left" }}>Area</label>
                <input
                  type="text"
                  className="form-control"
                  id="area"
                  value={this.state.area}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label style={{ textAlign: "left" }}>email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <button onClick={this.onSubmit} className="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default HirerProfile;
