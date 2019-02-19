/**
 * @flow
 * @prettier
 */

import { describe, it } from 'mocha'
import { expect } from 'chai'
import Area from '../src/Area'
import Length from '../src/Length'

describe(`Area`, function() {
  it(`conversion works`, function() {
    expect(Area.squareMeters.convert(1000000, Area.squareKilometers)).to.equal(
      1
    )
    expect(Area.squareKilometers.convert(1, Area.squareMeters)).to.equal(
      1000000
    )
    expect(Area.squareFeet.convert(27, Area.squareYards)).to.equal(3)
    expect(Area.squareYards.convert(3, Area.squareFeet)).to.equal(27)
    expect(Area.squareInches.convert(27 * 144, Area.squareYards)).to.equal(3)
    expect(Area.squareYards.convert(3, Area.squareInches)).to.equal(27 * 144)
    expect(Area.squareMeters.convert(1, Area.squareFeet)).to.be.closeTo(
      10.76391041670972,
      1e-12
    )
    expect(
      Area.squareFeet.convert(10.76391041670972, Area.squareMeters)
    ).to.be.closeTo(1, 1e-12)
  })
  it(`mul() works`, function() {
    expect(
      Area.mul(Length.meters.of(2), Length.meters.of(4)).get(Area.squareMeters)
    ).to.equal(8)
    expect(
      Area.mul(Length.meters.of(2), Length.meters.of(4).in(Length.feet)).get(
        Area.squareMeters
      )
    ).to.be.closeTo(8, 1e-12)

    expect(Area.square(Length.meters.of(2)).get(Area.squareMeters)).to.equal(4)
    expect(Area.square(Length.feet.of(2)).get(Area.squareFeet)).to.equal(4)
  })
  it(`div() works`, function() {
    expect(
      Area.div(Area.squareFeet.of(8), Length.feet.of(4)).get(Length.feet)
    ).to.equal(2)
    expect(
      Area.div(Area.squareFeet.of(8), Length.feet.of(4).in(Length.meters)).get(
        Length.feet
      )
    ).to.be.closeTo(2, 1e-12)
  })
  it(`sqrt() works`, function() {
    expect(Area.sqrt(Area.squareFeet.of(4)).get(Length.feet)).to.equal(2)
    expect(Area.sqrt(Area.squareFeet.of(9)).get(Length.inches)).to.equal(36)
  })
})
