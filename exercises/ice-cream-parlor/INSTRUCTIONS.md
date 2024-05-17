# Assessment: Ice Cream Parlor

## Introduction

Ice cream is a popular, tasty treat on sunny days, but running your own ice
cream parlor is not so easy. You need to know everything about
different styles of ice cream, manage stock, and provide the best
possible serving to all customers.

## IceCreamStyle

The different styles of ice cream are what makes a successful ice cream parlor.

Every style is defined as an object. A style has a name property with a string
value like `"Stracciatella"` and a type which is one of `"gelato"`, `"sorbet"`
or `"frozen_yogurt"`. Every style also has an array of strings which describe
the different flavors in it, and a boolean to indicate whether it is vegan.

Examples:

```javascript
const myFavoriteIceCreamStyle = {
    name: "Stracciatella",
    type: "gelato",
    flavors: ["vanilla", "chocolate"],
    vegan: false,
}

const anotherStyle = {
    name: "Tutti Frutti",
    type: "sorbet",
    flavors: ["blueberry", "lemon", "peach"],
    vegan: true,
}
```

`IceCreamStyle` objects must never change (they are immutable) and there will
never be more than one object representing a style.

All `IceCreamStyles` are already defined for you. They will be passed in to your
code from the outside world (Jasmine test cases).

See all 9 `IceCreamStyles` constants
in [ice-cream.spec.js](spec/ice-cream.spec.js) line 10 to 63.

## IceCreamStock

Objects of this type define what an ice cream parlor has stored in the freezers.
It is simply a combination of an `IceCreamStyle` and a number which indicates
how many scoops are available of that style. These objects are also used
when more ice cream is added to the stock.

Example:

```javascript
const myStock = {
    style: myFavoriteIceCreamStyle,
    scoops: 404,
}
```

## Your assignment: Implement FrozenAcademy class

Implement a class which handles all aspects of an ice cream parlor. The class
must be named `FrozenAcademy`. It should get a default constructor (that is a
constructor without any parameters).

Open `index.html` in your browser to run all tests and see the result. After
making changes, press Reload (F5) to run those tests again. At the beginning,
there should be many test failures, but when you make progress with the
implementation this number should go down.

In the end, the red bar will turn green when all tests pass. You're done.

### Tracking stock

An ice cream parlor always needs to have data on which `IceCreamStyles` are in
the freezers, and how many scoops are left. Implement the following methods on
your class `FrozenAcademy`:

### Method `addStock`

This method receives an `IceCreamStock` object as its only parameter. This
object represents an amount (scoops) of an `IceCreamStyle` which is added to the
parlor's freezer.

During the lifetime of an ice cream parlor, multiple calls to `addStock` may be
made with the same style. The stocks need to be combined in these cases by
adding the number of scoops to an existing `IceCreamStock`. This method does not
return a value.

### Method `getScoopsInStock`

This method receives an `IceCreamStyle` object as its only parameter. It must
return the number of scoops which are in stock at the parlor for this
`IceCreamStyle`. This must work even if the given `IceCreamStyle` was never in
stock at the parlor, in which case the method returns `0`.

### Method `getTotalScoopsInStock`

Returns the total number of scoops in stock (over all `IceCreamStyles`). No
parameter is expected.

### Method `getAvailableStyles`

Returns an array of all `IceCreamStyles` available (array of `const`). A style
is only available if there is at least one scoop in stock. The order of elements
in the returned array is irrelevant.

### Serving Ice Cream

Now we know exactly how many scoops are available for every `IceCreamStyle` and
we can finally start serving tasty ice cream to our customers.

We handle this with a method `getServing` in our class. This method returns an
array of strings, which contains the name of an `IceCreamStyle` for every scoop
contained in the serving. Multiple `IceCreamStyles` (multiple number of scoops
of one `IceCreamStyle`) occur multiple times.

Example serving with two scoops of Stracciatella and one scoop Tutti Frutti:

```js
const serving = ["Stracciatella", "Tutti Frutti", "Stracciatella"]
```

The order of the scoops in the returned array is irrelevant.

The decision which styles to serve to a customer is made based on the customers
preferences (i.e. which `IceCreamStyles` they like) and also takes into account
how many scoops of each `IceCreamStyle` is in stock.

Regarding the preferences, we need maximum flexibility for our customers here:
Some people only like gelato or frozen yoghurt, others don't want lemon flavor,
only vegan ice cream or simply just Stracciatella. But we also can't expect a
customer to list all their preferred styles when ordering.

That's why the customer's preferences are expressed as a function which receives
an IceCreamStyle as its only parameter and returns a boolean indicating whether
the customer likes that style. This function is passed as the first parameter
to `getServing`. The second parameter is a number, indicating the desired number
of scoops in the serving.

For example, to request two scoops of gelato, the method would be called like
this:

```javascript
function onlyGelato(style) {
    return style.type === "gelato"
}

parlor.getServing(onlyGelato, 2)
```

In this example the first parameter to `getServing` is the named
function `onlyGelato`, but it could of course also be written as an arrow
function. This next example shows an arrow function being used. Here somebody
would like three scoops, and every style must include the flavor 'chocolate':

```javascript
parlor.getServing((style) => style.flavors.includes("chocolate"), 3)
```

Implement the `getServing` method to create a serving by following these steps:

- Find all stock elements with styles customer prefers. For found elements:
  - Push to preferred stocks.
  - Add number of scoops to available scoops.
- Sort (descending) preferred stocks by number of scoops (we serve first what
  most in stock).
- Repeat until:
  - Number of scoops in serving has reached desired number of scoops.
  - Or number of available scoops in sorted stocks becomes zero.
  - Go through sorted stocks:
    - If there are still scoops left in sorted stocks:
      - Add style name to serving array.
      - Decrement scoops stock element.
      - Decrement available number of scoops.
      - Increment served scoops.
    - If no available scoops left anymore or served scoops are as many as
      desired, break iteration.
