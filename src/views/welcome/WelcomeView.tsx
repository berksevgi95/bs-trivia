import React from 'react';
import Lottie from 'react-lottie';
import * as _welcome from '../../assets/lotties/welcome.json';
import Select from '../../components/select/Select';
import Button from '../../components/button/Button';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { EDifficulty } from '../../models/EDifficulty';
import { ECategory, categoryKeyValues } from '../../models/ECategory';

import './WelcomeView.scss';

const WelcomeView: React.FC<RouteComponentProps> = ({
  ...props
}) => {

  const welcomeLottie = (_welcome as any).default;

  const [difficulty, setDifficulty] = React.useState<EDifficulty>(EDifficulty.EASY);
  const [category, setCategory] = React.useState<ECategory>(ECategory.GENERAL_KNOWLEDGE);

  const handleChangeDifficulty = (option: {
    label: string,
    value: EDifficulty
  }) => {
    setDifficulty(option.value)
  }

  const handleChangeCategory = (selection: any) => {
    setCategory(selection.value);
  }

  const handleRedirectQuestions = () => {
    props.history.push(`/questions/difficulty/${difficulty}/category/${category}`)
  }

  return (
    <div className="welcome">
      <div className="content">
        <div className="h-50">
          <Lottie
            options={{
              loop: true,
              animationData: welcomeLottie,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
            isClickToPauseDisabled
          />
        </div>
        
        <div className="settings h-50 w-full">
          <div className="container">
            <div className="w-full mb-10">
              Difficulty
            </div>
            <div className="w-full mb-10">
              <Select
                className="w-full"
                options={[{
                  label: 'Easy',
                  value: EDifficulty.EASY
                }, {
                  label: 'Medium',
                  value: EDifficulty.MEDIUM
                }, {
                  label: 'Hard',
                  value: EDifficulty.HARD
                }]}
                onClick={handleChangeDifficulty}
                value={difficulty}
              />
            </div>
            <div className="w-full mb-10">
              Category
            </div>
            <div className="w-full mb-10">
              <Select
                className="w-full"
                options={categoryKeyValues}
                onClick={handleChangeCategory}
                value={category}
              />
            </div>
            <Button
              className="button w-full"
              onClick={handleRedirectQuestions}
            >
              Get Started
            </Button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default withRouter(WelcomeView);
