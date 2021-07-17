import ReactLoading from 'react-loading';

import { ITodoItem } from '../../Types/ITodoItem';
import Item from './Item';

import './List.scss';

export interface ListProps {
  todosList: ITodoItem[];
  itemsLimit: number;
  isLoading: boolean;

  deleteTodoHandler(id: string): void;
}

const List = ({ todosList, isLoading, deleteTodoHandler }: ListProps) => {
  const isEmpty = todosList.length === 0;

  if (isLoading) {
    return (
      <ul className="todo-list">
        <li className="todo-list__placeholder">
          <ReactLoading
            type="bubbles"
            color="#000000"
            className="todo-list__loading"
          />
        </li>
      </ul>
    );
  }

  if (isEmpty) {
    return (
      <ul className="todo-list">
        <li className="todo-list__placeholder">
          All todos completed
        </li>
      </ul>
    );
  }

  return (
    <ul className="todo-list">
      {
        todosList.map((todo) => {
          const { _id, message, completed } = todo;

          return (
            <Item
              key={_id}
              _id={_id}
              message={message}
              completed={completed}
              deleteHandler={deleteTodoHandler}
            />
          );
        })
      }
    </ul>
  );
};

export default List;
