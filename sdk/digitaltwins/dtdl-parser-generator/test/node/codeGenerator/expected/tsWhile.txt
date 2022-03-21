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

  whileMethod(_input: any) {
    while (this._foo < 5) {
      this._foo++;
    }

    console.log(this._foo);
  }
}
