import uploadContacts from './backend'
import { contactClickHandler } from './profile'
import checkLetters from './checkLetters'

let contactsBody = document.querySelector('.contacts .container');
let contactsBlock = document.querySelector('#contactBlock').content.querySelector('.contacts__block');
let contactTemplate = document.querySelector('#contact').content.querySelector('.contact');

let existingLetters = [];

/* Set default listeners to contactTemplate */
let setDefaultListeners = (element) => {
	element.addEventListener('click', contactClickHandler);
	element.addEventListener('keydown', function (evt) {
		if (evt.key === "Enter") {
			contactClickHandler.call(this, evt);
		}
	});
	let phoneIcon = element.querySelector('.contact__phone-link');
	phoneIcon.addEventListener('click', (evt) => {
		evt.stopPropagation();
	});
	phoneIcon.addEventListener('keydown', (evt) => {
		evt.stopPropagation()
	});
};

/* Create contact elem by data*/
let createContact = (contactData) => {
	let contact = contactTemplate.cloneNode(true);
	setDefaultListeners(contact);
	let avatar = contact.querySelector('.contact__avatar-img');
	let name = contact.querySelector('.contact__name');
	let phoneNumber = contact.querySelector('.contact__phone-number');
	let phoneIcon = contact.querySelector('.contact__phone-link');
	let email = contact.querySelector('.contact__email');

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
let renderContacts = (contactsData) => {
	let currentLetter;
	let currentContactBlock;
	contactsData.forEach(function (contactData, i) {
		if (contactData.name[0] !== currentLetter) {
			currentLetter = contactData.name[0];
			existingLetters.push(currentLetter);
			currentContactBlock = contactsBlock.cloneNode(true);
			let letterElem = currentContactBlock.querySelector('.contacts__letter');
			letterElem.textContent = currentLetter;
			letterElem.id = currentLetter;
			contactsBody.appendChild(currentContactBlock);
		}
		let contactList = currentContactBlock.querySelector('.contacts__list');
		let contact = createContact(contactData);
		contactList.appendChild(contact);
	});
};

/* Set renderContacts as callback  */
uploadContacts(renderContacts);

checkLetters(existingLetters);