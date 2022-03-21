/* eslint-disable */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

export class testClass {
  private _foo: number;

  constructor(foo: number) {
    this._foo = foo;
  }

  forMethod(input: any) {
    for (let i = input; i < this._foo; i++) {
      console.log(`outputting the value ${i}`);
    }

    console.log(`For loop has completed ${this._foo}`);
  }
}
