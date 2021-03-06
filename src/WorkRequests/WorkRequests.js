import axios from "axios";
import React, { Component } from "react";

class WorkRequests extends Component {
  state = {
    workRequests: [],
  };

  componentDidMount() {
    axios
      .get("/workers/work-requests-by-id/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          workRequests: res.data.workRequests,
        });
      })
      .catch((err) => console.log(err));
  }

  onAccept = (wr_id) => {
    // alert("Accepted!");
    axios.get("/requests/friend_request/" + wr_id + "/accept").then((res) => {
      window.location = "/worker-dashboard";
    });
  };

  onDecline = (wr_id) => {
    // alert("Declined!");
    axios.get("/requests/friend_request/" + wr_id + "/decline").then((res) => {
      window.location = "/worker-dashboard";
    });
  };

  renderWorkRequests() {
    return (
      <div>
        {this.state.workRequests.map((wr, index) => {
          return (
            <div class="list-group">
              <a
                href="#"
                className="list-group-item list-group-item-action flex-column align-items-start mt-3"
              >
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">
                    {wr.sender.name} - {wr.sender.phone}
                  </h5>
                  <small>{wr.createdAt}</small>
                </div>
                <p class="mb-1">This hirer wants to hire your for a work.</p>
                <small>If you accept the work, Please Contact the hirer.</small>
                <div className="row">
                  <button
                    type="button"
                    className="btn btn-success m-2"
                    onClick={() => this.onAccept(wr._id)}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger m-2"
                    onClick={() => this.onDecline(wr._id)}
                  >
                    Decline
                  </button>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { workRequests } = this.state;

    let workRequestsList;
    console.log(workRequests);
    if (workRequests.length === 0) {
      workRequestsList = (
        <div>
          <b>No any Work Requests !</b>
        </div>
      );
    } else {
      workRequestsList = <div> {this.renderWorkRequests(workRequests)}</div>;
    }

    return (
      <React.Fragment>
        <div className="container shadow p-5 mt-5">{workRequestsList}</div>
      </React.Fragment>
    );
  }
}
export default WorkRequests;
