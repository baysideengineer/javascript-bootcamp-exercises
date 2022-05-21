describe('calculateTaxPercentage function', function () {
  it('should be a function', function () {
    expect(typeof calculateTaxPercentage).toBe('function')
  })

  it('should return 5 as 5% of 100', function () {
    const result = calculateTaxPercentage(100, 5)
    expect(result).toBe(5)
  })

  it('should return 5 as 1% of 500', function () {
    const result = calculateTaxPercentage(500, 1)
    expect(result).toBe(5)
  })

  it('should return 14 as 7% of 200', function () {
    const result = calculateTaxPercentage(200, 7)
    expect(result).toBe(14)
  })
})

describe('Sales tax', function () {
  it('should be a function', function () {
    expect(typeof calculateSalesTax).toBe('function')
  })

  it('should be 1 shilling for small bread', function () {
    const smallBread = {
      price: 20,
      category: 'food',
    }

    const salesTax = calculateSalesTax(smallBread)
    expect(salesTax).toBe(1)
  })

  it('should be 2 shilling for large bread', function () {
    const largeBread = {
      price: 40,
      category: 'food',
    }

    const salesTax = calculateSalesTax(largeBread)
    expect(salesTax).toBe(2)
  })

  it('should be 1 shilling for carrot (rounding up)', function () {
    const carrot = {
      price: 3,
      category: 'food',
    }

    const salesTax = calculateSalesTax(carrot)
    expect(salesTax).toBe(1)
  })

  it('should be 0 for a cow', function () {
    const cow = {
      price: 200,
      category: 'livestock',
    }

    const salesTax = calculateSalesTax(cow)
    expect(salesTax).toBe(0)
  })

  it('should be 0 for a pig', function () {
    const pig = {
      price: 100,
      category: 'livestock',
    }

    const salesTax = calculateSalesTax(pig)
    expect(salesTax).toBe(0)
  })

  it('should be 2 for a small sword', function () {
    const smallSword = {
      price: 20,
      category: 'weapon',
    }

    const salesTax = calculateSalesTax(smallSword)
    expect(salesTax).toBe(2)
  })

  it('should be 15 for a large sword', function () {
    const largeSword = {
      price: 100,
      category: 'weapon',
    }

    const salesTax = calculateSalesTax(largeSword)
    expect(salesTax).toBe(15)
  })

  it('should be 45 for a trebuchet', function () {
    const trebuchet = {
      price: 300,
      category: 'weapon',
    }

    const salesTax = calculateSalesTax(trebuchet)
    expect(salesTax).toBe(45)
  })

  it('should be 6 for a hammer', function () {
    const hammer = {
      price: 100,
      category: 'tool',
    }

    const salesTax = calculateSalesTax(hammer)
    expect(salesTax).toBe(6)
  })

  it('should be 4 for a saw', function () {
    const saw = {
      price: 50,
      category: 'tool',
    }

    const salesTax = calculateSalesTax(saw)
    expect(salesTax).toBe(4)
  })
})

