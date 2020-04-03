// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export class ClientMethodDependency {
  public history: string[];

  constructor() {
    this.history = ["constructor"];
  }

  A(): void {
    this.history.push("A");
  }

  AB(): void {
    if (this.history[this.history.length - 1] !== "A") {
      throw new Error("A should have been called");
    }
    this.history.push("AB");
  }
}
