// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-vars */

import { TsClass, TsDeclarationType, TsInterface, TsLibrary } from "../codeGenerator";
import { NameFormatter } from "./nameFormatter";
import { TypeGenerator } from "./typeGenerator";

export class SupplementalTypeInfoGenerator implements TypeGenerator {
  private readonly _baseEnumName?: string;

  /**
   * Initializes a new instance of the SupplementalTypeInfoGenerator class.
   * @param baseName - The base name for the parser's object model.
   */
  constructor(baseName: string) {
    this._baseEnumName = NameFormatter.formatNameForEnumDisjunction(baseName);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateType(parserLibrary: TsLibrary): void {
    this.generateCode(parserLibrary);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(parserLibrary: TsLibrary): void {
    const infoInterface: TsInterface = parserLibrary.interface({
      name: "SupplementalTypeInfo",
      exports: true
    });
    infoInterface.import(`import {SupplementalPropertyInfo} from './internal'`);
    infoInterface.docString.line(
      "Interface that provides information about a type is not materialized as a material class."
    );
    infoInterface.field({ name: "contextId", type: "string" });
    infoInterface.field({ name: "type", type: "string" });
    infoInterface.field({ name: "isAbstract", type: "boolean" });
    infoInterface.field({ name: "parentType?", type: "string" });
    infoInterface.field({ name: "properties?", type: "{[x:string]: SupplementalPropertyInfo}" });
    infoInterface.field({ name: "parentSupplementalType?", type: "SupplementalTypeInfo" });

    const infoClass: TsClass = parserLibrary.class({
      name: "SupplementalTypeInfoImpl",
      exports: true,
      inheritance: [{ name: "SupplementalTypeInfo", type: TsDeclarationType.Interface }]
    });
    infoClass.import(`import {PropertyConstraint} from '../parser';`);
    infoClass.import(
      `import {SupplementalPropertyInfoImpl, SupplementalTypeInfo} from './internal'`
    );
    infoClass.import(`import {ElementPropertyConstraint} from '../parser'`);
    infoClass.import(`import {InDTMI} from '../parser'`);
    infoClass.import(`import {ParsingError, createParsingError} from '../parser';`);
    infoClass.import(`import {PropertyInstanceBinder} from '../parser'`);
    infoClass.import(`import {PropertyValueConstrainer} from '../parser'`);
    infoClass.import(`import {ValueConstraint} from '../parser'`);
    infoClass.import(`import {ValueParser} from '../parser'`);
    infoClass.import(`import {AggregateContext} from './internal'`);
    infoClass.import(`import {ParsedObjectPropertyInfo} from './internal'`);
    infoClass.import(`import {${this._baseEnumName}} from './internal';`);
    infoClass.import(`import {Model} from './internal';`);
    infoClass.import(`import {ExtensionKind} from './internal';`);
    infoClass.import('import {URL} from "url";');

    infoClass.docString.line(
      "Class that provides information about a type is not materialized as a TS class."
    );

    infoClass.field({
      name: "allowedCotypeKinds",
      type: `${this._baseEnumName}[]`,
      readonly: true
    });
    infoClass.field({ name: "extensionKind", type: "ExtensionKind", readonly: true });
    infoClass.inline("./src/parserPartial/supplementalTypeInfoImpl.ts", "fields");
    infoClass.ctor
      .parameter({ name: "extensionKind", type: "ExtensionKind" })
      .parameter({ name: "contextId", type: "string" })
      .parameter({ name: "type", type: "string" })
      .parameter({ name: "isAbstract", type: "boolean" })
      .parameter({ name: "parentType", type: "string", optional: true });

    infoClass.ctor.body
      .line("this.extensionKind = extensionKind;")
      .line("this.allowedCotypeKinds = [];")
      .inline("./src/parserPartial/supplementalTypeInfoImpl.ts", "constructor");

    const addCotypeMethod = infoClass
      .method({
        name: "addCotype",
        returnType: "void"
      })
      .parameter({ name: "cotypeKind", type: `${this._baseEnumName}` });
    addCotypeMethod.body.line(`this.allowedCotypeKinds.push(cotypeKind);`);

    infoClass.inline("./src/parserPartial/supplementalTypeInfoImpl.ts", "block1");
  }
}
