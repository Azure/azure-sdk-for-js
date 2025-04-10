// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiagnosticNodeInternal, DiagnosticNodeType } from "../diagnostics/DiagnosticNodeInternal";
import { ErrorResponse } from "../request";
import { Constants, StatusCodes } from "../common";
import type { CosmosBulkOperationResult, ExecuteCallback, RetryCallback } from "../utils/batch";
import { calculateObjectSizeInBytes, isSuccessStatusCode } from "../utils/batch";
import type { ItemBulkOperation } from "./ItemBulkOperation";
import type { BulkPartitionMetric } from "./BulkPartitionMetric";
import { getCurrentTimestampInMs } from "../utils/time";
import type { LimiterQueue } from "./Limiter";
import type { CosmosDbDiagnosticLevel } from "../diagnostics/CosmosDbDiagnosticLevel";
import type { EncryptionProcessor } from "../encryption/EncryptionProcessor";
import type { ClientConfigDiagnostic } from "../CosmosDiagnostics";

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
  private readonly diagnosticLevel: CosmosDbDiagnosticLevel;
  private readonly encryptionEnabled: boolean;
  private readonly encryptionProcessor: EncryptionProcessor;
  private readonly clientConfigDiagnostics: ClientConfigDiagnostic;
  private operationsCountRef: { processedOperationCount: number, failedOperationCount: number } = { processedOperationCount: 0, failedOperationCount: 0 };


  constructor(
    private limiter: LimiterQueue,
    executor: ExecuteCallback,
    retrier: RetryCallback,
    diagnosticLevel: CosmosDbDiagnosticLevel,
    encryptionEnabled: boolean,
    clientConfig: ClientConfigDiagnostic,
    encryptionProcessor: EncryptionProcessor,
    operationsCountRef: { processedOperationCount: number, failedOperationCount: number } = { processedOperationCount: 0, failedOperationCount: 0 }
    ,
  ) {
    this.batchOperationsList = [];
    this.executor = executor;
    this.retrier = retrier;
    this.diagnosticLevel = diagnosticLevel;
    this.encryptionEnabled = encryptionEnabled;
    this.encryptionProcessor = encryptionProcessor;
    this.clientConfigDiagnostics = clientConfig;
    this.currentSize = 0;
    this.toBeDispatched = false;
    this.operationsCountRef = operationsCountRef;
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
    const currentOperationSize = calculateObjectSizeInBytes(operation.operationInput);
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
    const diagnosticNode = new DiagnosticNodeInternal(
      this.diagnosticLevel,
      DiagnosticNodeType.BATCH_REQUEST,
      null,
    );
    try {
      const response = await this.executor(this.batchOperationsList, diagnosticNode);

      const hasThrottles = 1;
      const noThrottle = 0;
      const numThrottle = response.results.some((result) => result.statusCode === StatusCodes.TooManyRequests)
        ? hasThrottles
        : noThrottle;
      const splitOrMerge = response.results.some((result) => result.statusCode === StatusCodes.Gone)
        ? true
        : false;
      if (splitOrMerge) {
        this.limiter.pauseAndClear(null);
      }
      partitionMetric.add(this.batchOperationsList.length, getCurrentTimestampInMs() - startTime, numThrottle);
      for (let i = 0; i < response.operations.length; i++) {
        const operation = response.operations[i];
        const bulkOperationResult = response.results[i];
        if (!isSuccessStatusCode(bulkOperationResult.statusCode)) {
          const errorResponse = new ErrorResponse();
          errorResponse.code = bulkOperationResult.statusCode;
          errorResponse.substatus = bulkOperationResult.subStatusCode;
          errorResponse.retryAfterInMs = bulkOperationResult.retryAfter;
          const shouldRetry = await operation.operationContext.retryPolicy.shouldRetry(errorResponse, diagnosticNode);
          if (shouldRetry) {
            await this.retrier(operation, diagnosticNode);
            continue;
          }
        }
        try {
          if (this.encryptionEnabled && bulkOperationResult.resourceBody) {
            bulkOperationResult.resourceBody = await this.encryptionProcessor.decrypt(bulkOperationResult.resourceBody);
          }
        }
        catch (error) {
          // if decryption fails after successful write operation, fail the operation with internal server error
          if (operation.operationInput.operationType !== "Read") {
            const decryptionError = new ErrorResponse(`Item ${operation.operationInput.operationType} operation was successful but response decryption failed: + ${error.message}`);
            decryptionError.code = StatusCodes.ServiceUnavailable;
            throw decryptionError;
          }
        }
        operation.operationContext.addDiagnosticChild(diagnosticNode);
        bulkOperationResult.diagnostics = operation.operationContext.diagnosticNode.toDiagnostic(this.clientConfigDiagnostics);
        const bulkItemResponse: CosmosBulkOperationResult = {
          operationInput: operation.operationInput,
        };
        if (!isSuccessStatusCode(bulkOperationResult.statusCode)) {
          this.operationsCountRef.failedOperationCount++;
          const operationError = new ErrorResponse();
          operationError.code = bulkOperationResult.statusCode;
          operationError.substatus = bulkOperationResult.subStatusCode;
          operationError.activityId = bulkOperationResult.activityId;
          operationError.headers = bulkOperationResult.headers;
          operationError.retryAfterInMs = bulkOperationResult.retryAfter;
          operationError.diagnostics = bulkOperationResult.diagnostics;
          bulkItemResponse.error = operationError
        }
        else {
          bulkItemResponse.response = bulkOperationResult;
        }
        operation.operationContext.complete(bulkItemResponse);
        this.operationsCountRef.processedOperationCount++;
      }
    } catch (error) {
      // Mark all operations in the batch as failed
      for (const operation of this.batchOperationsList) {
        operation.operationContext.fail(error);
        this.operationsCountRef.failedOperationCount++;
        this.operationsCountRef.processedOperationCount++;
      }
    } finally {
      // Clean up batch state
      this.batchOperationsList = [];
    }
  }

  public getOperations(): ItemBulkOperation[] {
    return this.batchOperationsList;
  }
}
