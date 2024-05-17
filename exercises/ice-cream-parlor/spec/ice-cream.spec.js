describe('FrozenAcademy class', () => {
  it('should be a class', () => {
    expect(typeof FrozenAcademy).toBe('function')
    const a = new FrozenAcademy()
    expect(typeof a).toBe('object')
  })
})

// define some ice cream styles
const stracciatella = {
  name: 'Stracciatella',
  type: 'gelato',
  flavors: ['vanilla', 'chocolate'],
  vegan: false,
}
const chocolateChip = {
  name: 'Chocolate chip',
  type: 'gelato',
  flavors: ['chocolate'],
  vegan: false,
}
const strawberry = {
  name: 'Strawberry',
  type: 'sorbet',
  flavors: ['strawberry'],
  vegan: true,
}
const blueMoon = {
  name: 'Blue Moon',
  type: 'gelato',
  flavors: ['blue'],
  vegan: false,
}
const peppermintChoc = {
  name: 'Peppermint Choc',
  type: 'gelato',
  flavors: ['chocolate', 'peppermint'],
  vegan: false,
}
const tuttiFrutti = {
  name: 'Tutti Frutti',
  type: 'sorbet',
  flavors: ['blueberry', 'lemon', 'peach'],
  vegan: true,
}
const strawberryYo = {
  name: 'Strawberry, Yo!',
  type: 'frozen_yogurt',
  flavors: ['strawberry'],
  vegan: false,
}
const blueberryFroyo = {
  name: 'Blueberry Froyo',
  type: 'frozen_yogurt',
  flavors: ['blueberry'],
  vegan: false,
}
const veganChoco = {
  name: 'Vegan Choco',
  type: 'gelato',
  flavors: ['choclate'],
  vegan: true,
}

describe('Tracking stock', function () {
  let parlor

  // create a new parlor object for every test
  beforeEach(() => {
    parlor = new FrozenAcademy()
  })

  describe('getScoopsInStock', () => {
    it('should return the added scoops', () => {
      parlor.addStock({ style: tuttiFrutti, scoops: 12 })
      expect(parlor.getScoopsInStock(tuttiFrutti)).toBe(12)
    })

    it('should return 0 for style that was not added', () => {
      expect(parlor.getScoopsInStock(tuttiFrutti)).toBe(0)
      expect(parlor.getScoopsInStock(chocolateChip)).toBe(0)
      parlor.addStock({ style: tuttiFrutti, scoops: 12 })
      expect(parlor.getScoopsInStock(chocolateChip)).toBe(0)
    })

    it('should return sums of scoops', () => {
      parlor.addStock({ style: tuttiFrutti, scoops: 10 })
      expect(parlor.getScoopsInStock(tuttiFrutti)).toBe(10)

      parlor.addStock({ style: tuttiFrutti, scoops: 20 })
      parlor.addStock({ style: chocolateChip, scoops: 7 })
      expect(parlor.getScoopsInStock(tuttiFrutti)).toBe(30)
      expect(parlor.getScoopsInStock(chocolateChip)).toBe(7)

      parlor.addStock({ style: chocolateChip, scoops: 50 })
      expect(parlor.getScoopsInStock(chocolateChip)).toBe(57)
    })
  })

  describe('getTotalScoopsInstock', () => {
    it('should return the added scoops', () => {
      parlor.addStock({ style: tuttiFrutti, scoops: 12 })
      expect(parlor.getTotalScoopsInStock()).toBe(12)

      parlor.addStock({ style: peppermintChoc, scoops: 80 })
      expect(parlor.getTotalScoopsInStock()).toBe(92)
    })

    it('should return 0 when nothing was added', () => {
      expect(parlor.getTotalScoopsInStock()).toBe(0)
    })

    it('should return sums of scoops', () => {
      parlor.addStock({ style: peppermintChoc, scoops: 10 })
      expect(parlor.getTotalScoopsInStock()).toBe(10)

      parlor.addStock({ style: peppermintChoc, scoops: 20 })
      parlor.addStock({ style: chocolateChip, scoops: 7 })
      expect(parlor.getTotalScoopsInStock()).toBe(37)
    })
  })

  describe('getAvailableStyles', () => {
    it('should be empty when nothing was added', () => {
      expect(parlor.getAvailableStyles()).toEqual([])
    })

    it('should return all added styles', () => {
      parlor.addStock({ style: chocolateChip, scoops: 3 })
      expect(parlor.getAvailableStyles()).toEqual(
        jasmine.arrayWithExactContents([chocolateChip])
      )

      parlor.addStock({ style: strawberry, scoops: 40 })
      parlor.addStock({ style: blueberryFroyo, scoops: 40 })
      parlor.addStock({ style: tuttiFrutti, scoops: 40 })
      expect(parlor.getAvailableStyles()).toEqual(
        jasmine.arrayWithExactContents([
          chocolateChip,
          strawberry,
          tuttiFrutti,
          blueberryFroyo,
        ])
      )
    })

    it('should return style only once', () => {
      parlor.addStock({ style: veganChoco, scoops: 3 })
      parlor.addStock({ style: blueberryFroyo, scoops: 40 })
      parlor.addStock({ style: veganChoco, scoops: 400 })

      expect(parlor.getAvailableStyles()).toEqual(
        jasmine.arrayWithExactContents([blueberryFroyo, veganChoco])
      )
    })

    it('should not return style with zero stock', () => {
      parlor.addStock({ style: veganChoco, scoops: 3 })
      parlor.addStock({ style: blueberryFroyo, scoops: 0 })

      expect(parlor.getAvailableStyles()).toEqual(
        jasmine.arrayWithExactContents([veganChoco])
      )
    })
  })
})

