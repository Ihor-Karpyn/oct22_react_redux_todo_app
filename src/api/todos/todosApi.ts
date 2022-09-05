import { Todo } from '../../typedefs';
import { request } from '../api';
import { ENDPOINTS } from '../constans';

const getTodos = (): Promise<Todo[]> => (
  request<Todo[]>(ENDPOINTS.todos)
);

const getByUserId = (userId: number): Promise<Todo[]> => (
  request<Todo[]>(ENDPOINTS.todosByUserId(userId))
);

export const TodosApi = {
  get: getTodos,
  getByUserId,
};
