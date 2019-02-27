/**
 * @flow
 * @prettier
 */

import { describe, it } from 'mocha'
import { expect } from 'chai'

import Angle from '../src/Angle'

import Length from '../src/Length'

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
  it(`.sin`, function() {
    expect(Angle.sin(Angle.degrees.of(90))).to.equal(1)
    expect(Angle.sin(Angle.degrees.of(180))).to.be.closeTo(0, 1e-12)
  })
  it(`.cos`, function() {
    expect(Angle.cos(Angle.degrees.of(90))).to.be.closeTo(0, 1e-12)
    expect(Angle.cos(Angle.degrees.of(180))).to.be.closeTo(-1, 1e-12)
  })
  it(`.tan`, function() {
    expect(Angle.tan(Angle.degrees.of(0))).to.equal(0)
    expect(Angle.tan(Angle.degrees.of(45))).to.be.closeTo(1, 1e-12)
  })
  it(`.asin`, function() {
    expect(Angle.asin(0)).to.deep.equal(Angle.radians.of(0))
    expect(Angle.asin(1)).to.deep.equal(Angle.radians.of(Math.PI / 2))
  })
  it(`.acos`, function() {
    expect(Angle.acos(1)).to.deep.equal(Angle.radians.of(0))
    expect(Angle.acos(0)).to.deep.equal(Angle.radians.of(Math.PI / 2))
  })
  it(`.atan`, function() {
    expect(Angle.atan(0)).to.deep.equal(Angle.radians.of(0))
    expect(Angle.atan(1)).to.deep.equal(Angle.radians.of(Math.PI / 4))
  })
  it(`.atan2`, function() {
    expect(Angle.atan2(1, 1)).to.deep.equal(Angle.radians.of(Math.PI / 4))
    expect(Angle.atan2(-1, 1)).to.deep.equal(Angle.radians.of(-Math.PI / 4))
    expect(Angle.atan2(-1, -1)).to.deep.equal(
      Angle.radians.of((-3 * Math.PI) / 4)
    )
  })
  it(`.atan2Unitized`, function() {
    expect(
      Angle.atan2Unitized(Length.meters.of(1), Length.centimeters.of(100))
    ).to.deep.equal(Angle.radians.of(Math.PI / 4))
  })
})
