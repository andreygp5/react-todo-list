import { useState, useEffect } from 'react';
import { createTodo, deleteTodo, getTodosPageLimit } from '../../Adapters/todoAdapter';

import { TODOS_PAGE_LIMIT } from '../../Constants/TODOS';
import { ITodoItem } from '../../Types/ITodoItem';
import AddBar from '../AddBar/AddBar';
import Pagination from '../Pagination/Pagination';
import List from '../TodoList/List';

import './TodoManager.scss';

const TodoManager = () => {
  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pagesAmount, setPagesAmount] = useState(1);

  const deleteTodoHandler = async (_id: string) => {
    await deleteTodo(_id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== _id));

    if (todos.length === 1) {
      setPageNumber((prev) => (prev === 1 ? prev : prev - 1));
    }
  };

  const addTodoHandler = async (desc: string) => {
    const createdTodo = await createTodo(desc);
    setTodos((prevTodos) => [...prevTodos, createdTodo]);
  };

  useEffect(() => {
    const getTodos = async () => {
      const todosWithInfo = await getTodosPageLimit(pageNumber, TODOS_PAGE_LIMIT);

      setTodos(todosWithInfo.todos);
      setPagesAmount(todosWithInfo.info.pagesAmount);
    };

    getTodos();
  }, [pageNumber, todos.length]);

  const handleChangePage = (page: number) => {
    setPageNumber(page);
  };

  return (
    <div className="todo-manager">
      <AddBar
        addTodoHandler={addTodoHandler}
      />
      <List
        todosList={todos}
        itemsLimit={TODOS_PAGE_LIMIT}
        deleteTodoHandler={deleteTodoHandler}
      />
      {todos.length === 0 ? null : (
        <Pagination
          pagesAmount={pagesAmount}
          currentPage={pageNumber}
          handleChangePage={handleChangePage}
        />
      )}

    </div>
  );
};

export default TodoManager;
