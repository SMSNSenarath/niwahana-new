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
      likeCount: 0,
      commentCount: 0,
      lineChartData: "",
    };
  }

  componentDidMount() {
    const tempLikeCount = [];
    const tempCommentCount = [];
    axios
      .get("/stats/total-likes/" + this.props.auth.user.id)
      .then((response) => {
        console.log(response.data);
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

    this.setState({
      lineChartData: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Months",
            data: [0, 0, 5, 2, 5, 8, 7],
            backgroundColor: "#8c2634",
          },
        ],
      },
    });
  }

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
              <h5>Ajith Wasantha</h5>
              Carpenter
              <br />
              Ratnapura
              <ReactStars count={5} size={24} color2={"#ffd700"} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 text-right mt-4">
              <h5>Number of Contracts got - 10</h5>
              <h5>Number of Contracts confirmed - 8</h5>
              <h5>Number of Contracts rejected - 2</h5>

              <div
                class="card text-white bg-success mb-3 text-left mt-5"
                style={{ width: "35rem" }}
              >
                <div class="card-header">Top Work</div>
                <div class="card-body">
                  <h5 class="card-title">I will make sofas</h5>
                  <p class="card-text">
                    This work has 100 Likes and 10 comments.
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
                    78 Total Likes
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
                    13 Total Comments
                  </div>
                </div>
              </div>

              <div class="card mt-3">
                <h5 class="card-header">Latest Comments</h5>
                <div class="card-body">
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
                </div>
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
