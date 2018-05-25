import { OperationParameterType } from "./operationParameterType";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/**
 * A parameter for an operation that will be added as a property to the operation's formdata request
 * body.
 */
export interface OperationFormDataParameter {
  /**
   * The name of the parameter.
   */
  parameterName: string;

  /**
   * The name of the formdata property. If this is not provided, then the name of the parameter will
   * be used as the formdata's property name.
   */
  formDataPropertyName?: string;

  /**
   * The type of value that this parameter contains.
   */
  type?: OperationParameterType;
}