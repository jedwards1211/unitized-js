// @flow

import { type Unit, type UnitType } from './Unit'
import Length, { LengthUnit } from './Length'
import UnitizedNumber from './UnitizedNumber'

class AreaUnit implements Unit<Area> {
  +id: string
  +type: Area
  +sideUnit: Unit<Length>
  +fromBase: number
  +toBase: number

  constructor(type: Area, sideUnit: LengthUnit) {
    this.id = 'sq ' + sideUnit.id
    this.type = type
    this.fromBase = sideUnit.fromMeters * sideUnit.fromMeters
    this.toBase = sideUnit.toMeters * sideUnit.toMeters
  }

  convert(value: number, to: Unit<Area>): number {
    return value * this.toBase * (to: any).fromBase
  }

  of(value: number): UnitizedNumber<Area> {
    return new UnitizedNumber(value, this)
  }

  toString(): string {
    return this.id
  }
}

export default class Area implements UnitType {
  static type: Area = new Area()
  static squareFeet: AreaUnit = new AreaUnit(Area.type, Length.feet)
  static squareInches: AreaUnit = new AreaUnit(Area.type, Length.inches)
  static squareYards: AreaUnit = new AreaUnit(Area.type, Length.yards)
  static squareMiles: AreaUnit = new AreaUnit(Area.type, Length.miles)
  static squareMeters: AreaUnit = new AreaUnit(Area.type, Length.meters)
  static squareCentimeters: AreaUnit = new AreaUnit(
    Area.type,
    Length.centimeters
  )
  static squareKilometers: AreaUnit = new AreaUnit(Area.type, Length.kilometers)
  static squares: Map<Unit<Length>, AreaUnit> = new Map([
    [Length.feet, Area.squareFeet],
    [Length.inches, Area.squareInches],
    [Length.yards, Area.squareYards],
    [Length.miles, Area.squareMiles],
    [Length.meters, Area.squareMeters],
    [Length.centimeters, Area.squareCentimeters],
    [Length.kilometers, Area.squareKilometers],
  ])

  static metricUnits: Set<AreaUnit> = new Set([
    Area.squareMeters,
    Area.squareCentimeters,
    Area.squareKilometers,
  ])

  static imperialUnits: Set<AreaUnit> = new Set([
    Area.squareFeet,
    Area.squareInches,
    Area.squareYards,
    Area.squareMiles,
  ])

  static units: Set<AreaUnit> = new Set([
    ...Area.metricUnits,
    ...Area.imperialUnits,
  ])

  static unitsById: Map<string, AreaUnit> = new Map(
    [...Area.units].map(unit => [unit.id, unit])
  )

  static mul(
    a: UnitizedNumber<Length>,
    b: UnitizedNumber<Length>
  ): UnitizedNumber<Area> {
    const unit = Area.squares.get(a.unit)
    if (!unit) throw new Error(`area unit not found`)
    return new UnitizedNumber(a.get(a.unit) * b.get(a.unit), unit)
  }

  static square(a: UnitizedNumber<Length>): UnitizedNumber<Area> {
    return Area.mul(a, a)
  }

  static sqrt(a: UnitizedNumber<Area>): UnitizedNumber<Length> {
    return new UnitizedNumber(Math.sqrt(a.get(a.unit)), (a.unit: any).sideUnit)
  }

  static div(
    a: UnitizedNumber<Area>,
    b: UnitizedNumber<Length>
  ): UnitizedNumber<Length> {
    const sideUnit = (a.unit: any).sideUnit
    return new UnitizedNumber(a.get(a.unit) / b.get(sideUnit), sideUnit)
  }
}
