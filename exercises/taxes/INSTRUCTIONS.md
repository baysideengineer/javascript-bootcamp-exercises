# Assessment: Taxes

## Introduction

In the far away kingdom of Ymedaca taxes are to be paid. There are two
categories of taxes: Income tax is paid by every citizen yearly. Sales tax is
paid every time a good (e.g. loaf of bread, goat, sword, ...) is sold in the
kingdom.

## Money

The currency of the kingdom is the **shilling**. Shillings are non-divisible,
that means it can not be split into parts. When calculating taxes, one always
rounds up (to favor the king).

## Objects in the kingdom

### Citizen

Every person living in the kingdom can be represented as a citizen object. These
objects contain the following properties:

- `name`: Name of the person, can be any string.
- `occupation`: The person's occupation (i.e. their job). Can
  be `"welder"`, `"farmer"`, `"barbier"`, `"joker"`, `"miller"`, `"knight"`,
  `"programmer"`.

Example:

```javascript
const citizen = {
    name: "Shane Told",
    occupation: "welder",
}
```

### Good

Goods are things that citizens trade (buy and sell). They are represented by
objects containing the following properties:

- `price`: The price of the good when sold. A whole number greater than or equal
  to `0`.
- `category`: Ca be one of `"food"`, `"livestock"`, `"tool"` or "`weapon`".

Example:

```javascript
const good = {
    price: 23,
    category: "food",
}
```

## Your assignment: CTO of the kingdom

Everything was going well in the kingdom until yesterday the royal chief
technical officer was captured by the neighbouring rival kingdom. The last thing
she was working on was the software to simplify tax collection, and she was
applying _Test Driven Development_ by writing unit test code first before the
implementation.

You have been chosen to be the new chief technical officer of the kingdom
Ymedaca! On your first day of the assignment, your task is to implement the tax
software based on specification and the unit tests written by the previous CTO.

Write all your code inside the file `taxes.js`!

The unit tests by the previous CTO are
in [spec/taxes.spec.js](spec/taxes.spec.js) and should be very helpful to
you. Look at them to find examples of how your code should work, but do not
change any of the existing tests.

Open [index.html](index.html) in your browser to run all tests and see the
result. After making changes, press Reload (F5) to run again. At the beginning,
there should be many test failures, but when you make progress with the
implementation this number should go down. In the end, the red bar will turn
green when all tests pass.

### 1. Calculate percentage

Because the king defines all tax rates as percents, we need to make sure we
calculate those correctly.

Create a function `calculateTaxPercentage` with parameters `value`
and `percent`. It should perform these exact steps:

- Multiply `value` and `percent`.
- Divide the result by `100`.
- Round that number up to the next whole number (also known as `ceil`
  operation).
- Return that result.

You can perform these steps in multiple assignments to one or more variables, or
you can write it all one expression.

It is recommended that you use this function whenever you need to calculate
percentages in any other part of this assignment!

### 2. Calculation of sales tax

Write a function `calculateSalesTax` to determine the amount of tax for the sale
of a good. It will receive an object describing the good as the only parameter.

The function should return the number of shillings in tax to be paid when a good
is sold. The rules for this are as following:

- Food sales are taxed at 5% of the price.
- Livestock is tax-free (0 shillings sales tax).
- Weapons with a price of at least 100 shillings are taxed at 15%.
- Tools are taxed at 5% of the price plus one shilling.
- Everything else is taxed at 10%.
- When calculating taxes, you always round up the result to the next whole
  shilling.

### 3. Calculation of income Tax

You need to write a function `calculateIncomeTax` which implements the
calculation for how much income tax a citizen has to pay. It receives two
parameters:

- `income`: The number of shillings a citizen has earned in a year.
- `citizen`: An object describing the citizen, as described above.

The function should return the number of shillings in tax the citizen has to pay
for their income. Here is how the king describes his rules for income tax:

- Welders and millers pay 10% income tax.
- Farmers have to pay 12% if they earn more than 200 shilling per year,
  otherwise 8%.
- Every barbier has tax-free income of 50 shilling and must pay 10% for the
  income after that.
- Tax jokers 7% of their income. For programmers the rate is twice that because
  they are even funnier.
- All other occupations are taxed 9% of their income.
- When calculating taxes, you always round up the result to the next whole
  shilling.
- Anybody who earns more than 1000 shilling just pays a fixed income tax of 99
  shilling.
- Honorable people, that means citizens whose name starts with `"Lady"`
  or `"Sir"`have to pay exactly 16 shillings, no matter how high their income or
  what their occupation is.

Implement the function `calculateIncomeTax` according to the king's
specification! Run the tests to verify your work!

### 4. Tax Report

The kingdom's bureaucrat demands that you collect all information regarding a
citizen's taxes in one place. It was decided, that a class with one object per
citizen and year will be used here.

### Constructor

Create a class `TaxReport` with a constructor accepting three parameters:

- An object representing a citizen (you can assume this object is immutable: it
  will not change later).
- A number for the citizen's income.
- An array of objects representing goods, these are the goods a citizen has
  bought (also immutable).

Define the following methods for objects of that class:

### Method `getIncomeTax`

Returns the income tax for the citizen.

### Method `getSalesTax`

Returns the sum of sales tax for all goods the citizen has bought.

### Method `getTotalTax`

Returns the sum of sales and income tax for the citizen.

### Method `getSpendingsByCategory`

Returns an object with a key for every category of
good (`"food"`, `"livestock"`, `"tool"` and "`weapon`"), set the amount of
shillings the citizen has spent in total for goods in this category (price only,
not including sales tax). If a citizen did not buy goods of some category, the
value should be `0`.

### Method `getSalesTaxesByCategory`

Returns an object with a key for every category of good where the citizen did
actually buy something. The value should be the total amount of sales tax for
goods of that category.

If the citizen did not buy any good of some category, this category should not
be included in the resulting object.
