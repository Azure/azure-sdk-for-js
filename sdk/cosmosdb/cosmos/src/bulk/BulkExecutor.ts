// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readPartitionKeyDefinition } from "../client/ClientUtils";
import type { Container } from "../client/Container";
import type { ClientContext } from "../ClientContext";
import { DiagnosticNodeType, type DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { ErrorResponse, type RequestOptions } from "../request";
import type { PartitionKeyRangeCache } from "../routing";
import type { BulkOptions, Operation, OperationInput } from "../utils/batch";
import { isKeyInRange, prepareOperations } from "../utils/batch";
import { hashPartitionKey } from "../utils/hashing/hash";
import { ResourceThrottleRetryPolicy } from "../retry";
import { BulkStreamer } from "./BulkStreamer";
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
 * BulkExecutor for bulk operations in a container.
 * It maintains one @see {@link BulkStreamer} for each Partition Key Range, which allows independent execution of requests. Semaphores are in place to rate limit the operations
 * at the Streamer / Partition Key Range level, this means that we can send parallel and independent requests to different Partition Key Ranges, but for the same Range, requests
 * will be limited. Two callback implementations define how a particular request should be executed, and how operations should be retried. When the streamer dispatches a batch
 * the batch will create a request and call the execute callback (executeRequest), if conditions are met, it might call the retry callback (reBatchOperation).
 * @hidden
 */

export class BulkExecutor {

  private readonly container: Container;
  private readonly clientContext: ClientContext;
  private readonly partitionKeyRangeCache: PartitionKeyRangeCache;
  private readonly streamersByPartitionKeyRangeId: Map<string, BulkStreamer>;
  private readonly limitersByPartitionKeyRangeId: Map<string, semaphore.Semaphore>;

  constructor(container: Container, clientContext: ClientContext, partitionKeyRangeCache: PartitionKeyRangeCache) {
    this.container = container;
    this.clientContext = clientContext;
    this.partitionKeyRangeCache = partitionKeyRangeCache;
    this.streamersByPartitionKeyRangeId = new Map();
    this.limitersByPartitionKeyRangeId = new Map();

    this.executeRequest = this.executeRequest.bind(this);
    this.reBatchOperation = this.reBatchOperation.bind(this);
  }

  async executeBulk(
    operations: OperationInput[],
    diagnosticNode: DiagnosticNodeInternal,
    options: RequestOptions,
    bulkOptions: BulkOptions
  ): Promise<BulkOperationResult[]> {
    const orderedResponse = new Array<BulkOperationResult>(operations.length);
    const operationPromises = operations.map((operation, index) =>
      this.addOperation(operation, index, diagnosticNode, options, bulkOptions, orderedResponse)
    );
    try {
      await Promise.all(operationPromises);
    } finally {
      for (const streamer of this.streamersByPartitionKeyRangeId.values()) {
        streamer.disposeTimers();
      }
    }
    return orderedResponse;
  }


  private async addOperation(operation: OperationInput, index: number, diagnosticNode: DiagnosticNodeInternal, options: RequestOptions, bulkOptions: BulkOptions, orderedResponse: BulkOperationResult[]): Promise<BulkOperationResult> {
    if (!operation) {
      throw new ErrorResponse("Operation is required.");
    }
    const partitionKeyRangeId = await this.resolvePartitionKeyRangeId(operation, diagnosticNode, options);
    const streamer = this.getOrCreateStreamerForPartitionKeyRange(partitionKeyRangeId, diagnosticNode, options, bulkOptions, orderedResponse);
    const retryPolicy = this.getRetryPolicy();
    const context = new ItemBulkOperationContext(partitionKeyRangeId, retryPolicy);
    const itemOperation = new ItemBulkOperation(index, operation, context);
    streamer.add(itemOperation);
    return context.operationPromise;
  }

  private async resolvePartitionKeyRangeId(
    operation: OperationInput,
    diagnosticNode: DiagnosticNodeInternal,
    options: RequestOptions,
  ): Promise<string> {
    try {
      const partitionKeyDefinition = await readPartitionKeyDefinition(
        diagnosticNode,
        this.container,
      );
      const partitionKeyRanges = (
        await this.partitionKeyRangeCache.onCollectionRoutingMap(this.container.url, diagnosticNode)
      ).getOrderedParitionKeyRanges();

      const { partitionKey } = prepareOperations(operation, partitionKeyDefinition, options);

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
      retryOptions.maxWaitTimeInSeconds
    );
    return new BulkExecutionRetryPolicy(this.container, nextRetryPolicy, this.partitionKeyRangeCache);
  }

  private async executeRequest(operations: ItemBulkOperation[], options: RequestOptions, bulkOptions: BulkOptions, diagnosticNode: DiagnosticNodeInternal): Promise<BulkResponse> {
    if (!operations.length) return;
    const pkRangeId = operations[0].operationContext.pkRangeId;
    const limiter = this.getOrCreateLimiterForPartitionKeyRange(pkRangeId);
    const path = getPathFromLink(this.container.url, ResourceType.item);
    const requestBody: Operation[] = [];
    const partitionDefinition = await readPartitionKeyDefinition(
      diagnosticNode,
      this.container,
    );
    for (const itemBulkOperation of operations) {
      const operationInput = itemBulkOperation.operationInput;
      const { operation } = prepareOperations(
        operationInput,
        partitionDefinition,
        options,
      );
      requestBody.push(operation)
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
          limiter.leave();
        }
      });
    });
  }


  private async reBatchOperation(operation: ItemBulkOperation, diagnosticNode: DiagnosticNodeInternal, options: RequestOptions, bulkOptions: BulkOptions, orderedResponse: BulkOperationResult[]): Promise<void> {
    const partitionKeyRangeId = await this.resolvePartitionKeyRangeId(operation.operationInput, diagnosticNode, options);
    operation.operationContext.reRouteOperation(partitionKeyRangeId);
    const streamer = this.getOrCreateStreamerForPartitionKeyRange(partitionKeyRangeId, diagnosticNode, options, bulkOptions, orderedResponse);
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


  private getOrCreateStreamerForPartitionKeyRange(pkRangeId: string, diagnosticNode: DiagnosticNodeInternal, options: RequestOptions, bulkOptions: BulkOptions, orderedResponse: BulkOperationResult[]): BulkStreamer {
    if (this.streamersByPartitionKeyRangeId.has(pkRangeId)) {
      return this.streamersByPartitionKeyRangeId.get(pkRangeId);
    }
    this.getOrCreateLimiterForPartitionKeyRange(pkRangeId)
    const newStreamer = new BulkStreamer(this.executeRequest, this.reBatchOperation, options, bulkOptions, diagnosticNode, orderedResponse);
    this.streamersByPartitionKeyRangeId.set(pkRangeId, newStreamer)
    return newStreamer
  }

}
