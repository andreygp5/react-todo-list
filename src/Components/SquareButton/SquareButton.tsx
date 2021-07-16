import React, { SyntheticEvent } from 'react';

import './SquareButton.scss';

export interface SquareButtonProps {
  color: 'blue' | 'red' | 'green';
  type: 'button' | 'submit' | 'reset';
  classes?: string;
  Icon: React.ComponentType;
  onClick(e: SyntheticEvent): void;
}

const SquareButton = ({
  color, Icon, classes, onClick, type,
}: SquareButtonProps) => {
  const className = `square-button square-button_${color} ${classes}`;

  return (
    <button
      className={className}
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};

export default SquareButton;
