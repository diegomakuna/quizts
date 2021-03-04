import React, { useState } from 'react';
import './App.css';

import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions } from './API';
import { QuestionsState, Difficulty } from './API';
import { GlobalStyle, Wrapper } from './App.styles';


const TOTAL_QUESTIONS = 10

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);


  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions)
    setLoading(false);
    setNumber(0);
    setScore(0)
    setUserAnswers([])

  }

  const checkAnswer = (e: any) => {

    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 1)

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };


      setUserAnswers((prev) => [...prev, answerObject]);

    }
  }

  const nextQuestion = () => {
    // Move on to the next question if not the last question

    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
      
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <>
    <GlobalStyle />
    <Wrapper>
        <h1>QUIZ TS</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>
             {userAnswers?.length === TOTAL_QUESTIONS ? 'Restart' : "Start" }
          </button>
        ) : null}
        <p className='score'>Score: {score}</p>
        {loading ? <p>Loading Questions...</p> : null}
       
          {!loading && !gameOver && (
           
              <QuestionCard
                questionNr={number + 1}
                question={questions[number].question}
                answers={questions[number].answers}
                callback={checkAnswer}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                totalQuestions={TOTAL_QUESTIONS}
              />
          
          )}
        
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>Next question</button>
        ) : null}
     </Wrapper>
   
     </>
  );
}

export default App;
