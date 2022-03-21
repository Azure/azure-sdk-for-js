// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsScope, TsClass, TsAccess, TsConstructor, TsInterface } from "../../codeGenerator";
import { MaterialPropertyDigest } from "../metamodelDigest";
import { MaterialProperty } from "./materialProperty";
import { PropertyKind } from "./propertyKind";
import { PropertyRepresentation } from "./propertyRepresentation";

export class InternalProperty extends MaterialProperty {
  private _access: TsAccess;
  private _propertyType: string;
  private _value: string;
  private _description: string;
  private _isRelevantToIdentity: boolean;

  constructor(
    propertyType: string,
    propertyName: string,
    access: TsAccess,
    value: string,
    description: string,
    isRelevantToIdentity: boolean
  ) {
    super(propertyName, {}, InternalProperty._createEmptyPropertyDigest(), []); // propertyName = entityKind
    this._propertyType = propertyType; // SchemaKinds
    this._access = access;
    this._value = value; // 'date'|'boolean'|'array'
    this._description = description;
    this._isRelevantToIdentity = isRelevantToIdentity;
  }
  public get propertyKind(): PropertyKind {
    return PropertyKind.Internal;
  }

  public get propertyRepresentation(): PropertyRepresentation {
    return PropertyRepresentation.Item;
  }

  public get propertyType(): string {
    return this._propertyType;
  }
  public isParseable(_dtdlVersion: number): boolean {
    return false;
  }

  public hasCountRestriction(_dtdlVersion: number): boolean {
    return false;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public addConstructorParam(_obverseClass: TsClass, ctor: TsConstructor): string {
    const type = this.propertyType;
    ctor.parameter({ name: this.propertyName, type: type });
    return this.propertyName;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public generateConstructorCode(_obverseClass: TsClass, ctorScope: TsScope): void {
    ctorScope.line(`this.${this.propertyName} = ${this.propertyName};`);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public iterate(outerScope: TsScope, varName: { ref: string }): TsScope {
    varName.ref = `this.${this.propertyName}`;
    return outerScope;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public checkPresence(outerScope: TsScope): TsScope {
    return outerScope;
  }

  public addCaseToParseSwitch(
    _dtdlVersion: number,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    _obverseClass: TsClass,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    _switchScope: TsScope,
    _classIsAugmentable: boolean,
    _classIsPartition: boolean,
    _valueCountVar: string,
    _definedInVar: string
  ): void {
    /* empty */
  }

  public addCaseToTrySetObjectPropertySwitch(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    _switchScope: TsScope,
    _valueVar: string,
    _keyVar: string
  ): void {
    // pass
  }

  public addRestrictions(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    _checkRestrictionsMethodBody: TsScope,
    _dtdlVersion: number,
    _typeName: string,
    _classIsAugmentable: boolean
  ): void {
    /* empty */
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

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public addImports(_obverseInterface: TsInterface): void {
    /* empty */
  }

  public addMembers(
    _dtdlVersions: number[],
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseInterface: TsInterface,
    _classIsAugmentable: boolean
  ): void {
    if (!obverseInterface.extends && this.propertyName !== "entityKind") {
      obverseInterface.field({ name: this.propertyName, type: this.propertyType });
    }
    if (this.propertyName === "entityKind") {
      obverseInterface.field({ name: this.propertyName, type: this._value }); // entityKind: 'boolean'|'array'; for entity kind the value becomes the type.
    }
    obverseClass.field({
      name: this.propertyName,
      type: this.propertyType,
      access: TsAccess.Public
    });
  }

  private static _createEmptyPropertyDigest(): MaterialPropertyDigest {
    const emptyDigest = {
      _: {
        literal: false,
        abstract: false,
        plural: false,
        optional: false,
        inherited: false,
        shadowed: false,
        isKey: false,
        isSeg: false,
        description: ""
      }
    };
    return emptyDigest;
  }
}
