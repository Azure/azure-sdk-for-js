// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-vars */

import { TsClass, TsDeclarationType, TsInterface, TsLibrary } from "../codeGenerator";
import { TypeGenerator } from "./typeGenerator";

export class SupplementalPropertyInfoGenerator implements TypeGenerator {
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateType(parserLibrary: TsLibrary): void {
    this.generateCode(parserLibrary);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(parserLibrary: TsLibrary): void {
    const infoInterface: TsInterface = parserLibrary.interface({
      name: "SupplementalPropertyInfo",
      exports: true
    });
    infoInterface.import(`import {ValueConstraint} from '../parser';`);
    infoInterface.docString.line(
      "Interface that provides information about a property that can be applied to a DTDL element that has a supplemental type."
    );
    infoInterface.field({ name: "type", type: "string" });
    infoInterface.field({ name: "isPlural", type: "boolean" });
    infoInterface.field({ name: "isOptional", type: "boolean" });
    infoInterface.field({ name: "minCount?", type: "number" });
    infoInterface.field({ name: "maxCount?", type: "number" });
    infoInterface.field({ name: "dictionaryKey?", type: "string" });
    infoInterface.field({ name: "instanceProperty?", type: "string" });
    infoInterface.field({ name: "valueConstraint?", type: "ValueConstraint" });

    const infoClass: TsClass = parserLibrary.class({
      name: "SupplementalPropertyInfoImpl",
      exports: true,
      inheritance: [{ name: "SupplementalPropertyInfo", type: TsDeclarationType.Interface }]
    });
    infoClass.import(`import {SupplementalPropertyInfo} from './internal';`);
    infoClass.import(`import {ValueConstraint} from '../parser'`);
    infoClass.import(`import {AggregateContext} from './internal'`);

    infoClass.docString.line(
      "Class that provides information about a property that can be applied to a DTDL element that has a supplemental type."
    );

    infoClass.inline("./src/parserPartial/supplementalPropertyInfoImpl.ts", "fields");
    infoClass.ctor
      .parameter({ name: "type", type: "string" })
      .parameter({ name: "isPlural", type: "boolean" })
      .parameter({ name: "isOptional", type: "boolean" })
      .parameter({ name: "minCount", type: "number", optional: true })
      .parameter({ name: "maxCount", type: "number", optional: true })
      .parameter({ name: "dictionaryKey", type: "string", optional: true })
      .parameter({ name: "instanceProperty", type: "string", optional: true })
      .parameter({ name: "valueConstraint", type: "ValueConstraint", optional: true });
    infoClass.ctor.body.inline(
      "./src/parserPartial/supplementalPropertyInfoImpl.ts",
      "constructor"
    );
  }
}
