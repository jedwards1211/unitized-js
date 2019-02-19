/**
 * @flow
 * @prettier
 */

import { describe, it } from 'mocha'
import { expect } from 'chai'
import Area from '../src/Area'

describe(`Area`, function() {
  it(`conversion works`, function() {
    expect(Area.squareMeters.of(1000000)).to.deep.equal(
      Area.squareKilometers.of(1).in(Area.squareMeters)
    )
    expect(Area.squareFeet.of(9)).to.deep.equal(
      Area.squareYards.of(1).in(Area.squareFeet)
    )
    expect(Area.squareFeet.of(10.76391041670972)).to.deep.equal(
      Area.squareMeters.of(1).in(Area.squareFeet)
    )
  })
})
