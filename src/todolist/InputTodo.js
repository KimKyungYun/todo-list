import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Todolist from './Todolist';
import './Todo.css';
import { Button, TextField, Typography } from '@mui/material';
import Calendar from './Calendar';
import { getTodo, addTodo } from '../redux/rootRedux';

export default function InputTodo() {
	const todos = useSelector((state) => state.todos.todos);
	const [calDate, setCalDate] = useState(null);
	const [todo, setTodo] = useState({ content: '', date: '' });
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getTodo());
	}, []);
	const changeTodo = (e) => {
		setTodo((prev) => ({ ...prev, content: e.target.value }));
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
		if (todo.content === '') {
			alert('내용을 입력해주세요.');
		} else if (todo.date === '') {
			alert('날짜를 선택해주세요.');
		} else {
			dispatch(addTodo());
			setTodo({ content: '', date: '' });
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
							value={todo.content}
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
								text={value.content}
								date={value.date}
							/>
						))}
				</div>
			</div>
		</div>
	);
}
