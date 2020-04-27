import sortByName from './sort'

const UPLOAD_CONTACTS_URL = { method: 'GET', url: 'http://demo.sibers.com/users' };

/* Get contacts data array form server by Ajax*/
const uploadContacts = (successHandler) => {
	if (localStorage.contactsData) {
		window.contactsData = JSON.parse(localStorage.contactsData);
		let sortedData = sortByName(window.contactsData.slice());
		successHandler(sortedData);
		return
	}
	const xhr = new XMLHttpRequest();
	xhr.open(UPLOAD_CONTACTS_URL.method, UPLOAD_CONTACTS_URL.url);
	xhr.addEventListener('load', () => {
		switch (xhr.status) {
			case 200:
				localStorage.setItem('contactsData', xhr.response);
				window.contactsData = JSON.parse(localStorage.contactsData);
				let sortedData = sortByName(window.contactsData.slice());
				successHandler(sortedData);
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