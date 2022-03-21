// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsScope } from "../../codeGenerator";
import { ParserGeneratorValues } from "../parserGeneratorValues";
import { MaterialProperty } from "./materialProperty";
import { PropertyKind } from "./propertyKind";

export abstract class LiteralProperty extends MaterialProperty {
  public get propertyKind(): PropertyKind {
    return PropertyKind.Literal;
  }

  public isParseable(dtdlVersion: number): boolean {
    return (
      Object.prototype.hasOwnProperty.call(this.propertyDigest, dtdlVersion) &&
      this.propertyDigest[dtdlVersion].allowed
    );
  }

  public hasCountRestriction(_dtdlVersion: number): boolean {
    return false;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public initMissingPropertyVariable(dtdlVersion: number, scope: TsScope): void {
    if (
      !this.optional &&
      Object.prototype.hasOwnProperty.call(this.propertyDigest, dtdlVersion) &&
      this.propertyDigest[dtdlVersion].allowed
    ) {
      scope.line(`let ${this.missingPropertyVariable} = true;`);
    }
  }

  public addCaseToTrySetObjectPropertySwitch(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    _switchScope: TsScope,
    _valueVar: string,
    _keyVar: string
  ): void {
    // pass
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public addCheckForRequiredProperty(dtdlVersion: number, scope: TsScope): void {
    if (
      !this.optional &&
      Object.prototype.hasOwnProperty.call(this.propertyDigest, dtdlVersion) &&
      this.propertyDigest[dtdlVersion].allowed
    ) {
      scope
        .if(`${this.missingPropertyVariable}`)
        .line("parsingErrors.push(createParsingError(")
        .line(`'dtmi:dtdl:parsingError:missingRequiredProperty',`)
        .line("{")
        .line(`cause: '{primaryId:p} property ${this.propertyName} is required but missing.',`)
        .line(`action: 'Add a ${this.propertyName} property to the object.',`)
        .line(`primaryId: this.${ParserGeneratorValues.IdentifierName},`)
        .line(`property: '${this.propertyName}'`)
        .line(`}));`);
    }
  }
}
