import { OperationParameterType } from "./operationParameterType";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/**
 * A parameter for an operation that will be added as a query parameter to the operation's HTTP
 * request.
 */
export interface OperationQueryParameter {
  /**
   * The name of the parameter.
   */
  parameterName: string;

  /**
   * The name of the query parameter that will be added in the constructed URL. header. If this is
   * not provided, then the name of the parameter will be used as the query parameter name instead.
   */
  queryParameterName?: string;

  /**
   * Whether or not to skip encoding the query parameter's value before adding it to the URL.
   */
  skipEncoding?: boolean;

  /**
   * If this query parameter's value is a collection, what type of format should the value be
   * converted to.
   */
  collectionFormat?: string;

  /**
   * The type of value that this parameter contains.
   */
  type?: OperationParameterType;
}