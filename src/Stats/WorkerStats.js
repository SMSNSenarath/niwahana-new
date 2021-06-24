import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

class WorkerStats extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      likeCount: 0,
      commentCount: 0,
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
  }

  render() {
    return (
      <div>
        Total Likes : {this.state.likeCount}, Total Comments :{" "}
        {this.state.commentCount}{" "}
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
