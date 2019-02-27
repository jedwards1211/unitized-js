// @flow
import { type UnitType, type Unit, assertSameType } from './Unit'
import UnitizedNumber from './UnitizedNumber'

export class AngleUnit implements Unit<Angle> {
  +id: string
  +type: Angle
  +halfRange: number
  +range: UnitizedNumber<Angle>

  constructor(id: string, type: Angle, halfRange: number) {
    this.id = id
    this.type = type
    this.halfRange = halfRange
    this.range = new UnitizedNumber(halfRange * 2, this)
  }

  convert(value: number, to: Unit<Angle>): number {
    assertSameType(this, to)
    if (to === this) return value
    if ((to: any).constructor === this.constructor) {
      return (value * (to: any).halfRange) / this.halfRange
    }
    return (to: any).fromRadians(this.toRadians(value))
  }

  of(value: number): UnitizedNumber<Angle> {
    return new UnitizedNumber(value, this)
  }

  toRadians(value: number): number {
    return (value * Math.PI) / this.halfRange
  }

  fromRadians(value: number): number {
    return (value * this.halfRange) / Math.PI
  }

  toString(): string {
    return this.id
  }
}

export class PercentGradeUnit extends AngleUnit {
  toRadians(value: number): number {
    return Math.atan(value / 100)
  }
  fromRadians(value: number): number {
    return Math.tan(value) * 100
  }
}

export default class Angle implements UnitType {
  static type: Angle = new Angle()

  static degrees: AngleUnit = new AngleUnit('deg', Angle.type, 180)
  static radians: AngleUnit = new AngleUnit('rad', Angle.type, Math.PI)
  static gradians: AngleUnit = new AngleUnit('grad', Angle.type, 200)
  static mils: AngleUnit = new AngleUnit('mil', Angle.type, 3200)
  static percentGrade: AngleUnit = new PercentGradeUnit('%', Angle.type, NaN)

  static sin(angle: UnitizedNumber<Angle>): number {
    return Math.sin(angle.get(Angle.radians))
  }
  static cos(angle: UnitizedNumber<Angle>): number {
    return Math.cos(angle.get(Angle.radians))
  }
  static tan(angle: UnitizedNumber<Angle>): number {
    return Math.tan(angle.get(Angle.radians))
  }
  static asin(value: number): UnitizedNumber<Angle> {
    return new UnitizedNumber(Math.asin(value), Angle.radians)
  }
  static acos(value: number): UnitizedNumber<Angle> {
    return new UnitizedNumber(Math.acos(value), Angle.radians)
  }
  static atan(value: number): UnitizedNumber<Angle> {
    return new UnitizedNumber(Math.atan(value), Angle.radians)
  }
  static atan2(y: number, x: number): UnitizedNumber<Angle> {
    return new UnitizedNumber(Math.atan2(y, x), Angle.radians)
  }
  static atan2Unitized<T: UnitType>(
    y: UnitizedNumber<T>,
    x: UnitizedNumber<T>
  ): UnitizedNumber<Angle> {
    return new UnitizedNumber(
      Math.atan2(y.get(y.unit), x.get(y.unit)),
      Angle.radians
    )
  }

  static normalize(a: UnitizedNumber<Angle>): UnitizedNumber<Angle> {
    const { range } = ((a.unit: any): AngleUnit)
    return a.isNegative() ? a.mod(range).add(range) : a.mod(range)
  }

  static opposite(a: UnitizedNumber<Angle>): UnitizedNumber<Angle> {
    const { halfRange } = ((a.unit: any): AngleUnit)
    return Angle.normalize(
      new UnitizedNumber(a.get(a.unit) + halfRange, a.unit)
    )
  }
}
