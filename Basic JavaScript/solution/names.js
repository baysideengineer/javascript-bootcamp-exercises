function splitNames(names) {
  const pattern = /,\s?/
  const splittedNames = names.split(pattern)
  return splittedNames
}

function countNameInArray(namesArray, nameToCount) {
  const result = []

  namesArray.forEach((name) => {
    if (name === nameToCount) result.push(name)
  })

  return result.length
}

function countName(names, nameToCount) {
  const splittedNames = splitNames(names)
  let numberOfName = 0

  splittedNames.forEach((name) => {
    if (name === nameToCount) numberOfName++
  })

  return numberOfName
}
