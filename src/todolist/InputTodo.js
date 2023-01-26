import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToDo } from '../redux/rootRedux';
import Todolist from './Todolist';
import './Todo.css';
import { Button, TextField, Typography } from '@mui/material';
import Calendar from './Calendar';

export default function InputTodo() {
	const todos = useSelector((state) => state.todos.todos);
	const [calDate, setCalDate] = useState(null);
	const [todo, setTodo] = useState({ text: '', date: '' });
	const dispatch = useDispatch();

	const changeTodo = (e) => {
		setTodo((prev) => ({ ...prev, text: e.target.value }));
	};
	const changeDate = (value) => {
		var date = new Date(value.$d);
		const dateInfo =
			date.getFullYear() +
			'년' +
			(date.getMonth() + 1) +
			'월' +
			date.getDate() +
			'일';
		setTodo((prev) => ({ ...prev, date: dateInfo }));
		setCalDate(value);
	};
	const addWork = (e) => {
		e.preventDefault();
		if (todo.text === '') {
			alert('내용을 입력해주세요.');
		} else if (todo.date === '') {
			alert('날짜를 선택해주세요.');
		} else {
			dispatch(addToDo(todo));
			setTodo({ text: '', date: '' });
			setCalDate(null);
		}
	};
	return (
		<div className='Main'>
			<div className='Sub'>
				<Typography variant='h4'>Work To Do</Typography>
				<form className='Add flex' onSubmit={addWork}>
					<div>
						<TextField
							sx={{ width: '100%' }}
							type='text'
							placeholder='할일을 입력하세요.'
							onChange={changeTodo}
							value={todo.text}
						/>

						<Calendar calDate={calDate} changeDate={changeDate} />
					</div>
					<Button variant='contained' type='submit'>
						추가
					</Button>
				</form>
			</div>
			<div className='List-main'>
				<div className='List-sub'>
					{todos &&
						todos.map((value) => (
							<Todolist
								key={value.id}
								id={value.id}
								text={value.text}
								date={value.date}
							/>
						))}
				</div>
			</div>
		</div>
	);
}
