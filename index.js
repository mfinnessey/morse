const morseCharDisplay = document.getElementById('morse-char-display');
const morseMsgDisplay = document.getElementById('morse-msg-display');
const textMsgDisplay = document.getElementById('text-msg-display');
const setUnitButton = document.getElementById('set-unit-button');
const unit = document.getElementById('unit');
const curMorseChar = document.getElementById('cur-morse-char');
const nextMorseCharDit = document.getElementById('next-morse-char-dit');
const nextMorseCharDah = document.getElementById('next-morse-char-dah')
let began = false; // has any text been entered

let start; // general start time of a timer
let morseCharString = ''; // the current char being built
let morseMsg = '';
let textMsg = '';
let textChar;

let dit;
let dah;
let charGap;
let wordGap;

setUnit(100); // a good starting value

const morseToText = new Map();
morseToText.set('.', 'E');
morseToText.set('-', 'T');
morseToText.set('..', 'I');
morseToText.set('.-', 'A');
morseToText.set('-.', 'N');
morseToText.set('--', 'M');
morseToText.set('...', 'S');
morseToText.set('..-', 'U');
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
    if(event.key != ' ') return; // ignore non-space chars

    // gap between chars and/or words
    if(began && Date.now() - start >= charGap){
	textChar = translate(morseCharString);

	// ignore invalid morse
	if(textChar !== undefined){

	    // word gap
	    if(Date.now() - start >= wordGap){
		morseMsg += ' ' + morseCharString + ' /';
		textMsg += ' ' + textChar + ' /';
	    }
	    // char gap
	    else{
		morseMsg += ' ' + morseCharString;
		textMsg += ' ' + textChar;
	    }
	}

	morseCharString = '';

	// update displays
	morseCharDisplay.textContent = morseCharString;
	morseMsgDisplay.textContent = morseMsg;
	textMsgDisplay.textContent = textMsg;
    }

    start = Date.now();
});

addEventListener('keyup', (event) => {
    if(event.key != ' ') return; // ignore non-space chars

    began = true; // at least one dit/dah has been entered

    if(Date.now() - start <= dah) morseCharString += '.';
    else morseCharString += '-';

    morseCharDisplay.textContent = morseCharString;
    promptMorseChars(morseCharString);

    start = Date.now(); // for timing morse string ending
});

// set time unit to user-defined value
function setUnit(unit){
    dit = unit;
    dah = 3 * dit;
    charGap = 3 * dit;
    wordGap = 7 * dit;
}

setUnitButton.addEventListener('click', (event) => {
    // ignore invalid unit value
    if(unit.value == NaN || unit.value <= 0) return;

    setUnit(unit.value);
});

function promptMorseChars(){
    if(translate(morseCharString) !== undefined){
	curMorseChar.textContent = translate(morseCharString);
    }
    if(translate(morseCharString + '.') !== undefined){
	nextMorseCharDit.textContent =  translate(morseCharString + '.')
    }
    if(translate(morseCharString + '-') !== undefined){
	nextMorseCharDah.textContent = translate(morseCharString + '-');
    }
}
