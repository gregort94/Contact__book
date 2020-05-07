import sortByName from './sort'

const UPLOAD_CONTACTS_URL = { method: 'GET', url: 'https://raw.githubusercontent.com/gregort94/DATA/master/users.json' };

/* Get contacts data array form server by Ajax*/
const uploadContacts = (successHandler) => {
	const xhr = new XMLHttpRequest();
	xhr.open(UPLOAD_CONTACTS_URL.method, UPLOAD_CONTACTS_URL.url);
	xhr.responseType = 'json';
	xhr.addEventListener('load', () => {
		switch (xhr.status) {
			case 200:
				window.contactsData = sortByName(xhr.response);
				successHandler(window.contactsData);
				break;
			case 400:
				console.error('Invalid request');
				break;
			case 401:
				console.error('The user is not logged in');
				break;
			case 404:
				console.error('Nothing found');
				break;
			default:
				console.error('Response status: ' + xhr.status + ' ' + xhr.statusText);
		}
	})
	xhr.send();
};


/* ================== Export =================*/

export default uploadContacts