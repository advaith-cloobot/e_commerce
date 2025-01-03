import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './home/home';
import Payment from './payment/payment';
import Login from './login/login';
import Menu from './menu/menu';
import Quiz from './quiz/quiz';
import Stats from './stats/stats';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
