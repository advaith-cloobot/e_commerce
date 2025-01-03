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

  return (
    <div >
      <div style={{marginTop: '130px'}}>
        <label htmlFor="email">Email</label>
        <div className="input-containers">
        {/* <EmailOutlinedIcon className="input-icon" style={{ color: 'gray', fontSize: '20px' }} /> */}
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
      <div >
        <label htmlFor="password">Password</label>
        <div className="input-containers">
        {/* <PasswordOutlinedIcon className="input-icon" style={{ color: 'gray', fontSize: '20px' }} /> */}
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
    </div>
  );
};
export default Login;
