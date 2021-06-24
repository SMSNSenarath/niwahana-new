import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { Wave } from "react-animated-text";
import "./Home.css";

class Home extends Component {
  state = {
    modalIsOpen: false,
  };

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  };

  redirectToWorker = () => {
    window.location = "/worker-register";
  };
  redirectToHirer = () => {
    window.location = "/hirer-register";
  };

  render() {
    return (
      <div className="home">
        <div className="container">
          <div>
            <img
              src="logo.png"
              style={{ width: "300px", height: "auto", marginTop: "5%" }}
              alt=""
            />
          </div>
          <br /> <br />
          <h5>
            <Wave
              className="shadow"
              text="A Constrcution Services Web Platform to connect Hirers and Workers"
              effect="fadeOut"
              speed="15"
            />
          </h5>
          <br /> <br />
          <div className="row">
            <div className="col-sm-6" style={{ textAlign: "right" }}>
              <Link to="/hirer-login">
                <button className="btn btn-primary btn-lg col-md-6 shadow">
                  I want to work as a<br />
                  <b>Hirer</b>
                </button>
              </Link>
            </div>

            <div className="col-sm-6" style={{ textAlign: "left" }}>
              <Link to="/worker-login">
                <button className="btn btn-primary btn-lg col-md-6 shadow">
                  I want to work as a<br />
                  <b>Worker</b>
                </button>
              </Link>
            </div>
          </div>
          <br /> <br />
          <div>
            <button
              href="/"
              className="btn btn-link"
              onClick={this.toggleModal.bind(this)}
            >
              <h3>Create an Account?</h3>
            </button>
          </div>
          <Modal isOpen={this.state.modalIsOpen}>
            <ModalHeader toggle={this.toggleModal.bind(this)}>
              Sign Up
            </ModalHeader>
            <ModalBody>How do you want to sign up as?</ModalBody>
            <ModalFooter>
              <button
                className="btn btn-primary"
                onClick={this.redirectToHirer}
              >
                Sign as Hirer
              </button>
              <button
                className="btn btn-primary"
                onClick={this.redirectToWorker}
              >
                Sign as Worker
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Home;
