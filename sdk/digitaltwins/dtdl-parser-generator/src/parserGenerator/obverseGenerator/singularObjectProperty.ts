// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsClass, TsInterface, TsScope } from "../../codeGenerator";
import { MaterialPropertyDigest } from "../metamodelDigest";
import { ParserGeneratorValues } from "../parserGeneratorValues";
import { ObjectProperty } from "./objectProperty";
import { PropertyRepresentation } from "./propertyRepresentation";
import { PropertyRestrictionRequiredValues } from "./propertyRestrictionRequiredValues";
import { PropertyRestriction } from "./propertyRestriction";
// example is property schema in material class telemetry
export class SingularObjectProperty extends ObjectProperty {
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public iterate(outerScope: TsScope, varName: { ref: string }): TsScope {
    varName.ref = `(this.${this.propertyName} as ${this.baseImplementation})`;
    // TODO FOR NEW Does this need to casted too ?
    return outerScope.if(`this.${this.propertyName} !== undefined`);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public checkPresence(outerScope: TsScope): TsScope {
    return outerScope.if(`this.${this.propertyName} !== undefined`);
  }

  private readonly _sequencerField: string;
  private readonly _requiredValuesField: string;
  private readonly _propertyRestrictionRequiredValues?: PropertyRestrictionRequiredValues;
  constructor(
    propertyName: string,
    propertyNameUris: { [dtdlVersion: number]: string },
    propertyToken: MaterialPropertyDigest,
    propertyRestrictions: { [dtdlVersion: number]: PropertyRestriction[] }
  ) {
    super(propertyName, propertyNameUris, propertyToken, propertyRestrictions);
    this._sequencerField = `${this.propertyName}Sequencer`;
    this._requiredValuesField = `${this.propertyName}RequiredValues`;
    // TODO anything to do with property restrictions.
    if (Object.prototype.hasOwnProperty.call(propertyRestrictions, 2)) {
      this._propertyRestrictionRequiredValues = propertyRestrictions[2].filter(
        (r) => r instanceof PropertyRestrictionRequiredValues
      )[0] as PropertyRestrictionRequiredValues;
    }
  }
  public get propertyRepresentation(): PropertyRepresentation {
    return this.optional ? PropertyRepresentation.NullableItem : PropertyRepresentation.Item;
  }

  public get propertyType(): string | undefined {
    return this.interfaceName;
  }

  public get propertyImplType(): string | undefined {
    return this.implementationName;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public generateConstructorCode(obverseClass: TsClass, _ctorScope: TsScope): void {
    // the field should be added as an optional. So no need to assign undefined to it.
    // NOTE for Node : any SINGULAR OBJECT types should not be initialized inside a Constructor.
    // if (obverseClass.name !== this.interfaceName) {
    //   obverseClass.import(`import {${this.interfaceName}} from './internal';`);
    // }
    obverseClass.import(`import {${this.implementationName}} from './internal';`);
    obverseClass.import(`import {${this.interfaceName}} from './internal';`);
    obverseClass.import(`import {${this.baseImplementation}} from './internal';`);
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
    // TODO Things to do with property restrictions.
  }

  public addCaseToTrySetObjectPropertySwitch(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    switchScope: TsScope,
    valueVar: string,
    _keyVar: string
  ): void {
    switchScope.line(`case '${this.propertyName}':`);
    Object.values(this.propertyNameUris).forEach((strVal) => switchScope.line(`case '${strVal}':`));
    switchScope
      .line(`this.${this.propertyName} = ${valueVar} as ${this.implementationName};`)
      .line("return true");
  }

  public addRestrictions(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    checkRestrictionsMethodBody: TsScope,
    dtdlVersion: number,
    typeName: string,
    classIsAugmentable: boolean
  ): void {
    super.addRestrictions(checkRestrictionsMethodBody, dtdlVersion, typeName, classIsAugmentable);
    if (
      Object.values(this.propertyDigest).some((versionedDigest) => versionedDigest.allowed) &&
      classIsAugmentable
    ) {
      checkRestrictionsMethodBody
        .if(`this._${this.instancePropertiesField} !== undefined`)
        .for(`const instanceProp of this._${this.instancePropertiesField}`)
        .if(
          `!(this.${this.propertyName} as ${this.propertyImplType})?.${ParserGeneratorValues.ValidateInstanceMethodName}Element(this.supplementalProperties[instanceProp])`
        )
        .line("parsingErrors.push(createParsingError(")
        .line(`'dtmi:dtdl:parsingError:nonConformantPropertyValue',`)
        .line("{")
        .line(
          `cause: '{{primaryId:n}} property \\'{{property}}\\' does not conform to the type specified by property \\'${this.propertyName}\\' ',`
        )
        .line(
          `action: 'Change the value of property \\'{{property}}\\' so that it conforms to property  \\'${this.propertyName}\\'',`
        )
        .line(`primaryId: this.${ParserGeneratorValues.IdentifierName},`)
        .line(`property: instanceProp,`)
        .line(`}));`);
    }
  }
}
