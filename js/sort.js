(() => {

	let sortByName = (dataArray) => {
		return	dataArray.sort((a, b) => {
						let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
						if (nameA < nameB) 
						  return -1
						if (nameA > nameB)
						  return 1
						return 0 
					})
	};	

	let sortNameClickHandler = () => {
		let sortedDataArray =  sortByName(window.contactsData.slice());
		window.renderContacts(sortedDataArray);
	};

/* ============= Export ============= */
	
	window.sort = {
		sortByName: sortByName,
	}

})();