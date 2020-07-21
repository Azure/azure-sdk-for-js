// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A class that allows you to represent a GUID/UUID as a string.
 */
export class EdmGuid {
  private _value: string = "";

  constructor(guid: string) {
    this.value = guid;
  }

  private validate(guid: string): boolean {
    const re = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    return re.test(guid);
  }

  /**
   * Returns the value of the GUID
   */
  get value(): string {
    return this._value;
  }

  set value(guid: string) {
    if (this.validate(guid)) {
      this._value = guid;
    } else {
      throw new Error("Incorrect GUID format");
    }
  }
}
