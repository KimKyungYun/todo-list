import { createSlice } from '@reduxjs/toolkit';
let id = 1;
const initialState = {
	todos: [],
};

export const rootReducer = createSlice({
	name: 'worktodo',
	initialState,

	reducers: {
		addToDo: (state, action) => {
			const newTodo = action.payload;
			state.todos.push({
				id: id++,
				text: newTodo.text,
				date: newTodo.date,
			});
		},
		removeToDo: (state, action) => {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload);
		},
	},
});
export const { addToDo, removeToDo } = rootReducer.actions;
export default rootReducer.reducer;
