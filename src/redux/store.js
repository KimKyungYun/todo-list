import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootRedux';
import logger from 'redux-logger';

export const store = configureStore({
	reducer: {
		todos: rootReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
