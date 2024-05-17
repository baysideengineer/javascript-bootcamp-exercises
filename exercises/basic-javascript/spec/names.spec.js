describe('splitNames function', function () {
  it('should be a function', function () {
    expect(typeof splitNames).toBe('function')
  })

  it('should work with spaces', function () {
    const result = splitNames('Alice, Bob, Carol')
    expect(result).toEqual(['Alice', 'Bob', 'Carol'])
  })

  it('should work without spaces', function () {
    const result = splitNames('Alice,Bob,Carol')
    expect(result).toEqual(['Alice', 'Bob', 'Carol'])
  })

  it('should work for names containing spaces', function () {
    const result = splitNames('John Doe, Joe Schmoe')
    expect(result).toEqual(['John Doe', 'Joe Schmoe'])
  })

  it('should work for mixed spaces', function () {
    const result = splitNames('Linda,Bob, Tina,Gene,Louise')
    expect(result).toEqual(['Linda', 'Bob', 'Tina', 'Gene', 'Louise'])
  })

  it('should work for single name', function () {
    const result = splitNames('Teddy')
    expect(result).toEqual(['Teddy'])
  })
})

describe('countNameInArray function', function () {
  it('should be a function', function () {
    expect(typeof countNameInArray).toBe('function')
  })

  it('should work for array of two elements', function () {
    const n = ['Tina', 'Bob']
    expect(countNameInArray(n, 'Bob')).toBe(1)
    expect(countNameInArray(n, 'Tina')).toBe(1)
    expect(countNameInArray(n, 'Linda')).toBe(0)
  })

  it('should work for array of three elements', function () {
    const n = ['Tina', 'Bob', 'Gene']
    expect(countNameInArray(n, 'Bob')).toBe(1)
    expect(countNameInArray(n, 'Tina')).toBe(1)
    expect(countNameInArray(n, 'Gene')).toBe(1)
    expect(countNameInArray(n, 'Linda')).toBe(0)
  })

  it('should work with repetitions', function () {
    const n = ['Tina', 'Bob', 'Gene', 'Bob', 'Bob']
    expect(countNameInArray(n, 'Bob')).toBe(3)
    expect(countNameInArray(n, 'Tina')).toBe(1)
    expect(countNameInArray(n, 'Gene')).toBe(1)
  })

  it('should work with only a single name', function () {
    const n = ['Jimmy']
    expect(countNameInArray(n, 'Jimmy')).toBe(1)
    expect(countNameInArray(n, 'Tina')).toBe(0)
  })

  it('should work with only a single name repeated', function () {
    const n = ['Jimmy', 'Jimmy', 'Jimmy']
    expect(countNameInArray(n, 'Jimmy')).toBe(3)
    expect(countNameInArray(n, 'Tina')).toBe(0)
  })

  it('should work with empty array', function () {
    const n = []
    expect(countNameInArray(n, 'Jimmy')).toBe(0)
    expect(countNameInArray(n, 'Tina')).toBe(0)
  })

  it('should be case-sensitive', function () {
    const n = ['Jimmy', 'jimmy', 'JIMMY']
    expect(countNameInArray(n, 'Jimmy')).toBe(1)
    expect(countNameInArray(n, 'jimmy')).toBe(1)
    expect(countNameInArray(n, 'JIMMY')).toBe(1)
  })
})

describe('countName function', function () {
  it('should work with two names without spaces', function () {
    const n = 'Tina,Bob'
    expect(countName(n, 'Bob')).toBe(1)
    expect(countName(n, 'Tina')).toBe(1)
    expect(countName(n, 'Linda')).toBe(0)
  })

  it('should work with two names with space', function () {
    const n = 'Tina, Bob'
    expect(countName(n, 'Bob')).toBe(1)
    expect(countName(n, 'Tina')).toBe(1)
    expect(countName(n, 'Linda')).toBe(0)
  })

  it('should work with repetitions', function () {
    const n = 'Tina, Bob,Gene,Bob, Bob'
    expect(countName(n, 'Bob')).toBe(3)
    expect(countName(n, 'Tina')).toBe(1)
    expect(countName(n, 'Gene')).toBe(1)
    expect(countName(n, 'Linda')).toBe(0)
  })

  it('should work with only a single name repeated', function () {
    const n = 'Jimmy, Jimmy, Jimmy'
    expect(countName(n, 'Jimmy')).toBe(3)
    expect(countName(n, 'Tina')).toBe(0)
  })
})
