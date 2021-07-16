import { IPagesInfo } from './IPagesInfo';
import { ITodoItem } from './ITodoItem';

export interface ITodosWithInfo {
  info: IPagesInfo;
  todos: ITodoItem[]
}
