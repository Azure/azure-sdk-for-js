// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// To be thowable this needs to extend error
export class ResolutionError extends Error {
  private _undefinedIdentifiers: string[];

  constructor(message: string, undefinedIdentifiers: string[]) {
    super(message);
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, ResolutionError.prototype);
    this.name = "ResolutionError";
    this._undefinedIdentifiers = undefinedIdentifiers;
  }

  get undefinedIdentifiers(): string[] {
    return this._undefinedIdentifiers;
  }
}
