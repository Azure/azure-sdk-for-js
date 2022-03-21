/* eslint-disable */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

export class testClassWithConstructor {
  stringField: string;
  protected boolField: boolean;
  private readonly _numberField: number;

  constructor(stringParameter: string, numberParameter: number) {
    this.stringField = stringParameter;
    this._numberField = numberParameter;
    this.boolField = false;
  }
}
