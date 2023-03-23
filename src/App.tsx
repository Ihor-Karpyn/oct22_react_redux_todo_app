import './App.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  loadTodosByUserIdAction,
  todosByQuerySelector,
  useAppSelector,
} from './store/store';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();
  const todos = useAppSelector(todosByQuerySelector(searchQuery));

  useEffect(() => {
    dispatch(loadTodosByUserIdAction(4583));
  }, []);

  return (
    <>
      <h1>Redux react</h1>

      <input
        type="text"
        onChange={e => setSearchQuery(e.target.value)}
        value={searchQuery}
      />

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};
