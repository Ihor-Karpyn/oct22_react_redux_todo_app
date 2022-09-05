import { ENDPOINTS } from './constans';

export const request = <T>(endpoint: string): Promise<T> => (
  fetch(`${ENDPOINTS.base}/${endpoint}`)
    .then(res => res.json())
);
