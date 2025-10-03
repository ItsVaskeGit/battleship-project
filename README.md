# Battleship Game Project

In this game the objective is to guess the location of enemy's battleships on a grid with coordinates.

# Concept

The concept of the game is simple.

### Grid

User defines a grid with X * Y size. On that grid ships will be will be randomly generated for a computer player and not be given out to the player.

Meanwhile, the player will have a choice. User grid can be either randomly generated just like for the computer, or the player can place ships wherever the player sees fit.

### Ships

The game will have 3 sizes of ships: Large (Cruiser), Medium (Fighter ship), Small (Logistics ship). Each one will have a different size on the grid. Large will take 4 spaces, Medium 3 spaces and Small 2 spaces.

Ships can be positioned both horizontally or vertically on the actual grid.

### Eliminations

Ships will be eliminated if computer or player guesses at least one of the spaces that given ship occupies.

While choosing the shooting spot grid will be grayed out and the enemy's ships will be hidden. Once the shooting spot has been determined the explosion animation will play and the player will know whether he eliminated an enemy's ship or not.

### Determining the winner

The first one to eliminate all of other player's ships is determined to be a winner and the message will display who's the winner.

## Programming concepts

For the actual grid two-dimensional array will be used and it will have fixed size of the both dimensions.

```javascript
let grid = [[], []]; 
// the first array will be limited to x axis number that user defines
// the second array will be limited to y axis number that user defines
// or is randomly generated
```

The randomly placed ships will have 3 randomly guessed values,
two of the will be used to determine the x and y position of the ship, and the third one will have 0 or 1 and it will determine whether the ship is horizontally or vertically aligned.

```javascript
const x = 0; // or whatever user defines
const y = 0; // or whatever user defines

const gridX = Math.floor(Math.random() * x) + 1;
const gridY = Math.floor(Math.random() * y) + 1;
const direction = Math.round(Math.random())
```

During the random generation checks will be implemented to prevent another ship being placed in an already occupied space.