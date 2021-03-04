import React from 'react'
import { AnswerObject } from '../App';

import {  Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
    question?: string | undefined;
    answers?: string[] | undefined;
    callback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer?: AnswerObject | undefined
    questionNr?: number;
    totalQuestions?: number;
};



const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestions = 5,
}) => (
    <Wrapper>

<p className='number'>
      Question: {questionNr} / {totalQuestions}
    </p>
        <p dangerouslySetInnerHTML={{ __html: question ? question : "" }} />
     <div>
        {answers?.map((answer, index) => (
            <ButtonWrapper
                key={answer}
                correct={userAnswer?.correctAnswer === answer}
                userClicked={userAnswer?.answer === answer}
            >

                <button key={index} onClick={callback} value={answer} disabled={userAnswer ? true : false} >
                    <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>


            </ButtonWrapper>
        ))}
    </div>
    </Wrapper>
);

export default QuestionCard;