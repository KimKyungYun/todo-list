import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TodoistApi } from '@doist/todoist-api-typescript';

let id = 1;
const api = new TodoistApi('0d5eab937803121b4f948fc106f3c20672bc9da7');

export const getTodo = createAsyncThunk('get/Todo', async () => {
	const res = await api.getTasks();
	return res;
});
export const addTodo = createAsyncThunk(
	'add/Todo',
	async ({ content, dueString }) => {
		const res = await api.addTask({
			content: content,
			dueString: dueString,
		});
		return res;
	}
);
export const rootReducer = createSlice({
	name: 'worktodo',
	initialState: { todos: [] },

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
	extraReducers: (builder) => {
		builder
			.addCase(getTodo.fulfilled, (state, action) => {
				state.todos = action.payload;
			})
			.addCase(addTodo.fulfilled, (state, action) => {
				state.todos.push(action.payload);
			});
	},
});

export const { addToDo, removeToDo } = rootReducer.actions;
export default rootReducer.reducer;
