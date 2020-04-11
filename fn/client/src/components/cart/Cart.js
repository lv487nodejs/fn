import React, { useEffect, useState } from "react";
import connect from "react-redux/es/connect/connect";
import './Cart.css'
import { Link } from 'react-router-dom';
import { Figure, Button } from 'react-bootstrap'
import Row from "react-bootstrap/Row";
import Container from "@material-ui/core/Container/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { increaseToCart, decreaseFromCart, removeFromCart, addToCart } from "../../actions";
import withStoreService from "../hoc";

const userId = JSON.parse(localStorage.getItem('userId'))
const accessToken = JSON.parse(localStorage.getItem('accessToken'))


const Cart = ({cartProducts, increaseToCart, decreaseFromCart, removeFromCart, currencyIcon, currency, cartAndStoreService:{cartService, storeService} }) => {
  const [products, setProducts] = useState(cartProducts)
    let cartId

  useEffect(
      () => {
        if (userId)
          {
            storeService.getUserById(userId, accessToken).then((res) => {
                cartId = res.data.user.cart._id
                cartService.getCartById(cartId).then((res) => {
                    const cartItemRes = res.cartItems
                    console.log(cartItemRes)
                        cartItemRes.map( el => storeService.getProductById(el.productId)
                            .then((res) => {const filteredItem = res.propetries.filter((el) => el._id[0] === cartItemRes.productSizeId)
                    const productToSend = { ...product, propetries: _id[0] }
                    addToCart(productToSend);))}
                })

            })
        }
        //     {
        //       storeService.getUserById(userId, accessToken).then((res) => {
        //         cartId = res.data.user.cart._id
        //           const toBackItems = cartProducts.map(el => {
        //                   return {
        //                       productId: el.id,
        //                       productSizeId: el.propetries._id,
        //                       quantity: el.quantity
        //                   }
        //               })
        //           const readyItemsToBackend = {
        //             cartItems: toBackItems,
        //               userId: userId
        //           }
        //            cartService.updateCart(cartId, readyItemsToBackend)
        //       })
        //     }
        else if (localStorage.getItem('products-collection')) {
      setProducts(JSON.parse(localStorage.getItem('products-collection')));
      const cartItem = {cartItems: [localStorage.getItem('products-collection')]}
    }
  }, []);

  const handleIncreaseToCart = (item) => {
    increaseToCart(item);
    let foundIncreaseItems = products.find(value => value.propetries._id === item.propetries._id);
    foundIncreaseItems.quantity += 1;
  };

  const handleDecreaseFromCart = (item) => {
    let foundIncreaseItems = products.find(value => value.propetries._id === item.propetries._id);
    let foundToRemove = products.findIndex(value => value.propetries._id === item.propetries._id);
    if (foundIncreaseItems.quantity === 1) {
      products.splice(foundToRemove, 1);
    } else {
      foundIncreaseItems.quantity -= 1;
    }
    decreaseFromCart(item);
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
    let foundIncreaseItems = products.findIndex(value => value.propetries._id === item.propetries._id);
    products.splice(foundIncreaseItems, 1)
  };

  const salePrices = [];
  const fullPrices = [];
  products.map(i => {
    const price = i.price * i.quantity;
    return salePrices.push(price)
  });

  products.map(i => {
    const price = i.mrsp * i.quantity;
    return fullPrices.push(price)
  });

  const fullPrice =
    fullPrices.length === 1 ? fullPrices[0] :
      fullPrices.length > 1 ? fullPrices.reduce((accumulator, currentValue) => accumulator + currentValue) :
        0;

  const total =
    salePrices.length === 1 ? salePrices[0] :
      salePrices.length > 1 ? salePrices.reduce((accumulator, currentValue) => accumulator + currentValue) :
        0;

  const sale = fullPrice - total;

  return (
    <div className='main-cart'>
      <h3>Cart</h3>
      <h5>{products.length < 1 && <em> Please add some products to cart.</em>}</h5>
      <ul className='cart-wrap'>
        {products.map((item) => (
          <li key={item.propetries._id} className='cart-item'>
            <Container>
              <Row>
                <Figure.Image src={`/images/products/${item.images[0]}`} className='cart-img' />
                <Figure.Caption className='cart-title'>
                  {item.title}
                  <p> Price:
                  <span className="price">{item.price * currency * item.quantity} {currencyIcon}</span>
                  <span className="msrp-price">{item.mrsp * currency * item.quantity} {currencyIcon}</span>
                  </p>
                  <p> Size: <span>{item.propetries.size[0]}</span> </p>
                  <div className="quantity-control">
                    <FontAwesomeIcon
                      icon={faMinus}
                      className="remove-from-cart-button"
                      onClick={() => handleDecreaseFromCart(item)} />
                    <span id="quantity"> {item.quantity} </span>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="add-to-cart-button"
                      onClick={() => handleIncreaseToCart(item)} />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="delte-cart-button"
                      onClick={() => handleRemoveFromCart(item)} />
                  </div>
                </Figure.Caption>
              </Row>
            </Container>
          </li>
        ))}
        <div className='checkout-wrap'>
          <h5>{products.length >= 1 && <em>Total: {total} {currencyIcon} </em>} </h5>
          <h5>{products.length >= 1 && <em>Sale: {sale} {currencyIcon}</em>} </h5>
          <Link to="/checkout" className={products.length >= 1 ? 'disp-block' : 'disp-none' }>
            <Button
              variant="dark"
            >Go to checkout</Button>
          </Link>
        </div>
      </ul>
    </div>
  )
};

const mapStateToProps =
  ({cartReducer: {cartProducts}, productsList: { currency, currencyIcon } }) =>
  ({cartProducts, currency, currencyIcon });

export default withStoreService() (connect(mapStateToProps, { addToCart, increaseToCart, decreaseFromCart, removeFromCart })(Cart));
