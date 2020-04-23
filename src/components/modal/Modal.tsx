import React from 'react';

import './Modal.scss';

const Modal = ({
  ...props
}) => {
  return (
    <div className="modal">
      <div className="panel fadein">
        <div className="tri-decoration1" />
        <div className="tr2-decoration1" />
        <div className="tr3-decoration1" />
        {props.children}
      </div>
    </div>
  )
}

export default Modal;