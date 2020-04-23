import React from 'react';

import './Button.scss';

const Button = (props: any) => (
  <button
    className={`button ${props.className || ''}`}
    {...props}
  >
    {props.children}
  </button>
)

export default Button;