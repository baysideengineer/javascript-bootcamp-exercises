function calculateTaxPercentage(value, percent) {
  return Math.ceil((value * percent) / 100)
}

function calculateSalesTax(good) {
  const tax = {
    food: 5,
    weapon: 15,
    tool: 5,
    default: 10,
  }

  const category = {
    food: 'food',
    livestock: 'livestock',
    weapon: 'weapon',
    tool: 'tool'
  }

  if (good.category === category.food) {
    return calculateTaxPercentage(good.price, tax.food)
  }

  if (good.category === category.livestock) {
    return 0
  }

  if (good.category === category.weapon && good.price >= 100) {
    return calculateTaxPercentage(good.price, tax.weapon)
  }

  if (good.category === category.tool) {
    return calculateTaxPercentage(good.price, tax.tool) + 1
  }

  return calculateTaxPercentage(good.price, tax.default)
}

function calculateIncomeTax(income, citizen) {
  const tax = {
    welder: 10,
    miller: 10,
    farmer: 12,
    reducedFarmer: 8,
    barbier: 10,
    joker: 7,
    programmer: 14,
    default: 9,
  }

  const occupation = {
    welder: 'welder',
    miller: 'miller',
    farmer: 'farmer',
    barbier: 'barbier',
    joker: 'joker',
    programmer: 'programmer',
  }

  const titleLady = 'Lady'
  const titleSir = 'Sir'

  if (citizen.name.startsWith(titleLady) || citizen.name.startsWith(titleSir)) {
    return 16
  }

  if (income > 1000) {
    return 99
  }

  if (citizen.occupation === occupation.welder) {
    return calculateTaxPercentage(income, tax.welder)
  }

  if (citizen.occupation === occupation.miller) {
    return calculateTaxPercentage(income, tax.miller)
  }

  if (citizen.occupation === occupation.farmer) {
    if (income > 200) {
      return calculateTaxPercentage(income, tax.farmer)
    }

    return calculateTaxPercentage(income, tax.reducedFarmer)
  }

  if (citizen.occupation === occupation.barbier) {
    if (income > 50) return calculateTaxPercentage(income - 50, tax.barbier)

    return 0
  }

  if (citizen.occupation === occupation.joker) {
    return calculateTaxPercentage(income, tax.joker)
  }

  if (citizen.occupation === occupation.programmer) {
    return calculateTaxPercentage(income, tax.programmer)
  }

  return calculateTaxPercentage(income, tax.default)
}

class TaxReport {
  constructor(citizen, income, goods) {
    this.citizen = citizen
    this.income = income
    this.goods = goods
  }

  getIncomeTax() {
    return calculateIncomeTax(this.income, this.citizen)
  }

  getSalesTax() {
    let sumSalesTax = 0

    this.goods.forEach((good) => {
      sumSalesTax += calculateSalesTax(good)
    })

    return sumSalesTax
  }

  getTotalTax() {
    return this.getSalesTax() + this.getIncomeTax()
  }

  getSpendingsByCategory () {
    const spendingsByCategory = {
      food: 0,
      livestock: 0,
      tool: 0,
      weapon: 0,
    }

    this.goods.forEach((good) => {
      spendingsByCategory[good.category] += good.price
    })

    return spendingsByCategory
  }

  getSalesTaxesByCategory () {
    const salesTaxesByCategory = {}

    this.goods.forEach((good) => {
      if (salesTaxesByCategory[good.category]) {
        salesTaxesByCategory[good.category] += calculateSalesTax(good)
      } else {
        salesTaxesByCategory[good.category] = calculateSalesTax(good)
      }
    })

    return salesTaxesByCategory
  }
}
