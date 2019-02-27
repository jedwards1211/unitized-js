/**
 * @flow
 * @prettier
 */

import { describe, it } from 'mocha'
import { expect } from 'chai'

import Length from '../src/Length'

describe(`UnitizedNumber`, function() {
  it(`.add`, function() {
    expect(
      Length.meters
        .of(1)
        .add(Length.centimeters.of(20))
        .get(Length.meters)
    ).to.equal(1.2)
  })
  it(`.isFinite`, function() {
    expect(Length.meters.of(0).isFinite()).to.be.true
    expect(Length.meters.of(NaN).isFinite()).to.be.false
    expect(Length.meters.of(Infinity).isFinite()).to.be.false
  })
  it(`.isNaN`, function() {
    expect(Length.meters.of(0).isNaN()).to.be.false
    expect(Length.meters.of(NaN).isNaN()).to.be.true
    expect(Length.meters.of(Infinity).isNaN()).to.be.false
  })
  it(`.get`, function() {
    expect(Length.meters.of(1).get(Length.meters)).to.equal(1)
    expect(Length.meters.of(1).get(Length.centimeters)).to.equal(100)
  })
  it(`.in`, function() {
    expect(Length.meters.of(1).in(Length.centimeters)).to.deep.equal(
      Length.centimeters.of(100)
    )
    const same = Length.meters.of(5)
    expect(same.in(Length.meters)).to.equal(same)
  })
  it(`.negate`, function() {
    expect(Length.meters.of(5).negate()).to.deep.equal(Length.meters.of(-5))
  })
  it(`.sub`, function() {
    expect(
      Length.meters
        .of(1)
        .sub(Length.centimeters.of(20))
        .get(Length.meters)
    ).to.equal(0.8)
  })
  it(`.mul`, function() {
    expect(Length.meters.of(3).mul(5)).to.deep.equal(Length.meters.of(15))
  })
  it(`.isNegative`, function() {
    expect(Length.meters.of(NaN).isNegative()).to.be.false
    expect(Length.meters.of(0.001).isNegative()).to.be.false
    expect(Length.meters.of(0).isNegative()).to.be.false
    expect(Length.meters.of(-0.001).isNegative()).to.be.true
  })
  it(`.isPositive`, function() {
    expect(Length.meters.of(NaN).isPositive()).to.be.false
    expect(Length.meters.of(0.001).isPositive()).to.be.true
    expect(Length.meters.of(0).isPositive()).to.be.false
    expect(Length.meters.of(-0.001).isPositive()).to.be.false
  })
  it(`.isZero`, function() {
    expect(Length.meters.of(0).isZero()).to.be.true
    expect(Length.meters.of(1).isZero()).to.be.false
    expect(Length.meters.of(-1).isZero()).to.be.false
    expect(Length.meters.of(NaN).isZero()).to.be.false
  })
  it(`.isNonzero`, function() {
    expect(Length.meters.of(0).isNonzero()).to.be.false
    expect(Length.meters.of(1).isNonzero()).to.be.true
    expect(Length.meters.of(-1).isNonzero()).to.be.true
    expect(Length.meters.of(NaN).isNonzero()).to.be.true
  })
  it(`.mod`, function() {
    expect(Length.centimeters.of(345).mod(Length.meters.of(2))).to.deep.equal(
      Length.centimeters.of(145)
    )
  })
  it(`.abs`, function() {
    const positive = Length.meters.of(1)
    expect(positive.abs()).to.equal(positive)
    expect(Length.meters.of(-1).abs()).to.deep.equal(Length.meters.of(1))
  })
  it(`.divAwayUnit`, function() {
    expect(Length.meters.of(1).divAwayUnit(Length.centimeters.of(20))).to.equal(
      5
    )
  })
  it(`.div`, function() {
    expect(Length.meters.of(4).div(2)).to.deep.equal(Length.meters.of(2))
  })
  it(`.compareTo`, function() {
    expect(Length.meters.of(1).compareTo(Length.yards.of(1))).to.be.above(0)
    expect(Length.yards.of(1).compareTo(Length.meters.of(1))).to.be.below(0)
    expect(Length.meters.of(1).compareTo(Length.centimeters.of(100))).to.equal(
      0
    )
  })
  it(`.toString`, function() {
    expect(Length.meters.of(1).toString()).to.equal('1 m')
    expect(Length.feet.of(4.5).toString()).to.equal('4.5 ft')
  })
})
