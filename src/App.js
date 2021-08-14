import './App.css';
import { useEffect, useState } from 'react';
import Input from './components/input/Input';
import Button from './components/button/button';
import Modal from './components/modal/modal';
import { getUniversityByQuery } from './api/university';

function App() {
	const countries = ['Germany', 'USA', 'Japan'];
	const [filters, setFilters] = useState({ courseName: '', gpa: 0, greScore: 0, country: '' });

	const [isShowingModal, setIsShowingModal] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		document.querySelector('title').innerText = 'Search Courses';
		getUniversities();
		// eslint-disable-next-line
	}, []);

	async function getUniversities() {
		try {
			const res = await getUniversityByQuery(filters);
			setData(res.data.data);
		} catch (err) {
			console.error(err);
		}
	}

	function showModal() {
		setIsShowingModal(true);
	}
	function closeModal() {
		setIsShowingModal(false);
	}
	function handleUniversityInfo(i) {
		const accordians = document.querySelectorAll('.university-accordian');
		accordians[i].classList.toggle('active');
		const item = accordians[i].nextElementSibling;

		if (item.style.maxHeight) {
			item.style.maxHeight = null;
		} else {
			item.style.maxHeight = item.scrollHeight + 'px';
		}
	}

	async function handleFilterSubmit() {
		try {
			await getUniversities();
			closeModal();
		} catch (err) {
			console.err(err);
			closeModal();
		}
	}

	function handleInputChange(event) {
		const inputFilters = { ...filters };
		const name = event.target.name;
		const value = event.target.value;
		inputFilters[name] = value;
		setFilters(inputFilters);
	}

	function handleKeyChange(evt) {
		if (evt.keyCode === 13) {
			getUniversities();
		}
	}

	return (
		<div className='App'>
			<div className='backdrop' style={{ display: isShowingModal ? 'block' : 'none' }}></div>
			<header className='App-header'>
				<div className='header-name'>
					<span>Courses</span>
				</div>
				<div className='header-search'>
					<span className='header-search__icon'>
						<i className='fa fa-search' aria-hidden='true'></i>
					</span>
					<Input placeholder='Search Your Course Here' name='courseName' onChange={handleInputChange} onKeyDown={handleKeyChange} />
					<Button onlyIcon={true} icon='filter' onClick={showModal} />
					<Button text='Search' icon='search' onClick={getUniversities} />
				</div>
			</header>
			<main>
				{data.length > 0 ? (
					<section className='table-section table-responsive'>
						<div className='table-sd'>
							{data.map((item, i) => {
								return (
									<div key={item._id}>
										<div className='university-accordian' onClick={() => handleUniversityInfo(i)}>
											<span>{item.university.name}</span>
										</div>
										<div className='university-info-panel'>
											<div>
												<span>Country</span>
												<span>{item.university.country}</span>
											</div>
											<div>
												<span>Course</span>
												<span>{item.name}</span>
											</div>
											<div>
												<span>Teacher</span>
												<span>{item.teacherName}</span>
											</div>
											<div>
												<span>Min GPA</span>
												<span>{item.university.minGpa}</span>
											</div>
											<div>
												<span>Min GRE Score</span>
												<span>{item.university.minGreScore}</span>
											</div>
										</div>
									</div>
								);
							})}
						</div>
						<table>
							<thead>
								<tr>
									<th>University Name</th>
									<th>Country</th>
									<th>Course Name</th>
									<th>Teacher Name</th>
									<th>Minimum GPA</th>
									<th>Minimum GRE Score</th>
								</tr>
							</thead>
							<tbody>
								{data.map((item) => {
									return (
										<tr key={item._id}>
											<td>{item.university?.name}</td>
											<td>{item.university?.country}</td>
											<td>{item.name}</td>
											<td>{item.teacherName}</td>
											<td>{item.university.minGpa}</td>
											<td>{item.university.minGreScore}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</section>
				) : (
					<div className='no-message-found'>No University found, with current filters.</div>
				)}
			</main>
			<Modal show={isShowingModal} closeModal={closeModal} title='Add Filters'>
				<form>
					<div className='form-group'>
						<label>GPA</label>
						<Input name='gpa' onChange={handleInputChange} type={'number'} placeholder='Minimum GPA score' />
					</div>
					<div className='form-group'>
						<label>Gre Score</label>
						<Input name='greScore' onChange={handleInputChange} type={'number'} placeholder='Minimum Gre Score' />
					</div>
					<div className='form-group'>
						<label>Country</label>
						<select name='country' onChange={handleInputChange}>
							<option value=''>Select Country</option>
							{countries.map((item, i) => (
								<option key={i}>{item}</option>
							))}
						</select>
					</div>
					<div className='modal-footer'>
						<div className='button-group'>
							<Button text='Cancel' onClick={closeModal} />
							<Button text='Submit' onClick={handleFilterSubmit} />
						</div>
					</div>
				</form>
			</Modal>
		</div>
	);
}

export default App;
