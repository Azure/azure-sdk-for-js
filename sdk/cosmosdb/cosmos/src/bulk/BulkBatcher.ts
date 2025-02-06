// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import type { RequestOptions } from "../request";
import { ErrorResponse } from "../request";
import { Constants, StatusCodes } from "../common";
import type { ExecuteCallback, RetryCallback } from "../utils/batch";
import { calculateObjectSizeInBytes, isSuccessStatusCode } from "../utils/batch";
import type { BulkResponse } from "./BulkResponse";
import type { ItemBulkOperation } from "./ItemBulkOperation";
import type { BulkPartitionMetric } from "./BulkPartitionMetric";
import { getCurrentTimestampInMs } from "../utils/time";
import type { Limiter } from "./Limiter";

/**
 * Maintains a batch of operations and dispatches it as a unit of work.
 * Execution of the request is done by the @see {@link ExecuteCallback} and retry is done by the @see {@link RetryCallback}.
 * @hidden
 */

export class BulkBatcher {
  private batchOperationsList: ItemBulkOperation[];
  private currentSize: number;
  private toBeDispatched: boolean;
  private readonly executor: ExecuteCallback;
  private readonly retrier: RetryCallback;
  private readonly options: RequestOptions;
  private readonly diagnosticNode: DiagnosticNodeInternal;

  constructor(
    private limiter: Limiter,
    executor: ExecuteCallback,
    retrier: RetryCallback,
    options: RequestOptions,
    diagnosticNode: DiagnosticNodeInternal,
  ) {
    this.batchOperationsList = [];
    this.executor = executor;
    this.retrier = retrier;
    this.options = options;
    this.diagnosticNode = diagnosticNode;
    this.currentSize = 0;
    this.toBeDispatched = false;
  }

  /**
   * Attempts to add an operation to the current batch.
   * Returns false if the batch is full or already dispatched.
   */
  public tryAdd(operation: ItemBulkOperation): boolean {
    if (this.toBeDispatched) {
      return false;
    }
    if (!operation) {
      throw new ErrorResponse("Operation is not defined");
    }
    if (!operation.operationContext) {
      throw new ErrorResponse("Operation context is not defined");
    }
    if (this.batchOperationsList.length === Constants.MaxBulkOperationsCount) {
      return false;
    }
    const currentOperationSize = calculateObjectSizeInBytes(operation);
    if (
      this.batchOperationsList.length > 0 &&
      this.currentSize + currentOperationSize > Constants.DefaultMaxBulkRequestBodySizeInBytes
    ) {
      return false;
    }

    this.currentSize += currentOperationSize;
    this.batchOperationsList.push(operation);
    return true;
  }

  public isEmpty(): boolean {
    return this.batchOperationsList.length === 0;
  }

  /**
   * Dispatches the current batch of operations.
   * Handles retries for failed operations and updates the ordered response.
   */
  public async dispatch(partitionMetric: BulkPartitionMetric): Promise<void> {
    this.toBeDispatched = true;
    const startTime = getCurrentTimestampInMs();
    try {
      const response: BulkResponse = await this.executor(
        this.batchOperationsList,
        this.options,
        this.diagnosticNode,
      );
      // status code of 0 represents an empty response,
      // we are sending this back from executor in case of 410 error
      if (response.statusCode === 0) {
        return;
      }
      const hasThrottles = 1;
      const noThrottle = 0;
      const numThrottle = response.results.some(
        (result) => result.statusCode === StatusCodes.TooManyRequests,
      )
        ? hasThrottles
        : noThrottle;
      const splitOrMerge = response.results.some((result) => result.statusCode === StatusCodes.Gone)
        ? true
        : false;
      if (splitOrMerge) {
        await this.limiter.stopDispatch();
      }
      partitionMetric.add(
        this.batchOperationsList.length,
        getCurrentTimestampInMs() - startTime,
        numThrottle,
      );

      for (let i = 0; i < response.operations.length; i++) {
        const operation = response.operations[i];
        const bulkOperationResult = response.results[i];
        if (!isSuccessStatusCode(bulkOperationResult.statusCode)) {
          const errorResponse = new ErrorResponse(
            null,
            bulkOperationResult.statusCode,
            bulkOperationResult.subStatusCode,
          );
          errorResponse.retryAfterInMs = bulkOperationResult.retryAfter;
          const shouldRetry = await operation.operationContext.retryPolicy.shouldRetry(
            errorResponse,
            this.diagnosticNode,
          );
          if (shouldRetry) {
            await this.retrier(operation, this.diagnosticNode, this.options);
            continue;
          }
        }
        operation.operationContext.complete(bulkOperationResult);
      }
    } catch (error) {
      // Mark all operations in the batch as failed
      for (const operation of this.batchOperationsList) {
        operation.operationContext.fail(error);
      }
    } finally {
      // Clean up batch state
      this.batchOperationsList = [];
    }
  }
}
