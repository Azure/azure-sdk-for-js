// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readPartitionKeyDefinition } from "../client/ClientUtils";
import type { Container } from "../client/Container";
import type { ClientContext } from "../ClientContext";
import { DiagnosticNodeType, type DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { ErrorResponse, type RequestOptions } from "../request";
import type { PartitionKeyRangeCache } from "../routing";
import type { BulkOptions, Operation, OperationInput, OperationResponse } from "../utils/batch";
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


export class BulkExecutor {

  private readonly container: Container;
  private readonly clientContext: ClientContext;
  private readonly partitionKeyRangeCache: PartitionKeyRangeCache;
  private streamersByPartitionKeyRangeId: Map<string, BulkStreamer> = new Map();
  private limitersByPartitionKeyRangeId: Map<string, semaphore.Semaphore> = new Map();


  constructor(container: Container, clientContext: ClientContext, partitionKeyRangeCache: PartitionKeyRangeCache) {
    this.container = container;
    this.clientContext = clientContext;
    this.partitionKeyRangeCache = partitionKeyRangeCache;

    this.executeRequest = this.executeRequest.bind(this);
    this.reBatchOperation = this.reBatchOperation.bind(this);
  }

  async executeBulk(
    operations: OperationInput[],
    diagnosticNode: DiagnosticNodeInternal,
    options: RequestOptions,
    bulkOptions: BulkOptions
  ): Promise<OperationResponse[]> {
    const orderedResponse = new Array<OperationResponse>(operations.length);
    const operationPromises = operations.map((operation, index) =>
      this.addOperation(operation, index, diagnosticNode, options, bulkOptions, orderedResponse)
    );
    try {
      await Promise.all(operationPromises);
    } catch (error) {
      throw new ErrorResponse(`Error during bulk execution: ${error}`);
    } finally {
      for (const streamer of this.streamersByPartitionKeyRangeId.values()) {
        streamer.disposeTimers();
      }
    }
    return orderedResponse;
  }


  private async addOperation(operation: OperationInput, index: number, diagnosticNode: DiagnosticNodeInternal, options: RequestOptions, bulkOptions: BulkOptions, orderedResponse: OperationResponse[]): Promise<OperationResponse> {
    if (!operation) {
      throw new ErrorResponse("operation is required.");
    }
    const partitionKeyRangeId = await this.resolvePartitionKeyRangeId(operation, diagnosticNode, options);
    const streamer = this.getOrCreateStreamerForPartitionKeyRange(partitionKeyRangeId, diagnosticNode, options, bulkOptions, orderedResponse);
    const context = new ItemBulkOperationContext(partitionKeyRangeId, new ResourceThrottleRetryPolicy())
    const itemOperation = new ItemBulkOperation(index, operation, context);
    streamer.add(itemOperation);
    return context.operationPromise;
  }

  async resolvePartitionKeyRangeId(
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

  async executeRequest(operations: ItemBulkOperation[], options: RequestOptions, bulkOptions: BulkOptions, diagnosticNode: DiagnosticNodeInternal): Promise<BulkResponse> {
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
    return new Promise<BulkResponse>((resolve, reject) => {
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
          resolve(new BulkResponse(response.code, response.substatus, response.headers, operations, response.result));
        } catch (error) {
          reject(error);
        } finally {
          limiter.leave();
        }
      });
    });
  }


  async reBatchOperation(operation: ItemBulkOperation, diagnosticNode: DiagnosticNodeInternal, options: RequestOptions, bulkOptions: BulkOptions, orderedResponse: OperationResponse[]): Promise<void> {
    const partitionKeyRangeId = await this.resolvePartitionKeyRangeId(operation.operationInput, diagnosticNode, options);
    operation.operationContext.reRouteOperation(partitionKeyRangeId);
    const streamer = this.getOrCreateStreamerForPartitionKeyRange(partitionKeyRangeId, diagnosticNode, options, bulkOptions, orderedResponse);
    streamer.add(operation);
  }

  getOrCreateLimiterForPartitionKeyRange(pkRangeId: string): semaphore.Semaphore {
    let limiter = this.limitersByPartitionKeyRangeId.get(pkRangeId);
    if (!limiter) {
      limiter = semaphore(Constants.BulkMaxDegreeOfConcurrency);
      this.limitersByPartitionKeyRangeId.set(pkRangeId, limiter);
    }
    return limiter;
  }


  getOrCreateStreamerForPartitionKeyRange(pkRangeId: string, diagnosticNode: DiagnosticNodeInternal, options: RequestOptions, bulkOptions: BulkOptions, orderedResponse: OperationResponse[]): BulkStreamer {
    if (this.streamersByPartitionKeyRangeId.has(pkRangeId)) {
      return this.streamersByPartitionKeyRangeId.get(pkRangeId);
    }
    this.getOrCreateLimiterForPartitionKeyRange(pkRangeId)
    const newStreamer = new BulkStreamer(this.executeRequest, this.reBatchOperation, options, bulkOptions, diagnosticNode, orderedResponse);
    this.streamersByPartitionKeyRangeId.set(pkRangeId, newStreamer)
    return newStreamer
  }

}
