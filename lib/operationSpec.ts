// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Mapper } from "./serializer";
import { HttpMethods } from "./webResource";
import { OperationURLParameter, OperationQueryParameter, OperationParameter } from "./operationParameter";
import { OperationParameterTransformation } from "./operationParameterTransformation";

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
   * template variables in it.
   */
  baseUrl: string;

  /**
   * The fixed path for this operation's URL. This will still have all of the URL template variables
   * in it.
   */
  path?: string;

  /**
   * The content type of the request body. This value will be used as the "Content-Type" header if
   * it is provided.
   */
  contentType?: string;

  /**
   * The Mapper that will be used to serialize an HTTP request's body.
   */
  requestBodyMapper?: Mapper;

  /**
   * The name of the parameter that contains the request body value.
   */
  requestBodyParameterName?: string;

  /**
   * The name of the request body that will be used during serialization.
   */
  requestBodyName?: string;

  /**
   * Whether or not this operation uses XML request and response bodies.
   */
  isXML?: boolean;

  /**
   * The parameters to the operation method that will be substituted into the constructed URL.
   */
  urlParameters?: OperationURLParameter[];

  /**
   * The parameters to the operation method that will be added to the constructed URL's query.
   */
  queryParameters?: OperationQueryParameter[];

  /**
   * The parameters to the operation method that will be converted to headers on the operation's
   * HTTP request.
   */
  headerParameters?: OperationParameter[];

  /**
   * The parameters to the operation method that will be used to create a formdata body for the
   * operation's HTTP request.
   */
  formDataParameters?: OperationParameter[];

  /**
   * Transformations that should be applied to convert the operation method's parameters into the
   * operation request's parameters.
   */
  parameterTransformations?: OperationParameterTransformation[];
}