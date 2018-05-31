// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Mapper } from "./serializer";
import { QueryCollectionFormat } from "./queryCollectionFormat";

/**
 * A common interface that all Operation parameter's extend.
 */
export interface OperationParameter {
  /**
   * The name of the parameter.
   */
  parameterName: string;

  /**
   * The mapper that defines how to validate and serialize this parameter's value.
   */
  mapper: Mapper;
}

/**
 * A parameter for an operation that will be substituted into the operation's request URL.
 */
export interface OperationURLParameter extends OperationParameter {
  /**
   * Whether or not to skip encoding the URL parameter's value before adding it to the URL.
   */
  skipEncoding?: boolean;
}

/**
 * A parameter for an operation that will be added as a query parameter to the operation's HTTP
 * request.
 */
export interface OperationQueryParameter extends OperationParameter {
  /**
   * Whether or not to skip encoding the query parameter's value before adding it to the URL.
   */
  skipEncoding?: boolean;

  /**
   * If this query parameter's value is a collection, what type of format should the value be
   * converted to.
   */
  collectionFormat?: QueryCollectionFormat;
}