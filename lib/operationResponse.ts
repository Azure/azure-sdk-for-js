import { Mapper } from "./serializer";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/**
 * An OperationResponse that can be returned from an operation request for a single status code.
 */
export interface OperationResponse {
  /**
   * The mapper that will be used to deserialize the response headers.
   */
  headersMapper?: Mapper;

  /**
   * The mapper that will be used to deserialize the response body.
   */
  bodyMapper?: Mapper;

  /**
   * Whether or not the response body will be a cloud error.
   */
  isCloudError?: boolean;
}