describe('Serving Ice Cream', () => {
  function preferEverything(style) {
    return true
  }
  function preferVegan(style) {
    return style.vegan
  }

  it('serves one style', () => {
    const parlor = new FrozenAcademy()

    parlor.addStock({ style: peppermintChoc, scoops: 100 })

    expect(parlor.getServing(preferEverything, 2)).toEqual(
      jasmine.arrayWithExactContents(['Peppermint Choc', 'Peppermint Choc'])
    )
  })

  it('serves multiple styles by preference', () => {
    const parlor = new FrozenAcademy()

    parlor.addStock({ style: peppermintChoc, scoops: 100 })
    parlor.addStock({ style: tuttiFrutti, scoops: 100 })
    parlor.addStock({ style: veganChoco, scoops: 100 })

    const gelatoServing = parlor.getServing(
      (style) => style.type === 'gelato',
      2
    )
    expect(gelatoServing).toEqual(
      jasmine.arrayWithExactContents(['Peppermint Choc', 'Vegan Choco'])
    )

    const froyoServing = parlor.getServing(
      (style) => style.type === 'sorbet',
      3
    )
    expect(froyoServing).toEqual(
      jasmine.arrayWithExactContents([
        'Tutti Frutti',
        'Tutti Frutti',
        'Tutti Frutti',
      ])
    )
  })

  it('serves the style with most stock first', () => {
    const parlor = new FrozenAcademy()

    parlor.addStock({ style: peppermintChoc, scoops: 100 })
    parlor.addStock({ style: tuttiFrutti, scoops: 95 })
    parlor.addStock({ style: veganChoco, scoops: 97 })

    expect(parlor.getServing(preferEverything, 2)).toEqual(
      jasmine.arrayWithExactContents(['Peppermint Choc', 'Vegan Choco'])
    )

    // stocks now: peppermintChoc: 99, tuttiFrutti: 95, veganChoco: 96
    expect(parlor.getServing(preferVegan, 1)).toEqual(
      jasmine.arrayWithExactContents(['Vegan Choco'])
    )

    // stocks now: peppermintChoc: 99, tuttiFrutti: 95, veganChoco: 95
    expect(parlor.getServing(preferEverything, 1)).toEqual(
      jasmine.arrayWithExactContents(['Peppermint Choc'])
    )

    // stocks now: peppermintChoc: 98, tuttiFrutti: 95, veganChoco: 95
    expect(parlor.getServing(preferEverything, 1)).toEqual(
      jasmine.arrayWithExactContents(['Peppermint Choc'])
    )
  })

  it('serves two styles until it runs out', () => {
    const parlor = new FrozenAcademy()

    parlor.addStock({ style: blueMoon, scoops: 3 })
    parlor.addStock({ style: strawberryYo, scoops: 2 })

    const expectedServing = ['Blue Moon', 'Strawberry, Yo!']
    const serving1 = parlor.getServing(preferEverything, 2)
    expect(serving1).toEqual(jasmine.arrayWithExactContents(expectedServing))

    const serving2 = parlor.getServing(preferEverything, 2)
    expect(serving2).toEqual(jasmine.arrayWithExactContents(expectedServing))

    const serving3 = parlor.getServing(preferEverything, 2)
    expect(serving3).toEqual(jasmine.arrayWithExactContents(['Blue Moon']))
  })

  it('serves again after stock is refilled', () => {
    const parlor = new FrozenAcademy()

    parlor.addStock({ style: blueMoon, scoops: 3 })
    parlor.addStock({ style: strawberryYo, scoops: 1 })

    const serving1 = parlor.getServing(preferEverything, 2)
    expect(serving1).toEqual(
      jasmine.arrayWithExactContents(['Blue Moon', 'Strawberry, Yo!'])
    )

    const serving2 = parlor.getServing(preferEverything, 2)
    expect(serving1).toEqual(
      jasmine.arrayWithExactContents(['Blue Moon', 'Blue Moon'])
    )

    // out of stock now

    const serving3 = parlor.getServing(preferEverything, 2)
    expect(serving3).toEqual(jasmine.arrayWithExactContents([]))

    parlor.addStock({ style: strawberryYo, scoops: 2 })

    const serving4 = parlor.getServing(preferEverything, 3)
    expect(serving4).toEqual(
      jasmine.arrayWithExactContents(['Strawberry, Yo!', 'Strawberry, Yo!'])
    )
  })

  it('only serves what a customer wants', () => {
    const parlor = new FrozenAcademy()

    parlor.addStock({ style: blueMoon, scoops: 3 })
    parlor.addStock({ style: strawberry, scoops: 2 })

    expect(parlor.getServing(preferVegan, 2)).toEqual(
      jasmine.arrayWithExactContents(['Strawberry', 'Strawberry'])
    )

    expect(parlor.getServing(preferEverything, 1)).toEqual(
      jasmine.arrayWithExactContents(['Blue Moon'])
    )

    expect(parlor.getServing(preferVegan, 2)).toEqual([])
  })

  it('reduces stock when serving', () => {
    const parlor = new FrozenAcademy()
    parlor.addStock({ style: peppermintChoc, scoops: 10 })
    parlor.addStock({ style: strawberry, scoops: 9 })
    parlor.addStock({ style: stracciatella, scoops: 5 })

    expect(parlor.getTotalScoopsInStock()).toBe(24)
    expect(parlor.getAvailableStyles()).toEqual(
      jasmine.arrayWithExactContents([
        peppermintChoc,
        strawberry,
        stracciatella,
      ])
    )

    const serving = parlor.getServing(
      (style) => style.flavors.includes('chocolate'),
      12
    )
    expect(serving).toEqual(
      jasmine.arrayWithExactContents([
        'Peppermint Choc',
        'Stracciatella',
        'Peppermint Choc',
        'Stracciatella',
        'Peppermint Choc',
        'Stracciatella',
        'Peppermint Choc',
        'Stracciatella',
        'Peppermint Choc',
        'Stracciatella',
        'Peppermint Choc',
        'Peppermint Choc',
      ])
    )

    expect(parlor.getAvailableStyles()).toEqual(
      jasmine.arrayWithExactContents([peppermintChoc, strawberry])
    )
    expect(parlor.getScoopsInStock(peppermintChoc)).toEqual(3)
    expect(parlor.getScoopsInStock(strawberry)).toEqual(9)
    expect(parlor.getAvailableStyles()).toEqual(
      jasmine.arrayWithExactContents([peppermintChoc, strawberry])
    )
    expect(parlor.getTotalScoopsInStock()).toBe(12)
  })

  it('takes combined stock into account', () => {
    const parlor = new FrozenAcademy()

    parlor.addStock({ style: blueMoon, scoops: 6 })
    parlor.addStock({ style: peppermintChoc, scoops: 10 })
    parlor.addStock({ style: strawberry, scoops: 4 })
    parlor.addStock({ style: blueMoon, scoops: 6 })
    parlor.addStock({ style: strawberry, scoops: 3 })

    // blueMoon has most stock (12), so it should be included twice
    expect(parlor.getServing(preferEverything, 4)).toEqual(
      jasmine.arrayWithExactContents([
        'Peppermint Choc',
        'Blue Moon',
        'Strawberry',
        'Blue Moon',
      ])
    )

    // blueMoon: 10, peppermintChoc: 9
    // one scoop of a style which name contains the letter 'o' (peppermintChoc or blueMoon)
    expect(parlor.getServing((s) => s.name.includes('o'), 1)).toEqual(
      jasmine.arrayWithExactContents(['Blue Moon'])
    )

    expect(parlor.getServing(preferVegan, 2)).toEqual([
      'Strawberry',
      'Strawberry',
    ])
  })
})
