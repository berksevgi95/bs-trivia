import React from 'react';
import Lottie from 'react-lottie';
import * as _welcome from '../../assets/lotties/welcome.json';

import './WelcomeView.scss';
import Button from '../../components/button/Button';
import { withRouter } from 'react-router-dom';

const WelcomeView = ({
  ...props
}) => {

  const welcomeLottie = (_welcome as any).default;

  const handleRedirectQuestions = () => {
    if (props.history) {
      props.history.push('/questions')
    }
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
          // height={400}
          // width={400}
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