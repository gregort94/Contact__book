import uploadContacts from './backend'
import { contactClickHandler } from './profile'
import checkLetters from './checkLetters'

const contactsBody = document.querySelector('.contacts .container');
const contactsBlock = document.querySelector('#contactBlock').content.querySelector('.contacts__block');
const contactTemplate = document.querySelector('#contact').content.querySelector('.contact');

const existingLetters = [];

/* Set default listeners to contactTemplate */
const setDefaultListeners = (element) => {
	element.addEventListener('click', contactClickHandler);
	element.addEventListener('keydown', function (evt) {
		if (evt.key === "Enter") {
			contactClickHandler.call(this, evt);
		}
	});
	const phoneIcon = element.querySelector('.contact__phone-link');
	phoneIcon.addEventListener('click', (evt) => {
		evt.stopPropagation();
	});
	phoneIcon.addEventListener('keydown', (evt) => {
		evt.stopPropagation()
	});
};

/* Create contact elem by data*/
const createContact = (contactData) => {
	const contact = contactTemplate.cloneNode(true);
	setDefaultListeners(contact);
	const avatar = contact.querySelector('.contact__avatar-img');
	const name = contact.querySelector('.contact__name');
	const phoneNumber = contact.querySelector('.contact__phone-number');
	const phoneIcon = contact.querySelector('.contact__phone-link');
	const email = contact.querySelector('.contact__email');

	avatar.src = contactData.avatar;
	name.textContent = contactData.name;
	phoneNumber.textContent = contactData.phone;
	phoneIcon.href = 'tel:' + contactData.phone;
	email.textContent = contactData.email;
	contact.setAttribute('data-id', contactData.id);
	if (contactData.favorite) {
		contact.classList.add('contact--favorite');
	}
	return contact
};

/* Render and append created contacts elements */
const renderContacts = (contactsData) => {
	existingLetters.length = 0;
	contactsBody.innerHTML = ''; // clear contacts body
	let currentLetter;
	let currentContactBlock;
	contactsData.forEach(function (contactData, i) {
		if (contactData.name[0] !== currentLetter) {
			currentLetter = contactData.name[0];
			existingLetters.push(currentLetter);
			currentContactBlock = contactsBlock.cloneNode(true);
			const letterElem = currentContactBlock.querySelector('.contacts__letter');
			letterElem.textContent = currentLetter;
			letterElem.id = currentLetter;
			contactsBody.appendChild(currentContactBlock);
		}
		const contactList = currentContactBlock.querySelector('.contacts__list');
		const contact = createContact(contactData);
		contactList.appendChild(contact);
	});
	checkLetters(existingLetters);
};

/* Set renderContacts as callback  */
uploadContacts(renderContacts);



export { renderContacts }