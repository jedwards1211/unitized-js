// @flow

import { type UnitType, type Unit } from './Unit'

export default class UnitizedNumber<T: UnitType> {
  +value: number
  +unit: Unit<T>

  constructor(value: number, unit: Unit<T>) {
    this.value = value
    this.unit = unit
  }

  add(addend: UnitizedNumber<T>): UnitizedNumber<T> {
    return new UnitizedNumber(this.value + addend.get(this.unit), this.unit)
  }

  isFinite(): boolean {
    return Number.isFinite(this.value)
  }

  isNaN(): boolean {
    return isNaN(this.value)
  }

  get(unit: Unit<T>): number {
    if (unit === this.unit) {
      return this.value
    }
    return this.unit.convert(this.value, unit)
  }

  in(unit: Unit<T>): UnitizedNumber<T> {
    if (unit === this.unit) {
      return this
    }
    return new UnitizedNumber(this.get(unit), unit)
  }

  negate(): UnitizedNumber<T> {
    return new UnitizedNumber(-this.value, this.unit)
  }

  sub(addend: UnitizedNumber<T>): UnitizedNumber<T> {
    return new UnitizedNumber(this.value - addend.get(this.unit), this.unit)
  }

  mul(multiplicand: number): UnitizedNumber<T> {
    return new UnitizedNumber(this.value * multiplicand, this.unit)
  }

  isNegative(): boolean {
    return this.value < 0
  }

  isPositive(): boolean {
    return this.value > 0
  }

  isZero(): boolean {
    return this.value == 0
  }

  isNonzero(): boolean {
    return this.value != 0
  }

  mod(modulus: UnitizedNumber<T>): UnitizedNumber<T> {
    const newValue = this.value % modulus.get(this.unit)
    return newValue === this.value
      ? this
      : new UnitizedNumber(newValue, this.unit)
  }

  abs(): UnitizedNumber<T> {
    return this.value < 0 ? this.negate() : this
  }

  divAwayUnit(denominator: UnitizedNumber<T>): number {
    return this.value / denominator.get(this.unit)
  }

  div(denominator: number): UnitizedNumber<T> {
    return new UnitizedNumber(this.value / denominator, this.unit)
  }

  compareTo(other: UnitizedNumber<T>): number {
    const otherValue = other.get(this.unit)
    return this.value > otherValue ? 1 : this.value < otherValue ? -1 : 0
  }

  toString(): string {
    return `${this.value} ${this.unit.toString()}`
  }
}
