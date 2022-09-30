# Overview
An interactive, customizable Morse code translator designed to facilitate learning Morse code.

# Usage
Clone the repository using `git clone https://github.com/mfinnessey/morse`.

Then host the website on an http server of your choice (I use Python's `http.server`) and navigate to it with a browser supporting reasonably modern JavaScript.

Alternatively, a demo can be accessed at [https://mfinnessey.github.io/morse](https://mfinnessey.github.io/morse).

# Features
## Interactive Translation
Morse translates the Morse code that you enter into text as you type. It also indicates what the next letters would be if you add on a dit (`.`) or a dah (`-`) to help learners.

## Customizable Keying Speed
The time unit (the length of a single dit) is customizable in order to enable keying at different speeds. This can help learners to evaluate whether they can key accurately at a given speed.

## International Morse Code Support
Morse supports the full range of characters defined in International Morse Code.
