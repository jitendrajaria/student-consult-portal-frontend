import React from 'react';
import './input.css';

export default function Input({ placeholder, value, onChange, type = 'input', name, ...rest }) {
	return <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} {...rest} />;
}
