// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StringRestriction } from "./metamodelDigest";
import { TsLibrary } from "../codeGenerator";
import { TypeGenerator } from "./typeGenerator";

export class IdValidatorGenerator implements TypeGenerator {
  private readonly _identifierDefinitionRestrictions: { [x: number]: StringRestriction };
  private readonly _identifierReferenceRestrictions: { [x: number]: StringRestriction };

  constructor(
    identifierDefinitionRestrictions: { [x: number]: StringRestriction },
    identifierReferenceRestrictions: { [x: number]: StringRestriction }
  ) {
    this._identifierDefinitionRestrictions = identifierDefinitionRestrictions;
    this._identifierReferenceRestrictions = identifierReferenceRestrictions;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateType(parserLibrary: TsLibrary): void {
    this.generateCode(parserLibrary);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(parserLibrary: TsLibrary): void {
    const restrictionsClass = parserLibrary.class({ name: "IdValidator", exports: true });
    restrictionsClass.docString.line(
      `A static class for determining whether a string is a valid identifier.`
    );
    restrictionsClass.import(
      `import {InDTMI, ParsingError, createParsingError, ParsingException} from '../parser';`
    );
    restrictionsClass.inline("./src/parserPartial/idValidator.ts", "constants");

    const staticConstructor = restrictionsClass.staticCtor;

    restrictionsClass.field({
      name: "idDefinitionMaxLengths",
      isStatic: true,
      type: "Map<Number, Number>",
      value: "new Map()"
    });
    restrictionsClass.field({
      name: "idDefinitionRegexPatterns",
      isStatic: true,
      type: "Map<Number, RegExp>",
      value: "new Map()"
    });
    restrictionsClass.field({
      name: "idReferenceMaxLengths",
      isStatic: true,
      type: "Map<Number, Number>",
      value: "new Map()"
    });
    restrictionsClass.field({
      name: "idReferenceRegexPatterns",
      isStatic: true,
      type: "Map<Number, RegExp>",
      value: "new Map()"
    });

    for (const [key, value] of Object.entries(this._identifierDefinitionRestrictions)) {
      if (value.maxLength !== undefined) {
        staticConstructor.body.line(
          `IdValidator.idDefinitionMaxLengths.set(${key}, ${value.maxLength});`
        );
      }

      if (value.pattern !== undefined) {
        staticConstructor.body.line(
          `IdValidator.idDefinitionRegexPatterns.set(${key},/${value.pattern}/);`
        );
      }
    }

    staticConstructor.body.line(``);

    for (const [key, value] of Object.entries(this._identifierReferenceRestrictions)) {
      if (value.maxLength !== undefined) {
        staticConstructor.body.line(
          `IdValidator.idReferenceMaxLengths.set(${key}, ${value.maxLength});`
        );
      }

      if (value.pattern !== undefined) {
        staticConstructor.body.line(
          `IdValidator.idReferenceRegexPatterns.set(${key}, /${value.pattern}/);`
        );
      }
    }

    restrictionsClass.inline("./src/parserPartial/idValidator.ts", "methods");
  }
}
