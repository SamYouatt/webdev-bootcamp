const player1 = {
    score: 0,
    button: document.querySelector("#player1Btn"),
    display: document.querySelector('#player1Score')
}

const player2 = {
    score: 0,
    button: document.querySelector("#player2Btn"),
    display: document.querySelector('#player2Score')
}

const resetBtn = document.querySelector("#resetBtn");
const select = document.querySelector('#selectTarget');

let target = parseInt(select.value);
let gameOver = false;

function updateScore(player, opponent) {
    if (!gameOver) {
        player.score++;
        if (player.score === target) {
            gameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.innerText = player.score;
    }
}

function reset() {
    gameOver = false;

    for (p of [player1, player2]) {
        p.score = 0;
        p.display.innerText = player1.score;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}

player1.button.addEventListener('click', function () {
    updateScore(player1, player2)
});
player2.button.addEventListener('click', function () {
    updateScore(player2, player1)
});

resetBtn.addEventListener('click', reset);

select.addEventListener('change', function () {
    reset();
    target = parseInt(this.value);
});
