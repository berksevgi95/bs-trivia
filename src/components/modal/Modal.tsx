import React from 'react';

import './Modal.scss';

const Modal = ({
  ...props
}) => {
  return (
    <div className="modal">
      <div className="panel">
        {props.children}
      </div>
    </div>
  )
}

export default Modal;