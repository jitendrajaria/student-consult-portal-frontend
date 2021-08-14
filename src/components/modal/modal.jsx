import React from 'react';
import Button from '../button/button';
import './modal.css';
export default function Modal({ title, show, children, closeModal }) {
	return (
		<div style={{ display: show ? 'block' : 'none' }} className='modal'>
			<div className='modal-title'>
				<div className='modal-header'>
					<span>{title}</span>
					<Button icon='times' onlyIcon={true} onClick={closeModal} />
				</div>
			</div>
			<div className='modal-body'>{children}</div>
		</div>
	);
}
