import React , { useState,useEffect, use }   from "react";

import httpClient from "../httpClient.js";
import { Navigate, useNavigate } from "react-router";
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
const Login = () => {
  const [email, setEmail] = useState(''); // Email input state
  const [password, setPassword] = useState('');
  const [user_name, setUserName] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  function check_login(){
    const data = {
      email: email,
      password: password
    }
    httpClient.post('/check_login', data)
      .then(response => {
        console.log('response login : ', response);
        const data = response.data;
        console.log("\n\ndata login :: ",data);
        if (data.status) {
          localStorage.setItem('user_id', data.user_id);
          // navigate('/payment');
        }
        else {
          console.log('email or password is incorrect', data.error);
        }
      })
      .catch(error => console.error('Error logging in:', error));
  }


  const create_account = () => {
    // Your create account logic here
    const data = {
      email: email,
      password: password,
      user_name: user_name
    }
    httpClient.post('/sign_up_user', data)
      .then(response => {
        console.log('response login : ', response);
        const data = response.data;
        console.log("\n\ndata login :: ",data);
        if (data.status) {
          alert('Account created successfully');
          // localStorage.setItem('user_id', data.user_id);
          // navigate('/payment');
          setShowSignUp(false);
        }
        else {
          console.log('email or password is incorrect', data.error);
        }
      })
      .catch(error => console.error('Error logging in:', error));
  };
  return (
    <div>
      {!showSignUp ? (
        <div>
          <div style={{marginTop: '130px'}}>
            <label htmlFor="email">Email</label>
            <div className="input-containers">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Type your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className="input-containers">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Type your password"
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>
          </div>
          <div style={{marginTop: '20px'}}>
            <button type="button" onClick={check_login}>Login</button>
          </div>
          <div style={{marginTop: '20px'}}>
            <button type="button" onClick={() => setShowSignUp(true)}>Sign Up</button>
          </div>
        </div>
      ) : (
        <div>
          <div style={{marginTop: '130px'}}>
            <label htmlFor="userName">User Name</label>
            <div className="input-containers">
              <input
                type="text"
                id="userName"
                name="userName"
                value={user_name}
                placeholder="Type your user name"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="userEmail">User Email</label>
            <div className="input-containers">
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                value={email}
                placeholder="Type your user email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="userPassword">User Password</label>
            <div className="input-containers">
              <input
                type="password"
                id="userPassword"
                name="userPassword"
                value={password}
                placeholder="Type your user password"
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>
          </div>
          <div style={{marginTop: '20px'}}>
            <button type="button" onClick={create_account}>Create Account</button>
          </div>
          <div style={{marginTop: '20px'}}>
            <button type="button" onClick={() => setShowSignUp(false)}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Login;
