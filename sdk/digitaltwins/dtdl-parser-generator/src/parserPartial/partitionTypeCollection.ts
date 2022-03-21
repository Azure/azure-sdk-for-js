// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// This is named differently in TS because here
// we aren't collecting the partitions, all it does
// is collect the partition types. Essentially the functionality
// is reduced because we don't need the full functionality of
// ModelPartitionCollection.cs

const TYPE_KEYWORD = "@type";

export class PartitionTypeCollection {
  private static _partitionTypeStrings: Set<string>;
  private static _partitionTypeDescription: string;

  /* TODO everything below here to the next comment block should be codegenned. */

  static initialize(): void {
    this._partitionTypeStrings = new Set<string>();

    this._partitionTypeStrings.add("Interface");

    this._partitionTypeDescription = Array.from(this._partitionTypeStrings.values())
      .map((s) => `'${s}'`)
      .join(" or ");
  }
  /* TODO everything above here from the previous comment block should be codegenned. */

  // codegen-outline-begin methods
  public static get partitionTypeDescription(): string {
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
// TODO the next line should be codegenned:
PartitionTypeCollection.initialize();
