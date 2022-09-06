import './App.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TODO_ACTIONS_CREATOR,
  TODOS_SELECTORS,
} from './store/store';

export const App = () => {
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();
  const todos = useSelector(TODOS_SELECTORS.todosBySearchQuery(query));

  useEffect(() => {
    dispatch(TODO_ACTIONS_CREATOR.load(4181));
  }, []);

  return (
    <>
      <h1>Redux react</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="search"
      />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};
