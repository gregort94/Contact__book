(() => {

/* ============= Profile elements ============= */
	let overlay = document.querySelector('.overlay');

	let profile = document.querySelector('.profile');
	let profileAvatar = profile.querySelector('.profile__avatar img');
	let profileName = profile.querySelector('.profile__name input');
	let profilePhone = profile.querySelector('.profile__phone input');
	let profileEmail = profile.querySelector('.profile__email input');
	let profileWebsite = profile.querySelector('.profile__website input');
	let profileCountry = profile.querySelector('.profile__country input');
	let profileState = profile.querySelector('.profile__state input');
	let profileCity = profile.querySelector('.profile__city input');


	let closeProfileHandleer = (evt) => {
		if (evt.target === overlay){
			overlay.classList.add('overlay--hidden');
		}
	}

	let containProfile = (profileData) => {
		profileAvatar.src = profileData.avatar;
		profileName.value = profileData.name;
		profilePhone.value = profileData.phone;
		profileEmail.value = profileData.email;
		profileWebsite.value = profileData.website;
		profileCountry.value = profileData.address.country;
		profileState.value = profileData.address.state;
		profileCity.value = profileData.address.city;
	}

	let contactClickHandler = function() {
		console.log(this);
		overlay.classList.remove('overlay--hidden');
		let profileData = window.contactsData[this.getAttribute("data-order")];
		containProfile(profileData);
	}

	overlay.addEventListener('click', closeProfileHandleer);
	document.addEventListener('keydown', (evt) => {
		if (evt.keyCode === 27){
			overlay.classList.add('overlay--hidden');
		}
	})



	document.addEventListener('touchmove', function(evt) {
		evt.preventDefault();
	})
/* ================== Export =================*/
	window.profile = {
		contactClickHandler: contactClickHandler,
	}

})()