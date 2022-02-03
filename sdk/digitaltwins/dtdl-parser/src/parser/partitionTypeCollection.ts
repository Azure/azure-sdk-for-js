// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

const TYPE_KEYWORD = "@type";
/**
 * A collection of JSON partitions of a DTDL model.
 **/
export class PartitionTypeCollection {
  private static _partitionTypeStrings: Set<string>;
  private static _partitionTypeDescription: string;

  static initialize() {
    this._partitionTypeStrings = new Set<string>();
    this._partitionTypeStrings.add("Interface");
    Array.from(this._partitionTypeStrings.values())
      .map((s) => `'${s}'`)
      .join(" or ");
  }

  // codegen-outline-begin methods
  public static get partitionTypeDescription() {
    return this._partitionTypeDescription;
  }

  public static hasPartitionType(obj: { [prop: string]: any }): boolean {
    if (!Object.prototype.hasOwnProperty.call(obj, TYPE_KEYWORD)) {
      return false;
    }

    const typeToken = obj[TYPE_KEYWORD];

    if (typeof typeToken === "string") {
      return this._partitionTypeStrings.has(typeToken);
    }

    if (Array.isArray(typeToken)) {
      for (const subToken of typeToken) {
        if (typeof subToken !== "string") {
          return false;
        }

        if (this._partitionTypeStrings.has(subToken)) {
          return true;
        }
      }

      return false;
    }

    return false;
  }
  // codegen-outline-end
}

PartitionTypeCollection.initialize();
