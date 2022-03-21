// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsLibrary } from "../codeGenerator";
import { TypeGenerator } from "./typeGenerator";

export class MaterialTypeNameCollectionGenerator implements TypeGenerator {
  private readonly _typeNames: string[];

  constructor(classNames: string[], contexts: { [x: string]: string }[]) {
    this._typeNames = [];

    for (const className of classNames) {
      this._typeNames.push(className);

      for (const termDefinitions of contexts) {
        if (termDefinitions[className]) {
          this._typeNames.push(termDefinitions[className]);
        }
      }
    }
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateType(parserLibrary: TsLibrary): void {
    this.generateCode(parserLibrary);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(parserLibrary: TsLibrary): void {
    const className = "MaterialTypeNameCollection";
    const collectionClass = parserLibrary.class({ name: `${className}`, exports: true });
    collectionClass.docString.line(`A collection of all material type names`);
    // TODO Needs a field declared globally outside the class.
    collectionClass.field({ name: "typeNames", type: "Set<string>", isStatic: true });

    const staticConstructor = collectionClass.staticCtor;
    staticConstructor.body.line(`${className}.typeNames = new Set<string>();`);
    for (const typeName of this._typeNames) {
      staticConstructor.body.line(`${className}.typeNames.add('${typeName}')`);
    }

    const isMaterialTypeMethod = collectionClass.method({
      name: "isMaterialType",
      returnType: "boolean",
      isStatic: true
    });
    isMaterialTypeMethod.parameter({ name: "typeString", type: "string" });
    isMaterialTypeMethod.body.line(`return MaterialTypeNameCollection.typeNames.has(typeString)`);
  }
}
