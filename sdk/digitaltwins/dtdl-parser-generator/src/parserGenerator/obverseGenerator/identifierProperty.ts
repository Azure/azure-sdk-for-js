// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsAccess, TsClass, TsInterface, TsScope } from "../../codeGenerator";
import { MaterialPropertyDigest } from "../metamodelDigest";
import { MaterialProperty } from "./materialProperty";
import { PropertyRestriction } from "./propertyRestriction";
import { PropertyKind } from "./propertyKind";
import { ParserGeneratorValues } from "../parserGeneratorValues";

export abstract class IdentifierProperty extends MaterialProperty {
  private _baseClassName: string;
  constructor(
    propertyName: string,
    propertyNameUris: { [dtdlVersion: number]: string },
    propertyToken: MaterialPropertyDigest,
    propertyRestrictions: { [dtdlVersion: number]: PropertyRestriction[] },
    baseClassName: string
  ) {
    super(propertyName, propertyNameUris, propertyToken, propertyRestrictions);
    this._baseClassName = baseClassName;
  }

  public get propertyKind(): PropertyKind {
    return PropertyKind.Identifier;
  }

  protected get baseClassName(): string {
    return this._baseClassName;
  }

  public isParseable(dtdlVersion: number): boolean {
    return (
      Object.prototype.hasOwnProperty.call(this.propertyDigest, dtdlVersion) &&
      this.propertyDigest[dtdlVersion].allowed
    );
  }

  public hasCountRestriction(dtdlVersion: number): boolean {
    if (Object.prototype.hasOwnProperty.call(this.propertyDigest, dtdlVersion)) {
      return (
        this.propertyDigest[dtdlVersion].minCount !== undefined ||
        this.propertyDigest[dtdlVersion].maxCount !== undefined
      );
    }
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

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public addImports(obverseInterface: TsInterface): void {
    obverseInterface.import(`import {InDTMI} from '../parser/internalDtmi';`);
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
