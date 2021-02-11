// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Mapper } from "./serializer";

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
   * Indicates if this is an error response
   */
  isError?: boolean;
}
