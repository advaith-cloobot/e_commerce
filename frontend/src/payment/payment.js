import React , { useState,useEffect, use }   from "react";
import template from "./payment.jsx";
import httpClient from "../httpClient.js";
import { Navigate, useNavigate } from "react-router";

const Payment = () => {
  const [bank_list,set_bank_list] = useState([]);
  const [cart_list,set_cart_list] = useState([]);
  const [cart_id,set_cart_id] = useState(null);
  const [payment_method,set_payment_method] = useState('');
  const [bank_id,set_bank_id] = useState('');
  const [bill_amount,set_bill_amount] = useState(0);
  const [make_payment,set_make_payment] = useState(false);
  const payment_list = ['netbanking','credit_card','debit_card','upi','wallet'];
  const nav = useNavigate();
  useEffect(() => {
    get_bank_list();
    get_cart_list();
  }, []);


  function get_bank_list(){
    const data = {}
    httpClient.post('/get_bank_list', data)
      .then(response => {
        console.log('response bank : ', response);
        const data = response.data;
        console.log("\n\ndata bank :: ",data);
        if (data.status) {
          set_bank_list(data.bank_list);
        }
        else {
          console.log('Error fetching bank list:', data.error);
        }
      })
      .catch(error => console.error('Error playing new round:', error));
  }

  function get_cart_list(){
    const data = {
      user_id: localStorage.getItem('user_id')
    }
    httpClient.post('/get_cart', data)
      .then(response => {
        console.log('response cart :: ', response);
        const data = response.data;
        console.log("\n\ndata cart :: ",data);
        if (data.status) {
          set_cart_list(data.user_prod_json);
          set_cart_id(data.user_prod_map_id);
        }
        else {
          console.log('Error fetching cart list:', data.error);
        }
      })
      .catch(error => console.error('Error fetching cart details:', error));
  }

  function confirm_payment(){
    const data = {
      user_id: localStorage.getItem('user_id'),
      payment_details: {
        payment_method: payment_method,
        bank_id: bank_id
      },
      user_prod_map_list: cart_list
    }
    httpClient.post('/confirm_payment_details', data)
      .then(response => {
        console.log('response cart :: ', response);
        const data = response.data;
        console.log("\n\ndata cart :: ",data);
        if (data.status) {
          set_bill_amount(data.amount);
          set_make_payment(true);
        }
        else {
          console.log('Error fetching cart list:', data.error);
        }
      })
      .catch(error => console.error('Error fetching cart details:', error));
  }

  function make_transaction(){
    const data = {
      user_id: localStorage.getItem('user_id'),
      user_prod_map_id: cart_id,
      amount: bill_amount
    }
    httpClient.post('/make_transaction', data)
      .then(response => {
        console.log('response transact :: ', response);
        const data = response.data;
        console.log("\n\ndata cart :: ",data);
        if (data.status) {

          alert('Transaction Successful');
          nav('/');
        }
        else {
          console.log('Error fetching cart list:', data.error);
        }
      })
      .catch(error => console.error('Error fetching cart details:', error));
  }



  return (
    <div>
      <h1>Payment</h1>
      <div>
        <h2>My Cart</h2>
        <ul>
          {cart_list.map((item, index) => (
            <li key={index}>{item.prod_name} - Quantity: {item.prod_qty}</li>
          ))}
        </ul>
      </div>
      <div>
        <label>Payment Method</label>
        <select onChange={(e) => set_payment_method(e.target.value)}>
          {payment_list.map((payment, index) => (
            <option key={index} value={payment}>{payment}</option>
          ))}
        </select>
        <br/>
        <label>Bank</label>
        <select onChange={(e) => set_bank_id(e.target.value)}>
          {bank_list.map((bank, index) => (
            <option key={index} value={bank.bank_id}>{bank.bank_name}</option>
          ))}
        </select>
      </div>
      <button 
          onClick={confirm_payment} 
          disabled={!payment_method || !bank_id}
        >
          Confirm Payment
        </button>

        {make_payment && (
        <div>
          <p>Total Amount: {bill_amount}</p>
          <button onClick={make_transaction}>Make Transaction</button>
        </div>
      )}
    </div>

  );
}

export default Payment;
