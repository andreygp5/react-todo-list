import React, { useState, useEffect } from 'react';

import { updateTodo } from '../../Adapters/todoAdapter';

import SquareButton from '../SquareButton/SquareButton';
import { ReactComponent as DeleteIcon } from '../../Icons/delete.svg';
import { ReactComponent as UpdateIcon } from '../../Icons/update.svg';
import { ReactComponent as DoneIcon } from '../../Icons/done.svg';
import { useValidateMessage } from '../../Hooks/useValidateMessage';
import './Item.scss';

export interface ItemProps {
  _id: string;
  message: string;
  completed: boolean;

  deleteHandler(id: string): void;
}

const Item = ({
  message, completed, deleteHandler, _id,
}: ItemProps) => {
  const [checked, setChecked] = useState(completed);
  const [todoMessage, setMessage] = useState(message);

  const isValidMessage = useValidateMessage(message);

  const [updateMode, setUpdateMode] = useState(false);

  const handleMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleUpdateClick = async () => {
    if (!isValidMessage) {
      return;
    }

    if (updateMode) {
      await updateTodo({
        _id,
        message: todoMessage,
      });
    }

    setUpdateMode((prev) => !prev);
  };

  useEffect(() => {
    const updateDoneHandler = async () => {
      await updateTodo({
        _id,
        completed: checked,
      });
    };

    updateDoneHandler();
  }, [checked]);

  return (
    <li className="item">
      <input
        className="item__checkbox_hidden"
        id={_id}
        type="checkbox"
        checked={checked}
        onChange={() => setChecked((prev) => !prev)}
      />
      <label className="item__checkbox" htmlFor={_id} />
      <input
        className="item__message"
        value={todoMessage}
        onInput={handleMessageInput}
        readOnly={!updateMode}
      />
      <div className="item__control-btns">
        <SquareButton
          type="button"
          classes="item__btn"
          color={updateMode ? 'green' : 'blue'}
          Icon={updateMode ? DoneIcon : UpdateIcon}
          onClick={handleUpdateClick}
        />
        <SquareButton
          type="button"
          classes="item__btn"
          color="red"
          Icon={DeleteIcon}
          onClick={() => deleteHandler(_id)}
        />
      </div>
    </li>

  );
};

export default Item;
