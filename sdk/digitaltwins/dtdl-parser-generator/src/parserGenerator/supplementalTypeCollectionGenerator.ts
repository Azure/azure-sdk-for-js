// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NameFormatter } from "./nameFormatter";
import { ParserGeneratorValues } from "./parserGeneratorValues";
import { SupplementalType } from "./supplementalType";
import { SupplementalTypeDigest } from "./metamodelDigest";
import { SupplementalTypeExtension } from "./supplementalTypeExtension";
import { TsLibrary } from "../codeGenerator";
import { TypeGenerator } from "./typeGenerator";

export class SupplementalTypeCollectionGenerator implements TypeGenerator {
  private _supplementalTypes: SupplementalType[];
  private _contextIdVariables: { [x: string]: string };
  private readonly _baseKindEnum: string;

  constructor(
    supplementalTypes: { [x: string]: SupplementalTypeDigest },
    contexts: { [x: string]: { [x: string]: string } },
    extensibleMaterialClasses: { [x: number]: string[] },
    baseName: string
  ) {
    this._supplementalTypes = [];
    this._baseKindEnum = NameFormatter.formatNameAsEnum(baseName);

    for (const [key, value] of Object.entries(extensibleMaterialClasses)) {
      const dtdlContext: { [x: string]: string } =
        contexts[ParserGeneratorValues.getDtdlContextIdString(Number(key))];
      for (const extensibleMaterialClass of value) {
        this._supplementalTypes.push(new SupplementalType(dtdlContext[extensibleMaterialClass]));
      }
    }

    for (const [key, value] of Object.entries(supplementalTypes)) {
      this._supplementalTypes.push(new SupplementalTypeExtension(key, value, this._baseKindEnum));
    }

    this._contextIdVariables = {};
    for (const key of Object.keys(contexts)) {
      this._contextIdVariables[key] = SupplementalTypeCollectionGenerator.getContextIdVariableName(
        key
      );
    }
  }

  private static getContextIdVariableName(contextId: string): string {
    const versionStart = contextId.indexOf(";") + 1;
    const pathStart = contextId.indexOf(":") + 1;
    const pathLength = versionStart - pathStart - 1;
    // TODO: Validate that the translation lines up with the C# code.
    // string rootName = string.Concat(contextId.Substring(pathStart, pathLength).Split(new char[] { ':' }).Where(s => s !== 'context').Select((s, i) => i === 0 ? s : char.ToUpperInvariant(s[0]) + s.Substring(1)));
    const rootName: string = contextId
      .substr(pathStart, pathLength)
      .split(":")
      .filter((value) => value !== "context")
      .map((value, idx) => (idx === 0 ? value : value[0].toUpperCase() + value.substr(1)))
      .join("");
    const suffix: string = contextId.substr(versionStart).replace(".", "_");
    return `${rootName}ContextIdV${suffix}`;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateType(parserLibrary: TsLibrary): void {
    this.generateCode(parserLibrary);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(parserLibrary: TsLibrary): void {
    const collectionInterface = parserLibrary.interface({
      name: "SupplementalTypeCollection",
      exports: true
    });
    collectionInterface.field({
      name: "supplementalTypes",
      type: "Map<string, SupplementalTypeInfo>"
    });
    collectionInterface.import(`import {SupplementalTypeInfo} from './internal';`);

    const collectionClass = parserLibrary.class({
      name: "SupplementalTypeCollectionImpl",
      exports: true
    });
    collectionClass.docString.line(
      "A collection of DTDL types that are not materialized as TS Classes"
    );
    collectionClass.import(
      `import {SupplementalTypeInfo, SupplementalTypeInfoImpl, SupplementalTypeCollection} from './internal';`
    );
    collectionClass.import(`import {ExtensionKind} from './internal';`);
    collectionClass.import(`import {InDTMI} from '../parser';`);
    collectionClass.import(`import {ValueConstraint} from '../parser';`);

    collectionClass.inline("./src/parserPartial/supplementalTypeCollectionImpl.ts", "methods");

    collectionClass.field({
      name: "supplementalTypes",
      type: `Map<${ParserGeneratorValues.ObverseTypeString}, SupplementalTypeInfo>`
    });

    const constructor = collectionClass.ctor;

    constructor.body.line(
      `this.supplementalTypes = new Map<${ParserGeneratorValues.ObverseTypeString}, SupplementalTypeInfo>();`
    );

    constructor.body.line("");

    for (const [key, value] of Object.entries(this._contextIdVariables)) {
      constructor.body.line(
        `const ${value}: ${ParserGeneratorValues.IdentifierType} = new ${ParserGeneratorValues.IdentifierType}('${key}');`
      );
    }

    constructor.body.line("");

    for (const supplementalType of this._supplementalTypes) {
      supplementalType.defineIdVariable(constructor.body);
    }

    for (const supplementalType of this._supplementalTypes) {
      constructor.body.line("");
      supplementalType.defineInfoVariable(constructor.body, this._contextIdVariables);
    }

    constructor.body.line("");
    for (const supplementalType of this._supplementalTypes) {
      supplementalType.assignInfoVariable(constructor.body, "this.supplementalTypes");
    }

    constructor.body.line("");
    constructor.body.line("this.connectPropertySetters();");
  }
}
