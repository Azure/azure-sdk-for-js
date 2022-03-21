// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsAccess, TsClass, TsInterface } from "../../codeGenerator";
import { MaterialPropertyDigest } from "../metamodelDigest";
import { LiteralType } from "./literalType";
import { PropertyRestriction } from "./propertyRestriction";
import { LiteralProperty } from "./literalProperty";

interface TypedLiteralPropertyParams {
  propertyName: string;
  propertyNameUris: { [dtdlVersion: number]: string };
  propertyDigest: MaterialPropertyDigest;
  propertyRestrictions: { [dtdlVersion: number]: PropertyRestriction[] };
  datatype: string;
  literalType: LiteralType;
}

export abstract class TypedLiteralProperty extends LiteralProperty {
  private _datatype: string;
  private _literalType: LiteralType;
  constructor({
    propertyName,
    propertyNameUris,
    propertyDigest,
    propertyRestrictions,
    datatype,
    literalType
  }: TypedLiteralPropertyParams) {
    super(propertyName, propertyNameUris, propertyDigest, propertyRestrictions);
    this._datatype = datatype;
    this._literalType = literalType;
  }

  protected get datatype(): string {
    return this._datatype;
  }

  protected get literalType(): LiteralType {
    return this._literalType;
  }

  public addMembers(
    dtdlVersions: number[],
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseInterface: TsInterface,
    classIsAugmentable: boolean
  ): void {
    super.addMembers(dtdlVersions, obverseClass, obverseInterface, classIsAugmentable);

    for (const dtdlVersion of dtdlVersions) {
      if (
        Object.prototype.hasOwnProperty.call(this.propertyDigest, dtdlVersion) &&
        this.propertyDigest[dtdlVersion].pattern !== undefined
      ) {
        // TODO change to being intialized inside the constructor later.
        obverseClass.field({
          name: `${this.propertyName}PropertyRegexPatternV${dtdlVersion}`,
          type: "RegExp",
          access: TsAccess.Private,
          value: `/${this.propertyDigest[dtdlVersion].pattern}/`
        });
      }
    }
  }
}