describe('Income Tax', function () {
  it('should be a function', function () {
    expect(typeof calculateIncomeTax).toBe('function')
  })

  it('should be 20 for a welder earning 200', function () {
    const citizen = {
      name: 'Willi',
      occupation: 'welder',
    }
    const incomeTax = calculateIncomeTax(200, citizen)
    expect(incomeTax).toBe(20)
  })

  it('should be 15 for a miller earning 150', function () {
    const citizen = {
      name: 'Milfried',
      occupation: 'miller',
    }
    const incomeTax = calculateIncomeTax(150, citizen)
    expect(incomeTax).toBe(15)
  })

  it('should be 48 for a farmer earning 400', function () {
    const citizen = {
      name: 'Fred',
      occupation: 'farmer',
    }
    const incomeTax = calculateIncomeTax(400, citizen)
    expect(incomeTax).toBe(48)
  })

  it('should be 8 for a farmer earning 100', function () {
    const citizen = {
      name: 'Fred',
      occupation: 'farmer',
    }
    const incomeTax = calculateIncomeTax(100, citizen)
    expect(incomeTax).toBe(8)
  })

  it('should be 16 for a farmer earning 200', function () {
    const citizen = {
      name: 'Fred',
      occupation: 'farmer',
    }
    const incomeTax = calculateIncomeTax(200, citizen)
    expect(incomeTax).toBe(16)
  })

  it('should be 0 for a barbier earning 50 or below', function () {
    const citizen = {
      name: 'Bartholo',
      occupation: 'barbier',
    }
    expect(calculateIncomeTax(0, citizen)).toBe(0)
    expect(calculateIncomeTax(20, citizen)).toBe(0)
    expect(calculateIncomeTax(50, citizen)).toBe(0)
  })

  it('should be 10 for a barbier earning 150', function () {
    const citizen = {
      name: 'Bartholo',
      occupation: 'barbier',
    }
    expect(calculateIncomeTax(150, citizen)).toBe(10)
  })

  it('should be 14 for a joker earning 200', function () {
    const citizen = {
      name: 'James',
      occupation: 'joker',
    }
    expect(calculateIncomeTax(200, citizen)).toBe(14)
  })

  it('should be 14 for a joker earning 200', function () {
    const citizen = {
      name: 'James',
      occupation: 'joker',
    }
    expect(calculateIncomeTax(200, citizen)).toBe(14)
  })

  it('should be 28 for a programmer earning 200', function () {
    const citizen = {
      name: 'Pearl',
      occupation: 'programmer',
    }
    expect(calculateIncomeTax(200, citizen)).toBe(28)
  })

  it('should be 9 for a knight earning 100', function () {
    const citizen = {
      name: 'Knut',
      occupation: 'knight',
    }
    expect(calculateIncomeTax(100, citizen)).toBe(9)
  })

  describe('should round up to the next whole shilling', function () {
    it('should be 15 for a joker earning 201', function () {
      const citizen = {
        name: 'James',
        occupation: 'joker',
      }
      expect(calculateIncomeTax(201, citizen)).toBe(15)
    })

    it('should be 10 for a knight earning 101', function () {
      const citizen = {
        name: 'Knut',
        occupation: 'knight',
      }

      expect(calculateIncomeTax(101, citizen)).toBe(10)
    })

    it('should be 91 for a welder earning 909', function () {
      const citizen = {
        name: 'Willi',
        occupation: 'welder',
      }

      const incomeTax = calculateIncomeTax(909, citizen)
      expect(incomeTax).toBe(91)
    })
  })

  describe('fixed income tax for citizens earning more than 1000 shilling', function () {
    it('should be 99 for a welder earning 1001', function () {
      const citizen = {
        occupation: 'welder',
        name: 'w'
      }

      expect(calculateIncomeTax(1001, citizen)).toBe(99)
    })

    it('should be 100 for a welder earning 1000', function () {
      const citizen = {
        occupation: 'welder',
        name: 'w'
      }

      expect(calculateIncomeTax(1000, citizen)).toBe(100)
    })

    it('should be 99 for a programmer earning 1000000', function () {
      const citizen = {
        occupation: 'programmer',
        name: 'p'
      }

      expect(calculateIncomeTax(1000000, citizen)).toBe(99)
    })
  })

  describe('fixed income tax for honorable people', function () {
    it('should be 16 for Lady JavaSmith', function () {
      const citizen = {
        occupation: 'programmer',
        name: 'Lady JavaSmith',
      }

      expect(calculateIncomeTax(0, citizen)).toBe(16)
      expect(calculateIncomeTax(1, citizen)).toBe(16)
      expect(calculateIncomeTax(100, citizen)).toBe(16)
      expect(calculateIncomeTax(1000000, citizen)).toBe(16)
    })

    it('should be 0 for Sir Jay Query', function () {
      const citizen = {
        occupation: 'knight',
        name: 'Sir Jay Query',
      }

      expect(calculateIncomeTax(0, citizen)).toBe(16)
      expect(calculateIncomeTax(1, citizen)).toBe(16)
      expect(calculateIncomeTax(100, citizen)).toBe(16)
      expect(calculateIncomeTax(1000000, citizen)).toBe(16)
    })

    it('should be 99 for Old Lady NPM', function () {
      const citizen = {
        occupation: 'programmer',
        name: 'Old Lady NPM',
      }

      expect(calculateIncomeTax(1111, citizen)).toBe(99)
    })

    it('should be 99 for Peter Sirloin', function () {
      const citizen = {
        occupation: 'farmer',
        name: 'Peter Sirloin',
      }

      expect(calculateIncomeTax(1111, citizen)).toBe(99)
    })
  })
})

