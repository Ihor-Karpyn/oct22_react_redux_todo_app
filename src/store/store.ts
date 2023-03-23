import {
  Action, applyMiddleware, combineReducers, createStore, Dispatch,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import { Todo } from '../typedefs';
import { TodosApi } from '../api/todos/todosApi';

interface PayloadAction<T, P> extends Action<T> {
  payload: P
}

enum ActionType {
  SetTodos = 'todo/set_todos',
  ClearTodos = 'todo/clear_todos',
}

type SetTodosAction = PayloadAction<ActionType.SetTodos, Todo[]>;
type ClearTodosAction = Action<ActionType.ClearTodos>;

type AppAction = SetTodosAction | ClearTodosAction;

interface User { id: number }

interface TodoState {
  todos: Todo[],
  users: User[]
}

const initialTodoState: TodoState = {
  todos: [],
  users: [],
};

const todoReducer = (
  state = initialTodoState, action: AppAction,
): TodoState => {
  switch (action.type) {
    case ActionType.SetTodos:
      return {
        ...state,
        todos: action.payload,
      };

    case ActionType.ClearTodos:
      return {
        ...state,
        todos: [],
      };

    default:
      return state;
  }
};

const setTodoActionCreator = (todos: Todo[]): SetTodosAction => ({
  type: ActionType.SetTodos,
  payload: todos,
});

const clearTodoActionCreator = (): ClearTodosAction => ({
  type: ActionType.ClearTodos,
});

export const TODO_ACTIONS = {
  set: setTodoActionCreator,
  clear: clearTodoActionCreator,
};

const rootReducer = combineReducers({
  todo: todoReducer,
});

export const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk)),
);

type AppState = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const todosSelector = (state: AppState) => state.todo.todos;

export const todosByQuerySelector = ((searchQuery: string) => {
  return (state: AppState) => (
    state.todo.todos.filter(todo => todo.title.includes(searchQuery))
  );
});

export const todoByIdSelector = ((id: number) => {
  return (state: AppState) => (
    state.todo.todos.find(todo => todo.id === id)
  );
});

export const fullTodoSelector = (state: AppState) => {
  const { todos, users } = state.todo;

  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));
};

export const loadTodosByUserIdAction = (userId: number) => {
  return async (dispatch: Dispatch<AppAction>) => {
    const todos = await TodosApi.getByUserId(userId);

    dispatch(TODO_ACTIONS.set(todos));
  };
};
