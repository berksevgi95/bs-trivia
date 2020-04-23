import React from 'react';
import { IQuestion } from '../../../models/IQuestion';

import './Question.scss'
import Button from '../../../components/button/Button';
import shuffle from '../../../utils/shuffle';

export interface IQuestionProps {
  questionObj: IQuestion,
  onCorrectAnswer: () => void,
  onFalseAnswer: () => void
}

const Question: React.FC<IQuestionProps> = ({
  questionObj,
  onCorrectAnswer,
  onFalseAnswer,
  ...props
}) => {

  const [answers, setAnswers] = React.useState<string[]>([]);

  React.useEffect(() => {
    setAnswers(shuffle([...questionObj.incorrect_answers, questionObj.correct_answer]))
  }, [questionObj])

  const handleOnClickAnswer = (question : any) => () => {
    if (questionObj.correct_answer === question) {
      onCorrectAnswer()
    } else {
      onFalseAnswer()
    }
  }

  return (
    <div className="question">
      <div className="question-area">
        {new DOMParser().parseFromString(questionObj.question, 'text/html').body.textContent}
      </div>
      <div className="answers-area">
        {answers
          .map((question) => (
            <Button
              onClick={handleOnClickAnswer(question)}
              className="answer-button"
              key={question}
            >
              {new DOMParser().parseFromString(question, 'text/html').body.textContent}
            </Button>
          ))
        }
      </div>
    </div>
  )
}

export default Question;