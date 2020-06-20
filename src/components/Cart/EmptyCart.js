import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ButtonContainer } from "../Button";

class EmptyCart extends Component {
  state = {};
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-10 mx-auto text-center text-capitalize mb-3">
            <h1>your cart is currently empty</h1>
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

export default EmptyCart;
