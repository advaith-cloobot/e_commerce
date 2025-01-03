import template from "./quiz.jsx";
import React , { useState,useEffect, use }   from "react";
import httpClient from "../httpClient.js";
import { Navigate, useNavigate } from "react-router";

const Quiz = () => {
  const [user_id, setUserId] = useState(null); // Email input state
  const [quiz_score,set_quiz_score] = useState(0);
  const [consecutive_score,set_consecutive_score] = useState(0);
  const [timer, setTimer] = useState(10);
  const navigate = useNavigate();
  const [question_list, setQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [consecutive_score_list,set_consecutive_score_list] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);


  useEffect(() => {
    setUserId(localStorage.getItem('user_id'));
    fetch_question_list();
  }, []);

  useEffect(() => {
    if (quizStarted && timer > 0) {
      const countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      handleTimeout();
    }
  }, [timer,quizStarted]);


  const handleTimeout = () => {
    // Action to be triggered when timer reaches zero
    set_consecutive_score_list([...consecutive_score_list, consecutive_score]);
    console.log('Time is up!');
    // setCurrentQuestionIndex(currentQuestionIndex + 1);
    // setUserAnswer('');
    setQuizEnded(true);// Reset timer for the next question
    console.log('score :: ',quiz_score);
    console.log('consecutive_score_list :: ',consecutive_score_list);
    console.log('user id :: ',localStorage.getItem('user_id'));
    record_score()

  };
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };



  function fetch_question_list(){
    const data = {
      user_id: localStorage.getItem('user_id')
    }
    httpClient.post('/get_questions_list', data)
    .then(response => {
      console.log('response question : ', response);
      const data = response.data;
      console.log("\n\ndata question :: ",data);
      if (data.status) {
        setQuestionList(data.question_list);
      }
      else {
        console.log('error in fetching questions', data.error);
      }
    })
    .catch(error => console.error('Error fetching questions:', error));
  }

  const handleSubmit = () => {
    // Logic to check the answer can be added here
    const correctAnswer = question_list[currentQuestionIndex].ques_answer.toLowerCase();
    const userAnswerLower = userAnswer.toLowerCase();
    setAnswers([...answers, { answer: userAnswer, isCorrect: userAnswerLower === correctAnswer }]);
    if (userAnswerLower === correctAnswer) {
      set_quiz_score(quiz_score+1);
      set_consecutive_score(consecutive_score+1);
      setIsCorrect(true);
      set_consecutive_score_list([...consecutive_score_list, consecutive_score+1]);
    } else {
      set_consecutive_score_list([...consecutive_score_list, consecutive_score]);
      set_consecutive_score(0);
      setIsCorrect(false);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setUserAnswer('');
    console.log('score :: ',quiz_score);
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setQuizEnded(false);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setAnswers([]);
    set_quiz_score(0);
    set_consecutive_score(0);
    set_consecutive_score_list([]);
    setTimer(10);
  };

  function go_to_main_menu(){
    navigate('/menu');
  }

  function record_score(){
    const data = {
      user_id: localStorage.getItem('user_id'),
      score: quiz_score,
      consecutive_score_list: consecutive_score_list
    }
    httpClient.post('/finish_session_record_score', data)
    .then(response => {
      console.log('response record : ', response);
      const data = response.data;
      console.log("\n\ndata record :: ",data);
      if (data.status) {
        console.log('score recorded successfully');
      }
      else {
        console.log('error in recording score', data.error);
      }
    })
    .catch(error => console.error('Error recording score:', error));
  }

  return (
    <div>
      {!quizStarted ? (
        <button onClick={handleStartQuiz}>Start Quiz</button>
      ) : (
        <>
          <div>Time left: {timer} seconds</div>
          {question_list.slice(0, currentQuestionIndex + 1).map((question, index) => (
            <div key={question.ques_id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span>{question.ques_name}</span>
              <input
                type="text"
                value={index === currentQuestionIndex ? userAnswer : answers[index]?.answer || ''}
                onChange={(e) => setUserAnswer(e.target.value)}
                style={{ marginLeft: '10px' }}
                disabled={index !== currentQuestionIndex || quizEnded}
              />
              {index === currentQuestionIndex && (
                <button onClick={handleSubmit} style={{ marginLeft: '10px' }} disabled={quizEnded}>Submit</button>
              )}
              {index < currentQuestionIndex && (
                <span style={{ marginLeft: '10px' }}>
                  {answers[index]?.isCorrect ? '✔️' : '❌'}
                </span>
              )}
            </div>
          ))}
          {quizEnded && (
            <div>
              <p>Time Over</p>
              <button onClick={handleRestartQuiz} style={{ marginRight: '10px' }}>Restart Quiz</button>
              <button onClick={go_to_main_menu}>Main Menu</button>
              <p>Score : {quiz_score}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default Quiz;
