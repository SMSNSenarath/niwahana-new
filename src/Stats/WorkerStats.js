import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import ReactStars from "react-stars";

import { Line } from "react-chartjs-2";

class WorkerStats extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      workerName: "",
      likeCount: 0,
      commentCount: 0,
      latestComments: [],
      lineChartData: "",
      onGoingWorks: 0,
      topWorkId: "",
      topWork: "",
      workRatings: "",
      monthIndex: [],
      countIndex: [],
    };
  }

  componentDidMount() {
    const tempLikeCount = [];
    const tempCommentCount = [];

    const tempMonthIndex = [];
    const tempCountIndex = [];

    axios.get("/workers/" + this.props.match.params.id).then((response) => {
      this.setState({
        workerName: response.data.name,
        onGoingWorks: response.data.onGoingWorks.length,
      });
    });

    axios
      .get("/stats/top-work/" + this.props.match.params.id)
      .then((response) => {
        console.log(response.data[0]);
        this.setState({
          topWorkId:
            response.data.length !== 0 ? response.data[0]._id : "No Works!",
        });
        axios.get("/works/" + this.state.topWorkId).then((response) => {
          console.log(response.data);
          this.setState({
            topWork: response.data,
          });
        });
      });

    axios
      .get("/stats/total-likes/" + this.props.auth.user.id)
      .then((response) => {
        for (const dataObj of response.data) {
          tempLikeCount.push(dataObj.Count);
        }
        this.setState({
          likeCount: tempLikeCount.reduce(function (a, b) {
            return a + b;
          }, 0),
        });
      });

    axios
      .get("/stats/total-comments/" + this.props.auth.user.id)
      .then((response) => {
        console.log(response.data);
        for (const dataObj of response.data) {
          tempCommentCount.push(dataObj.Count);
        }
        this.setState({
          commentCount: tempCommentCount.reduce(function (a, b) {
            return a + b;
          }, 0),
        });
      });

    axios
      .get("/stats/latest-comments/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          latestComments: response.data,
        });
      });

    axios
      .get("/stats/monthly/work-likes/" + this.props.match.params.id)
      .then((response) => {
        for (const comment of response.data[0].comment) {
          tempCountIndex.push(comment.count);
          tempMonthIndex.push(comment.month);
        }
        console.log(tempCountIndex);
        console.log(tempMonthIndex);
        this.setState({
          // workRatings: response.data ? response.data[0].comment : "No Works",
          lineChartData: {
            labels: tempMonthIndex,
            datasets: [
              {
                label: "Months",
                data: tempCountIndex,
                backgroundColor: "#8c2634",
              },
            ],
          },
        });
      });

    console.log(this.state.monthIndex);

    // this.setState({
    //   lineChartData: {
    //     labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
    //     datasets: [
    //       {
    //         label: "Months",
    //         data: [0, 0, 5, 2, 5, 8, 7],
    //         backgroundColor: "#8c2634",
    //       },
    //     ],
    //   },
    // });
  }

  renderLatestComments = (comments) => {
    return (
      <div className="card-body">
        {comments.map((comment, index) => {
          return (
            <React.Fragment>
              <div class="card-text">
                {comment.comments.map((inner_comment, index) => {
                  return (
                    <React.Fragment>
                      <div>
                        <h5 class="card-title">
                          {inner_comment.postedBy.name}
                        </h5>
                        <p class="card-text"> {inner_comment.text}</p> <hr />
                        <br />
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  render() {
    const ratingChanged = (newRating) => {
      console.log(newRating);
    };

    return (
      <div className="container shadow text-center mt-5 pt-5 pb-5">
        <h1>Worker's Rate Report</h1>
        <hr />
        <div>
          <div className="row">
            <div className="col-md-6 text-right">
              <img
                src="https://i.imgur.com/OHP6QuN.jpg"
                alt="..."
                width="200px"
              />
            </div>
            <div className="col-md-6 text-left mt-4">
              <h5>{this.state.workerName}</h5>
              Carpenter
              <br />
              Ratnapura
              <ReactStars count={5} size={24} color2={"#ffd700"} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 text-right mt-4">
              <hr />
              <h5>Number of Contracts got - {this.state.onGoingWorks}</h5>
              <h5>Number of Contracts confirmed - 8</h5>
              <h5>Number of Contracts rejected - 2</h5>
              <hr />
              <div
                class="card text-white bg-success mb-3 text-left mt-5"
                style={{ width: "35rem" }}
              >
                <div class="card-header">Top Work</div>
                <div class="card-body">
                  <h5 class="card-title">{this.state.topWork.title}</h5>
                  <p class="card-text">
                    This work has{" "}
                    {this.state.topWork.likes
                      ? this.state.topWork.likes.length
                      : 0}{" "}
                    Likes and{" "}
                    {this.state.topWork.comments
                      ? this.state.topWork.comments.length
                      : 0}{" "}
                    comments.
                  </p>
                </div>
              </div>

              <div className="chart" style={{ textAlign: "center" }}>
                Ratings Evaluation over the time
                <hr />
                <Line
                  data={this.state.lineChartData}
                  options={{
                    maintainAspectRatio: true,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                            userCallback: function (label, index, labels) {
                              if (Math.floor(label) === label) {
                                return label;
                              }
                            },
                          },
                        },
                      ],
                    },
                  }}
                />
              </div>
            </div>

            <div className="col-md-6 text-left mt-4">
              <div className="row">
                <div className="col-md-6">
                  <div
                    class="rectangle text-center pt-2"
                    style={{
                      height: "50px",
                      width: "200px",
                      backgroundColor: " #a23939",
                      color: "#fff",
                    }}
                  >
                    {this.state.likeCount} Total Likes
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    class="rectangle text-center pt-2"
                    style={{
                      height: "50px",
                      width: "200px",
                      backgroundColor: " #a23939",
                      color: "#fff",
                    }}
                  >
                    {this.state.commentCount} Total Comments
                  </div>
                </div>
              </div>

              <div class="card mt-3">
                <h5 class="card-header">Latest Comments</h5>
                {this.renderLatestComments(this.state.latestComments)}
                {/* <div class="card-body">
                  <h5 class="card-title">Ajith</h5>
                  <p class="card-text">Great and Quality worker !</p>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Perera</h5>
                  <p class="card-text">Understand the requirements well !</p>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Silva</h5>
                  <p class="card-text">Good Communication !</p>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Silva</h5>
                  <p class="card-text">Good Communication !</p>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Silva</h5>
                  <p class="card-text">Good Communication !</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WorkerStats.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(WorkerStats);
