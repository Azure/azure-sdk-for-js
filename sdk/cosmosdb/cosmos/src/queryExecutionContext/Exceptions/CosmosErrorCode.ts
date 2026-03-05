// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Machine-readable error codes for SDK query execution errors.
 * These codes enable programmatic error handling and diagnostics.
 *
 * Use these codes with `CosmosQueryError.errorCode` to implement
 * error recovery logic:
 *
 * @example Programmatic error handling:
 * ```ts
 * import { CosmosQueryError, CosmosErrorCode } from "@azure/cosmos";
 *
 * try {
 *   const results = await query.fetchAll();
 * } catch (error) {
 *   if (error instanceof CosmosQueryError) {
 *     if (error.errorCode === CosmosErrorCode.FetchAllSizeLimitExceeded) {
 *       console.warn("Result set too large, use pagination instead");
 *     } else if (error.errorCode === CosmosErrorCode.PartitionSplit) {
 *       console.warn("Partition split detected, query is retryable");
 *     }
 *   }
 * }
 * ```
 */
export enum CosmosErrorCode {
  /** Partition was split or merged during query execution. Query is retryable. */
  PartitionSplit = "PartitionSplit",
  /** ExecutionContext has been disposed and cannot be used. Operation must be retried with a new query. */
  ContextDisposed = "ContextDisposed",
  /** Continuation token is invalid or corrupted. Typically requires restarting pagination from the beginning. */
  InvalidContinuationToken = "InvalidContinuationToken",
  /** Query plan is required but could not be obtained from the backend. Retry may succeed. */
  QueryPlanRequired = "QueryPlanRequired",
  /** Result set exceeds configured memory limit. Use pagination instead of fetchAll(). */
  ResultSetTooLarge = "ResultSetTooLarge",
  /** Operation was aborted via AbortSignal. Caller cancelled the operation. */
  OperationAborted = "OperationAborted",
  /** fetchAll() accumulated more items than the configured `maxFetchAllItemCount`. Use pagination via fetchNext() or streaming via getAsyncIterator(). */
  FetchAllSizeLimitExceeded = "FetchAllSizeLimitExceeded",
}
