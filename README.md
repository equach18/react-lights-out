# Lights Out
This React app simulates a logic/puzzle game called Lights Out. When a cell is clicked, it and its adjacent cells will be toggled to either on or off. You win by turning off all of the lights. 

## Features
- Game boards are randomly generated.
- Option to adjust the chances of a randomly lit cell appearing upon game start.
- Always winnable board option.
- Option to change the size of the game board.

## Component Design
- App: Renders the Board component.
- Board: Represents the in-memory grid for lights status. Renders cells. 
- Cell: Renders each cell in td element and will specify if the cell is lit or unlit in the class. This is what the user will click on, which then updates the state of Board

## Technologies
- React
- JavaScript 
- CSS
- Jest (for testing)
