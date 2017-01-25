"use strict";

function determineStrongestHand(playerCards, tableCards) {
  var tempHand = new Array();

  var i, j, k, l;
  var count = 0;

  var hand = tableCards.concat(playerCards);

  for (i = 0; i < 2; i++) {
    for (l = 0; l < 2; l++) {
      for (j = 0; j < 5; j++) {
        for (k = 0; k < 5; k++) {
          if (k === j) {
            // replace current position with card 6 or 7
            tempHand[k] = hand[hand.length - i - 1];
          } else if (k === j + l) {
            if (i === 0) {
              tempHand[k] = hand[hand.length - 2];
            } else {
              tempHand[k] = hand[hand.length - 1];
            }
          } else {
            tempHand[k] = hand[k];
          }
        }
        count++;
        
        testHand(tempHand);

      }
    }
  }

  console.log("count: " + count);

  

}

function testHand(hand) {

  isFlush(hand);
  isPair(hand);
  isStraight(hand);

}

function isFlush(hand) {
  var i;
  var suit = hand[0].suit;
  for (i = 1; i < hand.length; i++) {
    if (suit != hand[i].suit) {
      return -1;
    }
  }
  alert("Found flush!");
}


function isStraight(hand) {
  var value;

  hand.sort(function(a, b) {
    return a.value - b.value;
  });

  var string = "";
  for (var i = 0; i < hand.length; i++) {
    string += hand[i].value;
  }

  console.log(string);


  value = hand[0].value;

  //alert("hand.length: " + hand.length);

  for (i = 1; i < hand.length; i++) {
    //alert("value: " + value + " hand[i].value: " + hand[i].value);
    if ( (value + 1 === hand[i].value) || ( (value % 13 + 1) === hand[i].value) ) {
    } else {
      return -1;
    }
    value = hand[i].value;
  }
  alert("Found straight!");
  
}



function isPair(hand) {
  var i, j;
  var rank;

  for (i = 0; i < hand.length - 1; i++) {
    
    rank = hand[i].rank;
    for (j = i + 1; j < hand.length; j++)
    {
      if (rank === hand[j].rank) {
        console.log("found pair!");
      }
    }
  }
  return -1;
}