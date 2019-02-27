# unitized

[![CircleCI](https://circleci.com/gh/jedwards1211/unitized-js.svg?style=svg)](https://circleci.com/gh/jedwards1211/unitized-js)
[![Coverage Status](https://codecov.io/gh/jedwards1211/unitized-js/branch/master/graph/badge.svg)](https://codecov.io/gh/jedwards1211/unitized-js)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://badge.fury.io/js/unitized.svg)](https://badge.fury.io/js/unitized)

A Flowtype-safe API for handling numbers with associated units

# Examples

```js
import { UnitizedNumber, Length, Angle } from 'unitized'

new UnitizedNumber(2, Length.feet)
  .add(new UnitizedNumber(3, Length.meters))
  .toString()
// '11.842519685039369 ft'

// More convenient construction:
Length.feet
  .of(2)
  .add(Length.meters.of(3))
  .toString()
// '11.842519685039369 ft'

Length.feet
  .of(1)
  .in(Length.meters)
  .toString()
// '0.3048 m'

Length.feet.of(1).get(Length.meters)
// 0.3048
```

# API

## `UnitizedNumber`

```js
import { UnitizedNumber } from 'unitized'
```

Represents a number and a unit. The type parameters guard
against operations on unrelated units
(e.g. 1 meter + 5 degrees) by causing Flow errors.

### `new UnitizedNumber<T: UnitType>(value: number, unit: Unit<T>)`

Example: `const twoMeters: UnitizedNumber<Length> = new UnitizedNumber(2, Length.meters)`

### `add(addend: UnitizedNumber<T>): UnitizedNumber<T>`

Returns a new UnitizedNumber equal to this plus addend,
in this number's units.

### `sub(addend: UnitizedNumber<T>): UnitizedNumber<T>`

Returns a new UnitizedNumber equal to this minus addend,
in this number's units.

### `mul(multiplicand: number): UnitizedNumber<T>`

Returns a new UnitizedNumber equal to this times multiplicand, in this number's units.

For example, 1 meter \* 6 = 6 meters.

### `mod(modulus: UnitizedNumber<T>): UnitizedNumber<T>`

Returns the remainder after dividing this number by modulus, in this number's units.

For example, 345 centimeters % 2 meters = 145 centimeters.

### `div(denominator: number): UnitizedNumber<T>`

Returns a new UnitizedNumber equal to this divided by denominator, in this number's units.

For example, 1 meter / 5 = 0.2 meters.

### `divAwayUnit(denominator: UnitizedNumber<T>): number`

Returns a this divided by denominator, a unitless quantity.

For example, 1 meter / 50 centimeters = 2.

### `isFinite(): boolean`

Returns true iff the value (regardless of units) is not
NaN or infinite.

### `isPositive(): boolean`

Returns true iff the value is positive.

### `isNegative(): boolean`

Returns true iff the value is negative.

### `isZero(): boolean`

Returns true iff the value is zero.

### `isNonzero(): boolean`

Returns true iff the value is not zero.

### `negate(): UnitizedNumber<T>`

Returns a `UnitizedNumber` that has the negative value in
the same units.

### `abs(): UnitizedNumber<T>`

Returns a non-negative `UnitizedNumber` that has the same
magnitude in the same units.

### `compareTo(other: UnitizedNumber<T>): number`

Returns > 0 if this > other, < 0 if this < other, and
0 otherwise.

## `Length`

The type for units of length.

### `static meters: Unit<Length>`

### `static centimeters: Unit<Length>`

### `static kilometers: Unit<Length>`

### `static feet: Unit<Length>`

### `static yards: Unit<Length>`

### `static inches: Unit<Length>`

### `static miles: Unit<Length>`

## `Area`

The type for units of area.

### `static squareMeters: Unit<Area>`

### `static squareCentimeters: Unit<Area>`

### `static squareKilometers: Unit<Area>`

### `static squareFeet: Unit<Area>`

### `static squareYards: Unit<Area>`

### `static squareInches: Unit<Area>`

### `static squareMiles: Unit<Area>`

### `static squares: Map<Unit<Length>, Unit<Area>>`

E.g. `Area.squares.get(Length.meters) === Area.squareMeters`

### `static mul(a: UnitizedNumber<Length>, b: UnitizedNumber<Length>): UnitizedNumber<Area>`

Multiplies two lengths together and returns the result as an area.

### `static square(a: UnitizedNumber<Length>): UnitizedNumber<Area>`

Squares a length and returns the result as an area.

### `static sqrt(a: UnitizedNumber<Area>): UnitizedNumber<Length>`

Takes the square root of an area and returns the result as a length.

### `static div(a: UnitizedNumber<Area>, b: UnitizedNumber<Length>): UnitizedNumber<Length>`

Divides an area by a length, return the result as a length.

## `Angle`

The type for units of angle.

### `static degrees: Unit<Angle>`

1/360 of a unit circle

### `static radians: Unit<Angle>`

Arclength on a unit circle

### `static gradians: Unit<Angle>`

1/400 of a unit circle

### `static mils: Unit<Angle>`

NATO mils (1/6400 of a unit circle)

### `static percentGrade: Unit<Angle>`

The ratio of the rise over the run expressed as a percent.
100% = 45 degrees.
