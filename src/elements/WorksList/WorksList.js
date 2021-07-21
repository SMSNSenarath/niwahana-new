import React, { Component } from "react";
import SearchBarArea from "../Search/SearchUserArea";
import SearchBarCategory from "../Search/SearchBarCategory";
import SearchBarName from "../Search/SearchBarName";
import WorkByArea from "../WorkByArea/WorkByArea";
import Works from "../Work/Work";

class WorksList extends Component {
  render() {
    return (
      <div className="container">
        <h1 style={{ textAlign: "left", marginTop: "2rem" }}>Find a Work...</h1>
        <div className="row" style={{ textAlign: "left", marginTop: "2rem" }}>
          <div className="col-md-4">
            <SearchBarArea />
          </div>
          <div className="col-md-4">
            <SearchBarCategory />
          </div>
          <div className="col-md-4">
            <SearchBarName />
          </div>
        </div>
        <br />
        <div>
          <WorkByArea />
        </div>
        <div>
          <Works />
        </div>
        <br />
      </div>
    );
  }
}

export default WorksList;
