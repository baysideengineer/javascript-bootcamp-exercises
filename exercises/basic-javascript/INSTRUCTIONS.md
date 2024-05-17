# Assessment: Basic JavaScript

Write all your code inside the file `names.js`!

## 1. Split a string of names into an array

A string of names is a string containing zero or more names separated by a comma
and possibly a space character. Examples:

    "Alice, Bob, Carol"
    "Alice,Bob,Carol"
    "John Doe, Joe Schmoe"
    "Linda,Bob, Tina,Gene,Louise"

Write a function `splitNames` which receives a string of names as its only
parameter and returns an array of the names. The names in the array must be in
the same order as in the string.

## 2. Count how often a name is contained in an array of names

Write a function `countNameInArray` which receives two parameters:

- `namesArray`: an array of names
- `nameToCount`: a single name (string)

The function should return the number of times `nameToCount` is included
in `namesArray`.

## 3. Count how often a name is contained in a string of names

Write a function `countName` which receives two parameters:

- `names`: a string of names, as described in exercise 1
- `nameToCount`: a single name (string)

The function should return the number of times `nameToCount` is included
in `names`, when split as described in exercise 1.
