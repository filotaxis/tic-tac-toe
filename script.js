const Gameboard = (() => {
    const gridSpace = document.querySelector(".gameboard");
    const announce = document.querySelector("h1");
    let gameboard = ["", "", "", "", "", "", "", "", ""];
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
                    tile.style.backgroundColor = "#f7fff7";
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
        for (let i = 0; i < winningConditions.length; i++){
            const winCondition = winningConditions[i];
            let a = gameboard[winCondition[0]];
            let b = gameboard[winCondition[1]];
            let c = gameboard[winCondition[2]];

            if (a === b && a === c && a !== "") {
                announce.textContent = `🙌 ${a} won 🏆️ 🙌`;

                for (let i = 0; i < 9; i++){
                    if (gameboard[i] === "") {
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
        announce,
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

    const resetButton = document.querySelector(".restart>button");
    let turn = true;
    let turnCount = 0;

    const play = (player1, player2) => {
        Gameboard.gridSpace.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            if (Gameboard.gameboard[id] === "") {
                if (turn === true) {
                    Gameboard.gameboard[id] = player1.icon;
                    Gameboard.announce.textContent = `${player2.icon}'s turn`
                    turnCount++;
                    turn = !turn;
                }
                else {
                    Gameboard.gameboard[id] = player2.icon;
                    Gameboard.announce.textContent = `${player1.icon}'s turn`
                    turn = !turn;
                    turnCount++;
                }

                const winnerCombination = Gameboard.winner();

                if (turnCount === 9 && !winnerCombination) {
                    Gameboard.announce.textContent = "It's a tie 🐱♥️🐶"
                }
                Gameboard.resetDisplay();
                Gameboard.display(winnerCombination);
            }
        });

    }

    const resetGame = () => {
        resetButton.addEventListener("click", () => {
            Gameboard.announce.textContent = "🐱 Tic-Tac-Toe 🐶";
            for (let i = 0; i < 9; i++){
                Gameboard.gameboard[i] = "";
            }
            turnCount = 0;
            Gameboard.resetDisplay();
            Gameboard.display();
        })
    }

    return {
        play,
        resetGame,
    }

})();

const main = (() => {
    const play = () => {
        const player1 = Player("🐱");
        const player2 = Player("🐶");
        Game.play(player1, player2);
        Gameboard.display();
        Game.resetGame();
    }
    return {
        play,
    }
})();

main.play();




