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
      comments: [],
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
    const phoneNo = this.state.phone;
    const message = `A new work of ${this.state.category} from ${this.props.auth.user.phone} - ${this.props.auth.user.name}`;
    console.log(this.props.match.params.id);
    axios
      .post("/purchase/" + this.props.match.params.id, { phoneNo, message })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    const hirerId = this.props.auth.user.id;
    const workId = this.props.match.params.id;
    const workerId = this.state.workerId;
    axios
      .put("/works/purchase", { hirerId, workId, workerId })
      .then((response) => {
        console.log(response);
      });

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
      <div style={{ textAlign: "left" }}>
        <h2>
          <b>Get this Work</b>
        </h2>

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
            value={this.state.category}
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

        <button
          className="btn btn-primary"
          style={{ marginRight: "20px" }}
          onClick={this.onHireClick}
          // && this.toggleModal.bind(this)
        >
          Hire
        </button>
        <button className="btn btn-primary" onClick={this.createAndDownloadPdf}>
          Print Reciept
        </button>

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

        <h3>Reviews</h3>
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
          <b>{this.state.likes} Likes</b>
          <hr />
          <Comment
            workId={this.props.match.params.id}
            comments={this.state.comments}
            updateComments={this.updateComments}
          />
        </div>
      </div>
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
