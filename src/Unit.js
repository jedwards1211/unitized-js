// @flow

import UnitizedNumber from './UnitizedNumber'

export interface Unit<T: UnitType> {
  +type: T;
  +id: string;
  +convert: (value: number, to: Unit<T>) => number;
  +of: (value: number) => UnitizedNumber<T>;
}

export interface UnitType {}
