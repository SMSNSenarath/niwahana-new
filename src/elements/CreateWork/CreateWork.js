import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

class CreateWork extends Component {
  state = {
    title: "",
    fee: 0,
    category: "",
    area: "",
    images: [],
    worker: {},
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
    this.setState({
      worker: this.props.auth.user,
    });
  }
  onChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  onChangeImages = (event) => {
    this.setState({
      images: event.target.files,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.images);
    // const newWork = {
    //   title: this.state.title,
    //   category: this.state.category,
    //   fee: this.state.fee,
    //   area: this.state.area,
    //   worker: this.state.worker.id,
    // };

    var formData = new FormData();

    formData.append("title", this.state.title);
    formData.append("fee", this.state.fee);
    formData.append("category", this.state.category);
    formData.append("area", this.state.area);
    for (var x = 0; x < this.state.images.length; x++) {
      formData.append(
        "images",
        this.state.images[x],
        this.state.images[x].name
      );
    }
    formData.append("postedBy", this.state.worker.id);

    console.log(formData);
    axios
      .post("/works/add", formData)
      .then((res) => {
        console.log(res);
        alert("New Work Added");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={this.onSubmit} encType="multipart/form-data">
            <h5 className="card-title"> Create a new Work </h5>
            <div className="form-group" style={{ textAlign: "left" }}>
              <label>What can you do next?</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Ex:- I will do the wiring to your house"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="category"
                  value="Masonry"
                  checked={this.state.category === "Masonry"}
                  onChange={this.onChange}
                />
                <label className="form-check-label">Masonry</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="category"
                  value="Carpentry"
                  checked={this.state.category === "Carpentry"}
                  onChange={this.onChange}
                />
                <label className="form-check-label">Carpentry</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="category"
                  value="House Wiring"
                  checked={this.state.category === "House Wiring"}
                  onChange={this.onChange}
                />
                <label className="form-check-label">House Wiring</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="category"
                  value="Plumber"
                  checked={this.state.category === "Plumber"}
                  onChange={this.onChange}
                />
                <label className="form-check-label">Plumber</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="category"
                  value="House Painting"
                  checked={this.state.category === "House Painting"}
                  onChange={this.onChange}
                />
                <label className="form-check-label">House Painting</label>
              </div>
              <br />
              <br />
              <div className="form-group" style={{ textAlign: "left" }}>
                <label>Average Fee Per Day(Rs.)</label>
                <input
                  type="number"
                  className="form-control"
                  id="fee"
                  placeholder="Ex:- 1000"
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group" style={{ textAlign: "left" }}>
                <label>Area</label>
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

              <div className="form-group" style={{ textAlign: "left" }}>
                <label>Add Some Images</label>
                <br />
                <input type="file" multiple onChange={this.onChangeImages} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
}

CreateWork.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(CreateWork);
