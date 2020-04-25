import React from 'react';

import './Button.scss';

const Button: React.FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = (props: any) => (
  <button
    {...props}
    className={`button ${props.className || ''}`}
  >
    {props.children}
  </button>
)

export default Button;
