import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

class NotFound extends Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-10 mx-auto text-center text-capitalize mb-3">
            <h1>404</h1>
            <h2>page not found</h2>
            <h3>
              the requested url was{" "}
              <span className="text-danger">
                {this.props.location.pathname}
              </span>{" "}
              not found
            </h3>
          </div>
          <div className="mx-auto">
            <Link to="/">
              <ButtonContainer>continue shopping</ButtonContainer>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
