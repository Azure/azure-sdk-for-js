// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readPartitionKeyDefinition } from "../client/ClientUtils";
import type { Container } from "../client/Container";
import type { ClientContext } from "../ClientContext";
import { DiagnosticNodeInternal, DiagnosticNodeType } from "../diagnostics/DiagnosticNodeInternal";
import { ErrorResponse, type RequestOptions } from "../request";
import type { PartitionKeyRangeCache } from "../routing";
import type { BulkOptions, BulkStreamerResponse, Operation, OperationInput } from "../utils/batch";
import { isKeyInRange, prepareOperations } from "../utils/batch";
import { hashPartitionKey } from "../utils/hashing/hash";
import { ResourceThrottleRetryPolicy } from "../retry";
import { BulkStreamerPerPartition } from "./BulkStreamerPerPartition";
import { ItemBulkOperationContext } from "./ItemBulkOperationContext";
import semaphore from "semaphore";
import { Constants, getPathFromLink, ResourceType } from "../common";
import { BulkResponse } from "./BulkResponse";
import { ItemBulkOperation } from "./ItemBulkOperation";
import { addDignosticChild } from "../utils/diagnostics";
import type { BulkOperationResult } from "./BulkOperationResult";
import { BulkExecutionRetryPolicy } from "../retry/bulkExecutionRetryPolicy";
import type { RetryPolicy } from "../retry/RetryPolicy";

/**
 * BulkStreamer for bulk operations in a container.
 * It maintains one @see {@link BulkStreamer} for each Partition Key Range, which allows independent execution of requests. Semaphores are in place to rate limit the operations
 * at the Streamer / Partition Key Range level, this means that we can send parallel and independent requests to different Partition Key Ranges, but for the same Range, requests
 * will be limited. Two callback implementations define how a particular request should be executed, and how operations should be retried. When the streamer dispatches a batch
 * the batch will create a request and call the execute callback (executeRequest), if conditions are met, it might call the retry callback (reBatchOperation).
 * @hidden
 */

export class BulkStreamer {
  private readonly container: Container;
  private readonly clientContext: ClientContext;
  private readonly partitionKeyRangeCache: PartitionKeyRangeCache;
  private readonly streamersByPartitionKeyRangeId: Map<string, BulkStreamerPerPartition>;
  private readonly limitersByPartitionKeyRangeId: Map<string, semaphore.Semaphore>;
  private options: RequestOptions;
  private bulkOptions: BulkOptions;
  private orderedResponse: BulkOperationResult[] = [];
  private diagnosticNode: DiagnosticNodeInternal;
  private operationPromises: Promise<BulkOperationResult>[] = [];
  private operationIndex: number = 0;

  constructor(
    container: Container,
    clientContext: ClientContext,
    partitionKeyRangeCache: PartitionKeyRangeCache,
  ) {
    this.container = container;
    this.clientContext = clientContext;
    this.partitionKeyRangeCache = partitionKeyRangeCache;
    this.streamersByPartitionKeyRangeId = new Map();
    this.limitersByPartitionKeyRangeId = new Map();

    this.executeRequest = this.executeRequest.bind(this);
    this.reBatchOperation = this.reBatchOperation.bind(this);
  }

  initializeBulk(options: RequestOptions, bulkOptions: BulkOptions): void {
    this.orderedResponse = [];
    this.options = options;
    this.bulkOptions = bulkOptions;
    this.operationIndex = 0;
    this.operationPromises = [];
    this.diagnosticNode = new DiagnosticNodeInternal(
      this.clientContext.diagnosticLevel,
      DiagnosticNodeType.CLIENT_REQUEST_NODE,
      null,
    );
  }

  /** add an operation or a list of operations to Bulk Streamer */
  addBulkOperation(operationInput: OperationInput | OperationInput[]): void {
    if (Array.isArray(operationInput)) {
      operationInput.forEach((operation) => {
        const operationPromise = this.addOperation(operation);
        this.operationPromises.push(operationPromise);
      });
    } else {
      const operationPromise = this.addOperation(operationInput);
      this.operationPromises.push(operationPromise);
    }
  }

  private async addOperation(operation: OperationInput): Promise<BulkOperationResult> {
    if (!operation) {
      throw new ErrorResponse("Operation is required.");
    }
    const partitionKeyRangeId = await this.resolvePartitionKeyRangeId(operation);
    const streamerForPartition = this.getOrCreateStreamerForPartitionKeyRange(partitionKeyRangeId);
    const retryPolicy = this.getRetryPolicy();
    const context = new ItemBulkOperationContext(partitionKeyRangeId, retryPolicy);
    const itemOperation = new ItemBulkOperation(this.operationIndex, operation, context);
    streamerForPartition.add(itemOperation);
    return context.operationPromise;
  }

