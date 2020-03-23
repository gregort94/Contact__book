(() => {


	let contactsBody = document.querySelector('.contacts__list');
	let contactTemplate = document.querySelector('#contact').content.querySelector('.contact');

	let createContact = (contactData) => {
		let contact = contactTemplate.cloneNode(true);	
		let avatar = contact.querySelector('.contact__avatar-img');
		let name = contact.querySelector('.contact__name');
		let phone = contact.querySelector('.contact__phone');
		let email = contact.querySelector('.contact__email');
		avatar.src = contactData.avatar;
		name.textContent = contactData.name;
		phone.textContent = contactData.phone;
		email.textContent = contactData.email;
		return contact
	}

	let renderContacts = (contactsData) => {
		contactsData.forEach(function(contactData, i){
			let contact = createContact(contactData);
			contactsBody.appendChild(contact);
		})
	}
	window.backend.uploadContacts(renderContacts);
	
	
})()	