import React,{ Component } from 'react'
import formatCurrency from '../util'
import Modal from 'react-modal';
import Fade from "react-reveal/Fade";
import { fetchProducts } from '../actions/productActions';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cartActions';


class Products extends Component {

    constructor(props){
        super(props);
        this.state ={
            show: false,
            product: null
        }
        
    }
    componentDidMount(){
        this.props.fetchProducts();
    }
    showModal = (product) => {
        this.setState({product})
    }   
    closeModal = () =>{
        this.setState({
            product: null
          });
    }
    render() {
        const { product } = this.state;
        return (
            <div>
                <Fade bottom cascade>
                    { !this.props.products ? (<div>Loading...</div>) : (
                        <ul className="products">
                            {this.props.products.map(product => (
                                <li key={product._id}>
                                    <div className="product">
                                        <a href={"#" + product._id} onClick={() => this.showModal(product)}>
                                        <img src={product.image} alt={product.title}/>
                                        <p>{product.title}</p>
                                        </a>
                                        <div className="product-price">
                                            <p>{formatCurrency(product.price)}</p>
                                            <button className="button primary" onClick={() => this.props.addToCart(product)}>Add To Cart</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </Fade>
                {product && 
                    <Modal isOpen={true}
                    onRequestClose={this.closeModal}
                    ariaHideApp={false}>
                    
                        <div className="modal-main">
                            <img src={product.image} alt={product.title}></img>
                            <div className="modal-info">
                                <p>{product.title}</p>
                                <p>{product.description}</p>
                                <p>Available sizes:
                                    {product.availableSizes.map(size => (
                                        <button className="size-btn">{size}</button>
                                    ))}
                                </p>
                                <div className="modal-price">
                                    <span>{formatCurrency(product.price)}</span>
                                    <button className="button" onClick={()=> this.props.addToCart(product)}>Add to Cart</button>
                                </div>
                            </div>
                            <button type="button" className="close-modal" onClick={this.closeModal}>x</button>
                        </div>
                    </Modal>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.filteredItems
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        addToCart: (product) => dispatch(addToCart(product))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Products);