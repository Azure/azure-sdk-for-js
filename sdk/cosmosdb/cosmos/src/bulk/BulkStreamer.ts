// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readPartitionKeyDefinition } from "../client/ClientUtils";
import type { Container } from "../client/Container";
import type { ClientContext } from "../ClientContext";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { DiagnosticNodeType } from "../diagnostics/DiagnosticNodeInternal";
import { ErrorResponse, type RequestOptions } from "../request";
import type { PartitionKeyRangeCache } from "../routing";
import type {
  BulkOperationResult,
  Operation,
  OperationInput,
} from "../utils/batch";
import { isKeyInRange, prepareOperations } from "../utils/batch";
import { hashPartitionKey } from "../utils/hashing/hash";
import { ResourceThrottleRetryPolicy } from "../retry";
import { BulkStreamerPerPartition } from "./BulkStreamerPerPartition";
import { ItemBulkOperationContext } from "./ItemBulkOperationContext";
import { Constants, getPathFromLink, ResourceType } from "../common";
import { BulkResponse } from "./BulkResponse";
import type { ItemBulkOperation } from "./ItemBulkOperation";
import { addDignosticChild } from "../utils/diagnostics";
import { BulkExecutionRetryPolicy } from "../retry/bulkExecutionRetryPolicy";
import type { RetryPolicy } from "../retry/RetryPolicy";
import { Limiter } from "./Limiter";
import type { PartitionKeyDefinition } from "../documents";

