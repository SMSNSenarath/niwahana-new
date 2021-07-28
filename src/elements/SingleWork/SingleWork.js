import React, { Component } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { saveAs } from "file-saver";
import io from "socket.io-client";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { like, unlike } from "./apiWork";
import Comment from "./Comment";

class SingleWork extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      category: "",
      fee: "",
      days: "",
      area: "",
      workerId: "",
      worker: "",
      phone: "",
      receiptNo: "",
      response: "",
      modalIsOpen: false,
      like: false,
      likes: 0,
      count: 0,
      comments: [],
      requestMessage: "",
    };
  }

  componentDidMount() {
    console.log(this.props);

    axios
      .get("/works/" + this.props.match.params.id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          title: response.data.title,
          category: response.data.category,
          fee: response.data.fee,
          area: response.data.area,
          worker: response.data.postedBy.name,
          workerId: response.data.postedBy._id,
          phone: response.data.postedBy.phone,
          likes: response.data.likes.length,
          like: this.checkLike(response.data.likes),
          comments: response.data.comments,
          count: response.data.count,
          receiptNo: Math.random(),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  checkLike = (likes) => {
    const hirerId = this.props.auth.user.id;
    let match = likes.indexOf(hirerId) !== -1;
    return match;
  };

  updateComments = (comments) => {
    this.setState({ comments });
  };

  likeToggle = () => {
    let callApi = this.state.like ? unlike : like;

    const hirerId = this.props.auth.user.id;
    const workId = this.props.match.params.id;

    callApi(hirerId, workId).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          like: !this.state.like,
          likes: data.likes.length,
        });
      }
    });
  };

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  };

  onChangeDays = (e) => {
    this.setState({
      days: e.target.value,
    });
  };

  onHireClick = () => {
    axios
      .get(
        "/requests/friend_request/" +
          this.state.workerId +
          "/" +
          this.props.match.params.id +
          "/send/" +
          this.props.auth.user.id
      )
      .then((res) => {
        this.setState({
          requestMessage: res.data,
          modalIsOpen: !this.state.modalIsOpen,
        });
        // alert(this.state.requestMessage);
      })
      .catch((err) => console.log(err));

    // axios
    //   .post("/purchase/" + this.props.match.params.id, { phoneNo, message })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // const hirerId = this.props.auth.user.id;
    // const workId = this.props.match.params.id;
    // const workerId = this.state.workerId;
    // axios
    //   .put("/works/purchase", { hirerId, workId, workerId })
    //   .then((response) => {
    //     console.log(response);
    //   });

    //Turn off sms
    const socket = io();
    socket.on("smsStatus", (data) => {
      this.setState({
        response: data.number,
      });
    });
  };

  createAndDownloadPdf = () => {
    axios
      .post("/create-pdf", this.state)
      .then(() => axios.get("/fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <div className="container mt-3 mb-3 p-5 shadow">
          <div className="row">
            <div className="col-md-7">
              <div className="row">
                <div className="col-md-6">
                  <h1>
                    <b>Get this Work</b>
                  </h1>
                </div>
                <div className="col-md-6 mt-2 text-right">
                  <button
                    className="btn btn-primary"
                    style={{ marginRight: "20px" }}
                    onClick={this.onHireClick}
                    // && this.toggleModal.bind(this)
                  >
                    Hire
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={this.createAndDownloadPdf}
                  >
                    Invoice
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  aria-describedby="emailHelp"
                  value={this.state.title}
                  readOnly
                  hidden
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={this.state.category}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Worker</label>
                <input
                  type="text"
                  className="form-control"
                  id="worker"
                  name="worker"
                  value={this.state.worker}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Fee</label>
                <input
                  type="text"
                  className="form-control"
                  id="fee"
                  name="fee"
                  value={this.state.fee}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Worker Contact No :</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={this.state.phone}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Days</label>
                <input
                  type="text"
                  className="form-control"
                  id="days"
                  name="days"
                  value={this.state.days}
                  onChange={this.onChangeDays}
                />
              </div>
              <div className="form-group">
                <label>Hirer(Me)</label>
                <input
                  type="text"
                  className="form-control"
                  id="hirer"
                  name="hirer"
                  value={this.props.auth.user.name}
                  readOnly
                />
              </div>

              <Modal isOpen={this.state.modalIsOpen}>
                <ModalHeader toggle={this.toggleModal.bind(this)}>
                  Success !
                </ModalHeader>
                <ModalBody>Contract Initialized</ModalBody>
                <ModalFooter>
                  <p>
                    A Nofitication SMS Sent to {this.state.response} -
                    {this.state.worker}
                  </p>
                </ModalFooter>
              </Modal>
            </div>
            <div className="col-md-5">
              <div className="row">
                <div className="col-md-6">
                  <h3>Reviews</h3>
                </div>
                <div className="col-md-6 mt-2 text-right">
                  <h5>{this.state.count} times purchased </h5>
                </div>
              </div>

              <hr />
              <div>
                {this.state.like ? (
                  <h5 onClick={this.likeToggle}>
                    <i
                      className="fa fa-thumbs-up text-success"
                      aria-hidden="true"
                      style={{ padding: "10px" }}
                    />
                    <span className="badge badge-success">Liked</span>
                  </h5>
                ) : (
                  <h5 onClick={this.likeToggle}>
                    <i
                      className="fa fa-thumbs-up text-danger"
                      aria-hidden="true"
                      style={{ padding: "10px" }}
                    />
                    <span className="badge badge-danger">Like</span>
                  </h5>
                )}
                <b className="ml-4">{this.state.likes} Likes</b>
                <hr />
                <Comment
                  workId={this.props.match.params.id}
                  comments={this.state.comments}
                  updateComments={this.updateComments}
                />
              </div>
            </div>
          </div>

          <hr />
        </div>
      </React.Fragment>
    );
  }
}

SingleWork.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(SingleWork);
