// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosHeaders } from "../CosmosHeaders.js";
import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import { ErrorResponse } from "../../request/ErrorResponse.js";
import { CosmosErrorCode } from "./CosmosErrorCode.js";

/**
 * Base class for all Cosmos SDK query execution errors.
 *
 * Extends ErrorResponse with structured error codes for programmatic handling.
 * All query-related errors (continuation tokens, disposal, partition splits, etc.)
 * are instances of this class.
 *
 * **Error Handling Pattern:**
 *
 * ```ts
 * import { CosmosQueryError, CosmosErrorCode } from "@azure/cosmos";
 *
 * try {
 *   const results = await container.items.query("SELECT * from c").fetchAll();
 * } catch (error) {
 *   if (error instanceof CosmosQueryError) {
 *     console.error(`Query failed: ${error.message}`);
 *     console.error(`Error code: ${error.errorCode}`);
 *
 *     if (error.errorCode === CosmosErrorCode.FetchAllSizeLimitExceeded) {
 *       // Handle size limit: switch to pagination
 *     } else if (error.errorCode === CosmosErrorCode.PartitionSplit) {
 *       // Handle partition split: retry the query
 *     }
 *
 *     if (error.cause) {
 *       console.debug("Original error:", error.cause);
 *     }
 *   }
 * }
 * ```
 */
export class CosmosQueryError extends ErrorResponse {
  /** Machine-readable error code for programmatic handling */
  public readonly errorCode: CosmosErrorCode;

  /**
   * Constructs a CosmosQueryError.
   *
   * @param message - Human-readable error description.
   * @param errorCode - Machine-readable error code from `CosmosErrorCode` enum.
   * @param options - Optional error context:
   *   - `code`: HTTP status code (if applicable)
   *   - `substatus`: HTTP substatus code for detailed error classification
   *   - `headers`: Response headers from the failed request
   *   - `originalError`: Underlying error that caused this error (available via `error.cause`)
   *   - `diagnostics`: Diagnostic information about the failed operation
   */
  constructor(
    message: string,
    errorCode: CosmosErrorCode,
    options?: {
      code?: number | string;
      substatus?: number;
      headers?: CosmosHeaders;
      originalError?: Error;
      diagnostics?: CosmosDiagnostics;
    },
  ) {
    super(message);
    this.errorCode = errorCode;
    this.name = "CosmosQueryError";
    if (options) {
      this.code = options.code;
      this.substatus = options.substatus;
      this.headers = options.headers;
      this.diagnostics = options.diagnostics;
      if (options.originalError) {
        this.cause = options.originalError; // ES2022 Error.cause
      }
    }
  }
}
