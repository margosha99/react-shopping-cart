import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import { removeFromCart } from '../actions/cartActions'
import { connect } from 'react-redux';

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state ={ 
            name: "",
            email: "",
            address: "",
            showCheckout: false
        }

    }
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    createOrder = (e) =>{
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems 
        }

        this.props.createOrder(order);
    }
    render() {
        const {cartItems} = this.props;
        let sum = 0;
        return (
            <div>
                {this.props.cartItems.length === 0 ? 
                <div className="cart cart-header">Cart is empty</div> 
                : <div className="cart cart-header">You have {cartItems.length} items in the cart </div> }

                <div>
                    <div className="cart">
                        <Fade left cascade>
                        <ul className="cart-items">
                            {cartItems.map(item => (
                                <li key={item._id}> 
                                    <div>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {formatCurrency(item.price)} x {item.count} {" "}
                                            <button className="cart-item-btn" onClick={ () => this.props.removeFromCart(item)}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        </Fade>
                    </div>
                    {cartItems.lenght !== 0 && (
                        <div>
                            <div className="cart">
                                <div className="total">
                                    <div>
                                    Total:{" "}
                                    {formatCurrency(cartItems.reduce((sum, curElement) => 
                                        sum + (curElement.price*curElement.count), 0))}                                
                                    </div>
                                    <button className="btn-proceed" 
                                        onClick={() => {this.setState({showCheckout: true}) }}>Proceed</button>
                                </div>
                            </div>
                            {this.state.showCheckout && (
                                <Fade left cascade>
                                    <div className="cart">
                                        <form onSubmit={this.createOrder}>
                                            <ul className="form-container">
                                                <li>
                                                    <lable>Email</lable>
                                                    <input name="email" type="email" required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <lable>Name</lable>
                                                    <input name="name" type="text" required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <lable>Address</lable>
                                                    <input name="address" type="text" required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <button className="primary" type="submit">Checkout</button>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </Fade>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const  mapStateToProps = state => {
    return {
        cartItems: state.cart.cartItems
    }
}
const mapDispatchToProps = dispatch => {
    return{
        removeFromCart: (item) => dispatch(removeFromCart(item))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);