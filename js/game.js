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

function printPlayers() {
    var i;
    var string;

    string = ("<div id=\"players\">");

    for (i = 0; i < this.players.length; i++) {
        string += this.players[i].printPlayer();
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
    game.printPlayers();
    game.printTable();
    game.cardCount = 0;
    appendToGame("<input value=\"next\" type=\"button\" onclick=\"updateGame(" + (3) + ")\" /> <br />");
}

function appendToGame(text) {
    document.getElementById("game").innerHTML = document.getElementById("game").innerHTML + text;
}

function updateGame(cards) {
    document.getElementById("game").innerHTML  = "";
    
    
    if ( ( game.cardCount + 1 )% 6 === 0)
    {
        determineStrongestHand(game.players[0].cards, game.tableCards);

        // for (var i = 0; i < game.players.length; i++) {
        //     determineStrongestHand(game.players[i].cards, game.tableCards);
        // }
        game.printPlayers();
        game.printTable();

        //document.getElementById("game").innerHTML  = "";
        
        appendToGame("<input value=\"New Game\" type=\"button\" onclick=\"setUpGame()\" /> <br />");

        return;
    }
    game.printPlayers();
    game.turnCard(cards);
    game.printTable();

    appendToGame("<input value=\"next\" type=\"button\" onclick=\"updateGame(" + (game.cardCount + 1) + ")\" /> <br />");

}