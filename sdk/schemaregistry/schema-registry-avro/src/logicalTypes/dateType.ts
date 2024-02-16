// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as avro from "avsc";

/**
 * Custom logical type used to encode native Date objects as longs.
 *
 * It also supports reading dates serialized as strings (by creating an
 * appropriate resolver).
 *
 */
export class DateType extends avro.types.LogicalType {
  _fromValue(val: string): Date {
    const date = new Date(val);
    if (isNaN(+date)) {
      throw new Error(`Invalid date: ${val} ms`);
    }
    return date;
  }

  _toValue(date: unknown): number | undefined {
    return date instanceof Date ? +date : undefined;
  }
  _resolve(type: unknown): ((val: string) => Date) | undefined {
    return avro.Type.isType(type, "long", "string", "logical:timestamp-millis")
      ? this._fromValue
      : undefined;
  }
}
