import React from 'react';

import './QuestionsView.scss'
import { IQuestion } from '../../models/IQuestion';
import axios from 'axios';
import Modal from '../../components/modal/Modal';
import Question from './question/Question';


const QuestionView = ({
  ...props
}) => {

  const [ready, setReady] = React.useState<boolean>();

  const [questions, setQuestions] = React.useState<IQuestion[]>([]);
  const [index, setIndex] = React.useState<number>(0);

  const [time, setTime] = React.useState<number>(Number.NaN);
  const [timer, setTimer] = React.useState<any>();


  React.useEffect(() => {
    setReady(false)
    axios.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
      .then((response) => {
        if (response && response.data) {
          setQuestions((response.data.results as IQuestion[]))
          setReady(true);
          handleFetchSpecificQuestion(0);
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }, [])

  React.useEffect(() => {
    if (time === 0) {
      clearInterval(timer)
      alert('Oyun bitti')
      // // handleFetchSpecificQuestion(0)
    }
  }, [time])

  const handleFetchSpecificQuestion = (index: number) => {
    if (timer)
      clearInterval(timer)
    setIndex(index);
    setTime(10)
    setTimer(
      setInterval(() => {
          setTime((_time: number) => (
            _time - 1
          ))
        },  
      1000
      )
    )
  }

  return (
    <div className="questions">
      <aside>
        <div className="m-auto">
          {time || ''}
        </div>
      </aside>
      <div className="content">
        {!ready ? (
          <Modal>
            <div className="w-full h-full flex">
              <div className="m-auto">
                Sorular Hazırlanıyor
              </div>
            </div>
            
          </Modal>
        ) : (
          <div className="w-full h-full flex">
            <div className="container">
              <Question 
                questionObj={questions[index]}
                onCorrectAnswer={() => handleFetchSpecificQuestion(index + 1)}
                onFalseAnswer={() => {}}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionView;