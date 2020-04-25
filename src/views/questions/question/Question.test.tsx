import React from 'react';
import {
  render, fireEvent, getByText,
} from '@testing-library/react';
import Question from './Question';
import { ECategory } from '../../../models/ECategory';
import { EDifficulty } from '../../../models/EDifficulty';


test('fires click event when correct answer is pressed', (done) => {
  const onCorrect = () => done()
  
  const {container} = render(
    <Question 
      onCorrectAnswer={onCorrect}
      onFalseAnswer={() => {}}
      questionObj={{
        category: ECategory.ENTERTAINMENT_BOARD_GAMES,
        correct_answer: 'Correct',
        difficulty: EDifficulty.EASY,
        incorrect_answers: ['False1', 'False2', 'False3'],
        question: 'Question',
        type: 'multiple'
      }}
    />
  );

  fireEvent.click(
    getByText(container, 'Correct')
  )

});

test('fires click event when false answer is pressed', (done) => {
  const onFalse = () => done()
  
  const {container} = render(
    <Question 
      onCorrectAnswer={() => {}}
      onFalseAnswer={onFalse}
      questionObj={{
        category: ECategory.ENTERTAINMENT_BOARD_GAMES,
        correct_answer: 'Correct',
        difficulty: EDifficulty.EASY,
        incorrect_answers: ['False1', 'False2', 'False3'],
        question: 'Question',
        type: 'multiple'
      }}
    />
  );

  fireEvent.click(
    getByText(container, 'False1')
  )

});

test('fires click event when joker button is pressed', () => {
  
  const ref = {
    current: {
      joker: jest.fn()
    }
  }
  
  render(
    <Question 
      ref={ref}
      onCorrectAnswer={() => {}}
      onFalseAnswer={() => {}}
      questionObj={{
        category: ECategory.ENTERTAINMENT_BOARD_GAMES,
        correct_answer: 'Correct',
        difficulty: EDifficulty.EASY,
        incorrect_answers: ['False1', 'False2', 'False3'],
        question: 'Question',
        type: 'multiple'
      }}
    />
  );

  ref.current.joker();

});
