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
    masonryWorker: "",
    carpentry: "",
    carpentryWorker: "",
    house_wiring: "",
    house_wiringWorker: "",
    plumber: "",
    plumberWorker: "",
    painting: "",
    paintingWorker: "",
    modalIsOpen: false,
    like: false,
    likes: 0,
    count: 0,
    comments: [],
    requestMessage: "",
    numberOfWorks: 0,
    modalIsOpen: false,
  };

  componentDidMount() {
    axios
      .get("/packages/" + this.props.match.params.id)
      .then((response) => {
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

  onPurchaseClick = () => {
    const packageData = {
      hirerId: this.props.auth.user.id,
      packageId: this.props.match.params.id,
      masonryWorker: this.state.masonryWorker,
      masonryId: this.state.masonry,
      carpentryWorker: this.state.carpentryWorker,
      carpentryId: this.state.carpentry,
      house_wiringWorker: this.state.house_wiringWorker,
      house_wiringId: this.state.house_wiring,
      plumberWorkerId: this.state.plumberWorker,
      plumberId: this.state.plumber,
      paintingWorker: this.state.paintingWorker,
      paintingId: this.state.painting,
    };

    axios
      .post("/packages/purchase-package/", packageData)
      .then((res) => {
        this.setState({
          modalIsOpen: !this.state.modalIsOpen,
        });
      })
      .catch((err) => console.log(err));

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
      .post("/packages/create-invoice", this.state)
      .then(() => axios.get("/fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "package-invoice.pdf");
      })
      .catch((err) => console.log(err));
  };

  render() {
    let masonry, carpentry, plumber, house_wiring, painting;
    if (this.state.masonry === undefined) {
      masonry = null;
    } else {
      axios.get("/workers/" + this.state.masonry.postedBy).then((res) => {
        this.setState({
          masonryWorker: res.data,
        });
      });
      masonry = (
        <div class="card" style={{ width: "38rem" }}>
          <div class="card-body">
            <h5 class="card-title">{this.state.masonry.category}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              {this.state.masonry.title}
            </h6>
            <p class="card-text">
              This work is by <b> Mr.{this.state.masonryWorker.name} </b>and his
              contact number is <b>{this.state.masonryWorker.phone}</b>
            </p>
            <a class="card-link">Price (Per Day) - {this.state.masonry.fee}</a>
            <Link to={`/works/${this.state.masonry._id}`} class="card-link">
              View Work
            </Link>
          </div>
        </div>
      );
    }
    if (this.state.carpentry === undefined) {
      carpentry = null;
    } else {
      axios.get("/workers/" + this.state.carpentry.postedBy).then((res) => {
        this.setState({
          carpentryWorker: res.data,
        });
      });
      carpentry = (
        <div class="card" style={{ width: "38rem" }}>
          <div class="card-body">
            <h5 class="card-title">{this.state.carpentry.category}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              {this.state.carpentry.title}
            </h6>
            <p class="card-text">
              This work is by <b> Mr.{this.state.carpentryWorker.name} </b>and
              his contact number is <b>{this.state.carpentryWorker.phone}</b>
            </p>
            <a class="card-link">
              Price (Per Day) - {this.state.carpentry.fee}
            </a>
            <Link to={`/works/${this.state.carpentry._id}`} class="card-link">
              View Work
            </Link>
          </div>
        </div>
      );
    }
    if (this.state.plumber === undefined) {
      plumber = null;
    } else {
      axios.get("/workers/" + this.state.plumber.postedBy).then((res) => {
        this.setState({
          plumberWorker: res.data,
        });
      });
      plumber = (
        <div class="card" style={{ width: "38rem" }}>
          <div class="card-body">
            <h5 class="card-title">{this.state.plumber.category}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              {this.state.plumber.title}
            </h6>
            <p class="card-text">
              This work is by <b> Mr.{this.state.plumberWorker.name} </b>and his
              contact number is <b>{this.state.plumberWorker.phone}</b>
            </p>
            <a class="card-link">Price (Per Day) - {this.state.plumber.fee}</a>
            <Link to={`/works/${this.state.plumber._id}`} class="card-link">
              View Work
            </Link>
          </div>
        </div>
      );
    }
    if (this.state.house_wiring === undefined) {
      house_wiring = null;
    } else {
      axios.get("/workers/" + this.state.house_wiring.postedBy).then((res) => {
        this.setState({
          house_wiringWorker: res.data,
        });
      });
      house_wiring = (
        <div class="card" style={{ width: "38rem" }}>
          <div class="card-body">
            <h5 class="card-title">{this.state.house_wiring.category}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              {this.state.house_wiring.title}
            </h6>
            <p class="card-text">
              This work is by <b> Mr.{this.state.house_wiringWorker.name} </b>
              and his contact number is
              <b>{this.state.house_wiringWorker.phone}</b>
            </p>
            <a class="card-link">
              Price (Per Day) - {this.state.house_wiring.fee}
            </a>
            <Link
              target={"_blank"}
              to={`/works/${this.state.house_wiring._id}`}
              class="card-link"
            >
              View Work
            </Link>
          </div>
        </div>
      );
    }
    if (this.state.painting === undefined) {
      painting = null;
    } else {
      axios.get("/workers/" + this.state.painting.postedBy).then((res) => {
        this.setState({
          paintingWorker: res.data,
        });
      });
      painting = (
        <div class="card" style={{ width: "38rem" }}>
          <div class="card-body">
            <h5 class="card-title">{this.state.painting.category}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              {this.state.painting.title}
            </h6>
            <p class="card-text">
              This work is by <b> Mr.{this.state.paintingWorker.name} </b>
              and his contact number is
              <b>{this.state.paintingWorker.phone}</b>
            </p>
            <a class="card-link">Price (Per Day) - {this.state.painting.fee}</a>
            <Link
              target={"_blank"}
              to={`/works/${this.state.painting._id}`}
              class="card-link"
            >
              View Work
            </Link>
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
                    onClick={this.onPurchaseClick}
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
                <ModalBody>Package Initialized</ModalBody>
                <ModalFooter>
                  <p>A Nofitication SMS Sent to workers</p>
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
