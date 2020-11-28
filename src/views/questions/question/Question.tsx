import React from 'react';

import Button from '../../../components/button/Button';
import shuffle from '../../../utils/shuffle';
import { IQuestion } from '../../../models/IQuestion';

import './Question.scss'

export interface IQuestionProps {
  className?: string,
  ref?: React.RefObject<unknown>,
  questionObj: IQuestion,
  onCorrectAnswer: () => void,
  onFalseAnswer: () => void
}

const Question: React.FC<IQuestionProps> = React.forwardRef(({
  questionObj,
  onCorrectAnswer,
  onFalseAnswer,
  ...props
}, ref) => {

  const [answers, setAnswers] = React.useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(answers);

  React.useImperativeHandle(ref, () => ({
    joker: () => {
      if (selectedOptions.length === 0) {
        setSelectedOptions([
          questionObj.correct_answer,
          questionObj.incorrect_answers[Math.floor(Math.random() * Math.floor(2))]
        ])
      }
    }
  }), [selectedOptions])

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
    <div className={`question ${props.className || ''}`}>
      <h2>
        {new DOMParser().parseFromString(questionObj.question, 'text/html').body.textContent}
      </h2>
      <div className="answers-area">
        {answers
          .map((question) => (
            <Button
              onClick={handleOnClickAnswer(question)}
              disabled={selectedOptions.length > 0 && selectedOptions.indexOf(question) === -1}
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
})

export default Question;
