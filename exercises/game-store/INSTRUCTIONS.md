# Assessment: Used Game Store

## Introduction

For this assessment, we will deal with the business of buying and selling used
video-games.

## Game Object

A game is a JavaScript object with the following structure:

```javascript
const game = {
    title: "God of War",
    year: 2008,
    platform: "PS4",
    retailPrice: 50,
}
```

## Your assignment: Implement UsedGamesStore class

Your task is to implement a class which represents a games' shop
named `UsedGamesStore`. Write the code in a file called `games-store.js`.

### UsedGamesStore Properties

- `balance`: the store's capital that will change when buying/selling games.
- `stock`: the store's game collection what will change when buying/selling
  games.

### Constructor

The class receives one constructor parameter:

- The initial `balance` (store capital) that will allow you to buy games to
  later sell.

### Method `buyGame`

The class must implement a `buyGame` method which takes one `game object` as a
parameter and returns no value.

The method must add the game to the store's stock and deduct the cost of the
game from the balance. A used game is bought for 50% of the retail price.

### Method `buyGames`

The class must implement a `buyGames` method which takes an array
of `game objects` as a parameter and returns no value.

The method must add all the games to the store's stock and deduct the cost of
all the games from the balance. Each used game is bought for 50% of the retail
price.

### Method `sellGame`

The class must implement a `sellGame` method which takes one `game object` as a
parameter and returns no value.

The method must remove the game from the store's stock and add the profit of the
sale to the balance. A used game is sold for 75% of the retail price.

If the game passed to the method does not exist in stock, an error must be
thrown with the message `"Game not found"`.

### Method `checkStock`

The class must implement a `checkStock` method which takes the `platform` string
as an optional parameter and returns an array of `game objects`.

When no parameter is present all the games should be returned, if the stock is
empty an error must be thrown with the message `"Stock is empty"`.

When the `platform` parameter is present all the games from that specific
platform only should be returned, if there are no games for that platform an
error must be thrown with the message `"Platform not found"`.

### Method `checkBalance`

The class must implement a `checkBalance` method which takes no parameters and
returns the current balance formated as a currency in Euros (for example if
the store's balance is 45.5 the method should return `"45.50€"`).

### Usage example:

Usage example:

```javascript
const game1 = {
    title: 'God of War',
    year: 2018,
    platform: 'PS4',
    retailPrice: 50,
}

const gameStore = new UsedGamesStore(100)

gameStore.buyGame(game1)

console.log(gameStore.checkStock('PS4'))
console.log(gameStore.checkBalance())
```
