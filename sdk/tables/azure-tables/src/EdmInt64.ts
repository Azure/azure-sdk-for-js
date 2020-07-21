// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A class that allows you to represent a 64-bit signed integer as a string.
 */
export class EdmInt64 {
  private _value: string = "";

  constructor(integer: string) {
    this.value = integer;
  }

  /**
   * Returns the value of the integer
   */
  get value(): string {
    return this._value;
  }

  set value(integer: string) {
    this._value = integer;
  }
}
