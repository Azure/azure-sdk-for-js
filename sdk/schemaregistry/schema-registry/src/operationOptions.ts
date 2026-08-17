// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  OperationOptions as RestOperationOptions,
  OperationRequestOptions as RestOperationRequestOptions,
} from "@azure-rest/core-client";

/**
 * Options used when creating and sending HTTP requests for a Schema Registry operation.
 */
export interface OperationRequestOptions extends RestOperationRequestOptions {
  /**
   * User-defined custom request headers.
   *
   * @deprecated Use `headers` instead.
   */
  customHeaders?: Record<string, string>;
}

/**
 * Common options for Schema Registry operations.
 */
export interface OperationOptions extends Omit<RestOperationOptions, "requestOptions"> {
  /** Options used when creating and sending the HTTP request. */
  requestOptions?: OperationRequestOptions;
}
