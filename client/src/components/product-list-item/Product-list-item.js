import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Product-list-item.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarsRating from '../star-rating';

function ProductListItem({
  title,
  id,
  images,
  price,
  mrsp,
  currency,
  currencyIcon,
  rate
}) {
  const [priceWithRate, setPriceWithRate] = useState();
  const [msrpWithRate, setMsrpWithRate] = useState();
  const starColor = '#3d3d3d';

  useEffect(() => {
    setPriceWithRate(parseFloat(price * currency).toFixed(2));
    setMsrpWithRate(parseFloat(mrsp * currency).toFixed(2));
  }, [currency, price, mrsp]);

  return (
    <div className='wrapper' id='wrapper' key={id}>
      <div className='productCard' id='productCard'>
        <Link id='productLink' key={id} to={`/products/${id}`}>
          <img
            id='productImg'
            alt={`${images}`}
            src={`/images/products/${images}`}
          />
        </Link>
      </div>
      <div className='info' id={id}>
        <StarsRating rating={rate} id={id} color={starColor} />

        <p className='productName' id='productName'>
          {title}
        </p>
        <div className='bottomElements' id='bottomElements'>
          <div
            className='cardPrice'
            id='realPrice'
          >{`${priceWithRate} ${currencyIcon}`}</div>
          <div
            className='cardPrice msrp-price'
            id='msrpPrice'
          >{`${msrpWithRate} ${currencyIcon}`}</div>
        </div>
        <hr className='line' />
      </div>
    </div>
  );
}

const mapStateToProps = ({ productsList: { currency, currencyIcon } }) => ({
  currency,
  currencyIcon
});

export default connect(mapStateToProps)(ProductListItem);
