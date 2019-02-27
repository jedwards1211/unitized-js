// @flow

import UnitizedNumber from './UnitizedNumber'

export interface Unit<T: UnitType> {
  +type: T;
  +id: string;
  +convert: (value: number, to: Unit<T>) => number;
  +of: (value: number) => UnitizedNumber<T>;
}

export interface UnitType {}

export function assertSameType(from: Unit<any>, to: Unit<any>) {
  if (from.type !== to.type) {
    throw new Error(`can't convert from ${from.toString()} to ${to.toString()}`)
  }
}
