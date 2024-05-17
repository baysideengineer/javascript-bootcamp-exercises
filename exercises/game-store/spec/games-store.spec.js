describe('Used game store', function () {
  const gamesMock = [
    {
      title: 'God of War',
      year: 2018,
      platform: 'PS4',
      retailPrice: 50,
    },
    {
      title: 'Cuphead',
      year: 2018,
      platform: 'XBOX',
      retailPrice: 40,
    },
    {
      title: 'Fallen Order',
      year: 2019,
      platform: 'PS4',
      retailPrice: 45,
    },
  ]

  it('is constructed with a balance argument', () => {
    const gameStore = new UsedGamesStore(100)
    const gameStore2 = new UsedGamesStore(75)

    expect(gameStore.balance).toBe(100)
    expect(gameStore2.balance).toBe(75)
  })

  it('buys a game from a costumer', () => {
    const gameStore = new UsedGamesStore(100)
    const result = gameStore.buyGame(gamesMock[0])

    expect(result).toBe(undefined, 'function should not return a value')
    expect(gameStore.balance).toBe(
      75,
      'games should be bought at half the retail price and deducted from the balance'
    )
    expect(gameStore.stock.length).toBe(
      1,
      'games should be added to the stock array'
    )

    gameStore.buyGame(gamesMock[0])

    expect(gameStore.balance).toBe(
      50,
      'games should be bought at half the retail price and deducted from the balance'
    )
    expect(gameStore.stock.length).toBe(
      2,
      'games should be added to the stock array'
    )

    for (const game of gameStore.stock) {
      expect(game).toBeValidGameObject()
    }
  })

  it('buys multiple games from a costumer', () => {
    const gameStore = new UsedGamesStore(100)
    const result = gameStore.buyGames([gamesMock[0], gamesMock[1]])

    expect(result).toBe(undefined, 'function should not return a value')
    expect(gameStore.balance).toBe(
      55,
      'games should be bought at half the retail price and deducted from the balance'
    )
    expect(gameStore.stock.length).toBe(
      2,
      'games should be added to the stock array when bought'
    )

    gameStore.buyGame(gamesMock[0])

    expect(gameStore.balance).toBe(
      30,
      'games should be bought at half the retail price and deducted from the balance'
    )
    expect(gameStore.stock.length).toBe(
      3,
      'games should be added to the stock array when bought'
    )
  })

  it('sells a game to a costumer', () => {
    const gameStore = new UsedGamesStore(100)
    gameStore.buyGames(gamesMock.slice())

    const result = gameStore.sellGame(gamesMock[1])

    expect(result).toBe(undefined, 'function should not return a value')
    expect(gameStore.balance).toBe(
      62.5,
      'games should be sold at 75% of the retail price and added to the balance'
    )
    expect(gameStore.stock.length).toBe(
      2,
      'games should be removed to the stock array when sold'
    )

    gameStore.sellGame(gamesMock[2])
    expect(gameStore.balance).toBe(
      96.25,
      'games should be sold at 75% of the retail price and added to the balance'
    )
    expect(gameStore.stock.length).toBe(
      1,
      'games should be removed to the stock array when sold'
    )

    for (const game of gameStore.stock) {
      expect(game).toBeValidGameObject()
    }
  })

  it('throws an error when selling a game that does not exist', () => {
    const gameStore = new UsedGamesStore(100)
    const prevBalance = gameStore.balance

    expect(() => {
      gameStore.sellGame(gamesMock[0])
    }).toThrowError('Game not found')

    expect(prevBalance).toEqual(gameStore.balance)
  })

  it('checks all stock', () => {
    const gameStore = new UsedGamesStore(100)
    gameStore.buyGames([gamesMock[0], gamesMock[1], gamesMock[2]])

    const allStock = gameStore.checkStock()

    expect(allStock.map((a) => a.title).sort()).toEqual(
      gamesMock.map((a) => a.title).sort()
    )
  })

  it('throws an error when no games exist on checking stock', () => {
    const gameStore = new UsedGamesStore(100)

    expect(() => {
      gameStore.checkStock()
    }).toThrowError('Stock is empty')
  })

  it('checks stock of a given platform', () => {
    const gameStore = new UsedGamesStore(100)
    gameStore.buyGames(gamesMock.slice())

    const ps4Stock = gameStore.checkStock('PS4')
    const xboxStock = gameStore.checkStock('XBOX')

    expect(ps4Stock.map((a) => a.title).sort()).toEqual(
      [gamesMock[0], gamesMock[2]].map((a) => a.title).sort()
    )
    expect(xboxStock.map((a) => a.title).sort()).toEqual(
      [gamesMock[1]].map((a) => a.title).sort()
    )
  })

  it('throws an error when no games exist for a given platform on checking stock', () => {
    const gameStore = new UsedGamesStore(100)

    expect(() => {
      gameStore.checkStock('PS4')
    }).toThrowError('Platform not found')
  })

  it('checks store balance in correct format', () => {
    const gameStore = new UsedGamesStore(100)
    expect(gameStore.checkBalance()).toBe('100.00€')

    gameStore.balance = 75.25
    expect(gameStore.checkBalance()).toBe('75.25€')

    gameStore.balance = 3.5
    expect(gameStore.checkBalance()).toBe('3.50€')
  })

  beforeEach(function () {
    jasmine.addMatchers({
      toBeValidGameObject: function () {
        return {
          compare: function (actual) {
            const requiredKeys = ['title', 'year', 'platform', 'retailPrice']

            for (const p of requiredKeys) {
              if (!(p in actual)) {
                return {
                  pass: false,
                  message: `Expected valid game object but it's missing ${p}`,
                }
              }
            }

            return { pass: true }
          },
        }
      },
    })
  })
})
