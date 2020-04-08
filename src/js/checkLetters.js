let alfovit = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let lettersList = document.querySelector('.letters__list');

let checkLetters = (existingLetters) => {
   let missingLetters = existingLetters.filter(x => !alfovit.includes(x)).concat(alfovit.filter(x => !existingLetters.includes(x)));
   missingLetters.forEach(letter => {
      let selector = `[href="#${letter}"]`;
      let letterLink = lettersList.querySelector(selector);
      letterLink.classList.add('letters__link--missing');
   });
};


/* ============= Export ============= */

export default checkLetters