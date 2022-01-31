// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// To be thowable this needs to extend error
export class JsonSyntaxError extends Error {
  private _innerError: Error;
  private _enumerationIndex: number;
  private _resolvingIdentifiers?: string[];

  constructor(error: Error, enumerationIndex: number, resolvingIdentifiers?: string[]) {
    super(
      "syntax or grammar error at enumeration index " +
        enumerationIndex +
        " while processing JSON text " +
        (resolvingIdentifiers === undefined
          ? "passed to parseAsync()"
          : "returned by DtmiResolver") +
        ": " +
        error.message
    );
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, JsonSyntaxError.prototype);
    this.name = "JsonSyntaxError";
    this._innerError = error;
    this._enumerationIndex = enumerationIndex;
    this._resolvingIdentifiers = resolvingIdentifiers;
  }

  get innerError(): Error {
    return this._innerError;
  }

  get enumerationIndex(): number {
    return this._enumerationIndex;
  }

  get resolvingIdentifiers(): string[] | undefined {
    return this._resolvingIdentifiers;
  }
}
