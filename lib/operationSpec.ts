// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpMethods } from "./webResource";
import { Mapper } from "./serializer";
import { OperationHeaderParameter } from "./operationHeaderParameter";

/**
 * A specification that defines an operation.
 */
export interface OperationSpec {
  /**
   * The HTTP method that should be used by requests for this operation.
   */
  httpMethod: HttpMethods;

  /**
   * The URL that was provided in the service's specification. This will still have all of the URL
   * placeholder variables in it.
   */
  baseUrl: string;

  /**
   * The Mapper that will be used to serialize an HTTP request's body.
   */
  requestBodyMapper?: Mapper;

  /**
   * The name of the request body that will be used during serialization.
   */
  requestBodyName?: string;

  /**
   * Whether or not this operation uses XML request and response bodies.
   */
  isXML?: boolean;

  /**
   * The parameters to the operation method that will be converted to headers on the operation's
   * HTTP request.
   */
  headerParameters?: OperationHeaderParameter[];
}