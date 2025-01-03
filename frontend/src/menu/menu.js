import React , { useState,useEffect, use }   from "react";

import httpClient from "../httpClient.js";
import { Navigate, useNavigate } from "react-router";

const Menu = () => {
  const [user_id, setUserId] = useState(null); // Email input state
  const navigate = useNavigate();


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <button style={{ fontSize: '24px', margin: '10px', padding: '10px 20px' }}>Play</button>
      <button style={{ fontSize: '24px', margin: '10px', padding: '10px 20px' }}>View Stats</button>
      <button style={{ fontSize: '24px', margin: '10px', padding: '10px 20px' }}>Logout</button>
    </div>
  );
}

export default Menu;
