// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsAccess, TsClass, TsInterface, TsScope } from "../../codeGenerator";
import { MaterialPropertyDigest } from "../metamodelDigest";
import { NameFormatter } from "../nameFormatter";
import { ParserGeneratorValues } from "../parserGeneratorValues";
import { MaterialProperty } from "./materialProperty";
import { PropertyRestriction } from "./propertyRestriction";
import { PropertyKind } from "./propertyKind";

export abstract class ObjectProperty extends MaterialProperty {
  private _interfaceName?: string;
  private _implementationName?: string;
  private _versionedClassName: { [dtdlVersion: number]: string };
  private _valueConstraintsField: string;
  private _instancePropertiesField: string;
  private _allowedVersionsField: string;

  constructor(
    propertyName: string,
    propertyNameUris: { [dtdlVersion: number]: string },
    propertyToken: MaterialPropertyDigest,
    propertyRestrictions: { [dtdlVersion: number]: PropertyRestriction[] }
  ) {
    super(propertyName, propertyNameUris, propertyToken, propertyRestrictions);
    this._interfaceName =
      propertyToken._.class !== undefined
        ? NameFormatter.formatNameAsInterface(propertyToken._.class)
        : undefined;
    this._implementationName =
      propertyToken._.class !== undefined
        ? NameFormatter.formatNameAsImplementation(propertyToken._.class)
        : undefined;
    this._versionedClassName = {};
    for (const keyDtdlVersion in propertyToken) {
      if (keyDtdlVersion === "_") {
        // skip underscore
        continue;
      }
      const versionedClassName = propertyToken[keyDtdlVersion].class;
      if (versionedClassName !== undefined) {
        this._versionedClassName[keyDtdlVersion] = NameFormatter.formatNameAsImplementation(
          versionedClassName
        );
      }
    }
    this._valueConstraintsField = `${propertyName}ValueConstraints`;
    this._instancePropertiesField = `${propertyName}InstanceProperties`;
    this._allowedVersionsField = `${propertyName}AllowedVersions`;
  }

  public get propertyKind(): PropertyKind {
    return PropertyKind.Object;
  }

  protected get interfaceName(): string | undefined {
    return this._interfaceName;
  }

  protected get implementationName(): string | undefined {
    return this._implementationName;
  }

  protected get versionedClassName(): { [dtdlVersion: number]: string | undefined } {
    return this._versionedClassName;
  }

  protected get valueConstraintsField(): string {
    return this._valueConstraintsField;
  }

  protected get instancePropertiesField(): string {
    return this._instancePropertiesField;
  }

  protected get allowedVersionsField(): string {
    return this._allowedVersionsField;
  }

  public isParseable(dtdlVersion: number): boolean {
    return (
      Object.prototype.hasOwnProperty.call(this.propertyDigest, dtdlVersion) &&
      this.propertyDigest[dtdlVersion].allowed
    );
  }

