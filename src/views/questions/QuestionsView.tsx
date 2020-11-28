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
import * as _sad from '../../assets/lotties/sad.json';
import LeftArrow from '../../assets/svg/left-arrow.svg';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Background from '../../assets/img/background.png'

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
  NOT_EXIST
}

export interface IQuestionsViewProps extends RouteComponentProps {
  url?: string
}

const QuestionView: React.FC<IQuestionsViewProps> = ({
  url,
  match,
  history,
}) => {

  const { difficulty, category } = (match.params as any)
  const questionRef = React.useRef<any>();

  const [ready, setReady] = React.useState<EReadyState>(EReadyState.NOT_READY);
  const [questions, setQuestions] = React.useState<IQuestion[]>([]);
  const [index, setIndex] = React.useState<number>(Number.NaN);
  const [time, setTime] = React.useState<number>(Number.NaN);
  const [timer, setTimer] = React.useState<any>();
  const [points, setPoints] = React.useState<number>(0);
  const [correctCount, setCorrectCount] = React.useState<number>(0);
  const [viewState, setViewState] = React.useState<EViewState>(EViewState.QUESTION_VIEW)
  const [jokerUsed, setJokerUsed] = React.useState<boolean>(false);
  
  const errorLottie = (_error as any).default;
  const sadLottie = (_sad as any).default;

  React.useEffect(() => {
    initialize();
  }, [match])

  React.useEffect(() => {
    if (time === 0) {
      clearInterval(timer)
      setViewState(EViewState.TIMESUP_VIEW)
    }
  }, [time])

  const initialize = () => {
    setPoints(0);
    setViewState(EViewState.QUESTION_VIEW)
    setReady(EReadyState.NOT_READY)
    setQuestions([]);
    axios.get(url || `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
      .then((response: any) => {
        if (response && response.data && response.data.results && response.data.results.length > 0) {
          setQuestions((response.data.results as IQuestion[]))
          handleFetchSpecificQuestion(0);
          setReady(EReadyState.READY);
        } else {
          setReady(EReadyState.NOT_EXIST)
        }
      })
      .catch(() => {
        setReady(EReadyState.ERROR);
      })
  }

  const handleFetchSpecificQuestion = (index: number) => {
    clearInterval(timer);
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
      setJokerUsed(true);
    }
  }

  const handleCorrectAnswer = () => {
    clearInterval(timer)
    setPoints(points + (time * 100))
    setCorrectCount(correctCount + 1);
    setViewState(EViewState.CORRECT_VIEW);
  }

  const handleContinue = () => {
    if (index === questions.length - 1) {
      history.push({
        pathname: '/result',
        state: {
          points,
          correctCount,
          questionCount: questions.length,
        }
      })
    } else {
      setViewState(EViewState.QUESTION_VIEW)
      handleFetchSpecificQuestion(index + 1)
    }
    
  }

  const handleFalseAnswer = () => {
    clearInterval(timer)
    setViewState(EViewState.FALSE_VIEW);
  }

  const handleRedirectWelcomePage = () => {
    history.push('/welcome')
  }

  const handleNavigateHome = () => {
    history.push('/')
  }

  const renderQuestion = () => {
    if (viewState === EViewState.CORRECT_VIEW) {
      const correctLottie = (_correct as any).default;
      return (
        <div className="w-50 h-50 m-auto fadein">
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
          <div className="w-full flex mb-15">
            <h3 className="m-auto">
              Correct Answer!
            </h3>
          </div>
          <div className="w-full flex">
            <div className="m-auto">
              {`You have earned ${time * 100} points`}
            </div>
          </div>
          <div className="w-full flex mb-15">
            <div className="m-auto">
              {`Total: ${points} points`} 
            </div>
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
        <div className="w-50 h-50 m-auto fadein">
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
          <div className="w-full flex mb-15">
            <h3 className="m-auto">
              False Answer
            </h3>
          </div>
          <div className="w-full mb-15">
            <Button
              className="w-full"
              onClick={handleRedirectWelcomePage}
            >
              Go to Welcome Page
            </Button>
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
      ) 
    } else if (viewState === EViewState.TIMESUP_VIEW) {
      const timesupLottie = (_timesup as any).default;
      return (
        <div className="w-50 h-50 m-auto fadein">
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
          <div className="w-full flex mb-15">
            <h3 className="m-auto">
              Time's up
            </h3>
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
          className="fadein"
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
          <div className="panel fadein m-auto">
            <div className="info">
              <img
                alt="nav-button"
                className="back-button"
                src={LeftArrow}
                onClick={handleNavigateHome}
              />
            </div>
            <div className="info">
              Points
              <h2>
                {points}
              </h2>
            </div>
            <div className="info">
              Time
              <h2>
                {time}
              </h2>
            </div>
            <div className="info">
              Question
              <h2>
                {`${index + 1}/${questions.length}`}
              </h2>
            </div>
            <div className="info">
              Joker
              <div className="flex">
                <Button
                  className="action"
                  disabled={viewState !== EViewState.QUESTION_VIEW || jokerUsed}
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
        <img src={Background} alt=""/>
        {ready === EReadyState.NOT_READY && (
          <Modal>
            <div className="w-full h-full flex">
              <h3 className="m-auto text-center">
                Questions are being preapered
              </h3>
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
                  <div className="text-center mb-15">
                    Connection couldn't established
                  </div>
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
        {ready === EReadyState.NOT_EXIST && (
          <Modal>
            <div className="w-full h-full flex">
              <div className="m-auto">
                <Lottie 
                  options={{
                    autoplay: true,
                    loop: true,
                    animationData: sadLottie,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice'
                    }
                  }}
                  width={100}
                  height={100}
                  isClickToPauseDisabled
                />
                <div className="w-full">
                  <div className="text-center mb-15">
                    Cannot find any question
                  </div>
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
