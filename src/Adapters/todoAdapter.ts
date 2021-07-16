import axios from 'axios';
import { API_BASE_URL } from '../Constants/API';
import { TODO_PAGES_INFO_VAR } from '../Constants/TODOS';
import { ITodoItem } from '../Types/ITodoItem';
import { ITodosWithInfo } from '../Types/ITodosWithInfo';

type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>
type PartialTodoUpdate = AtLeast<ITodoItem, '_id'>;

interface IUpdateBody {
  message?: string;
  completed?: boolean;
}

const getAllTodos = async (): Promise<ITodosWithInfo> => {
  const resp = await axios.get(`${API_BASE_URL}/todos`);

  return resp.data.reduce((todosWithInfo: ITodosWithInfo, item: string) => {
    const itemObj = JSON.parse(item);

    if (Object.keys(itemObj).includes(TODO_PAGES_INFO_VAR)) {
      const { pagesAmount }: {pagesAmount: number} = itemObj;
      todosWithInfo.info.pagesAmount = pagesAmount;

      return todosWithInfo;
    }

    todosWithInfo.todos.push(itemObj);
    return todosWithInfo;
  }, {
    info: {
      pagesAmount: 1,
    },
    todos: [],
  });
};

const getTodosPageLimit = async (page: number, limit: number): Promise<ITodosWithInfo> => {
  const resp = await axios.get(`${API_BASE_URL}/todos`, {
    params: {
      page,
      limit,
    },
  });

  return resp.data.reduce((todosWithInfo: ITodosWithInfo, item: string) => {
    const itemObj = JSON.parse(item);

    if (Object.keys(itemObj).includes(TODO_PAGES_INFO_VAR)) {
      const { pagesAmount }: {pagesAmount: number} = itemObj;
      todosWithInfo.info.pagesAmount = pagesAmount;

      return todosWithInfo;
    }

    todosWithInfo.todos.push(itemObj);
    return todosWithInfo;
  }, {
    info: {
      pagesAmount: 1,
    },
    todos: [],
  });
};

const updateTodo = async (todo: PartialTodoUpdate): Promise<void> => {
  const { _id, message, completed } = todo;
  const body: IUpdateBody = {};

  if (message !== undefined) {
    body.message = message;
  }

  if (completed !== undefined) {
    body.completed = completed;
  }

  await axios.patch(`${API_BASE_URL}/todos/${_id}`, body);
};

const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/todos/${id}`);
};

const createTodo = async (desc: string): Promise<ITodoItem> => {
  const resp = await axios.post(`${API_BASE_URL}/todos`, {
    completed: false,
    message: desc,
  });

  return resp.data;
};

export {
  getAllTodos,
  updateTodo,
  deleteTodo,
  createTodo,
  getTodosPageLimit,
};
