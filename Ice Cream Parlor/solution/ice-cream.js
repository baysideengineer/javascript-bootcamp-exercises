class FrozenAcademy {
  constructor() {
    this.iceCreamStock = []
  }

  addStock(iceCreamStock) {
    for (const sort of this.iceCreamStock) {
      if (sort.style.name === iceCreamStock.style.name) {
        return (sort.scoops += iceCreamStock.scoops)
      }
    }

    this.iceCreamStock.push(iceCreamStock)
  }

  getScoopsInStock(iceCreamStyle) {
    for (const sort of this.iceCreamStock) {
      if (sort.style.name === iceCreamStyle.name) {
        return sort.scoops
      }
    }

    return 0
  }

  getTotalScoopsInStock() {
    let totalNumberOfScoops = 0

    for (const sort of this.iceCreamStock) {
      totalNumberOfScoops += sort.scoops
    }

    return totalNumberOfScoops
  }

  getAvailableStyles() {
    const iceCreamStylesAvailable = []

    for (const sort of this.iceCreamStock) {
      if (sort.scoops > 0) {
        iceCreamStylesAvailable.push(sort.style)
      }
    }

    return iceCreamStylesAvailable
  }

  getServing(preference, desiredNumberOfScoops) {
    let numberOfAvailableScoops = 0
    let servedScoops = 0
    const preferredIceCreamStock = []
    const serving = []

    for (const sort of this.iceCreamStock) {
      if (preference(sort.style)) {
        preferredIceCreamStock.push(sort)
        numberOfAvailableScoops += sort.scoops
      }
    }

    const sortedIceCreamStock = preferredIceCreamStock.sort(
      (currentSort, nextSort) => {
        return nextSort.scoops - currentSort.scoops
      }
    )

    while (servedScoops < desiredNumberOfScoops) {
      if (numberOfAvailableScoops < 1) {
        break
      }

      for (const sort of sortedIceCreamStock) {
        if (sort.scoops > 0) {
          serving.push(sort.style.name)
          sort.scoops--
          numberOfAvailableScoops--
          servedScoops++
        }

        if (
          numberOfAvailableScoops < 1 ||
          servedScoops == desiredNumberOfScoops
        ) {
          break
        }
      }
    }

    return serving
  }
}
