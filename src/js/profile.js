/* ============= Profile elements ============= */
let overlay = document.querySelector('.overlay');

let profile = document.querySelector('.profile');
let profileAvatar = profile.querySelector('.profile__avatar img');
let profileName = profile.querySelector('.profile__fieldset--name input');
let profilePhone = profile.querySelector('.profile__fieldset--phone input');
let profileEmail = profile.querySelector('.profile__fieldset--email input');
let profileCountry = profile.querySelector('.profile__fieldset--country input');
let profileState = profile.querySelector('.profile__fieldset--state input');
let profileCity = profile.querySelector('.profile__fieldset--city input');
let profileFavorite = profile.querySelector('.profile__star-input');
let profileEdit = profile.querySelector('.profile__edit');
let profileClose = profile.querySelector('.profile__close');
let profileSave = profile.querySelector('.profile__save');
let profileInputs = profile.querySelectorAll('.profile input');

let currentContactData;
let currentContactElement;

let disableInputs = () => {
	profileInputs.forEach((input) => {
		input.disabled = true;
	});
};

let enableInputs = () => {
	profileInputs.forEach((input) => {
		input.disabled = false;
	});
};

let closeProfileHandleer = (evt) => {
	overlay.classList.add('overlay--hidden');
	disableInputs();
};

let containProfile = (profileData) => {
	profileAvatar.src = profileData.avatar;
	profileName.value = profileData.name;
	profilePhone.value = profileData.phone;
	profileEmail.value = profileData.email;
	profileCountry.value = profileData.address.country;
	profileState.value = profileData.address.state;
	profileCity.value = profileData.address.city;
	profileFavorite.checked = profileData.favorite;
};

let contactClickHandler = function (evt) {
	disableInputs();
	overlay.classList.remove('overlay--hidden');
	currentContactElement = this;
	currentContactData = window.contactsData[this.getAttribute("data-id")];
	containProfile(currentContactData);
};

/* Add listeners to close profile */
overlay.addEventListener('mousedown', (evt) => {
	if (evt.target === overlay) {
		closeProfileHandleer();
	}
});
profileClose.addEventListener('click', closeProfileHandleer);
document.addEventListener('keydown', (evt) => {
	if (evt.keyCode === 27) {
		closeProfileHandleer();
	}
});

/* Add listeners to edit profile */
profileEdit.addEventListener('click', (evt) => {
	evt.preventDefault;
	enableInputs();
});

/* Cancel form submit*/
profile.addEventListener('submit', (evt) => {
	evt.preventDefault();
});


/* ================ Edit profile ============== */

let updateCurrentContact = (element) => {
	let avatar = element.querySelector('.contact__avatar');
	let name = element.querySelector('.contact__name');
	let phoneNumber = element.querySelector('.contact__phone-number');
	let email = element.querySelector('.contact__email');

	name.textContent = currentContactData.name;
	phoneNumber.textContent = currentContactData.phone;
	email.textContent = currentContactData.email;
	if (currentContactData.favorite) {
		element.classList.add('contact--favorite');
	} else {
		element.classList.remove('contact--favorite');
	}
};

let changeContactData = () => {
	currentContactData.name = profileName.value;
	currentContactData.phone = profilePhone.value;
	currentContactData.email = profileEmail.value;
	currentContactData.address.country = profileCountry.value;
	currentContactData.address.state = profileState.value;
	currentContactData.address.city = profileCity.value;
	currentContactData.favorite = profileFavorite.checked;
};

let saveChangesHandler = function () {
	changeContactData();
	updateCurrentContact(currentContactElement);
};

profileSave.addEventListener('click', saveChangesHandler);


/* ================== Export =================*/

export { contactClickHandler }