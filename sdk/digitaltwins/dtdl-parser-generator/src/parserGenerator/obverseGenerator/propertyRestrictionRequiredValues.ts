// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable sort-imports */
/* eslint-disable no-unused-vars */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { TsScope } from "../../codeGenerator";
import { ParserGeneratorValues } from "../parserGeneratorValues";
import { MaterialProperty } from "./materialProperty";
import { PropertyRestriction } from "./propertyRestriction";

export class PropertyRestrictionRequiredValues implements PropertyRestriction {
  private _propertyName: string;
  private _requiredValues: string;
  private _conditionString: string;
  private _requiredValuesURIs: string[];
  constructor(propertyName: string, values: string[], context: { [x: string]: string }) {
    this._propertyName = propertyName;
    this._requiredValues = values.map((x) => `${x}`).join(" or ");
    this._conditionString = values
      .map(
        (x) => `this.${propertyName}.${ParserGeneratorValues.IdentifierName} !== '${context[x]}'`
      )
      .join(" && ");
    this._requiredValuesURIs = values.map((x) => context[x]);
  }

  addRestriction(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    checkRestrictionsMethodBody: TsScope,
    _typeName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    _materialProperty: MaterialProperty
  ): void {
    checkRestrictionsMethodBody
      .if(`this.${this._propertyName} !== undefined`)
      .if(this._conditionString)
      .line("parsingErrors.push(createParsingError(")
      .line(`'dtmi:dtdl:parsingError:incorrectPropertyValue',`)
      .line("{")
      .line(
        `cause: '{{primaryId:n}} property \\'${this._propertyName}\\' has value {value} , but the value must be \\'${this._requiredValues}\\'.',`
      )
      .line(
        `action: 'Change the value of property  \\'${this._propertyName}\\' to \\'${this._requiredValues}\\'.',`
      )
      .line(`primaryId: this.${ParserGeneratorValues.IdentifierName},`)
      .line(`property: '${this._propertyName}',`)
      .line(
        `value: AggregateContext.getTermOrUri(this.${this._propertyName}.${ParserGeneratorValues.IdentifierName}),`
      )
      .line(`}));`);
  }
}