describe('Tax Report', function () {
  it('should be a class', function () {
    expect(TaxReport).toBeDefined()

    const citizen = {
      occupation: 'knight',
      name: 'Sir Jay Query',
    }

    const t = new TaxReport(citizen, 200, [])

    expect(t).toBeInstanceOf(TaxReport)
  })

  describe('Method getIncomeTax', function () {
    it('should return 14 for a joker earning 200', function () {
      const citizen = {
        name: 'James',
        occupation: 'joker',
      }

      const goods = []
      const taxReport = new TaxReport(citizen, 200, goods)

      expect(taxReport.getIncomeTax()).toBe(14)
    })
  })

  describe('Method getSalesTax', function () {
    const citizen = {
      occupation: 'knight',
      name: 'Jay Query',
    }
    const smallSword = {
      price: 20,
      category: 'weapon',
    }
    const largeSword = {
      price: 100,
      category: 'weapon',
    }

    it('should return 2 when only a small sword was bought', function () {
      const goods = [smallSword]
      const taxReport = new TaxReport(citizen, 200, goods)

      expect(taxReport.getSalesTax()).toBe(2)
    })

    it('should return 17 when small sword and large sword was bought', function () {
      const goods = [smallSword, largeSword]
      const taxReport = new TaxReport(citizen, 200, goods)

      expect(taxReport.getSalesTax()).toBe(17)
    })

    it('should return 0 if nothing was bought', function () {
      const goods = []
      const taxReport = new TaxReport(citizen, 200, goods)

      expect(taxReport.getSalesTax()).toBe(0)
    })
  })

  describe('Method getTotalTax', function () {
    it('should return 31 for a joker earning 200 when small sword and large sword was bought', function () {
      const citizen = {
        name: 'James',
        occupation: 'joker',
      }
      const smallSword = {
        price: 20,
        category: 'weapon',
      }
      const largeSword = {
        price: 100,
        category: 'weapon',
      }

      const goods = [smallSword, largeSword]
      const taxReport = new TaxReport(citizen, 200, goods)

      expect(taxReport.getTotalTax()).toBe(31)
    })

    it('should return 20 for a farmer earning 100 when two hammers were bought', function () {
      const citizen = {
        name: 'Fred',
        occupation: 'farmer',
      }
      const hammer = {
        price: 100,
        category: 'tool',
      }

      const goods = [hammer, hammer]
      const taxReport = new TaxReport(citizen, 100, goods)

      expect(taxReport.getTotalTax()).toBe(20)
    })
  })

  describe('Method getSpendingsByCategory', function () {
    const citizen = {
      name: 'Fred',
      occupation: 'farmer',
    }
    const hammer = {
      price: 100,
      category: 'tool',
    }
    const saw = {
      price: 50,
      category: 'tool',
    }
    const cow = {
      price: 200,
      category: 'livestock',
    }

    it('should work for only hammer', function () {
      const goods = [hammer]
      const taxReport = new TaxReport(citizen, 100, goods)

      expect(taxReport.getSpendingsByCategory()).toEqual({
        food: 0,
        livestock: 0,
        tool: 100,
        weapon: 0,
      })
    })

    it('should work for hammer and saw', function () {
      const goods = [hammer, saw]
      const taxReport = new TaxReport(citizen, 100, goods)

      expect(taxReport.getSpendingsByCategory()).toEqual({
        food: 0,
        livestock: 0,
        tool: 150,
        weapon: 0,
      })
    })

    it('should work for two hammers, saw and cow', function () {
      const goods = [hammer, cow, saw, hammer]
      const taxReport = new TaxReport(citizen, 100, goods)

      expect(taxReport.getSpendingsByCategory()).toEqual({
        food: 0,
        livestock: 200,
        tool: 250,
        weapon: 0,
      })
    })

    it('should work when nothing was bought', function () {
      const goods = []
      const taxReport = new TaxReport(citizen, 100, goods)

      expect(taxReport.getSpendingsByCategory()).toEqual({
        food: 0,
        livestock: 0,
        tool: 0,
        weapon: 0,
      })
    })
  })

  describe('Method getSalesTaxesByCategory', function () {
    const citizen = {
      name: 'Fred',
      occupation: 'farmer',
    }
    const carrot = {
      price: 3,
      category: 'food',
    }
    const hammer = {
      price: 100,
      category: 'tool',
    }
    const saw = {
      price: 50,
      category: 'tool',
    }
    const cow = {
      price: 200,
      category: 'livestock',
    }

    it('should work for only carrot', function () {
      const goods = [carrot]
      const taxReport = new TaxReport(citizen, 100, goods)
      expect(taxReport.getSalesTaxesByCategory()).toEqual({
        food: 1,
      })
    })

    it('should work for hammer and saw', function () {
      const goods = [hammer, saw]
      const taxReport = new TaxReport(citizen, 100, goods)
      expect(taxReport.getSalesTaxesByCategory()).toEqual({
        tool: 10,
      })
    })

    it('should work for carrot and cow', function () {
      const goods = [carrot, cow]
      const taxReport = new TaxReport(citizen, 100, goods)
      expect(taxReport.getSalesTaxesByCategory()).toEqual({
        food: 1,
        livestock: 0,
      })
    })

    it('should work for two hammers, three carrots, saw and cow', function () {
      const goods = [carrot, hammer, cow, carrot, saw, hammer, carrot]
      const taxReport = new TaxReport(citizen, 100, goods)
      expect(taxReport.getSalesTaxesByCategory()).toEqual({
        food: 3,
        livestock: 0,
        tool: 16,
      })
    })

    it('should work when nothing was bought', function () {
      const goods = []
      const taxReport = new TaxReport(citizen, 100, goods)
      expect(taxReport.getSalesTaxesByCategory()).toEqual({})
    })
  })
})
