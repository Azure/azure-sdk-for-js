import { OperationParameterType } from "./operationParameterType";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/**
 * A parameter for an operation that will be substituted into the operation's request URL.
 */
export interface OperationURLParameter {
  /**
   * The name of the parameter.
   */
  parameterName: string;

  /**
   * The name of the parameter that will be replaced in the constructed URL. header. If this is not
   * provided, then the name of the parameter will be used as the urlParameterName instead.
   */
  urlParameterName?: string;

  /**
   * The type of value that this parameter contains.
   */
  type?: OperationParameterType;
}