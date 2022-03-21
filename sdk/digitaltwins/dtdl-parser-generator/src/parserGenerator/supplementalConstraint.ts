// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */

import { SupplementalConstraintDigest } from "./metamodelDigest";
import { TsScope } from "../codeGenerator";

export class SupplementalConstraint {
  private _propertyName: string;
  private _valueConstraintInitializers: string[];

  /**
   * Initializes a new instance of the SupplementalConstraint class.
   * @param supplementalConstraintDigest - a SupplementalConstraintDigest providing supplemental constraint information extracted from the metamodel digest.
   */
  constructor(supplementalConstraintDigest: SupplementalConstraintDigest) {
    this._propertyName = supplementalConstraintDigest.property;
    this._valueConstraintInitializers = [];

    if (supplementalConstraintDigest.requiredTypes !== undefined) {
      const requiredTypes = supplementalConstraintDigest.requiredTypes
        .map((value) => `'${value}'`)
        .join(", ");
      const requiredTypesString = supplementalConstraintDigest.requiredTypesString;
      // requiredTypes, requiredTypesString
      this._valueConstraintInitializers.push(
        `requiredTypes: [${requiredTypes}], requiredTypesString: "${requiredTypesString}" `
      );
    }

    if (supplementalConstraintDigest.requiredValues !== undefined) {
      const requiredValues = supplementalConstraintDigest.requiredValues
        .map((value) => `'${value}'`)
        .join(", ");
      const requiredValuesString = supplementalConstraintDigest.requiredValuesString;
      // requiredValues, requiredValuesString
      this._valueConstraintInitializers.push(
        `requiredValues: [${requiredValues}], requiredValuesString: "${requiredValuesString}"`
      );
    }
  }

  /**
   * Add the constraint to a supplemental type instance.
   * @param scope - a TsScope object to which to add generated code.
   * @param infoVariableName - Name of the supplementary type info variable to which to add the cotype.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  addConstraint(scope: TsScope, infoVariableName: string): void {
    scope.line(`${infoVariableName}.addConstraint(
      "${this._propertyName}", 
      {${this._valueConstraintInitializers.join(", ")}}
    )`);
  }
}
