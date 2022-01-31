// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ParsingError } from "./internal";

// To be thowable this needs to extend error
export class ParsingException extends Error {
  private _parsingErrors: ParsingError[];

  constructor(parsingErrors: ParsingError[]) {
    super(
      "Parsing exception -- " +
        parsingErrors.length +
        "errors in model -- see errors property for details on each."
    );
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, ParsingException.prototype);
    this.name = "ParsingException";
    this._parsingErrors = parsingErrors;
  }

  get errors() {
    return this._parsingErrors;
  }
}
