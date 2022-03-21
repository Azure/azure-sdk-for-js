// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable sort-imports */
/* eslint-disable no-unused-vars */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { TsScope } from "../../codeGenerator";
import { NameFormatter } from "../nameFormatter";
import { ParserGeneratorValues } from "../parserGeneratorValues";
import { MaterialProperty } from "./materialProperty";
import { PropertyRestriction } from "./propertyRestriction";

export class PropertyRestrictionUniqueProperties implements PropertyRestriction {
  private _propertyName: string;
  private _uniquePropertyName: string;
  private _hashSetName: string;
  private _uniquePropertyObverseName: string;
  constructor(propertyName: string, uniquePropertyName: string) {
    this._propertyName = propertyName;
    this._uniquePropertyName = uniquePropertyName;
    this._uniquePropertyObverseName = NameFormatter.formatNameAsProperty(uniquePropertyName);
    this._hashSetName = `${propertyName}${this._uniquePropertyObverseName}Set`;
  }

  addRestriction(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    checkRestrictionsMethodBody: TsScope,
    typeName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    materialProperty: MaterialProperty
  ): void {
    checkRestrictionsMethodBody.line(`const ${this._hashSetName} = new Set<any>();`);
    const checkRestrictionsMethodBodyIfScope = checkRestrictionsMethodBody.if(
      `this.${this._propertyName} !== undefined`
    );
    const varName = "item";
    const iterationScope = materialProperty.iterate(checkRestrictionsMethodBodyIfScope, {
      ref: varName
    });
    iterationScope
      .if(`${this._hashSetName}.has(${varName}.${this._uniquePropertyName})`)
      .line("parsingErrors.push(createParsingError(")
      .line(`'dtmi:dtdl:parsingError:nonUniquePropertyValue',`)
      .line("{")
      .line(
        `cause: '{{primaryId:n}} property \\'${this._propertyName}\\' contains more than one element whose property \\'${this._uniquePropertyName}\\' has value \\'{${varName}.${this._uniquePropertyName}}\\'.',`
      )
      .line(
        `action: 'Change the value of property  \\'${this._uniquePropertyName}\\' to a string value that is unique across all values of \\'${this._propertyName}\\'.',`
      )
      .line(`primaryId: this.${ParserGeneratorValues.IdentifierName},`)
      .line(`property: '${this._propertyName}',`)
      .line(`value: '${this._uniquePropertyName}',`)
      .line(`}));`);
    iterationScope.line(`${this._hashSetName}.add(${varName}.${this._uniquePropertyName})`);
  }
}
