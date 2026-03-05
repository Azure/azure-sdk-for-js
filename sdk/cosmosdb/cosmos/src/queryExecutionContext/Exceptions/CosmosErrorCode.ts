// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Machine-readable error codes for SDK query execution errors.
 * These codes enable programmatic error handling and diagnostics.
 */
export enum CosmosErrorCode {
  /** Partition was split or merged during query execution */
  PartitionSplit = "PartitionSplit",
  /** ExecutionContext has been disposed */
  ContextDisposed = "ContextDisposed",
  /** Continuation token is invalid or corrupted */
  InvalidContinuationToken = "InvalidContinuationToken",
  /** Query plan is required but could not be obtained */
  QueryPlanRequired = "QueryPlanRequired",
  /** Result set exceeds configured memory limit */
  ResultSetTooLarge = "ResultSetTooLarge",
  /** Operation was aborted via AbortSignal */
  OperationAborted = "OperationAborted",
  /** fetchAll() accumulated more items than the configured maxFetchAllItemCount */
  FetchAllSizeLimitExceeded = "FetchAllSizeLimitExceeded",
}
