import { useDispatch } from 'react-redux';
import { removeToDo } from '../redux/rootRedux';
import { Button } from '@mui/material';
export default function Work({ id, text, date }) {
	const dispatch = useDispatch();
	const removeText = () => {
		dispatch(removeToDo(id));
	};

	return (
		<div className='List'>
			<label htmlFor='todos'>
				<input type='checkbox' />
				{text}
			</label>
			<span htmlFor='todos'>
				{date}
				<Button
					sx={{ float: 'right' }}
					variant='text'
					type='button'
					onClick={removeText}
				>
					X
				</Button>
			</span>
		</div>
	);
}
