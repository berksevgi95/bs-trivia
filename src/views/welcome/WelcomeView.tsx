import React from 'react';
import Lottie from 'react-lottie';
import * as _welcome from '../../assets/lotties/welcome.json';

import './WelcomeView.scss';
import Button from '../../components/button/Button';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { EDifficulty } from '../../models/EDifficulty';
import { ECategory } from '../../models/ECategory';

const WelcomeView: React.FC<RouteComponentProps> = ({
  ...props
}) => {

  const welcomeLottie = (_welcome as any).default;

  const handleRedirectQuestions = () => {
    props.history.push(`/questions/d/${EDifficulty.EASY}/c/${ECategory.GENERAL_KNOWLEDGE}`)
  }

  return (
    <div className="welcome">
      <div className="content">
        <Lottie
          options={{
            loop: false,
            animationData: welcomeLottie,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
          isClickToPauseDisabled
        />
        <h2 className="description">
          Yet Another Trivia Game by BS
        </h2>
        <div className="button-container">
          <Button className="button" onClick={handleRedirectQuestions}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(WelcomeView);
