import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import ReactStars from "react-stars";

import { Line } from "react-chartjs-2";

class PackagePerformance extends Component {
  state = {
    highPremium: "",
    highElite: "",
    highNormal: "",

    lowPremium: "",
    lowElite: "",
    lowNormal: "",

    lineHighPremiumChartData: "",
    lineHighEliteChartData: "",
    lineHighNormalChartData: "",
    lineLowPremiumChartData: "",
    lineLowEliteChartData: "",
    lineLowNormalChartData: "",
  };

  componentDidMount() {
    axios.get("/stats/highest-premium-package").then((res) => {
      console.log(res.data);
      this.setState({
        highPremium: res.data[0],
      });
    });

    axios.get("/stats/highest-elite-package").then((res) => {
      console.log(res.data);
      this.setState({
        highElite: res.data[0],
      });
    });

    axios.get("/stats/highest-normal-package").then((res) => {
      console.log(res.data);
      this.setState({
        highNormal: res.data[0],
      });
    });

    axios.get("/stats/lowest-premium-package").then((res) => {
      console.log(res.data);
      this.setState({
        lowPremium: res.data[0],
      });
    });

    axios.get("/stats/lowest-elite-package").then((res) => {
      console.log(res.data);
      this.setState({
        lowElite: res.data[0],
      });
    });

    axios.get("/stats/lowest-normal-package").then((res) => {
      console.log(res.data);
      this.setState({
        lowNormal: res.data[0],
      });
    });

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
              <h4>{this.state.highPremium.title}</h4>
              <h5>
                Number of times purchased - {this.state.highPremium.count}
              </h5>
              <h5>
                Number of Reccomendations -{" "}
                {this.state.highPremium.likes
                  ? this.state.highPremium.likes.length
                  : 0}
              </h5>
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
              <h4>{this.state.highElite.title}</h4>
              <h5>Number of times purchased - {this.state.highElite.count}</h5>
              <h5>
                Number of Reccomendations -{" "}
                {this.state.highElite.likes
                  ? this.state.highElite.likes.length
                  : 0}
              </h5>
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
              <h4>{this.state.highNormal.title}</h4>
              <h5>Number of times purchased - {this.state.highNormal.count}</h5>
              <h5>
                Number of Reccomendations -{" "}
                {this.state.highNormal.likes
                  ? this.state.highNormal.likes.length
                  : 0}
              </h5>
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
              <h4>{this.state.lowPremium.title}</h4>
              <h5>Number of times purchased - {this.state.lowPremium.count}</h5>
              <h5>
                Number of Reccomendations -{" "}
                {this.state.lowPremium.likes
                  ? this.state.lowPremium.likes.length
                  : 0}
              </h5>
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
              <h4>{this.state.lowElite.title}</h4>
              <h5>Number of times purchased - {this.state.lowElite.count}</h5>
              <h5>
                Number of Reccomendations -{" "}
                {this.state.lowElite.likes
                  ? this.state.lowElite.likes.length
                  : 0}
              </h5>
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
              <h4>{this.state.lowNormal.title}</h4>
              <h5>Number of times purchased - {this.state.lowNormal.count}</h5>
              <h5>
                Number of Reccomendations -{" "}
                {this.state.lowNormal.likes
                  ? this.state.lowNormal.likes.length
                  : 0}
              </h5>
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
