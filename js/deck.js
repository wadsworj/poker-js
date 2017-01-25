"use strict";

function Deck() {
  var self = this;
  this.cards = new Array();
  this.createDeck = function createDeck() {
    var ranks = new Array("2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A");
    var value = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
    var suits = new Array("c", "d", "h", "s");
    var num_ranks = ranks.length;
    var num_suits = suits.length;
    var i, j;
    for (i = 0; i < num_suits; i++) {
      for (j = 0; j < num_ranks; j++) {
        self.cards[i*num_ranks + j] = new Card(suits[i], ranks[j], value[j]);
      }
    }
  }

  this.shuffleDeck = function shuffleDeck(shuffle_times) {
    var i, j;
    var random_value;
    var temp_card;

    for (i = 0; i < shuffle_times; i++) {
      for (j = 0; j < self.cards.length; j++) {
          random_value = Math.floor(Math.random() * self.cards.length);
          temp_card = self.cards[random_value];
          self.cards[random_value] = self.cards[j];
          self.cards[j] = temp_card;
      }
    }
  }
}




