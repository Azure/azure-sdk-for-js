// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-vars */

// This is named differently in TS because here
// we aren't collecting the partitions, all it does
// is collect the partition types. Essentially the functionality
// is reduced because we don't need the full functionality of
// ModelPartitionCollection.cs
import { TsAccess, TsLibrary } from "../codeGenerator";
import { TypeGenerator } from "./typeGenerator";

export class PartitionTypeCollectionGenerator implements TypeGenerator {
  private readonly _partitionClasses: string[];
  constructor(partitionClasses: string[]) {
    this._partitionClasses = partitionClasses;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateType(parserLibrary: TsLibrary): void {
    this.generateCode(parserLibrary);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(parserLibrary: TsLibrary): void {
    const collectionClass = parserLibrary.class({ name: "PartitionTypeCollection", exports: true });
    collectionClass.docString.line("A collection of JSON partitions of a DTDL model.");
    collectionClass.prefixCode.line(`const TYPE_KEYWORD = '@type';`);
    collectionClass.field({
      name: "_partitionTypeStrings",
      type: "Set<string>",
      access: TsAccess.Private,
      isStatic: true
    });
    collectionClass.field({
      name: "_partitionTypeDescription",
      type: "string",
      access: TsAccess.Private,
      isStatic: true
    });
    const constructor = collectionClass.method({ name: "initialize", isStatic: true });
    constructor.body.line(`this._partitionTypeStrings = new Set<string>()`);

    for (const typeName of this._partitionClasses) {
      constructor.body.line(`this._partitionTypeStrings.add('${typeName}')`);
    }

    constructor.body.line(
      `Array.from(this._partitionTypeStrings.values()).map((s) => \`'\${s}'\`).join(' or ')`
    );

    collectionClass.inline("./src/parserPartial/partitionTypeCollection.ts", "methods");
    // TODO: Potentially replace this with a 'Static Constructor' option that initializes after class.
    collectionClass.suffixCode.line("PartitionTypeCollection.initialize();");
  }
}
