export const ENDPOINTS = {
  base: 'https://mate.academy/students-api',
  todos: '/todos',
  todosByUserId: (userId: number) => `${ENDPOINTS.todos}?userId=${userId}`,
};
