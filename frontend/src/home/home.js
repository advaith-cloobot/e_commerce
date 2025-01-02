import React, { useState,useEffect } from "react";
import template from "./home.jsx";
import httpClient from "../httpClient.js";
import { Navigate, useNavigate } from "react-router";

const Home = () => {
 const [prod_list,set_prod_list] = useState([]);
const [user_prod_cart,set_user_prod_cart] = useState([]);
const [product,set_product] = useState({});
const [prod_qty, set_prod_qty] = useState(1);
const navigate = useNavigate();
const [offer_details,set_offer_details] = useState([]);

useEffect(() => {
 localStorage.setItem('user_id',1);
 fetch_prod_list();
 fetch_offer_details();
}, []);

function add_to_cart() {
  const new_cart_item = {
    prod_id: product.prod_id,
    prod_name: product.prod_name,
    prod_qty: prod_qty
  };
  set_user_prod_cart([...user_prod_cart, new_cart_item]);
}

function fetch_prod_list(){
const data = {}
httpClient.post('/get_product_list', data)
  .then(response => {
    console.log('response:', response);
    const data = response.data;
    console.log("\n\ndata :: ",data);
    if (data.status) {
      set_prod_list(data.product_list);
    }
    else {
      console.log('Error fetching product list:', data.error);
    }
  })
  .catch(error => console.error('Error playing new round:', error));
}

function fetch_offer_details(){
  const data = {
    user_id: localStorage.getItem('user_id')
  }
  httpClient.post('/get_offer_list', data)
  .then(response => {
    console.log('response offer:', response);
    const data = response.data;
    console.log("\n\ndata :: ",data);
    if (data.status) {
      set_offer_details(data.offer_list);
    }
    else {
      console.log('Error fetching offer list:', data.error);
    }
  })
  .catch(error => console.error('Error playing new round:', error));

}

function save_cart(){
  const data = {
    user_id: localStorage.getItem('user_id'),
    user_prod_json: user_prod_cart
  }
  console.log('payload data:', data);
  httpClient.post('/add_to_cart', data)
  .then(response => {
    console.log('response:', response);
    const data = response.data;
    console.log("\n\ndata ccart :: ",data);
    if (data.status) {
      console.log('Cart saved successfully');
      navigate('/payment');
    }
    else {
      console.log('Error saving cart:', data.error);
    }
  })
  .catch(error => console.error('Error playing new round:', error));
}

  return (
    <div>
      <h1>Home</h1>
      <div>
        <select onChange={(e) => set_product(prod_list.find(prod => prod.prod_id === parseInt(e.target.value)))}>
          <option value="">Select Product</option>
          {prod_list.map(prod => (
            <option key={prod.prod_id} value={prod.prod_id}>{prod.prod_name}</option>
          ))}
        </select>
        <select onChange={(e) => set_product(parseInt(e.target.value))} value={prod_qty}>
          {[...Array(10).keys()].map(num => (
            <option key={num + 1} value={num + 1}>{num + 1}</option>
          ))}
        </select>
        <button onClick={add_to_cart}>Add to Cart</button>
      </div>
      <div>
        <h2>Cart</h2>
        <ul>
          {user_prod_cart.map((item, index) => (
            <li key={index}>{item.prod_name} - Quantity: {item.prod_qty}</li>
          ))}
        </ul>
      </div>
          <br/><br/>
          <div>
        <h2>Offers</h2>
        <ul>
          {offer_details.map((offer, index) => (
            <li key={index}>{offer.offer_name}: {offer.offer_desc}</li>
          ))}
        </ul>
      </div>

      {user_prod_cart.length > 0 && (
        <div>
          <button onClick={save_cart}>Confirm Cart</button>
        </div>
      )}
    </div>
  );
};

export default Home;
