# BlackJack
_created by Xavier Marquez - Dallas_

BlackJack, also referred to as _Twenty-One_, is a comparing card game between one or more players, and a dealer. Each player takes turns and competes against the dealer. It is played with one or more decks of 52 cards, and is one of the most widely played casino games in the world.

## Here's a quick preview:

![Home Screen](/images/homeScreen.png)
![Game Board](/images/gameBoard.png)





# Game Flow and Logic

1. 'Play' button disappears.
2. two buttons appear 'hit' and 'stay'.
3. a card deck is shown at the top of the screen face down
4. two cards are dealt/displayed face up for the user.
5. two cards are dealt for the dealer, one face down, the other face up.

# Game Logic Begins
1. user evaluates the two cards and decides whether to 'hit' or 'stay'
2. if 'hit' is clicked, a third card appers next to the others
3. data checks to see if the user cards has a value of 21 or less
4. if not, prompt "YOU BUSTED"
5. if so, the user can continue to click 'hit' or 'stay'
6. if 'stay' is hit then the user value is set.
7. dealer's turn begins
8. Dealer's hidden card flips over and is now visible
9. if the dealers cards result in a  value of 16 or less, then the dealer 'hits'
10. data checks to see if dealers value is >= 17 OR <=21
   
11. if not, the dealer has busted, prompt appears "User wins"
   
12. if so, the data checks the dealers value against the users value, the larger number wins.
13. If user wins, prompt "USER WINS"
14. If dealer wins, prompt "DEALER WINS"

15. click game reset button to start again

# Technologies Used
-Developer platform: Visual Studio Code

-Programming languages include:
1. HTML
2. CSS
3. Javascript


# Getting Started
Click the following link to launch the game. [Let's Play BlackJack!](http://127.0.0.1:5500/index.html)