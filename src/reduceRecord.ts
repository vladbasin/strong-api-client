import { MaybeNullable } from '@vladbasin/ts-types';
import { isNil } from 'lodash';

export const reduceRecord = <TValue, TAccum>(
    record: MaybeNullable<Record<string, MaybeNullable<TValue>>>,
    factory: (accum: TAccum, key: string, value: TValue) => TAccum,
    accum: TAccum
) => {
    return isNil(record)
        ? accum
        : Object.entries(record).reduce((prev, current) => {
              const key = current[0];
              const value = current[1];

              return isNil(value) ? prev : factory(prev, key, value);
          }, accum);
};
