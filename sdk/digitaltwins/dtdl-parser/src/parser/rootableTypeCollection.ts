// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

/**
 * A collection of rootable DTDL types, which are the types permitted at the top level of a DTDL model.
 **/
export class RootableTypeCollection {
  private static _typeKeyword: string = "@type";
  private static _rootableTypeStrings: { [dtdlVersion: number]: Set<string> };
  private static _rootableTypeDescriptions: { [dtdlVersion: number]: string };

  static initialize() {
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

  // codegen-outline-begin methods
  public static get rootableTypeDescriptions() {
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

RootableTypeCollection.initialize();
