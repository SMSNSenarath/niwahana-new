import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import ReactStars from "react-stars";

import { Line } from "react-chartjs-2";

class PackagePerformance extends Component {
  state = {
    lineHighPremiumChartData: "",
    lineHighEliteChartData: "",
    lineHighNormalChartData: "",
    lineLowPremiumChartData: "",
    lineLowEliteChartData: "",
    lineLowNormalChartData: "",
  };

  componentDidMount() {
    this.setState({
      lineHighPremiumChartData: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Months",
            data: [6, 10, 5, 3, 10, 11, 12],
            backgroundColor: "#8c2634",
          },
        ],
      },

      lineHighEliteChartData: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Months",
            data: [3, 3, 5, 2, 5, 8, 7],
            backgroundColor: "#8c2634",
          },
        ],
      },

      lineHighNormalChartData: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Months",
            data: [10, 8, 11, 13, 15, 18, 17],
            backgroundColor: "#8c2634",
          },
        ],
      },

      lineLowPremiumChartData: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Months",
            data: [0, 0, 5, 2, 5, 8, 7],
            backgroundColor: "#8c2634",
          },
        ],
      },

      lineLowEliteChartData: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Months",
            data: [1, 2, 5, 3, 5, 4, 2],
            backgroundColor: "#8c2634",
          },
        ],
      },

      lineLowNormalChartData: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Months",
            data: [2, 5, 5, 2, 5, 4, 2],
            backgroundColor: "#8c2634",
          },
        ],
      },
    });
  }

  render() {
    return (
      <div className="container shadow text-center mt-5 mb-5 pt-5 pb-5">
        <h1>Package Performance Report</h1>
        <hr />
        <div>
          <div className="row">
            <hr />
            <div className="col-md-6 text-right" style={{ marginTop: "4rem" }}>
              <h3>Highest Rated Premium Package</h3>
              <h4>Package 3</h4>
              <h5>Number of times purchased - 56</h5>
              <h5>Number of Reccomendations - 150</h5>
            </div>
            <div className="col-md-6 text-right mt-4">
              <Line
                data={this.state.lineHighPremiumChartData}
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
            <hr />
          </div>
          <div className="row">
            <hr />
            <div className="col-md-6 text-right" style={{ marginTop: "4rem" }}>
              <h3>Highest Rated Elite Package</h3>
              <h4>Package 5</h4>
              <h5>Number of times purchased - 40</h5>
              <h5>Number of Reccomendations - 78</h5>
            </div>
            <div className="col-md-6 text-right mt-4">
              <Line
                data={this.state.lineHighEliteChartData}
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
            <hr />
          </div>
          <div className="row">
            <hr />
            <div className="col-md-6 text-right" style={{ marginTop: "4rem" }}>
              <h3>Highest Rated Normal Package</h3>
              <h4>Package 1</h4>
              <h5>Number of times purchased - 100</h5>
              <h5>Number of Reccomendations - 120</h5>
            </div>
            <div className="col-md-6 text-right mt-4">
              <Line
                data={this.state.lineHighNormalChartData}
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
            <hr />
          </div>
          <div className="row">
            <hr />
            <div className="col-md-6 text-right" style={{ marginTop: "4rem" }}>
              <h3>Lowest Rated Premium Package</h3>
              <h4>Package 2</h4>
              <h5>Number of times purchased - 2</h5>
              <h5>Number of Reccomendations - 1</h5>
            </div>
            <div className="col-md-6 text-right mt-4">
              <Line
                data={this.state.lineLowPremiumChartData}
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
            <hr />
          </div>
          <div className="row">
            <hr />
            <div className="col-md-6 text-right" style={{ marginTop: "4rem" }}>
              <h3>Lowest Rated Elite Package</h3>
              <h4>Package 8</h4>
              <h5>Number of times purchased - 0</h5>
              <h5>Number of Reccomendations - 1</h5>
            </div>
            <div className="col-md-6 text-right mt-4">
              <Line
                data={this.state.lineLowEliteChartData}
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
            <hr />
          </div>
          <div className="row">
            <hr />
            <div className="col-md-6 text-right" style={{ marginTop: "4rem" }}>
              <h3>Lowest Rated Normal Package</h3>
              <h4>Package 10</h4>
              <h5>Number of times purchased - 2</h5>
              <h5>Number of Reccomendations - 10</h5>
            </div>
            <div className="col-md-6 text-right mt-4">
              <Line
                data={this.state.lineLowNormalChartData}
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
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

PackagePerformance.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PackagePerformance);
