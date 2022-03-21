// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */

import { TsClass, TsLibrary } from "../codeGenerator";
import { NameFormatter } from "./nameFormatter";
import { ParserGeneratorValues } from "./parserGeneratorValues";
import { TypeGenerator } from "./typeGenerator";

export class StandardElementsGenerator implements TypeGenerator {
  private readonly _baseClassName: string;
  private readonly _digestElements: any[];

  constructor(baseName: string, digestElements: any[]) {
    this._baseClassName = NameFormatter.formatNameAsInterface(baseName);
    this._digestElements = digestElements;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateType(parserLibrary: TsLibrary): void {
    this.generateCode(parserLibrary);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(parserLibrary: TsLibrary): void {
    const standardElementsClass = parserLibrary.class({ name: "StandardElements", exports: true });
    standardElementsClass.import(
      `import {ParsedObjectPropertyInfo, Model, ModelParserImpl, AggregateContext} from './internal';`
    );
    standardElementsClass.import(
      `import {InDTMI, ParsingError, ParsingException} from '../parser/internal';`
    );
    standardElementsClass.prefixCode.line("type EntityInfo = any;");
    standardElementsClass.docString.line(
      "A collection of values of standard elements from the DTDL metamodel."
    );
    standardElementsClass.inline("./src/parserPartial/standardElements.ts", "fields");
    this._generateGetElementMethod(standardElementsClass);
    this._generateGetDigestElementsMethod(standardElementsClass);
    standardElementsClass.inline("./src/parserPartial/standardElements.ts", "methods");
    standardElementsClass.suffixCode.line("StandardElements.initialize();");
  }

  private _generateGetElementMethod(standardElementsClass: TsClass): void {
    const method = standardElementsClass.method({
      name: "getElement",
      returnType: this._baseClassName,
      isStatic: true
    });
    method.parameter({ name: "elementId", type: ParserGeneratorValues.IdentifierType });
    method.body.line(`return this._standardModel.dict[elementId.value];`);
  }

  private _generateGetDigestElementsMethod(standardElementsClass: TsClass): void {
    const method = standardElementsClass.method({
      name: "getDigestElements",
      returnType: "any",
      isStatic: true
    });
    const digests = method.body.multiLine("return [");
    for (const digestElement of this._digestElements) {
      digests.line(JSON.stringify(digestElement));
      digests.line(",");
    }
    digests.line("];");
  }
}
