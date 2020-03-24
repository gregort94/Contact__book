(() => {

	let contactsBody = document.querySelector('.contacts__list');
	let contactTemplate = document.querySelector('#contact').content.querySelector('.contact');

	let createContact = (contactData) => {
		let contact = contactTemplate.cloneNode(true);	
		let avatar = contact.querySelector('.contact__avatar-img');
		let name = contact.querySelector('.contact__name');
		let phoneNumber = contact.querySelector('.contact__phone-number');
		let phoneIcon = contact.querySelector('.contact__phone-link');
		let email = contact.querySelector('.contact__email');
		avatar.src = contactData.avatar;
		name.textContent = contactData.name;
		phoneNumber.textContent = contactData.phone;
		phoneIcon.href ='tel:' + contactData.phone;
		email.textContent = contactData.email;
		contact.addEventListener('click', window.profile.contactClickHandler);
		if (contactData.favorite){
			contact.classList.add('contact--favorite');
		}
		return contact
	}

	let renderContacts = (contactsData) => {
		contactsData.forEach(function(contactData, i){
			let contact = createContact(contactData);
			contact.setAttribute('data-order', i);
			contactsBody.appendChild(contact);
		})
	}
	window.backend.uploadContacts(renderContacts);
})()	