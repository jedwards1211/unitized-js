/**
 * @flow
 * @prettier
 */

import { describe, it } from 'mocha'
import { expect } from 'chai'

import Length from '../src/Length'
import Angle from '../src/Angle'
import Area from '../src/Area'
import { assertSameType } from '../src/Unit'

describe(`assertSameType`, function() {
  it(`throws if units are of different types`, function() {
    assertSameType(Length.meters, Length.feet)
    expect(() => assertSameType(Length.meters, Angle.degrees)).to.throw(
      Error,
      `can't convert from m to deg`
    )
    expect(() => assertSameType(Length.meters, Area.squareMeters)).to.throw(
      Error,
      `can't convert from m to sq m`
    )
  })
})
