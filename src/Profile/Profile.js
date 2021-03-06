import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Profile extends Component {
  state = {
    name: "",
    phone: "",
    area: "",
    email: "",
    works: [],
    onGoingWorks: [],
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
  };
  componentDidMount() {
    axios.get("/workers/" + this.props.match.params.id).then((response) => {
      console.log(response.data);
      this.setState({
        name: response.data.name,
        phone: response.data.phone,
        area: response.data.area,
        email: response.data.email,
        onGoingWorks: response.data.onGoingWorks,
      });
    });

    axios
      .get("/works/my-posts/" + this.props.match.params.id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          works: response.data,
        });
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newWorker = {
      name: this.state.name,
      phone: this.state.phone,
      area: this.state.area,
      email: this.state.email,
    };

    axios
      .put("/workers/edit/" + this.props.match.params.id, newWorker)
      .then((res) => console.log(res.data))
      .catch((err) => {
        alert(err);
      });

    window.location = "/worker-dashboard";
  };

  renderWorks = (works) => {
    return (
      <div>
        {works.map((work, index) => {
          return (
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">My Gigs</h5>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-md-6"> {work.category}</div>
                      <div className="col-md-6">
                        <Link to={`/works/${work._id}`} className="text-right">
                          View Work
                        </Link>
                      </div>
                    </div>
                  </div>
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
      <div className="container mt-5">
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
            <div className="container shadow p-5">
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
                  <select
                    required
                    className="form-control"
                    value={this.state.area}
                    placeholder="District"
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
                </div>
                <div className="form-group">
                  <label style={{ textAlign: "left" }}>
                    Email (<i>Optional</i>)
                  </label>
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
      </div>
    );
  }
}
export default Profile;
