let morseCharacterDisplay = document.getElementById('morse-character-display');
let morseMsgDisplay = document.getElementById('morse-msg-display');
let textMsgDisplay = document.getElementById('text-msg-display');
let began = false; // has any text been entered

let start; // general start time of a timer
let morseCharacterString = ''; // the current character being built
let morseMsg = '';
let textMsg = '';
let textCharacter;

const dit = 100; // feels approximately right. can be user-defineable
const dah = 3 * dit; // by definition in International Morse Code
const characterGap = dah;
const wordGap = 7 * dit;

const morseToText = new Map();
morseToText.set('.', 'E');
morseToText.set('-', 'T');
morseToText.set('..', 'I');
morseToText.set('.-', 'A');
morseToText.set('-.', 'N');
morseToText.set('--', 'M');
morseToText.set('...', 'S');
morseToText.set('..-', 'U');;
morseToText.set('.-.', 'R');
morseToText.set('.--', 'W');
morseToText.set('-..', 'D');
morseToText.set('-.-', 'K');
morseToText.set('--.', 'G');
morseToText.set('---', 'O');
morseToText.set('....', 'H');
morseToText.set('...-', 'V');
morseToText.set('..-.', 'F');
morseToText.set('..--', 'Ü');
morseToText.set('.-..', 'L');
morseToText.set('.-.-', 'Ä');
morseToText.set('.--.', 'P');
morseToText.set('.---', 'J');
morseToText.set('-...', 'B');
morseToText.set('-..-', 'X');
morseToText.set('-.-.', 'C');
morseToText.set('-.--', 'Y');
morseToText.set('--..', 'Z');
morseToText.set('--.-', 'Q');
morseToText.set('---.', 'Ö');
morseToText.set('----', 'CH'); // digraph
morseToText.set('.....', '5');
morseToText.set('....-', '4');
morseToText.set('...-.', 'Ŝ');
morseToText.set('...--', '3');
morseToText.set('..-..', 'É');
// first gap in level-order traversal with '..-.-'
morseToText.set('..--.', 'Đ');
morseToText.set('..---', '2');
morseToText.set('.-..-', 'È');
morseToText.set('.-.-.', '+');
morseToText.set('.--..', 'Þ');
morseToText.set('.--.-', 'À');
morseToText.set('.---.', 'Ĵ');
morseToText.set('.----', '1');
morseToText.set('-....', '6');
morseToText.set('-...-', '=');
morseToText.set('-..-.', '/');
morseToText.set('-.-..', 'Ç');
morseToText.set('-.--.', 'Ĥ');
morseToText.set('--...', '7');
morseToText.set('--.-.', 'Ĝ');
morseToText.set('--.--', 'Ñ');
morseToText.set('---..', '8');
morseToText.set('----.', '9');
morseToText.set('-----', '0');
morseToText.set('..--..', '?');
morseToText.set('..--.-', '_');
morseToText.set('.-..-.', '"');
morseToText.set('.-.-.-', '.');
morseToText.set('.--.-.', '@');
morseToText.set('.----.', '\'');
morseToText.set('-....-', '-');
morseToText.set('-.-.-.', ';');
morseToText.set('-.-.--', '!');
morseToText.set('-.--.-', ')'); // seems to represent both open and close
morseToText.set('--..--', ',');
morseToText.set('---...', ':');

function translate(morse){
    return morseToText.get(morse);
}

addEventListener('keydown', (event) => {
    if(event.repeat) return; // ignore automatic repeats
    if(event.key != ' ') return; // ignore non-space characters

    // gap between characters and/or words
    if(began && Date.now() - start >= characterGap){
	textCharacter = translate(morseCharacterString);

	// ignore invalid morse
	if(textCharacter !== undefined){

	    // word gap
	    if(Date.now() - start >= wordGap){
		morseMsg += ' ' + morseCharacterString + ' /';
		textMsg += ' ' + textCharacter + ' /';
	    }
	    // character gap
	    else{
		morseMsg += ' ' + morseCharacterString;
		textMsg += ' ' + textCharacter;
	    }
	}

	morseCharacterString = '';

	// update displays
	morseCharacterDisplay.textContent = morseCharacterString;
	morseMsgDisplay.textContent = morseMsg;
	textMsgDisplay.textContent = textMsg;
    }

    start = Date.now();
});

addEventListener('keyup', (event) => {
    if(event.key != ' ') return; // ignore non-space characters

    began = true; // at least one dit/dah has been entered

    if(Date.now() - start <= dah) morseCharacterString += '.';
    else morseCharacterString += '-';

    morseCharacterDisplay.textContent = morseCharacterString;

    start = Date.now(); // for timing morse string ending
});
