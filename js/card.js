"use strict";

function Card(suit, rank, value) {
    var self = this;

    this.suit = suit;
    this.rank = rank;
    this.value = value;

    Card.prototype.toString = cardToString;
    this.toImage = cardToImage;
}

function cardToImage() {
    return "<img src=\"imgs/" + this.rank + this.suit + ".gif\" />";
}


function cardToString() {
    var suit;

    switch (this.suit)
    {
        case "c":
            suit = "Clubs";
            break;
        case "s":
            suit = "Spades";
            break;
        case "h":
            suit = "Hearts";
            break;
        case "d":
            suit = "Diamonds";
            break;
    }

    return this.rank + " of " + suit;
}