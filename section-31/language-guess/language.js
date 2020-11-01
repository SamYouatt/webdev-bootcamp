const franc = require('franc');
const langs = require('langs');
const colours = require('colors');

if (process.argv.length < 3) {
    console.log('Enter a string to process'.red);
} else if (process.argv.length > 3) {
    console.log('Only accepts one argument'.red);
} else {
    let phrase = process.argv[2];
    let langCode = franc(phrase);

    if (langCode === 'und') {
        console.log('Language not found, try a larger sample'.red);
    } else {
        let language = langs.where("3", langCode).name;
        console.log('Most likely:', language.green);
    }
}
