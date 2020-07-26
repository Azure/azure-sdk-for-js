// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isValidUuid } from "@azure/core-http";

/**
 * A class that allows you to represent a GUID/UUID as a string.
 */
export class EdmGuid {
  private _value: string = "";

  constructor(guid: string) {
    this.value = guid;
  }

  /**
   * Returns the value of the GUID
   */
  get value(): string {
    return this._value;
  }

  set value(guid: string) {
    if (isValidUuid(guid)) {
      this._value = guid;
    } else {
      throw new Error("Incorrect GUID format");
    }
  }
}