/**
 * BulkStreamer for bulk operations in a container.
 * It maintains one @see {@link BulkStreamerPerPartition} for each Partition Key Range, which allows independent execution of requests. Semaphores are in place to rate limit the operations
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
  private readonly limitersByPartitionKeyRangeId: Map<string, Limiter>;
  private options: RequestOptions;
  private diagnosticNode: DiagnosticNodeInternal;
  private partitionKeyDefinition: PartitionKeyDefinition;
  private partitionKeyDefinitionPromise: Promise<PartitionKeyDefinition>;

  /**
   * @internal
   */
  constructor(
    container: Container,
    clientContext: ClientContext,
    partitionKeyRangeCache: PartitionKeyRangeCache,
    options: RequestOptions,
    diagnosticNode: DiagnosticNodeInternal,

  ) {
    this.container = container;
    this.clientContext = clientContext;
    this.partitionKeyRangeCache = partitionKeyRangeCache;
    this.streamersByPartitionKeyRangeId = new Map();
    this.limitersByPartitionKeyRangeId = new Map();
    this.options = options;
    this.diagnosticNode = diagnosticNode;
    this.executeRequest = this.executeRequest.bind(this);
    this.reBatchOperation = this.reBatchOperation.bind(this);
  }

  /**
   * adds operation(s) to the streamer
   * @param operationInput - bulk operation or list of bulk operations
   */
  execute(
    operationInput: OperationInput[]
  ): Promise<BulkOperationResult>[] {
    return operationInput.map(operation => this.addOperation(operation));
  }


  /**
   * dispose all the timers, streamers, and limiters
   * @returns bulk response
   */
  dispose(): void {
    for (const streamer of this.streamersByPartitionKeyRangeId.values()) {
      streamer.disposeTimers();
    }
    this.streamersByPartitionKeyRangeId.clear();
    this.limitersByPartitionKeyRangeId.clear();
  }

  private async addOperation(operation: OperationInput): Promise<BulkOperationResult> {
    if (!operation) {
      throw new ErrorResponse("Operation is required.");
    }
    if (!this.partitionKeyDefinition) {
      if (!this.partitionKeyDefinitionPromise) {
        this.partitionKeyDefinitionPromise = (async () => {
          try {
            const partitionKeyDefinition = await readPartitionKeyDefinition(this.diagnosticNode, this.container);
            this.partitionKeyDefinition = partitionKeyDefinition;
            return partitionKeyDefinition;
          } finally {
            this.partitionKeyDefinitionPromise = null;
          }
        })();
      }
      await this.partitionKeyDefinitionPromise;
    }
    const partitionKeyRangeId = await this.resolvePartitionKeyRangeId(operation);
    const streamerForPartition = this.getStreamerForPKRange(partitionKeyRangeId);
    // TODO: change implementation to add just retry context instead of retry policy in operation context
    const retryPolicy = this.getRetryPolicy();
    const context = new ItemBulkOperationContext(partitionKeyRangeId, retryPolicy);
    const itemOperation: ItemBulkOperation = {
      operationInput: operation,
      operationContext: context,
    };
    streamerForPartition.add(itemOperation);
    return context.operationPromise;
  }

  private async resolvePartitionKeyRangeId(operation: OperationInput): Promise<string> {
    try {
      const partitionKeyRanges = (
        await this.partitionKeyRangeCache.onCollectionRoutingMap(
          this.container.url,
          this.diagnosticNode,
        )
      ).getOrderedParitionKeyRanges();

      const { partitionKey } = prepareOperations(operation, this.partitionKeyDefinition, this.options);

      const hashedKey = hashPartitionKey(partitionKey, this.partitionKeyDefinition);

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
    const nextRetryPolicy = new ResourceThrottleRetryPolicy(this.clientContext.getRetryOptions());
    return new BulkExecutionRetryPolicy(
      this.container,
      nextRetryPolicy,
      this.partitionKeyRangeCache,
    );
  }

  private async executeRequest(
    operations: ItemBulkOperation[],
    options: RequestOptions,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<BulkResponse> {
    if (!operations.length) return;
    const pkRangeId = operations[0].operationContext.pkRangeId;
    const limiter = this.getLimiterForPKRange(pkRangeId);
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
          // Check if any split/merge has happened on other batches belonging to same partition.
          // If so, don't send this request, and re-batch the operations.
          const stopDispatch = await limiter.isStopped();
          if (stopDispatch) {
            operations.map((operation) => {
              this.reBatchOperation(operation);
            });
            // Return empty response as the request is not sent.
            resolve(BulkResponse.createEmptyResponse(operations, 0, 0, {}));
          }
          const response = await addDignosticChild(
            async (childNode: DiagnosticNodeInternal) =>
              this.clientContext.bulk({
                body: requestBody,
                partitionKeyRangeId: pkRangeId,
                path: path,
                resourceId: this.container.url,
                options: options,
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

  private async reBatchOperation(operation: ItemBulkOperation): Promise<void> {
    const partitionKeyRangeId = await this.resolvePartitionKeyRangeId(operation.operationInput);
    operation.operationContext.updatePKRangeId(partitionKeyRangeId);
    const streamer = this.getStreamerForPKRange(partitionKeyRangeId);
    streamer.add(operation);
  }

  private getLimiterForPKRange(pkRangeId: string): Limiter {
    let limiter = this.limitersByPartitionKeyRangeId.get(pkRangeId);
    if (!limiter) {
      limiter = new Limiter(Constants.BulkMaxDegreeOfConcurrency);
      // starting with degree of concurrency as 1
      for (let i = 1; i < Constants.BulkMaxDegreeOfConcurrency; ++i) {
        limiter.take(() => { });
      }
      this.limitersByPartitionKeyRangeId.set(pkRangeId, limiter);
    }
    return limiter;
  }

  private getStreamerForPKRange(pkRangeId: string): BulkStreamerPerPartition {
    if (this.streamersByPartitionKeyRangeId.has(pkRangeId)) {
      return this.streamersByPartitionKeyRangeId.get(pkRangeId);
    }
    const limiter = this.getLimiterForPKRange(pkRangeId);
    const newStreamer = new BulkStreamerPerPartition(
      this.executeRequest,
      this.reBatchOperation,
      limiter,
      this.options,
      this.diagnosticNode,
    );
    this.streamersByPartitionKeyRangeId.set(pkRangeId, newStreamer);
    return newStreamer;
  }
}
