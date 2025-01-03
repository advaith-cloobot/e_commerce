import template from "./stats.jsx";
import React , { useState,useEffect, use }   from "react";
import httpClient from "../httpClient.js";
import { Navigate, useNavigate } from "react-router";
const Stats = () => {

  const [leaderboard_list, setLeaderboardList] = useState([]);
  const [user_best_score, setUserBestScore] = useState(0);
  const [user_consecutive_score, setUserConsecutiveScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch_top_scorers();
    fetch_user_stats();
  }, []);


  function fetch_top_scorers(){
    // Your fetch top scorers logic here
    const data = {
      user_id: localStorage.getItem('user_id')
    }
    httpClient.post('/get_top_scoring_users', data)
      .then(response => {
        console.log('response login : ', response);
        const data = response.data;
        console.log("\n\ndata login :: ",data);
        if (data.status) {
          alert('Top scorers fetched successfully');
          setLeaderboardList(data.top_users);
          // localStorage.setItem('user_id', data.user_id);
          // navigate('/payment');
          
        }
        else {
          console.log('email or password is incorrect', data.error);
        }
      })
      .catch(error => console.error('Error logging in:', error));
  }
  
function fetch_user_stats(){
    // Your fetch user stats logic here
    const data = {
      user_id: localStorage.getItem('user_id')
    }
    httpClient.post('/get_user_highest_score', data)
      .then(response => {
        console.log('response login : ', response);
        const data = response.data;
        console.log("\n\ndata login :: ",data);
        if (data.status) {
          alert('User stats fetched successfully');
          setUserBestScore(data.score);
          setUserConsecutiveScore(data.consecutive_score);
          // localStorage.setItem('user_id', data.user_id);
          // navigate('/payment');
          
        }
        else {
          console.log('email or password is incorrect', data.error);
        }
      })
      .catch(error => console.error('Error logging in:', error));
  }

  function go_to_main_menu(){
    navigate('/menu');
  }
  return(
    <div>
    <h1>Stats</h1>
    <div style={{ border: '1px solid black', padding: '20px', marginTop: '20px' }}>
      <h2>User Leaderboard</h2>
      <ol>
        {leaderboard_list.map((user, index) => (
          <li key={user.user_id}>
            {index + 1}. {user.user_name} - {user.user_score}
          </li>
        ))}
      </ol>
    </div>
    <div style={{ border: '1px solid black', padding: '20px', marginTop: '20px' }}>
        <h2>User Stats</h2>
        <p>Best Score: {user_best_score}</p>
        <p>Consecutive Score: {user_consecutive_score}</p>
      </div>
  </div>
  )
}

  


export default Stats;