  async finishBulk(): Promise<BulkStreamerResponse> {
    let orderedOperationsResult: BulkOperationResult[];

    try {
      const settledResults = await Promise.allSettled(this.operationPromises);
      orderedOperationsResult = settledResults.map((result) => {
        if (result.status === "fulfilled") {
          return result.value;
        } else {
          throw result.reason;
        }
      });
    } finally {
      for (const [key, streamer] of this.streamersByPartitionKeyRangeId.entries()) {
        streamer.disposeTimers();
        this.limitersByPartitionKeyRangeId.delete(key);
        this.streamersByPartitionKeyRangeId.delete(key);
      }
    }

    const response: BulkStreamerResponse = Object.assign([...orderedOperationsResult], {
      diagnostics: this.diagnosticNode.toDiagnostic(this.clientContext.getClientConfig()),
    });
    return response;
  }

  private async resolvePartitionKeyRangeId(operation: OperationInput): Promise<string> {
    try {
      const partitionKeyDefinition = await readPartitionKeyDefinition(
        this.diagnosticNode,
        this.container,
      );
      const partitionKeyRanges = (
        await this.partitionKeyRangeCache.onCollectionRoutingMap(
          this.container.url,
          this.diagnosticNode,
        )
      ).getOrderedParitionKeyRanges();

      const { partitionKey } = prepareOperations(operation, partitionKeyDefinition, this.options);

      const hashedKey = hashPartitionKey(partitionKey, partitionKeyDefinition);

      const matchingRange = partitionKeyRanges.find((range) =>
        isKeyInRange(range.minInclusive, range.maxExclusive, hashedKey),
      );

      if (!matchingRange) {
        throw new Error("No matching partition key range found for the operation.");
      }
      return matchingRange.id;
    } catch (error) {
      console.error("Error determining partition key range ID:", error);
      throw error;
    }
  }

  private getRetryPolicy(): RetryPolicy {
    const retryOptions = this.clientContext.getRetryOptions();
    const nextRetryPolicy = new ResourceThrottleRetryPolicy(
      retryOptions.maxRetryAttemptCount,
      retryOptions.fixedRetryIntervalInMilliseconds,
      retryOptions.maxWaitTimeInSeconds,
    );
    return new BulkExecutionRetryPolicy(
      this.container,
      nextRetryPolicy,
      this.partitionKeyRangeCache,
    );
  }

  private async executeRequest(
    operations: ItemBulkOperation[],
    options: RequestOptions,
    bulkOptions: BulkOptions,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<BulkResponse> {
    if (!operations.length) return;
    const pkRangeId = operations[0].operationContext.pkRangeId;
    const limiter = this.getOrCreateLimiterForPartitionKeyRange(pkRangeId);
    const path = getPathFromLink(this.container.url, ResourceType.item);
    const requestBody: Operation[] = [];
    const partitionDefinition = await readPartitionKeyDefinition(diagnosticNode, this.container);
    for (const itemBulkOperation of operations) {
      const operationInput = itemBulkOperation.operationInput;
      const { operation } = prepareOperations(operationInput, partitionDefinition, options);
      requestBody.push(operation);
    }
    return new Promise<BulkResponse>((resolve, _reject) => {
      limiter.take(async () => {
        try {
          const response = await addDignosticChild(
            async (childNode: DiagnosticNodeInternal) =>
              this.clientContext.bulk({
                body: requestBody,
                partitionKeyRangeId: pkRangeId,
                path,
                resourceId: this.container.url,
                bulkOptions,
                options,
                diagnosticNode: childNode,
              }),
            diagnosticNode,
            DiagnosticNodeType.BATCH_REQUEST,
          );
          resolve(BulkResponse.fromResponseMessage(response, operations));
        } catch (error) {
          resolve(BulkResponse.fromResponseMessage(error, operations));
        } finally {
          if (limiter.current > 0) {
            limiter.leave();
          }
        }
      });
    });
  }

  private async reBatchOperation(operation: ItemBulkOperation): Promise<void> {
    const partitionKeyRangeId = await this.resolvePartitionKeyRangeId(operation.operationInput);
    operation.operationContext.reRouteOperation(partitionKeyRangeId);
    const streamer = this.getOrCreateStreamerForPartitionKeyRange(partitionKeyRangeId);
    streamer.add(operation);
  }

  private getOrCreateLimiterForPartitionKeyRange(pkRangeId: string): semaphore.Semaphore {
    let limiter = this.limitersByPartitionKeyRangeId.get(pkRangeId);
    if (!limiter) {
      limiter = semaphore(Constants.BulkMaxDegreeOfConcurrency);
      this.limitersByPartitionKeyRangeId.set(pkRangeId, limiter);
    }
    return limiter;
  }

  private getOrCreateStreamerForPartitionKeyRange(pkRangeId: string): BulkStreamerPerPartition {
    if (this.streamersByPartitionKeyRangeId.has(pkRangeId)) {
      return this.streamersByPartitionKeyRangeId.get(pkRangeId);
    }
    const limiter = this.getOrCreateLimiterForPartitionKeyRange(pkRangeId);
    const newStreamer = new BulkStreamerPerPartition(
      this.executeRequest,
      this.reBatchOperation,
      limiter,
      this.options,
      this.bulkOptions,
      this.diagnosticNode,
      this.orderedResponse,
    );
    this.streamersByPartitionKeyRangeId.set(pkRangeId, newStreamer);
    return newStreamer;
  }
}
