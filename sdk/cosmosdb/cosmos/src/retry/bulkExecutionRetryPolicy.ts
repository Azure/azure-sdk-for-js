// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { sleep } from "../common/helper.js";
import { StatusCodes, SubStatusCodes } from "../common/statusCodes.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { ErrorResponse } from "../index.js";
import type { RetryPolicy } from "./RetryPolicy.js";

/**
 * This class implements the retry policy for bulk operations.
 * @hidden
 */
export class BulkExecutionRetryPolicy implements RetryPolicy {
  retryAfterInMs: number;
  private retriesOn410: number;
  private readonly MaxRetriesOn410 = 10;
  private readonly SubstatusCodeBatchResponseSizeExceeded = 3402;
  nextRetryPolicy: RetryPolicy;

  constructor(nextRetryPolicy: RetryPolicy) {
    this.nextRetryPolicy = nextRetryPolicy;
    this.retriesOn410 = 0;
  }

  public async shouldRetry(
    err: ErrorResponse,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<boolean | [boolean, string]> {
    if (!err) {
      return false;
    }
    if (err.code === StatusCodes.Gone) {
      this.retriesOn410++;

      if (this.retriesOn410 > this.MaxRetriesOn410) {
        return false;
      }
      if (
        err.substatus === SubStatusCodes.PartitionKeyRangeGone ||
        err.substatus === SubStatusCodes.CompletingSplit ||
        err.substatus === SubStatusCodes.CompletingPartitionMigration
      ) {
        return true;
      }
      if (err.substatus === SubStatusCodes.NameCacheIsStale) {
        return true;
      }
    }

    // API can return 413 which means the response is bigger than 4Mb.
    // Operations that exceed the 4Mb limit are returned as 413/3402, while the operations within the 4Mb limit will be 200
    // TODO: better way to handle this error
    if (
      err.code === StatusCodes.RequestEntityTooLarge &&
      err.substatus === this.SubstatusCodeBatchResponseSizeExceeded
    ) {
      return true;
    }
    // check for 429 error
    let shouldRetryForThrottle = false;
    if (err.code === StatusCodes.TooManyRequests) {
      const retryResult = await this.nextRetryPolicy.shouldRetry(err, diagnosticNode);
      shouldRetryForThrottle = Array.isArray(retryResult) ? retryResult[0] : retryResult;
    }
    if (shouldRetryForThrottle) {
      await sleep(this.nextRetryPolicy.retryAfterInMs);
    }
    return shouldRetryForThrottle;
  }
}
