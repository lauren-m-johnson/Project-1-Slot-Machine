# Project-1-Slot-Machine

Wire Frame: 
Link to Whimsical: https://whimsical.com/slot-machine-3ni8sd4MxryPkw3zKyCD4N 

Pseudocode:
Link to Google Doc (May be Easier to Read): 
https://docs.google.com/document/d/1jk0KVBJTgBcEUXJVMCcF9Qd3EeM1F0o22SO2VOLtuo8/edit

or....

HTML and CSS:

1)Set up structure and include all elements in HTML

2)Style game and include all hover elements on buttons in CSS

JavaScript:

1) DEFINE CONSTANTS
  1.1) Define each image outcome. There are 5 possible “fruits”: ‘7’ = 0, ‘Cherries’ = 1, ‘Lemon’ = 2 or ‘Watermelon’ = 3
  1.2) Define the possible 4 winning combinations that increase bet x 2 and add it to the bank:
0, 0, 0
1, 1, 1
2, 2, 2
3, 3, 3

2) DEFINE STATE VARIABLES: used to track the state of the game:
  2.1) Use a slot machine array that displays 3 images.
  2.3) Have a Bank starting with $100. 
  2.4) Have a Bet that needs to be a min of $10 every turn.
  2.5) Turn - keeps track of turn (Do I need this????)
	

3) CACHE: Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant:
  -Store the button to start turn
  -Store the button to reset game
  -Store EVENT LISTENERS


4) Upon loading the app should:
  4.1) Initialize the state variables:
    	-Initialize the slot machine array with images chosen at random in each of the 3 spots.
    	-Initialize the current bank balance and display it
	    -Initialize the current bet and allow the player to increase the bet.
            -Initialize winner to null to represent that there is no winner or tie yet
  4.2) Render state variables to the page:
Render the slot machine: 
-Loop over each of the 3 elements that represent the images on the page, and for each iteration choose one of the possible fruits at random.
Render a message:
  -If the winner has a value other than null (game still in progress), allow the player to place a bet.     
  -If player loses, subtract bet from bank
  -If player wins, multiply bet by 2 and add to bank
  4.3) Wait for the user to click the start button.


5) PLAY: Handle a player clicking the start button:
  5.1) Start generating 3 random images and display them in slot machine.
    - Loop through each of the winning combination arrays defined. If any of the combinations, winner! If not, loser.
  5.2) If not a winning combo, subtract the bet from the player bank.
	  -If winning combo, add bet x 2 to the bank.
  5.3) Update the bank with new current value
  5.4) All of the state has been updated, so render the state to the page.
		

6) RESET: Handle a player clicking the replay button:
  6.1) Do steps 4.1 (initialize the state variables) and 4.2 (render).
