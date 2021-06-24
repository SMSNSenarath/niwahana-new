import React, { Component } from "react";
import "./SearchBar.css";
import { Link } from "react-router-dom";

class SearchBarArea extends Component {
  state = {
    query: "",
    workDetails: [],
  };

  fetchWorks = (query) => {
    this.setState({
      query: query,
    });
    fetch("works/search-works-area", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        this.setState({
          workDetails: results.work,
        });
      });
  };

  render() {
    return (
      <div>
        <div className="search">
          <i
            className="fa fa-search"
            aria-hidden="true"
            style={{ marginLeft: "10px" }}
          />
          <input
            className="search-input"
            id="query"
            type="text"
            placeholder="Search by Area"
            onChange={(e) => this.fetchWorks(e.target.value)}
          />
        </div>
        <ul className="list-group" style={{ textAlign: "left" }}>
          {this.state.workDetails.map((item) => {
            return (
              <li className="list-group-item" style={{ textAlign: "left" }}>
                <Link to={`/works/${item._id}`}>{item.title}</Link>
                <p className="dropdown-item" style={{ fontSize: "10px" }}>
                  {item.area}
                </p>
                <p className="dropdown-item" style={{ fontSize: "10px" }}>
                  {item.category}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SearchBarArea;
