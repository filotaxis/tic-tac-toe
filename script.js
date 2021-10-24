const Gameboard = (() => {
    const gridSpace = document.querySelector(".gameboard");
    let gameboard = new Array(9);
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const display = (winnerCombination) => {
        for (let i = 0; i < gameboard.length; i++) {
            const tile = document.createElement("div");
            tile.setAttribute("data-id", i);
            tile.textContent = gameboard[i];
            if (winnerCombination) {
                if (i === winnerCombination[0] ||
                    i === winnerCombination[1] ||
                    i === winnerCombination[2]) {
                    tile.style.backgroundColor = "tomato";
                    }
            }
            gridSpace.appendChild(tile);
        }
    }

    const resetDisplay = () => {
        while (gridSpace.firstChild) {
            gridSpace.firstChild.remove();
        }
    }

    const winner = () => {
        let = false;
        for (let i = 0; i < winningConditions.length; i++){
            const winCondition = winningConditions[i];
            let a = gameboard[winCondition[0]];
            let b = gameboard[winCondition[1]];
            let c = gameboard[winCondition[2]];

            if (a === b && a === c && a !== undefined) {
                won = true;
                console.log(`${a} won`);
                for (let i = 0; i < 9; i++){
                    if (gameboard[i] === undefined) {
                        gameboard[i] = null;
                    }
                }
                return winCondition;
            }
        }
    }

    return {
        gameboard,
        gridSpace,
        display,
        resetDisplay,
        winner,
    }
})();


const Player = (emoji) => {
    const icon = emoji ;

    return {
        icon,
    }
}

const Game = (() => {

    let turn = true;

    const play = (player1, player2) => {
        Gameboard.gridSpace.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            if (Gameboard.gameboard[id] === undefined) {
                if (turn === true) {
                    Gameboard.gameboard[id] = player1.icon;
                    turn = !turn;
                }
                else {
                    Gameboard.gameboard[id] = player2.icon;
                    turn = !turn;
                }

                const winnerCombination = Gameboard.winner();
                // console.log(winnerCombination);
                Gameboard.resetDisplay();
                Gameboard.display(winnerCombination);
            }
        });

    }

    return {
        play,
    }

})();

const player1 = Player("🐱");
const player2 = Player("🐶");
Game.play(player1, player2);
Gameboard.display();



