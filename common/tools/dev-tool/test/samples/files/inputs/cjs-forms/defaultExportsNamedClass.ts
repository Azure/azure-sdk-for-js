// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export default class Base {
  constructor(public message: string) {}

  say(): void {
    console.log(this.message);
  }
}
