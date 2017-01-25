"use strict";

function Game() {
    var self = this;
    this.cardCount = 0;

    this.tableCards = new Array();
    this.players = new Array();
    this.deck = new Deck();
    this.deck.createDeck();

    this.addPlayer = function(player) {
        self.players.push(player);
    }

    // Function to deal cards to players
    this.deal = function dealCards(n) {
        var i, j;
        self.deck.shuffleDeck(4);
        for (i = 0; i < n; i++) {
            for (j = 0; j < self.players.length; j++) {
                self.players[j].addCard(self.deck.cards.pop());
            }
        }
    }


    this.turnCard = turnCard;
    this.printTable = printTable;
    this.printPlayers = printPlayers;
}



function turnCard(n) {
    var i;
    var card;
    var toAdd = n - this.cardCount;

    // burn a card
    this.deck.cards.pop();

    // add new cards
    for (i = 0; i < toAdd; i++) {
        card = this.deck.cards.pop();
        this.tableCards.push(card);
        this.cardCount++;
    }
}

function printTable() {
    var string;
    string = "<div id=\"table\"><b>Table:</b><br/>";

    // print all table cards
    for (var i = 0; i < this.cardCount; i++) {
        string += this.tableCards[i].toImage() + " ";
    }

    string += "</div>"
    appendToGame(string);
}

function printPlayers(gameOver) {
    var i;
    var string;

    string = ("<div id=\"players\">");

    for (i = 0; i < this.players.length; i++) {
        if (i === 0) {
            string += this.players[i].printPlayer(1);
        } else {
            string += this.players[i].printPlayer(gameOver);
        }
    }

    string += ("</div><br /><br /><br />");

    appendToGame(string);
}

var game; // global? uh oh

function setUpGame() {
    document.getElementById("game").innerHTML  = "";

    game = new Game();
    game.addPlayer(new Player(50000, "Player 1;", "player1.jpg"));
    game.addPlayer(new Player(500, "Player 2", "player2.jpg"));
    game.deal(2);
    
    game.cardCount = 0;
    printGame(2, 0);

}

function appendToGame(text) {
    document.getElementById("game").innerHTML = document.getElementById("game").innerHTML + text;
}

function updateGame(cards) {
    
    if ( ( game.cardCount + 1 )% 6 === 0)
    {
        var topHand = 0;
        var winner = 0;
        for (var i = 0; i < game.players.length; i++) {
            game.players[i].handValue = determineStrongestHand(game.players[i].cards, game.tableCards);
            if (topHand < game.players[i].handValue) {
                topHand = game.players[i].handValue;
                winner = i;
            }
            console.log("player " + i + " score: " + game.players[i].handValue)
        }
        alert("The winner is player: " + winner);
        printGame(game.cardCount, 1)
        return;
    }
    game.turnCard(cards);
    printGame(game.cardCount, 0);
}


function printGame(cardCount, gameOver) {
    document.getElementById("game").innerHTML  = "";
    game.printPlayers(gameOver);
    game.printTable();

    if (!gameOver) {
        appendToGame("<input value=\"next\" type=\"button\" onclick=\"updateGame(" + (cardCount + 1) + ")\" /> <br />");
    } else {
        appendToGame("<input value=\"New Game\" type=\"button\" onclick=\"setUpGame()\" /> <br />");
    }


}