const alfovit = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const lettersList = document.querySelector('.letters__list');
const letterLink = lettersList.querySelectorAll('.letters__link');

const checkLetters = (existingLetters) => {
   letterLink.forEach(letter => {
      letter.classList.remove('letters__link--existing');
   })
   existingLetters.forEach(letter => {
      let selector = `[href="#${letter}"]`;
      let letterLink = lettersList.querySelector(selector);
      letterLink.classList.add('letters__link--existing');
   });
};


/* ============= Export ============= */

export default checkLetters