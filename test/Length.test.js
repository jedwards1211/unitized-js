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
    expect(Length.yards.convert(1, Length.meters)).to.equal(0.9144000000000001)
    expect(Length.meters.convert(0.9144000000000002, Length.yards)).to.equal(1)
  })
})
