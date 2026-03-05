// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosQueryError } from "./CosmosQueryError.js";
import { CosmosErrorCode } from "./CosmosErrorCode.js";
import { ErrorResponse } from "../../request/ErrorResponse.js";
import { StatusCodes } from "../../common/index.js";

/**
 * Error thrown when a partition split or merge is encountered during query execution
 * and the query cannot be recovered automatically.
 */
export class PartitionSplitError extends CosmosQueryError {
  /** The original Gone/410 error from the service */
  public readonly originalError: ErrorResponse;

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
