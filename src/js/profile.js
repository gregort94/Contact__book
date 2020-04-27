/* ============= Profile elements ============= */
const overlay = document.querySelector('.overlay');

const profile = document.querySelector('.profile');
const profileAvatar = profile.querySelector('.profile__avatar img');
const profileName = profile.querySelector('.profile__fieldset--name input');
const profilePhone = profile.querySelector('.profile__fieldset--phone input');
const profileEmail = profile.querySelector('.profile__fieldset--email input');
const profileCountry = profile.querySelector('.profile__fieldset--country input');
const profileState = profile.querySelector('.profile__fieldset--state input');
const profileCity = profile.querySelector('.profile__fieldset--city input');
const profileFavorite = profile.querySelector('.profile__star-input');
const profileEdit = profile.querySelector('.profile__edit');
const profileClose = profile.querySelector('.profile__close');
const profileSave = profile.querySelector('.profile__save');
const profileInputs = profile.querySelectorAll('.profile input');
const profileMessage = profile.querySelector('.profile__message');

let currentContactData;
let currentContactElement;

const disableInputs = () => {
	profileInputs.forEach((input) => {
		input.disabled = true;
	});
};

const disableBtn = (btn) => {
	btn.disabled = true;
};
const enableBtn = (btn) => {
	btn.disabled = false;
};

const enableInputs = () => {
	profileInputs.forEach((input) => {
		input.disabled = false;
	});
};

const closeProfileHandleer = (evt) => {
	overlay.classList.add('overlay--hidden');
	disableInputs();
	// disableBtn(profileSave);
};

const containProfile = (profileData) => {
	profileAvatar.src = profileData.avatar;
	profileName.value = profileData.name;
	profilePhone.value = profileData.phone;
	profileEmail.value = profileData.email;
	profileCountry.value = profileData.address.country;
	profileState.value = profileData.address.state;
	profileCity.value = profileData.address.city;
	profileFavorite.checked = profileData.favorite;
};

const contactClickHandler = function (evt) {
	disableInputs();
	overlay.classList.remove('overlay--hidden');
	currentContactElement = this;
	currentContactData = window.contactsData[this.getAttribute("data-id")];
	containProfile(currentContactData);
};

/* Add listeners to close profile */
overlay.addEventListener('click', (evt) => {
	if (evt.target.dataset.close === '') {
		closeProfileHandleer();
	}
});

document.addEventListener('keydown', (evt) => {
	if (evt.keyCode === 27) {
		closeProfileHandleer();
	}
});

/* Add listeners to edit profile */
profileEdit.addEventListener('click', (evt) => {
	enableInputs();
	enableBtn(profileSave);
	// disableBtn(profileEdit);
});



/* ================ Edit profile ============== */

const updateCurrentContact = (element) => {
	const avatar = element.querySelector('.contact__avatar');
	const name = element.querySelector('.contact__name');
	const phoneNumber = element.querySelector('.contact__phone-number');
	const email = element.querySelector('.contact__email');

	name.textContent = currentContactData.name;
	phoneNumber.textContent = currentContactData.phone;
	email.textContent = currentContactData.email;
	if (currentContactData.favorite) {
		element.classList.add('contact--favorite');
	} else {
		element.classList.remove('contact--favorite');
	}
};

const changeContactData = () => {
	currentContactData.name = profileName.value;
	currentContactData.phone = profilePhone.value;
	currentContactData.email = profileEmail.value;
	currentContactData.address.country = profileCountry.value;
	currentContactData.address.state = profileState.value;
	currentContactData.address.city = profileCity.value;
	currentContactData.favorite = profileFavorite.checked;
};

const submitProfileHandler = function (evt) {
	changeContactData();
	updateCurrentContact(currentContactElement);
	showMessage();
	evt.preventDefault();
};

profile.addEventListener('submit', submitProfileHandler);


const showMessage = () => {
	profileMessage.classList.add('profile__message--visable');
	setTimeout(() => {
		profileMessage.classList.remove('profile__message--visable');
	}, 1500);
};



/* ================== Export =================*/

export { contactClickHandler }