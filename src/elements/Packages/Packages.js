import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Pdf from "react-to-pdf";

const ref = React.createRef();

export default class Packages extends Component {
  state = {
    packages: [],
  };

  componentDidMount() {
    axios.get("/packages/all").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          packages: response.data,
        });
      }
    });
  }

  renderAllPackages = (packages) => {
    return (
      <div className="row">
        {packages.map((p, index) => {
          console.log(p.title);
          return (
            <div className="row mt-4">
              <div className="col m-2">
                <div class="card" style={{ width: "30rem" }}>
                  <div class="card-body">
                    <h5 class="card-title">{p.title}</h5>
                    <p class="card-text">
                      {p.type} - {p.area}
                    </p>
                    <p class="card-text">
                      Discount - {p.discount}% from each Gig
                    </p>
                    <p class="card-text">
                      {p.likes.length} people reccomends this package!
                    </p>
                    <Link
                      className="btn btn-primary mr-2"
                      to={`/packages/${p._id}`}
                    >
                      View
                    </Link>
                    <button className="btn btn-success">Purchase</button>
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
    const { packages } = this.state;

    return (
      <React.Fragment>
        <div className="container shadow pb-3">
          <h2 className="mt-3">Packages</h2>
          <div style={{ marginTop: "2.5rem" }}>
            <Link
              to={"/packages-performance/"}
              className="btn btn-primary btn-block"
            >
              View Packages Performances
            </Link>
          </div>
          <div className="container">{this.renderAllPackages(packages)}</div>
        </div>
      </React.Fragment>
    );
  }
}
