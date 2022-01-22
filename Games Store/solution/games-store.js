// set up a class called used games store
class UsedGamesStore {
  constructor(balance) {
    this.balance = balance
    this.stock = []
  }

  // buy game method
  buyGame(gameObject) {
    this.stock.push(gameObject)
    this.balance -= (gameObject.retailPrice * 50) / 100
  }

  // buy games method
  buyGames(gameArray) {
    gameArray.forEach((game) => {
      this.stock.push(game)
      this.balance -= (game.retailPrice * 50) / 100
    })
  }

  // sell game method
  sellGame(gameObject) {
    const updatedStock = this.stock.filter((game) => game !== gameObject)

    if (this.stock.length === updatedStock.length) {
      throw new Error('Game not found')
    }

    this.stock = updatedStock
    this.balance += (gameObject.retailPrice * 75) / 100
  }

  // check stock method
  checkStock(platform) {
    const gameArray = []

    if (platform === undefined) {
      if (this.stock.length === 0) {
        throw new Error('Stock is empty')
      } else {
        return this.stock
      }
    }

    for (let game of this.stock) {
      if (game.platform === platform) {
        gameArray.push(game)
      }
    }

    if (gameArray.length === 0) {
      throw new Error('Platform not found')
    }

    return gameArray
  }

  // check balance method
  checkBalance() {
    return this.balance.toFixed(2) + '€'
  }
}

const gameStore = new UsedGamesStore(100)
