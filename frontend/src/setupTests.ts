import { setupServer } from 'msw/node';

import memberHandler from './mocks/handlers/members';
import postHandlers from './mocks/handlers/posts';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

const server = setupServer(...memberHandler, ...postHandlers);

beforeAll(() => server.listen());

afterAll(() => {
  server.close();
  jest.resetAllMocks();
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

beforeEach(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
});

jest.mock('react-router-dom', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-router-dom'),
  };
});

window.HTMLElement.prototype.scrollIntoView = jest.fn();
