import React , { useState,useEffect, use }   from "react";

import httpClient from "../httpClient.js";
import { Navigate, useNavigate } from "react-router";

const Menu = () => {
  const [user_id, setUserId] = useState(null); // Email input state
  const navigate = useNavigate();


  return (
    <div>
      <p>menu</p>
    </div>
  );
}

export default Menu;
