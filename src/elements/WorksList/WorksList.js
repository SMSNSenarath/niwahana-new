import React, { Component } from "react";
import Work from "../Work/Work";
import SearchBarArea from "../Search/SearchUserArea";
import SearchBarCategory from "../Search/SearchBarCategory";
import SearchBarName from "../Search/SearchBarName";
import WorkByArea from "../WorkByArea/WorkByArea";

class WorksList extends Component {
  render() {
    return (
      <div className="container">
        <h1 style={{ textAlign: "left" }}>Find a Work...</h1>

        <div className="row" style={{ textAlign: "left" }}>
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
        <br />
        <hr />
      </div>
    );
  }
}

export default WorksList;
