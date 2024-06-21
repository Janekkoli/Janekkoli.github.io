// import { getSentence } from "./apiGetter.js";
// import { postSentence } from "./apiGetter.js";
// const sentence = await getSentence();
// console.log(sentence);
// const mainDiv = document.getElementById("mainDiv");
// mainDiv ? mainDiv.innerHTML = sentence : true;
// console.log(await postSentence("Yoyoyoyoy xddddd."))

// const inputElement = document.createElement('input');
// inputElement.type = 'text';
// inputElement.id = 'newInput';
// inputElement.placeholder = 'Enter something...';

// const buttonElement = document.createElement('button');
// mainDiv?.appendChild(inputElement);
// mainDiv?.appendChild(buttonElement);
// buttonElement.textContent = "Submit";

// buttonElement.addEventListener('click', () => { postSentence(inputElement.value) });

class DivinGame {
    div: HTMLElement;
    color: string;
    private showing: boolean = false;
    game: MemoryGame;
    constructor(color: string, game: MemoryGame) {
        this.game = game;
        this.color = color;
        this.div = document.createElement('div');
        this.div.style.backgroundColor = "orange"; // Set the background color to the color from the array
        this.div.innerHTML = 'X';
        this.div.classList.add('card'); // Assuming you have CSS styles for 'card'
        this.div.addEventListener('click', (event) => this.onClick(event));
    }

    onClick(event: MouseEvent) {

        if (this.game.showPermit(this) && this.showing == false) { this.div.style.backgroundColor = this.color; this.div.innerHTML = ''; this.showing = true; }
    }

    close() {
        this.showing = false;
        this.div.style.backgroundColor = "orange";
        this.div.innerHTML = 'X';
    }
}


//memory game
class MemoryGame {
    private divWithGame: HTMLElement;
    private cardsList: DivinGame[] = [];
    private cardsLeft: number = 10;
    private numberOfTrys: number = 0;
    private apiPoint = new ApiClass('http://127.0.0.1:8000/');
    private currentlyShowing: Set<DivinGame> = new Set<DivinGame>();
    constructor(divWithGame: HTMLElement | null) {
        if (divWithGame == null) throw Error;
        this.divWithGame = divWithGame;
        this.newGame();
    }

    showPermit(color: DivinGame): boolean {
        if (this.currentlyShowing.size < 2) { this.numberOfTrys++; this.currentlyShowing.add(color); return true; }
        const iterator = this.currentlyShowing.values();
        const first: DivinGame = iterator.next().value;
        const second: DivinGame = iterator.next().value;
        first.close(); second.close();
        this.currentlyShowing.clear();
        if (first.color == second.color) {
            console.log("Yessss");
            this.divWithGame.removeChild(first.div);
            this.divWithGame.removeChild(second.div);
            this.cardsLeft--;
            if (this.cardsLeft == 0) {
                this.divWithGame.innerHTML = `CONGRATULATION YOU DID IT IN: ${this.numberOfTrys / 2}`;
                const newGameButton = document.createElement('button');
                newGameButton.addEventListener('click', () => { this.newGame() });
                newGameButton.textContent = "New Game";
                this.divWithGame.appendChild(newGameButton);
            }
            return false;
        }
        console.log("NOOOOOO");
        return false;

    }

    async newGame() {
        let numberOfCards = 5;
        this.divWithGame.innerHTML = ''
        const inputElement = document.createElement('input');
        inputElement.type = 'number';
        inputElement.placeholder = 'Number of cards';

        const buttonElement = document.createElement('button');
        this.divWithGame.appendChild(inputElement);
        this.divWithGame.appendChild(buttonElement);
        buttonElement.textContent = "Submit";

        buttonElement.addEventListener('click', () => {
            numberOfCards = parseInt(inputElement.value, 10);
            this.cardsLeft = numberOfCards;
            console.log(inputElement.value); this.cardsPutter(numberOfCards);
        });

    }
    async cardsPutter(numberOfCards: number) {
        let colors: string[] = [];
        try {
            colors = await this.apiPoint.postApi("getColorsList", numberOfCards)
        }
        catch (error) {
            colors = Array.from({ length: numberOfCards }, () => "#" + Math.floor(Math.random() * 16777215).toString(16));
        }
        console.log(colors);
        this.divWithGame.innerHTML = '';
        colors.forEach(color => {
            for (let i = 0; i < 2; i++) {
                this.cardsList.push(new DivinGame(color, this));
            }
            // Shuffle the cardsList array
            this.cardsList.sort(() => Math.random() - 0.5);
            this.cardsList.forEach(card => { this.divWithGame.appendChild(card.div) });
        });


    }


}

import { ApiClass } from "./apiClass.js";
const divWithGame: HTMLElement | null = document.getElementById("MemmoryGame");
const memory = new MemoryGame(divWithGame);
