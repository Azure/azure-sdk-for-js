// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsClass, TsScope } from "../../codeGenerator";
import { PropertyRepresentation } from "./propertyRepresentation";
import { UntypedLiteralProperty } from "./untypedLiteralProperty";

// C# doesn't have any typed literals or plural literals, so this class doesn't matter rn.
export class PluralUntypedLiteralProperty extends UntypedLiteralProperty {
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public iterate(outerScope: TsScope, varName: { ref: string }): TsScope {
    return outerScope.for(`const ${varName.ref} of this.${this.propertyName} || []`);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public checkPresence(outerScope: TsScope): TsScope {
    return outerScope.if(`this.${this.propertyName} !== undefined`);
  }

  public get propertyRepresentation(): PropertyRepresentation {
    return PropertyRepresentation.List;
  }

  public get propertyType(): string {
    return `unknown[]`;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public generateConstructorCode(_obverseClass: TsClass, ctorScope: TsScope): void {
    ctorScope.line(`this.${this.propertyName} = [];`);
  }

  public addCaseToParseSwitch(
    dtdlVersion: number,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    _obverseClass: TsClass,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    _switchScope: TsScope,
    _classIsAugmentable: boolean,
    _classIsPartition: boolean,
    _valueCountVar: string,
    _definedInVar: string
  ): void {
    if (
      Object.prototype.hasOwnProperty.call(this.propertyDigest, dtdlVersion) &&
      this.propertyDigest[dtdlVersion].allowed
    ) {
      throw new Error("Parsing logic for propertyDigest.IsPlural identifiers not written yet");
    }
  }
}
