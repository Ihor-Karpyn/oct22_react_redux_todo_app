import './App.scss';
import { useEffect } from 'react';
import {
  clearTodos,
  getTodosBuUserIdThunk,
} from './app/features/todo/todo.slice';
import { useAppDispatch, useAppSelector } from './app/store';

export const App = () => {
  const dispatch = useAppDispatch();
  const { todos, isLoading } = useAppSelector((state) => state.todo);

  useEffect(() => {
    dispatch(getTodosBuUserIdThunk(4583));
  }, []);

  return (
    <>
      <h1>Redux react</h1>

      <button
        type="button"
        onClick={() => dispatch(clearTodos())}
      >
        Clear
      </button>

      <ul>
        {isLoading && <h1>Loading</h1>}
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};
