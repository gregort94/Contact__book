import { renderContacts } from './renderContacts'

const input = document.querySelector('.finder input');
const finderMessage = document.querySelector('.finder__message');
let timeoutID;

const findInputHandler = () => {
   if (timeoutID) {
      clearTimeout(timeoutID);
   }
   timeoutID = setTimeout(() => {
      const value = input.value.toLowerCase();
      const filteredData = window.contactsData.filter(contact => contact.name.toLowerCase().indexOf(value) + 1);
      (filteredData.length == 0) ? finderMessage.classList.remove('finder__message--hidden') : finderMessage.classList.add('finder__message--hidden');
      renderContacts(filteredData);
   }, 300)
}

input.addEventListener('input', findInputHandler);