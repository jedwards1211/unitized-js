// @flow

import { type Unit, type UnitType, assertSameType } from './Unit'
import UnitizedNumber from './UnitizedNumber'

export class LengthUnit implements Unit<Length> {
  +id: string
  +type: Length
  +fromMeters: number
  +toMeters: number
  +toInches: ?number
  +fromInches: ?number

  constructor(
    id: string,
    type: Length,
    fromMeters: number,
    toMeters: number,
    toInches?: number,
    fromInches?: number
  ) {
    this.id = id
    this.type = type
    this.fromMeters = fromMeters
    this.toMeters = toMeters
    this.fromInches = fromInches
    this.toInches = toInches
  }

  convert(value: number, to: Unit<Length>): number {
    assertSameType(this, to)
    if (to === this) return value
    if (this.toInches && (to: any).fromInches) {
      return value * this.toInches * (to: any).fromInches
    }
    return value * this.toMeters * (to: any).fromMeters
  }

  of(value: number): UnitizedNumber<Length> {
    return new UnitizedNumber(value, this)
  }

  toString(): string {
    return this.id
  }
}

export default class Length implements UnitType {
  static type: Length = new Length()
  static feet: LengthUnit = new LengthUnit(
    'ft',
    Length.type,
    1 / 0.3048,
    0.3048,
    12,
    1 / 12
  )
  static inches: LengthUnit = new LengthUnit(
    'in',
    Length.type,
    12 / 0.3048,
    0.3048 / 12,
    1,
    1
  )
  static yards: LengthUnit = new LengthUnit(
    'yd',
    Length.type,
    1 / (3 * 0.3048),
    3 * 0.3048,
    36,
    1 / 36
  )
  static miles: LengthUnit = new LengthUnit(
    'mi',
    Length.type,
    1 / (5280 * 0.3048),
    5280 * 0.3048,
    5280 * 12,
    1 / (5280 * 12)
  )
  static meters: LengthUnit = new LengthUnit('m', Length.type, 1, 1)
  static centimeters: LengthUnit = new LengthUnit('cm', Length.type, 100, 0.01)
  static kilometers: LengthUnit = new LengthUnit('km', Length.type, 0.001, 1000)

  static metricUnits: Set<LengthUnit> = new Set([
    Length.meters,
    Length.centimeters,
    Length.kilometers,
  ])

  static imperialUnits: Set<LengthUnit> = new Set([
    Length.feet,
    Length.inches,
    Length.yards,
    Length.miles,
  ])

  static units: Set<LengthUnit> = new Set([
    ...Length.metricUnits,
    ...Length.imperialUnits,
  ])

  static unitsById: Map<string, LengthUnit> = new Map(
    [...Length.units].map(unit => [unit.id, unit])
  )
}
