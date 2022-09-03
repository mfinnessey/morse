let morseDisplay = document.getElementById('morse-display');
let start;
let threshold = 150;

addEventListener('keydown', (event) => {
    if(event.repeat) return; // ignore automatic repeats
    if(event.key != ' ') return; // ignore non-space characters
    console.log(event.key);
    start = Date.now();
});

addEventListener('keyup', (event) => {
    if(event.key != ' ') return; // ignore non-space characters
    if(Date.now() - start <= threshold) morseDisplay.textContent = '.';
    else morseDisplay.textContent = '-';
});
