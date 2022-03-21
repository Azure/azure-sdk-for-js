// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export class RootableTypeCollection {
  private static _typeKeyword: string = "@type";
  private static _rootableTypeStrings: { [dtdlVersion: number]: Set<string> };
  private static _rootableTypeDescriptions: { [dtdlVersion: number]: string };

  /* TODO everything below here to the next comment block should be codegenned. */

  static initialize(): void {
    this._rootableTypeStrings = {
      "2": new Set<string>(),
      "3": new Set<string>()
    };

    this._rootableTypeStrings[2].add("Interface");

    this._rootableTypeStrings[3].add("Interface");

    this._rootableTypeDescriptions = {
      "2": Array.from(this._rootableTypeStrings[2].values())
        .map((s) => `'${s}'`)
        .join(" or "),
      "3": Array.from(this._rootableTypeStrings[3].values())
        .map((s) => `'${s}'`)
        .join(" or ")
    };
  }

  /* TODO everything above here from the previous comment block should be codegenned. */

  // codegen-outline-begin methods
  public static get rootableTypeDescriptions(): { [dtdlVersion: number]: string } {
    return this._rootableTypeDescriptions;
  }

  public static hasRootableType(obj: { [prop: string]: any }, dtdlVersion: number): boolean {
    if (!Object.prototype.hasOwnProperty.call(obj, RootableTypeCollection._typeKeyword)) {
      return false;
    }

    if (!Object.prototype.hasOwnProperty.call(this._rootableTypeStrings, dtdlVersion)) {
      return false;
    }

    const typeToken = obj[RootableTypeCollection._typeKeyword];

    if (typeof typeToken === "string") {
      return this._rootableTypeStrings[dtdlVersion].has(typeToken);
    }

    if (Array.isArray(typeToken)) {
      for (const subToken of typeToken) {
        if (typeof subToken !== "string") {
          return false;
        }

        if (this._rootableTypeStrings[dtdlVersion].has(subToken)) {
          return true;
        }
      }

      return false;
    }

    return false;
  }
  // codegen-outline-end
}

// TODO the next line should be codegenned:
RootableTypeCollection.initialize();