  public hasCountRestriction(dtdlVersion: number): boolean {
    return (
      Object.prototype.hasOwnProperty.call(this.propertyDigest, dtdlVersion) &&
      (this.propertyDigest[dtdlVersion].minCount !== undefined ||
        this.propertyDigest[dtdlVersion].maxCount !== undefined)
    );
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
    if (
      Object.values(this.propertyDigest).some((versionedDigest) => versionedDigest.allowed) &&
      classIsAugmentable
    ) {
      obverseClass.field({
        name: `_${this.valueConstraintsField}`,
        access: TsAccess.Private,
        type: "ValueConstraint[]",
        value: "[]"
      });
      obverseClass.field({
        name: `_${this.instancePropertiesField}`,
        access: TsAccess.Private,
        type: "string[]",
        value: "[]"
      });
    }
    for (const dtdlVersion of dtdlVersions) {
      const propertyVersionDigest = this.propertyDigest[dtdlVersion];
      // TODO Ask JD to show generated code
      const dictVersions = propertyVersionDigest.versions;
      if (dictVersions !== undefined) {
        let value = "new Set<number>()";
        for (const version of dictVersions) {
          value = value.concat(`.add(${version})`);
        }
        obverseClass.field({
          name: `_${this.allowedVersionsField}V${dtdlVersion}`,
          access: TsAccess.Private,
          type: "Set<number>",
          value: value
        });
      }
    }
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public addImports(obverseInterface: TsInterface): void {
    if (obverseInterface.name !== this.interfaceName) {
      obverseInterface.import(`import {${this.interfaceName}} from './internal';`);
    }
  }

  public addCaseToParseSwitch(
    dtdlVersion: number,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    switchScope: TsScope,
    classIsAugmentable: boolean,
    classIsPartition: boolean,
    valueCountVar: string,
    definedInVar: string
  ): void {
    if (
      Object.prototype.hasOwnProperty.call(this.propertyDigest, dtdlVersion) &&
      this.propertyDigest[dtdlVersion].allowed
    ) {
      const propertyVersionDigest = this.propertyDigest[dtdlVersion];
      const valueCountAssignment = this.hasCountRestriction(dtdlVersion)
        ? `${valueCountVar} = `
        : "";
      const valueConstraints = classIsAugmentable ? `this._${this.valueConstraintsField}` : "[]"; // send empty list
      const definedIn = classIsPartition
        ? `this.${ParserGeneratorValues.IdentifierName}`
        : `${definedInVar} ?? this.${ParserGeneratorValues.IdentifierName}`;
      const dtmiSegment = this.dtmiSegment !== undefined ? `'${this.dtmiSegment}'` : undefined;

      switchScope
        .line(`case '${this.propertyName}':`)
        .line(`case '${this.propertyNameUris[dtdlVersion]}':`);
      if (!this.optional) {
        switchScope.line(`${this.missingPropertyVariable} = false;`);
      }
      if (obverseClass.name !== this.versionedClassName[dtdlVersion]) {
        obverseClass.import(`import {${this.versionedClassName[dtdlVersion]}} from './internal';`);
      }
      switchScope.line(
        `${valueCountAssignment}${this.versionedClassName[dtdlVersion]}.parseToken(model, objectPropertyInfoList, elementPropertyConstraints, ${valueConstraints}, aggregateContext, parsingErrors, propValue, this.${ParserGeneratorValues.IdentifierName}, ${definedIn}, '${this.propertyName}', ${dtmiSegment}, undefined, ${propertyVersionDigest.idRequired}, ${propertyVersionDigest.typeRequired}, allowIdReferenceSyntax, this._${this.allowedVersionsField}V${dtdlVersion});`
      );
      if (propertyVersionDigest.minCount !== undefined) {
        switchScope
          .if(`${valueCountVar} < ${propertyVersionDigest.minCount}`)
          .line("parsingErrors.push(createParsingError(")
          .line(`'dtmi:dtdl:parsingError:propertyCountBelowMin',`)
          .line("{")
          .line(
            `cause: \`{primaryId:p} property '${this.propertyName}' has value ${valueCountVar} values, but the required minimum count is ${propertyVersionDigest.minCount}\`,`
          )
          .line(
            `action: \`Add one or more '${this.propertyName}' to the object until the minimum count is satisfied.\`,`
          )
          .line(`primaryId: this.id,`)
          .line(`property: '${this.propertyName}',`)
          .line(`}));`);
      }

      if (propertyVersionDigest.maxCount !== undefined) {
        switchScope
          .if(`${valueCountVar} > ${propertyVersionDigest.maxCount}`)
          .line("parsingErrors.push(createParsingError(")
          .line(`'dtmi:dtdl:parsingError:propertyCountAboveMax',`)
          .line("{")
          .line(
            `cause: \`{primaryId:p} property '${this.propertyName}' has value ${valueCountVar} values, but the allowed maximum count is ${propertyVersionDigest.maxCount}\`,`
          )
          .line(
            `action: \`Remove one or more '${this.propertyName}' to the object until the maximum count is satisfied.\`,`
          )
          .line(`primaryId: this.${ParserGeneratorValues.IdentifierName},`)
          .line(`property: '${this.propertyName}',`)
          .line(`}));`);
      }
      switchScope.line("continue;");
    }
  }

  public addCaseForInstancePropertySwitch(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    switchOnProperty: TsScope,
    instancePropVariable: string
  ): void {
    if (Object.values(this.propertyDigest).some((versionedDigest) => versionedDigest.allowed)) {
      switchOnProperty.line(`case '${this.propertyName}':`);
      switchOnProperty
        .if(`this._${this.instancePropertiesField} === undefined`)
        .line(`this._${this.instancePropertiesField} = <string[]>[];`);

      switchOnProperty
        .line(`this._${this.instancePropertiesField}.push(${instancePropVariable});`)
        .line(`break;`);
    }
  }

  public addCaseForValueConstraintSwitch(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    switchOnProperty: TsScope,
    constraintVariable: string
  ): void {
    if (Object.values(this.propertyDigest).some((versionedDigest) => versionedDigest.allowed)) {
      switchOnProperty.line(`case '${this.propertyName}':`);
      switchOnProperty
        .if(`this._${this.valueConstraintsField} === undefined`)
        .line(`this._${this.valueConstraintsField} = <ValueConstraint[]>[];`);

      switchOnProperty
        .line(`this._${this.valueConstraintsField}.push(${constraintVariable});`)
        .line(`break;`);
    }
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
