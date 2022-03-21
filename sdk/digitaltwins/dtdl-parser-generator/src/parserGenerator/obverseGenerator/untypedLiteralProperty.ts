// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsAccess, TsClass, TsInterface } from "../../codeGenerator";
import { MaterialPropertyDigest } from "../metamodelDigest";
import { LiteralProperty } from "./literalProperty";
import { PropertyRestriction } from "./propertyRestriction";

export abstract class UntypedLiteralProperty extends LiteralProperty {
  private _datatypeField: string;
  constructor(
    propertyName: string,
    propertyNameUris: { [dtdlVersion: number]: string },
    propertyToken: MaterialPropertyDigest,
    propertyRestrictions: { [dtdlVersion: number]: PropertyRestriction[] }
  ) {
    super(propertyName, propertyNameUris, propertyToken, propertyRestrictions);
    this._datatypeField = `_${this.propertyName}Datatype`;
  }

  protected get datatypeField(): string {
    return this._datatypeField;
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
    const fieldName = `${this._datatypeField}`;
    obverseClass.field({ name: fieldName, type: "string", access: TsAccess.Private, value: "" });
    const ctorScope = obverseClass.tsConstructor?.body;
    if (ctorScope !== undefined) {
      ctorScope.line(`this.${fieldName} = '';`);
    }
  }
}
