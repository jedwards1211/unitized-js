// @flow

import { type UnitType, type Unit } from './Unit'

export default class UnitizedNumber<T: UnitType> {
  +_value: number
  +unit: Unit<T>

  constructor(value: number, unit: Unit<T>) {
    Object.defineProperties((this: any), {
      _value: {
        value,
        writable: false,
        enumerable: false,
        configurable: false,
      },
      unit: {
        value: unit,
        writable: false,
        enumerable: false,
        configurable: false,
      },
    })
  }

  add(addend: UnitizedNumber<T>): UnitizedNumber<T> {
    return new UnitizedNumber(this._value + addend.get(this.unit), this.unit)
  }

  isFinite(): boolean {
    return Number.isFinite(this._value)
  }

  isNaN(): boolean {
    return isNaN(this._value)
  }

  get(unit: Unit<T>): number {
    if (unit === this.unit) {
      return this._value
    }
    return this.unit.convert(this._value, unit)
  }

  in(unit: Unit<T>): UnitizedNumber<T> {
    if (unit === this.unit) {
      return this
    }
    return new UnitizedNumber(this.get(unit), unit)
  }

  negate(): UnitizedNumber<T> {
    return new UnitizedNumber(-this._value, this.unit)
  }

  sub(addend: UnitizedNumber<T>): UnitizedNumber<T> {
    return new UnitizedNumber(this._value - addend.get(this.unit), this.unit)
  }

  mul(multiplicand: number): UnitizedNumber<T> {
    return new UnitizedNumber(this._value * multiplicand, this.unit)
  }

  isNegative(): boolean {
    return this._value < 0
  }

  isPositive(): boolean {
    return this._value > 0
  }

  isZero(): boolean {
    return this._value === 0
  }

  isNonzero(): boolean {
    return this._value !== 0
  }

  mod(modulus: UnitizedNumber<T>): UnitizedNumber<T> {
    const newValue = this._value % modulus.get(this.unit)
    return newValue === this._value
      ? this
      : new UnitizedNumber(newValue, this.unit)
  }

  abs(): UnitizedNumber<T> {
    return this._value < 0 ? this.negate() : this
  }

  divAwayUnit(denominator: UnitizedNumber<T>): number {
    return this._value / denominator.get(this.unit)
  }

  div(denominator: number): UnitizedNumber<T> {
    return new UnitizedNumber(this._value / denominator, this.unit)
  }

  compareTo(other: UnitizedNumber<T>): number {
    const otherValue = other.get(this.unit)
    return this._value > otherValue ? 1 : this._value < otherValue ? -1 : 0
  }

  toString(): string {
    return `${this._value} ${this.unit.toString()}`
  }
}

/* eslint-disable no-undef */

if (typeof process !== 'undefined' && process.platform !== 'browser') {
  ;(UnitizedNumber.prototype: any)[
    require('util').inspect.custom
  ] = function(): string {
    return this.toString()
  }
}
