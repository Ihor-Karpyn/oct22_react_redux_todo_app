/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../../typedefs';
import { TodosApi } from '../../../api/todos/todosApi';

export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
}

const initialState: TodoState = {
  todos: [],
  isLoading: false,
};

export const getTodosBuUserIdThunk = createAsyncThunk<Todo[], number>(
  'todo/loadUserById',
  TodosApi.getByUserId,
);

const counterSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    clearTodos: (state) => {
      state.todos = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodosBuUserIdThunk.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getTodosBuUserIdThunk.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { setTodos, clearTodos } = counterSlice.actions;

export const todoReducer = counterSlice.reducer;
