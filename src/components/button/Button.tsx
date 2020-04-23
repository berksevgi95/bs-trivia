import React from 'react';

import './Button.scss';

const Button = (props: any) => (
  <button
    {...props}
    className={`button ${props.className || ''}`}
  >
    {props.children}
  </button>
)

export default Button;