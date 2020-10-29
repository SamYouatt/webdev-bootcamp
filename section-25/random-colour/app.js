const button = document.querySelector('button');
const header = document.querySelector("#heading");

button.addEventListener('click', function () {
    const colour = randomColour();
    document.body.style.backgroundColor = colour;
    header.innerText = colour;
});

function randomColour() {
    let r = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})`;
}