const Gameboard = (() => {
    const gridSpace = document.querySelector(".gameboard");
    let gameboard = new Array(9);
    gameboard[0] = "X";
    gameboard[1] = "X";
    gameboard[2] = "O";
    gameboard[3] = "X";
    gameboard[4] = "O";
    gameboard[5] = "X";
    gameboard[6] = "O";
    gameboard[7] = "X";
    gameboard[8] = "O";

    const display = () => {
        for (let i = 0; i < gameboard.length; i++){
            const square = document.createElement("div");
            square.setAttribute("data-id", i);
            square.textContent = gameboard[i];
            gridSpace.appendChild(square);
        }
    }

    const resetDisplay = () => {
        while (gridSpace.firstChild) {
            gridSpace.firstChild.remove();
        }
    }

    return {
        gameboard,
        gridSpace,
        display,
        resetDisplay,
    }
})();


const Player = symbol => {
    
    const select = () => {
        Gameboard.gridSpace.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id")
            Gameboard.gameboard[id] = symbol;
            Gameboard.resetDisplay();
            Gameboard.display();
        });    
        
    }
    return { select, };
}


const player1 = Player("🔥");

player1.select();
Gameboard.display();



