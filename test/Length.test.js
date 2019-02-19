/**
 * @flow
 * @prettier
 */

import { describe, it } from 'mocha'
import { expect } from 'chai'

import Length from '../src/Length'

describe(`Length`, function() {
  it(`conversion works`, function() {
    expect(Length.miles.convert(1, Length.kilometers)).to.equal(1.609344)
    expect(Length.kilometers.convert(1.609344, Length.miles)).to.equal(1)
    expect(Length.miles.convert(1, Length.meters)).to.equal(1609.344)
    expect(Length.meters.convert(1609.344, Length.miles)).to.equal(1)
    expect(Length.feet.convert(5280, Length.meters)).to.equal(1609.344)
    expect(Length.meters.convert(1609.344, Length.feet)).to.equal(5280)
    expect(Length.yards.convert(1, Length.meters)).to.be.closeTo(0.9144, 1e-12)
    expect(Length.meters.convert(0.9144, Length.yards)).to.be.closeTo(1, 1e-12)
    expect(Length.feet.convert(2, Length.inches)).to.equal(24)
    expect(Length.inches.convert(24, Length.feet)).to.equal(2)
    expect(Length.feet.convert(6, Length.yards)).to.equal(2)
    expect(Length.yards.convert(2, Length.feet)).to.equal(6)
    expect(Length.meters.convert(3, Length.centimeters)).to.equal(300)
    expect(Length.centimeters.convert(300, Length.meters)).to.equal(3)
    expect(Length.meters.convert(3456, Length.kilometers)).to.equal(3.456)
    expect(Length.kilometers.convert(3.456, Length.meters)).to.equal(3456)
  })
})
