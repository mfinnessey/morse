let morseCharacterDisplay = document.getElementById('morse-character-display');
let morseMsgDisplay = document.getElementById('morse-msg-display');
let began = false; // has any text been entered

let start; // general start time of a timer
let morseCharacterString = ''; // the current character being built
let morseMsg = '';

const dit = 100; // feels approximately right. can be user-defineable
const dah = 3 * dit; // by definition in International Morse Code
const characterGap = dah;
const wordGap = 7 * dit;


addEventListener('keydown', (event) => {
    if(event.repeat) return; // ignore automatic repeats
    if(event.key != ' ') return; // ignore non-space characters

    // gap between characters and/or words
    if(began && Date.now() - start >= characterGap){
	// word gap
	if(Date.now() - start >= wordGap){
	    morseMsg += ' ' + morseCharacterString + ' /';
	}
	// character gap
	else{
	    morseMsg += ' ' + morseCharacterString;
	}

	morseCharacterString = '';
    }

    start = Date.now();
});

addEventListener('keyup', (event) => {
    if(event.key != ' ') return; // ignore non-space characters

    began = true; // at least one dit/dah has been entered

    if(Date.now() - start <= dah) morseCharacterString += '.';
    else morseCharacterString += '-';

    morseCharacterDisplay.textContent = morseCharacterString;
    morseMsgDisplay.textContent = morseMsg;

    start = Date.now(); // for timing morse string ending
});
