import React from 'react';
import './button.css';
export default function Button({ text, onClick, icon, onlyIcon = false, type = 'button' }) {
	return (
		<button type={type} onClick={onClick}>
			{icon && <i className={`fa fa-${icon}`} aria-hidden='true' />}
			{!onlyIcon && <span className='text'>{text}</span>}
		</button>
	);
}
