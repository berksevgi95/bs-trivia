import React from 'react';
import Lottie from 'react-lottie';
import * as _cup from '../../assets/lotties/cup.json';

import './ResultView.scss'
import Button from '../../components/button/Button';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export interface IResultState {
  correctCount: number,
  points: number,
  questionCount: number,
}

const ResultView: React.FC<RouteComponentProps> = ({
  ...props
}) => {
  const cupLottie = (_cup as any).default;

  const [correctCount, setCorrectCount] = React.useState<number>(0);
  const [points, setPoints] = React.useState<number>(0);
  const [questionCount, setQuestionCount] = React.useState<number>(0);

  React.useEffect(() => {
    const state: IResultState = (props.location.state as IResultState);
    if (!state) {
      props.history.push('/welcome');
    } else {
      setCorrectCount(state.correctCount);
      setPoints(state.points);
      setQuestionCount(state.questionCount);
    }
  }, [])

  const handleRedirectWelcomePage = () => {
    props.history.push('/welcome')
  }

  return (
    <div className="result">
      <div className="tri-decoration1" />
      <div className="tr2-decoration1" />
      <div className="tr3-decoration1" />
      <div className="icon flex fadein">
        <Lottie
          width={200}
          height={200}
          options={{
            loop: true,
            animationData: cupLottie,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
          isClickToPauseDisabled
        />
      </div>
      <div className="content fadein">
        <div className="m-auto">
          <h1 className="mb-15">  
            Congratulations
          </h1>
          <h3 className="mb-15 text-center">{`Points earned: ${points}`}</h3>
          <h3 className="mb-15 text-center">{`Success: ${correctCount}/${questionCount}`}</h3>
          <Button
            className="w-full"
            onClick={handleRedirectWelcomePage}
          >
            Go to Welcome Page
          </Button>
        </div>
          
      </div>
      
    </div>
  )
}

export default withRouter(ResultView);
