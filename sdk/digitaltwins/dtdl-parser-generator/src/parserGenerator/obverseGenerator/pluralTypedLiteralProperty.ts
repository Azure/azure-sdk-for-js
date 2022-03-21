// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsScope, TsClass } from "../../codeGenerator";
import { MaterialPropertyDigest } from "../metamodelDigest";
import { LiteralType } from "./literalType";
import { PropertyRepresentation } from "./propertyRepresentation";
import { PropertyRestriction } from "./propertyRestriction";
import { TypedLiteralProperty } from "./typedLiteralProperty";

interface PluralTypedLiteralPropertyParams {
  propertyName: string;
  propertyNameUris: { [x: number]: string };
  propertyDigest: MaterialPropertyDigest;
  propertyRestrictions: { [dtdlVersion: number]: PropertyRestriction[] };
  datatype: string;
  literalType: LiteralType;
}

// C# doesn't have any typed literals or plural literals
export class PluralTypedLiteralProperty extends TypedLiteralProperty {
  constructor({
    propertyName,
    propertyNameUris,
    propertyDigest,
    propertyRestrictions,
    datatype,
    literalType
  }: PluralTypedLiteralPropertyParams) {
    super({
      propertyName: propertyName,
      propertyNameUris: propertyNameUris,
      propertyDigest: propertyDigest,
      propertyRestrictions: propertyRestrictions,
      datatype: datatype,
      literalType: literalType
    });
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public iterate(outerScope: TsScope, varName: { ref: string }): TsScope {
    return outerScope.for(`const ${varName.ref} of this.${this.propertyName} || []`);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public checkPresence(outerScope: TsScope): TsScope {
    return outerScope.if(`this._${this.propertyName} !== undefined`);
  }

  public get propertyRepresentation(): PropertyRepresentation {
    return PropertyRepresentation.List;
  }
  public get propertyType(): string {
    return `${this.literalType.getSingularType(false)}[]`;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public generateConstructorCode(_obverseClass: TsClass, ctorScope: TsScope): void {
    ctorScope.line(`this.${this.propertyName} = new ${this.propertyType}();`);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  addEqualsLine(ctorScope: TsScope): void {
    if (!this.propertyDigest._.inherited) {
      // TODO: This seems wrong. How should I properly do this Oliva?
      ctorScope.line(`&& this.${this.propertyName}.sequenceEqual(other.${this.propertyName})`);
    }
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
      throw new Error("Parsing logic for propertyDigest.IsPlural typed literals not written yet");
    }
  }
}
