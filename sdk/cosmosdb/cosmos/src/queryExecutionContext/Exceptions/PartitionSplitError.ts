// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosQueryError } from "./CosmosQueryError.js";
import { CosmosErrorCode } from "./CosmosErrorCode.js";
import { ErrorResponse } from "../../request/ErrorResponse.js";
import { StatusCodes } from "../../common/index.js";

/**
 * Error thrown when a partition split or merge is encountered during query execution
 * and the query cannot be recovered automatically.
 *
 * This error indicates a transient backend state change. The partition was split
 * or merged while your query was executing. The query is **retryable** — simply
 * create a new query iterator and try again.
 *
 * **Why it happens:**
 * - Container is being scaled up/down
 * - Backend maintenance or rebalancing
 * - Rare race condition in distributed systems
 *
 * **Recovery Pattern:**
 *
 * ```ts
 * import { PartitionSplitError } from "@azure/cosmos";
 *
 * async function queryWithRetry(query, maxRetries = 3) {
 *   for (let attempt = 0; attempt < maxRetries; attempt++) {
 *     try {
 *       return await query.fetchAll();
 *     } catch (error) {
 *       if (error instanceof PartitionSplitError) {
 *         if (attempt < maxRetries - 1) {
 *           console.log("Partition split detected, retrying...");
 *           continue; // Retry with a new query
 *         }
 *       }
 *       throw error;
 *     }
 *   }
 * }
 * ```
 *
 * The SDK automatically retries in many cases, but explicit handling can provide
 * better visibility and control.
 */
export class PartitionSplitError extends CosmosQueryError {
  /** The original Gone/410 error from the service */
  public readonly originalError: ErrorResponse;

  /**
   * Constructs a PartitionSplitError from the original service error.
   *
   * @param originalError - The Gone (410) ErrorResponse from CosmosDB.
   * @internal This is constructed by the SDK; not intended for application use.
   */
  constructor(originalError: ErrorResponse) {
    super(
      "Encountered partition split and could not recover. This request is retryable",
      CosmosErrorCode.PartitionSplit,
      {
        code: StatusCodes.ServiceUnavailable, // 503
        originalError,
        headers: originalError.headers,
      },
    );
    this.name = "PartitionSplitError";
    this.originalError = originalError;
  }
}
