import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct,
    cart: [],
    modalProduct: detailProduct,
    modalOpen: false,
    subTotal: 0,
    tax: 0,
    total: 0,
  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let products = [];

    storeProducts.forEach((product) => {
      const singleProduct = { ...product }; // destructuring product object
      products = [...products, singleProduct]; // appending product to existing products array
    });

    this.setState(() => {
      return { products };
    });
  };

  getProduct = (id) => {
    return this.state.products.find((product) => product.id === id);
  };

  handleDetail = (id) => {
    this.setState(() => {
      return { detailProduct: this.getProduct(id) };
    });
  };

  addToCart = (id) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getProduct(id)); // getting id of the added product
    const product = tempProducts[index]; // getting actual product from products
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(
      () => {
        return {
          products: tempProducts,
          cart: [...this.state.cart, product], // adding new product to existing cart
        };
      },
      () => {
        this.addTotal();
      }
    );
  };

  openModal = (id) => {
    this.setState(() => {
      return { modalOpen: true, modalProduct: this.getProduct(id) };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  // Increment quantity
  increment = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => id === item.id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count += 1;
    product.total = product.price * product.count;

    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotal();
      }
    );
  };

  // Decrement quantity
  decrement = (id) => {
    let tempCart = [...this.state.cart];
    let selectedProduct = tempCart.find((item) => item.id === id);
    let index = tempCart.indexOf(selectedProduct);
    let product = tempCart[index];

    product.count -= 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.price * product.count;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotal();
        }
      );
    }
  };

  // remove Item
  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter((item) => item.id !== id);
    const index = tempProducts.indexOf(this.getProduct(id));
    const removedProduct = tempProducts[index];

    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts],
        };
      },
      () => {
        this.addTotal();
      }
    );
  };

  // Removing each item
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotal();
      }
    );
  };

  // Counting total
  addTotal = () => {
    let subTotal = 0;

    let total = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    let tax = Number.parseFloat((subTotal * 0.1).toFixed(2));
    total = subTotal + tax;

    this.setState(() => {
      return { subTotal, tax, total };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
