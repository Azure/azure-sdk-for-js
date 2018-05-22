import { OperationParameterType } from "./operationParameterType";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/**
 * A parameter for an operation that will be added as a header to the operation's HTTP request.
 */
export interface OperationHeaderParameter {
  /**
   * The name of the parameter.
   */
  parameterName: string;

  /**
   * The name of the HTTP header. If this is not provided, then the name of the parameter will be
   * used as the header's name.
   */
  headerName?: string;

  /**
   * The type of value that this parameter contains.
   */
  type?: OperationParameterType;
}