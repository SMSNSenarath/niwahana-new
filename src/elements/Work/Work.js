import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Work extends Component {
  state = {
    works: [],
    worker: [],
  };

  componentDidMount() {
    axios.get("/works").then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
        this.setState({
          works: response.data,
        });
      }
    });
  }

  renderAllWorks = (works) => {
    return (
      <div className="row">
        {works.map((work, index) => {
          return (
            <div class="card m-3" style={{ width: "18rem" }}>
              <div>
                <img
                  class="card-img-top"
                  src={work.images[0]}
                  style={{ height: "12rem" }}
                  alt="Card  cap"
                />
                <div class="card-body">
                  <h5 class="card-title">{work.title}</h5>
                  <p class="card-text">
                    {work.area} | {work.category}{" "}
                  </p>
                  <p class="card-text"></p>
                  <Link
                    to={`/works/${work._id}`}
                    className="btn btn-primary mr-3"
                  >
                    View Work
                  </Link>
                  <a href="/hirer-dashboard" className="btn btn-danger">
                    Rate Work
                  </a>
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
      <div>
        <h2 style={{ textAlign: "left", marginTop: "3rem" }}>All Works</h2>
        <hr />
        <div>{this.renderAllWorks(works)}</div>
      </div>
    );
  }
}
export default Work;
