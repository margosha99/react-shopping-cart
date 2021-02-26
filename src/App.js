import React  from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    }
  }
  createOrder = (order) => {
    alert("Need to save order for " + order.name)
  }
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({ cartItems: cartItems.filter( x => x._id !== product._id) });
    localStorage.setItem(
      "cartItems", 
      JSON.stringify(cartItems.filter( x => x._id !== product._id)));
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach( item => {
      if(item._id === product._id){
        item.count += 1;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart) {
      cartItems.push({...product, count: 1})
    }
    this.setState({cartItems})
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  render() {
    return (
      <div className="grid-container"> 
        <header>
          <a href="#">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter/>
              <Products addToCart={this.addToCart}/>
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart}
            createOrder={this.createOrder}/></div>
          </div>
        </main>
        <footer>All rights is reserved</footer>
      </div>
    );
  }
  
}

export default App;
