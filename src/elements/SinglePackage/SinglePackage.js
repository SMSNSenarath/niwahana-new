import React, { Component } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { saveAs } from "file-saver";
import io from "socket.io-client";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { like, unlike } from "./apiPackage";
import Comment from "./Comment";
import { Link } from "react-router-dom";

class SinglePackage extends Component {
  state = {
    title: "",
    type: "",
    area: "",
    discount: "",
    receiptNo: "",
    response: "",
    masonry: "",
    carpentry: "",
    house_wiring: "",
    plumber: "",
    painting: "",
    modalIsOpen: false,
    like: false,
    likes: 0,
    count: 0,
    comments: [],
    requestMessage: "",
  };

  componentDidMount() {
    console.log(this.props);

    axios
      .get("/packages/" + this.props.match.params.id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          title: response.data.title,
          type: response.data.type,
          area: response.data.area,
          discount: response.data.discount,
          masonry: response.data.masonry,
          carpentry: response.data.carpentry,
          house_wiring: response.data.house_wiring,
          plumber: response.data.plumber,
          painting: response.data.painting,
          likes: response.data.likes.length,
          like: this.checkLike(response.data.likes),
          comments: response.data.comments,
          count: response.data.count,
          receiptNo: Math.floor(Math.random() * 1000) + 1,
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
    const packageId = this.props.match.params.id;

    callApi(hirerId, packageId).then((data) => {
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
          this.state.packageerId +
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
    // const socket = io();
    // socket.on("smsStatus", (data) => {
    //   this.setState({
    //     response: data.number,
    //   });
    // });
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

    let masonry, carpentry, plumber, house_wiring, painting;

    console.log(this.state);

    if (this.state.masonry === undefined) {
      masonry = null;
    } else {
      masonry = (
        <div class="card" style={{ width: "38rem" }}>
          <div class="card-body">
            <h5 class="card-title">{this.state.masonry.category}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              {this.state.masonry.title}
            </h6>
            <p class="card-text">
              This work is by Mr. Ajith and his contact number is +94 77 620
              9217
            </p>
            <a href="#" class="card-link">
              Card link
            </a>
            <a href="#" class="card-link">
              Another link
            </a>
          </div>
        </div>
      );
    }
    if (this.state.carpentry === undefined) {
      carpentry = null;
    } else {
      carpentry = (
        <div class="card" style={{ width: "38rem" }}>
          <div class="card-body">
            <h5 class="card-title">{this.state.carpentry.category}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="card-link">
              Card link
            </a>
            <a href="#" class="card-link">
              Another link
            </a>
          </div>
        </div>
      );
    }
    if (this.state.plumber === undefined) {
      plumber = null;
    } else {
      plumber = (
        <div class="card" style={{ width: "38rem" }}>
          <div class="card-body">
            <h5 class="card-title">{this.state.plumber.category}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="card-link">
              Card link
            </a>
            <a href="#" class="card-link">
              Another link
            </a>
          </div>
        </div>
      );
    }
    if (this.state.house_wiring === undefined) {
      house_wiring = null;
    } else {
      house_wiring = (
        <div class="card" style={{ width: "38rem" }}>
          <div class="card-body">
            <h5 class="card-title">{this.state.house_wiring.category}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="card-link">
              Card link
            </a>
            <a href="#" class="card-link">
              Another link
            </a>
          </div>
        </div>
      );
    }
    if (this.state.painting === undefined) {
      painting = null;
    } else {
      painting = (
        <div class="card" style={{ width: "38rem" }}>
          <div class="card-body">
            <h5 class="card-title">{this.state.painting.category}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="card-link">
              Card link
            </a>
            <a href="#" class="card-link">
              Another link
            </a>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="container mt-3 mb-3 p-5 shadow">
          <div className="row">
            <div className="col-md-7">
              <div className="row">
                <div className="col-md-7">
                  <h1>
                    <b>
                      Get this package <h3>[{this.state.type}]</h3>
                    </b>
                  </h1>
                </div>
                <div className="col-md-5 mt-2 text-right">
                  <button
                    className="btn btn-primary"
                    style={{ marginRight: "20px" }}
                    onClick={this.onHireClick}
                    // && this.toggleModal.bind(this)
                  >
                    Purchase
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={this.createAndDownloadPdf}
                  >
                    Invoice
                  </button>
                </div>
              </div>

              <div className="mt-3">
                {masonry} <br />
                {carpentry} <br />
                {painting} <br />
                {house_wiring} <br />
                {plumber} <br />
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
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={this.state.type}
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
                <div className="row">
                  <div className="col-md-6">
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
                  </div>
                </div>

                <hr />
                <Comment
                  packageId={this.props.match.params.id}
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

SinglePackage.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(SinglePackage);
