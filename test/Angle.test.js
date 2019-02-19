/**
 * @flow
 * @prettier
 */

import { describe, it } from 'mocha'
import { expect } from 'chai'

import Angle from '../src/Angle'

describe(`Angle`, function() {
  it(`conversions work`, function() {
    expect(Angle.percentGrade.convert(100, Angle.degrees)).to.equal(45)
    expect(Angle.degrees.convert(45, Angle.percentGrade)).to.be.closeTo(
      100,
      1e-12
    )
    expect(Angle.degrees.convert(90, Angle.gradians)).to.equal(100)
    expect(Angle.gradians.convert(100, Angle.degrees)).to.equal(90)
    expect(Angle.degrees.convert(90, Angle.radians)).to.equal(Math.PI / 2)
    expect(Angle.radians.convert(Math.PI / 2, Angle.degrees)).to.equal(90)
    expect(
      Angle.radians.convert(Math.PI / 4, Angle.percentGrade)
    ).to.be.closeTo(100, 1e-12)
    expect(Angle.percentGrade.convert(100, Angle.radians)).to.equal(Math.PI / 4)
  })
  it(`normalize works`, function() {
    expect(Angle.normalize(Angle.degrees.of(-50))).to.deep.equal(
      Angle.degrees.of(310)
    )
    expect(Angle.normalize(Angle.radians.of(-Math.PI * 5))).to.deep.equal(
      Angle.radians.of(Math.PI)
    )
    expect(Angle.normalize(Angle.gradians.of(900))).to.deep.equal(
      Angle.gradians.of(100)
    )
  })
  it(`opposite works`, function() {
    expect(Angle.opposite(Angle.degrees.of(-50))).to.deep.equal(
      Angle.degrees.of(130)
    )
    expect(Angle.opposite(Angle.degrees.of(130))).to.deep.equal(
      Angle.degrees.of(310)
    )
    expect(Angle.opposite(Angle.gradians.of(240))).to.deep.equal(
      Angle.gradians.of(40)
    )
    expect(Angle.opposite(Angle.gradians.of(40))).to.deep.equal(
      Angle.gradians.of(240)
    )
  })
})
