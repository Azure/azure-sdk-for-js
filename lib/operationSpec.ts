// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpMethods } from "./webResource";
import { Mapper } from "./serializer";

/**
 * A specification that defines an operation.
 */
export interface OperationSpec {
  /**
   * The HTTP method that should be used by requests for this operation.
   */
  httpMethod: HttpMethods;

  /**
   * The Mapper that will be used to serialize an HTTP request's body.
   */
  requestBodyMapper?: Mapper;
}