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
   * Checks if the integer is a valid 64 bit integer
   */
  public isSafeInteger(): boolean {
    const numericValue = Number(this.value);
    return Number.isSafeInteger(numericValue);
  }

  /**
   * Returns the value of the integer
   */
  get value(): string {
    return this._value;
  }

  set value(integer: string) {
    if (Number.isInteger(Number(this._value))) {
      this._value = Number(integer).toString();
    } else {
      throw new Error("Not a valid 64-bit integer");
    }
  }
}
