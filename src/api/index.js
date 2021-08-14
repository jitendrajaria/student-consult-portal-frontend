import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.response.use(
	(res) => {
		return res;
	},
	(err) => {
		if (err.response) {
			if (err.response.status === 500) return Promise.reject({ message: 'Internal Server Error' });
			else if (err.response.status === 400) {
				return Promise.reject({ message: 'Invalid Request' });
			} else if (err.response.status === 404) {
				Promise.reject({ message: 'Route has not been registered' });
			}
		} else if (err.request) {
			return Promise.reject({ message: 'Please check your network and try again!' });
		} else {
			return Promise.reject({ message: 'Something gone wrong. Please try again' });
		}
	}
);

const restActions = {
	GET: (url, config = '') => {
		return axiosInstance.get(url, config);
	},
	POST: (url, data, config = '') => {
		return axiosInstance.post(url, data, config);
	},
	PUT: (url, data, config = '') => {
		return axiosInstance.put(url, data, config);
	},
	DELETE: (url) => {
		return axiosInstance.delete(url);
	},
};

export default restActions;
