import React, { useState } from 'react';
import SquareButton from '../SquareButton/SquareButton';

import { ReactComponent as PlusIcon } from '../../Icons/plus.svg';
import './AddBar.scss';
import { useValidateMessage } from '../../Hooks/useValidateMessage';

export interface AddBarProps {
  addTodoHandler(message: string): void;
}

const AddBar = ({ addTodoHandler }: AddBarProps) => {
  const [todoMessage, setTodoDesc] = useState('');

  const isValidMessage = useValidateMessage(todoMessage);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoDesc(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidMessage) {
      return;
    }

    addTodoHandler(todoMessage);
    setTodoDesc('');
  };

  return (
    <form className="add-bar" onSubmit={handleSubmit}>
      <input
        className="add-bar__input"
        type="text"
        value={todoMessage}
        onChange={handleChange}
        placeholder="Enter your task..."
        required
      />
      <SquareButton
        type="submit"
        color="blue"
        Icon={PlusIcon}
        onClick={handleSubmit}
      />
    </form>
  );
};

export default AddBar;
