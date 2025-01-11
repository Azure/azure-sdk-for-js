// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Container } from "../client";
import { sleep, StatusCodes, SubStatusCodes } from "../common";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import type { ErrorResponse } from "../request";
import type { PartitionKeyRangeCache } from "../routing";
import type { RetryPolicy } from "./RetryPolicy";

/**
 * This class implements the retry policy for bulk operations.
 * @hidden
 */
export class BulkExecutionRetryPolicy implements RetryPolicy {
  retryAfterInMs: number;
  retryForThrottle: boolean = false;
  private retriesOn410: number;
  private readonly MaxRetriesOn410 = 10;
  private readonly SubstatusCodeBatchResponseSizeExceeded = 3402;
  nextRetryPolicy: RetryPolicy;
  private container: Container;
  private partitionKeyRangeCache: PartitionKeyRangeCache;

  constructor(
    container: Container,
    nextRetryPolicy: RetryPolicy,
    partitionKeyRangeCache: PartitionKeyRangeCache,
  ) {
    this.container = container;
    this.nextRetryPolicy = nextRetryPolicy;
    this.partitionKeyRangeCache = partitionKeyRangeCache;
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
      if (this.retriesOn410 >= this.MaxRetriesOn410) {
        return false;
      }
      if (
        err.substatus === SubStatusCodes.PartitionKeyRangeGone ||
        err.substatus === SubStatusCodes.CompletingSplit ||
        err.substatus === SubStatusCodes.CompletingPartitionMigration
      ) {
        await this.partitionKeyRangeCache.onCollectionRoutingMap(
          this.container.url,
          diagnosticNode,
          true,
        );
        return true;
      }
      if (err.substatus === SubStatusCodes.NameCacheIsStale) {
        return true;
      }
    }

    // API can return 413 which means the response is bigger than 4Mb.
    // Operations that exceed the 4Mb limit are returned as 413/3402, while the operations within the 4Mb limit will be 200
    if (
      err.code === StatusCodes.RequestEntityTooLarge &&
      err.substatus === this.SubstatusCodeBatchResponseSizeExceeded
    ) {
      return true;
    }

    // check for 429 error
    const shouldRetryForThrottle = this.nextRetryPolicy.shouldRetry(err, diagnosticNode);
    if (shouldRetryForThrottle) {
      await sleep(this.nextRetryPolicy.retryAfterInMs);
    }
    return shouldRetryForThrottle;
  }
}
