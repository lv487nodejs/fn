import React from 'react';
import './Checkout-select.css';
import { Form } from 'react-bootstrap'


const CheckoutSelect = ({ selectOptions, handleChange }) => (
    <Form.Group controlId="countryValidate">
        <Form.Label>{selectOptions.title}</Form.Label>
        <Form.Control
            required
            as="select"
            name={selectOptions.name}
            onChange={handleChange}>
            {selectOptions.value.map(optionValue =>
            <option key={optionValue}>{optionValue}</option>)}
        </Form.Control>
    </Form.Group>
);

export default CheckoutSelect;
