import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";

class Modal extends Component {
  state = {};
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { modalOpen, closeModal, modalProduct } = value;
          const { img, title, price } = modalProduct;

          if (!modalOpen) {
            return null;
          } else {
            return (
              <ModalContainer>
                <div className="container">
                  <div className="row">
                    <div
                      id="modal"
                      className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5"
                    >
                      <Link to="/">
                        <i
                          className="fas fa-window-close fa-lg modal-close"
                          onClick={() => closeModal()}
                        />
                      </Link>
                      <i />
                      <h5>item added to the cart</h5>
                      <img src={img} alt={title} className="img-fluid" />
                      <div className="text-capitalize mt-3 mb-2">{title}</div>
                      <div className="text-muted text-blue mb-3">
                        Price : $ {price}
                      </div>
                      <Link to="/">
                        <ButtonContainer onClick={() => closeModal()}>
                          continue shopping
                        </ButtonContainer>
                      </Link>
                      <Link to="/cart">
                        <ButtonContainer cart onClick={() => closeModal()}>
                          go to cart
                        </ButtonContainer>
                      </Link>
                    </div>
                  </div>
                </div>
              </ModalContainer>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1s linear;

  #modal {
    background: var(--mainWhite);
    position: relative;
  }

  .modal-close {
    position: absolute;
    right: 0;
    top: 0;
    padding: 1rem;
    color: var(--lightBlue);
  }
`;

export default Modal;
