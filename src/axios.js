import axios from 'axios';
import router from './router';

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.status == 401) {
			localStorage.clear();
			router.push('/login').catch((err) => {
				if (
					err.name !== 'NavigationDuplicated' && 
					!err.message.includes('Avoided redundant navigation to current location')
				) {
					console.error(err);
				}
			});
		}
		return Promise.reject(error);
	}
);