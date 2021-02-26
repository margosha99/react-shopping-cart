import React  from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";

class App extends React.Component {

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
              <Products/>
            </div>
            <div className="sidebar">
              <Cart />
            </div>
          </div>
        </main>
        <footer>All rights is reserved</footer>
      </div>
    );
  }
  
}

export default App;
