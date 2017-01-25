"use strict";

function determineStrongestHand(playerCards, tableCards) {
  var tempHand = new Array();

  var i, j, k, l;
  var count = 0;
  var maxValue = 0, tempValue = 0;

  var hand = tableCards.concat(playerCards);

  // sort hand in ascending order
  hand.sort(function(a, b) {
    return a.value - b.value;
  });

  // determine strength of table hand (only 5 cards on table)
  testHand(tableCards);

  // loop through all combinations of cards
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
        
        tempValue = testHand(tempHand);
        if (tempValue > maxValue) {
          maxValue = tempValue;
        }

      }
    }
  }

  return maxValue;
}

function testHand(hand) {
  var handValue;
  if(handValue = isFlush(hand)) {
    return handValue;
  } else if (handValue = isStraight(hand)) {
   return handValue;
  } else if (handValue = isThreeOfAKind(hand)) {
    return handValue;
  } else if (handValue = isPair(hand)) {
    return handValue;
  }
}

function isFlush(hand) {
  var i;
  var suit = hand[0].suit;
  for (i = 1; i < hand.length; i++) {
    if (suit != hand[i].suit) {
      return 0;
    }
  }
  alert("Found flush!");
  return 6 * hand[hand.length - 1].value;
}


function isStraight(hand) {
  var value = hand[0].value;

  for (var i = 1; i < hand.length; i++) {
    //alert("value: " + value + " hand[i].value: " + hand[i].value);
    if ( (value + 1 === hand[i].value) || ( (value % 13 + 1) === hand[i].value) ) {
    } else {
      return 0;
    }
    value = hand[i].value;
  }
  alert("Found straight!");
  return 5 * hand[hand.length - 1].value;
}


function isThreeOfAKind(hand) {
  var i, j;
  var rank;
  var count;
  for (i = 0; i < hand.length - 2; i++) {
    rank = hand[i].rank;
    count = 1;
    for (j = i + 1; j < hand.length; j++)
    {
      if (rank === hand[j].rank) {
        count++;

        if (count === 3) {
          return 4 * hand[j].value;
        }
        
      }
    }
    
  }
  return 0;
}



function isPair(hand) {
  var i, j;
  var rank;

  for (i = 0; i < hand.length - 1; i++) {
    rank = hand[i].rank;
    for (j = i + 1; j < hand.length; j++)
    {
      if (rank === hand[j].rank) {
        console.log("found pair! " + 2 * hand[j].value);
        return 2 * hand[j].value;

      }
    }
  }
  return 0;
}