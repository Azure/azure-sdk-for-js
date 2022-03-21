// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsAccess, TsLibrary } from "../codeGenerator";
import { TypeGenerator } from "./typeGenerator";

export class RootableTypeCollectionGenerator implements TypeGenerator {
  private readonly _rootableClasses: { [x: number]: string[] };
  constructor(rootableClasses: { [x: number]: string[] }) {
    this._rootableClasses = rootableClasses;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateType(parserLibrary: TsLibrary): void {
    this.generateCode(parserLibrary);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(parserLibrary: TsLibrary): void {
    const collectionClass = parserLibrary.class({ name: "RootableTypeCollection", exports: true });
    collectionClass.docString.line(
      "A collection of rootable DTDL types, which are the types permitted at the top level of a DTDL model."
    );

    collectionClass.field({
      name: "_typeKeyword",
      type: "string",
      isStatic: true,
      access: TsAccess.Private,
      value: `'@type'`
    });
    collectionClass.field({
      name: "_rootableTypeStrings",
      type: "{[dtdlVersion: number]: Set<string>}",
      isStatic: true,
      access: TsAccess.Private
    });
    collectionClass.field({
      name: "_rootableTypeDescriptions",
      type: "{[dtdlVersion: number]: string}",
      isStatic: true,
      access: TsAccess.Private
    });

    const constructor = collectionClass.staticCtor;

    constructor.body.line("this._rootableTypeStrings = {");
    for (const key of Object.keys(this._rootableClasses)) {
      constructor.body.line(`'${key}': new Set<string>(),`);
    }
    constructor.body.line("};");
    constructor.body.line("");

    for (const [key, value] of Object.entries(this._rootableClasses)) {
      for (const typeName of value) {
        constructor.body.line(`this._rootableTypeStrings[${key}].add("${typeName}")`);
      }
    }

    constructor.body.line("");
    constructor.body.line("this._rootableTypeDescriptions = {");
    for (const key of Object.keys(this._rootableClasses)) {
      constructor.body.line(
        `'${key}': Array.from(this._rootableTypeStrings[${key}].values()).map((s) => \`'\${s}'\`).join(' or '),`
      );
    }
    constructor.body.line("};");
    collectionClass.inline("./src/parserPartial/rootableTypeCollection.ts", "methods");
  }
}
