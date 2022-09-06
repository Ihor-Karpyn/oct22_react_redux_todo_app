import {
  combineReducers,
  createStore,
  Action as BaseAction,
  applyMiddleware, Dispatch,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Todo } from '../typedefs';
import { TodosApi } from '../api/todos/todosApi';

interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum TodosActionType {
  SetTodos = 'todos/set_todos',
  AddTodo = 'todos/add_todo',
}

export type SetTodosAction = Action<TodosActionType.SetTodos, Todo[]>;
export type AddTodoAction = Action<TodosActionType.AddTodo, Todo>;

type TodosActions = SetTodosAction | AddTodoAction;

const setTodosActionCreator = (todos: Todo[]): SetTodosAction => ({
  type: TodosActionType.SetTodos,
  payload: todos,
});

const loadTodosByUserIdAction = (userId: number) => {
  return async (dispatch: Dispatch<TodosActions>) => {
    const todos = await TodosApi.getByUserId(userId);

    dispatch(setTodosActionCreator(todos));
  };
};

export const TODO_ACTIONS_CREATOR = {
  set: setTodosActionCreator,
  load: loadTodosByUserIdAction,
};

const todosReducer = (
  todosState: Todo[] = [],
  action: TodosActions,
): Todo[] => {
  switch (action.type) {
    case TodosActionType.SetTodos:
      return [...action.payload];

    case TodosActionType.AddTodo:
      return [...todosState, action.payload];

    default:
      return todosState;
  }
};

const rootReducer = combineReducers({
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

const todosSelector = (state: RootState): Todo[] => state.todos;

const todosBySearchQuery = (query: string) => {
  return (state: RootState) => {
    return state.todos.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()));
  };
};

export const TODOS_SELECTORS = {
  todos: todosSelector,
  todosBySearchQuery,
};
