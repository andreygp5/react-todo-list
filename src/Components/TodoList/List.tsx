import { ITodoItem } from '../../Types/ITodoItem';
import Item from './Item';

import './List.scss';

export interface ListProps {
  todosList: ITodoItem[];
  itemsLimit: number;
  deleteTodoHandler(id: string): void;
}

const List = ({ todosList, itemsLimit, deleteTodoHandler }: ListProps) => {
  const itemHeight = 86;
  const isEmpty = todosList.length === 0;

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
    <ul className="todo-list" style={{ minHeight: `${itemHeight * itemsLimit}px` }}>
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
