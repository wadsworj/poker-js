"use strict";

function Player(money, player_name, img_src) {
    var self = this;

    this.money = money;
    this.player_name = player_name;
    this.img_src = img_src;
    this.cards = new Array();
    this.handValue = 0;

    this.addCard = function(card) {
        self.cards.push(card);
    }

    Player.prototype.toString = playerToString;

    this.printPlayer = printPlayer;
    this.printImage = printImage;
}

function playerToString() {
        return "<b>" + this.player_name + "</b><br />$" + this.money + "<br />";
}

function printImage() {
    return "<img src=\"" + this.img_src + "\" id=\"profile\" width=\"50\" height=\"50\"/>"
}


function printPlayer(hidden) {
    var i;
    var string;

    string = "<div id=\"player\">";

    string += this.toString();
    string += this.printImage();
    string += "<br>";



    for (i = 0; i < this.cards.length; i++) {
        if (hidden === 1) {
            string += this.cards[i].toImage() + " ";
        } else {
            string += this.cards[i].backToImage() + " ";
        }
    }
    string += "<br />";
    string += "</div>";
    //appendToGame(string);
    return string;
}
