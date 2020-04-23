import React from 'react';

import './QuestionsView.scss'
import { IQuestion } from '../../models/IQuestion';
import axios from 'axios';
import Modal from '../../components/modal/Modal';
import Question from './question/Question';
import Lottie from 'react-lottie';
import Button from '../../components/button/Button';
import * as _correct from '../../assets/lotties/correct.json';
import * as _false from '../../assets/lotties/false.json';
import * as _timesup from '../../assets/lotties/timesup.json';
import * as _error from '../../assets/lotties/error.json';
import { withRouter } from 'react-router-dom';

const TIME = 15;

enum EViewState {
  CORRECT_VIEW,
  QUESTION_VIEW,
  TIMESUP_VIEW,
  FALSE_VIEW,
}

enum EReadyState {
  NOT_READY,
  ERROR,
  READY,
}

const QuestionView = ({
  ...props
}) => {

  const questionRef = React.useRef<any>();

  const [ready, setReady] = React.useState<EReadyState>(EReadyState.NOT_READY);

  const [questions, setQuestions] = React.useState<IQuestion[]>([]);
  const [index, setIndex] = React.useState<number>(Number.NaN);

  const [time, setTime] = React.useState<number>(Number.NaN);
  const [timer, setTimer] = React.useState<any>();

  const [points, setPoints] = React.useState<number>(0);
  const [viewState, setViewState] = React.useState<EViewState>(EViewState.QUESTION_VIEW)

  const errorLottie = (_error as any).default;

  React.useEffect(() => {
    initialize();
  }, [])

  React.useEffect(() => {
    if (time === 0) {
      clearInterval(timer)
      setViewState(EViewState.TIMESUP_VIEW)
    }
  }, [time])

  const initialize = () => {
    setReady(EReadyState.NOT_READY)
    axios.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
      .then((response) => {
        if (response && response.data) {
          setQuestions((response.data.results as IQuestion[]))
          handleFetchSpecificQuestion(0);
          setReady(EReadyState.READY);
        }
      })
      .catch((error) => {
        setReady(EReadyState.ERROR);
      })
  }

  const handleFetchSpecificQuestion = (index: number) => {
    if (timer)
      clearInterval(timer)
    setIndex(index);
    setTime(TIME)
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

  const handleJoker = () => {
    if (questionRef.current) {
      questionRef.current.joker()
    }
  }

  const handleCorrectAnswer = () => {
    clearInterval(timer)
    setPoints(points + (time * 100))
    setViewState(EViewState.CORRECT_VIEW);
  }

  const handleContinue = () => {
    setViewState(EViewState.QUESTION_VIEW)
    handleFetchSpecificQuestion(index + 1)
  }


  const handleFalseAnswer = () => {
    clearInterval(timer)
    setViewState(EViewState.FALSE_VIEW);
  }

  const handleRedirectWelcomePage = () => {
    // console.log(props.)
    props.history.push('/welcome')
  }


  const renderQuestion = () => {
    if (viewState === EViewState.CORRECT_VIEW) {
      const correctLottie = (_correct as any).default;
      return (
        <div className="w-full">
          <Lottie
            options={{
              loop: false,
              animationData: correctLottie,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
            isClickToPauseDisabled
          />
          <div className="w-full">
            correct Answer
          </div>
          <div className="w-full">
            <Button
              className="w-full"
              onClick={handleContinue}
            >
              Next Question              
            </Button>
          </div>
        </div>
      )
    } else if (viewState === EViewState.FALSE_VIEW) {
      const falseLottie = (_false as any).default;
      return (
        <div className="w-full">
          <Lottie
            options={{
              loop: false,
              animationData: falseLottie,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
            isClickToPauseDisabled
          />
          <div className="w-full">
            Wrong Answer
          </div>
          <div className="w-full">
            <Button
              className="w-full"
              onClick={handleRedirectWelcomePage}
            >
              Go to Welcome Page
            </Button>
          </div>
        </div>
      ) 
    } else if (viewState === EViewState.TIMESUP_VIEW) {
      const timesupLottie = (_timesup as any).default;
      return (
        <div className="w-full">
          <Lottie
            options={{
              loop: false,
              animationData: timesupLottie,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
            isClickToPauseDisabled
          />
          <div className="w-full">
            Time's up
          </div>
          <div className="w-full">
            <Button
              className="w-full"
              onClick={handleContinue}
            >
              Next Question
            </Button>
          </div>
        </div>
      ) 
    } else {
      return (
        <Question
          ref={questionRef}
          questionObj={questions[index]}
          onCorrectAnswer={handleCorrectAnswer}
          onFalseAnswer={handleFalseAnswer}
        />
      )
    }
  }


  return (
    <div className="questions">
      <aside>
        {ready === EReadyState.READY && (
          <div className="panel">
            <div className="info">
              Points
              <div>
                {points}
              </div>
            </div>
            <div className="info">
              Time
              <div>
                {time}
              </div>
            </div>
            <div className="info">
              Question
              <div>
                {`${index + 1}/${questions.length}`}
              </div>
            </div>
            <div className="info">
              Joker
              <div className="flex">
                <Button
                  className="action"
                  disabled={viewState !== EViewState.QUESTION_VIEW}
                  onClick={handleJoker}
                >
                  50 : 50
                </Button>
              </div>
            </div>
          </div>
        )}
      </aside>
      <div className="content">
        {ready === EReadyState.NOT_READY && (
          <Modal>
            <div className="w-full h-full flex">
              <div className="m-auto">
                Sorular Hazırlanıyor
              </div>
            </div>
          </Modal>
        )}
        {ready === EReadyState.ERROR && (
          <Modal>
            <div className="w-full h-full flex">
              <div className="m-auto">
                <Lottie 
                  options={{
                    loop: false,
                    animationData: errorLottie,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice'
                    }
                  }}
                  width={100}
                  height={100}
                  isClickToPauseDisabled
                />
                <div className="w-full">
                  Time's up
                </div>
                <div className="w-full">
                  <Button
                    className="w-full"
                    onClick={initialize}
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        )}
        {ready === EReadyState.READY && (
          <div className="w-full h-full flex">
            <div className="container">
              {renderQuestion()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(QuestionView);