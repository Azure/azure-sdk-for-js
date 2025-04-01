// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readPartitionKeyDefinition } from "../client/ClientUtils";
import type { Container } from "../client/Container";
import type { ClientContext } from "../ClientContext";
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { DiagnosticNodeType } from "../diagnostics/DiagnosticNodeInternal";
import { ErrorResponse, type RequestOptions } from "../request";
import type { PartitionKeyRangeCache } from "../routing";
import type { BulkOperationResult, Operation } from "../utils/batch";
import { BulkOperationType, isKeyInRange } from "../utils/batch";
import { hashPartitionKey } from "../utils/hashing/hash";
import { ResourceThrottleRetryPolicy } from "../retry";
import { BulkStreamerPerPartition } from "./BulkStreamerPerPartition";
import { ItemBulkOperationContext } from "./ItemBulkOperationContext";
import { Constants, copyObject, getPathFromLink, ResourceType } from "../common";
import { BulkResponse } from "./BulkResponse";
import type { ItemBulkOperation } from "./ItemBulkOperation";
import { addDiagnosticChild } from "../utils/diagnostics";
import { BulkExecutionRetryPolicy } from "../retry/bulkExecutionRetryPolicy";
import type { RetryPolicy } from "../retry/RetryPolicy";
import { Limiter } from "./Limiter";
import { convertToInternalPartitionKey, type PartitionKeyDefinition } from "../documents";
import type { ItemOperation } from "./ItemOperation";
import type { PatchOperation } from "../utils/patch";

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
  private partitionKeyDefinition: PartitionKeyDefinition;
  private partitionKeyDefinitionPromise: Promise<PartitionKeyDefinition>;
  private isCancelled: boolean;

  /**
   * @internal
   */
  constructor(
    container: Container,
    clientContext: ClientContext,
    partitionKeyRangeCache: PartitionKeyRangeCache,
    options: RequestOptions,
  ) {
    this.container = container;
    this.clientContext = clientContext;
    this.partitionKeyRangeCache = partitionKeyRangeCache;
    this.streamersByPartitionKeyRangeId = new Map();
    this.limitersByPartitionKeyRangeId = new Map();
    this.options = options;
    this.executeRequest = this.executeRequest.bind(this);
    this.reBatchOperation = this.reBatchOperation.bind(this);
    this.isCancelled = false;
  }

  /**
   * adds operation(s) to the streamer
   * @param operationInput - bulk operation or list of bulk operations
   */
  execute(operationInput: ItemOperation[]): Promise<BulkOperationResult>[] {
    if (this.isCancelled) {
      throw new ErrorResponse("Bulk execution cancelled due to a previous error.");
    }
    return operationInput.map((operation) => this.addOperation(operation));
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

  private async addOperation(operation: ItemOperation): Promise<BulkOperationResult> {
    if (this.isCancelled) {
      throw new ErrorResponse("Bulk execution cancelled due to a previous error.");
    }
    if (!operation) {
      throw new ErrorResponse("Operation is required.");
    }
    const diagnosticNode = new DiagnosticNodeInternal(
      this.clientContext.diagnosticLevel,
      DiagnosticNodeType.CLIENT_REQUEST_NODE,
      null,
    );
    if (!this.partitionKeyDefinition) {
      if (!this.partitionKeyDefinitionPromise) {
        this.partitionKeyDefinitionPromise = (async () => {
          try {
            const partitionKeyDefinition = await readPartitionKeyDefinition(
              diagnosticNode,
              this.container,
            );
            this.partitionKeyDefinition = partitionKeyDefinition;
            return partitionKeyDefinition;
          } finally {
            this.partitionKeyDefinitionPromise = null;
          }
        })();
      }
      await this.partitionKeyDefinitionPromise;
    }
    const plainTextOperation = copyObject(operation);
    // encrypt operations if encryption is enabled
    let operationError: Error;
    let partitionKeyRangeId: string;
    try {
      if (this.clientContext.enableEncryption) {
        operation = copyObject(operation);
        await this.container.checkAndInitializeEncryption();
        operation = await this.encryptionHelper(operation, diagnosticNode);
      }
      partitionKeyRangeId = await this.resolvePartitionKeyRangeId(operation, diagnosticNode);
    } catch (error) {
      operationError = error;
    }
    const streamerForPartition = this.getStreamerForPKRange(partitionKeyRangeId);
    // TODO: change implementation to add just retry context instead of retry policy in operation context
    const retryPolicy = this.getRetryPolicy();
    const context = new ItemBulkOperationContext(partitionKeyRangeId, retryPolicy, diagnosticNode);
    const itemOperation: ItemBulkOperation = {
      plainTextOperationInput: plainTextOperation,
      operationInput: operation,
      operationContext: context,
    };
    // if there was an error during encryption or resolving pkRangeId, reject the operation
    if (operationError) {
      context.fail(operationError);
    } else {
      streamerForPartition.add(itemOperation);
    }
    return context.operationPromise;
  }

  private async encryptionHelper(
    operation: ItemOperation,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<ItemOperation> {
    const partitionKeyInternal = convertToInternalPartitionKey(operation.partitionKey);
    operation.partitionKey =
      await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(partitionKeyInternal);
    switch (operation.operationType) {
      case BulkOperationType.Create:
      case BulkOperationType.Upsert:
        operation.resourceBody = await this.container.encryptionProcessor.encrypt(
          operation.resourceBody,
          diagnosticNode,
        );
        break;
      case BulkOperationType.Read:
      case BulkOperationType.Delete:
        operation.id = await this.container.encryptionProcessor.getEncryptedId(operation.id);
        break;
      case BulkOperationType.Replace:
        operation.id = await this.container.encryptionProcessor.getEncryptedId(operation.id);
        operation.resourceBody = await this.container.encryptionProcessor.encrypt(
          operation.resourceBody,
          diagnosticNode,
        );
        break;
      case BulkOperationType.Patch: {
        operation.id = await this.container.encryptionProcessor.getEncryptedId(operation.id);
        const body = operation.resourceBody;
        const patchRequestBody = (Array.isArray(body) ? body : body.operations) as PatchOperation[];
        for (const patchOperation of patchRequestBody) {
          if ("value" in patchOperation) {
            patchOperation.value = await this.container.encryptionProcessor.encryptProperty(
              patchOperation.path,
              patchOperation.value,
            );
          }
        }
        break;
      }
    }
    return operation;
  }

  private async resolvePartitionKeyRangeId(
    operation: ItemOperation,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<string> {
    try {
      const partitionKeyRanges = (
        await this.partitionKeyRangeCache.onCollectionRoutingMap(this.container.url, diagnosticNode)
      ).getOrderedParitionKeyRanges();

      const partitionKey = convertToInternalPartitionKey(operation.partitionKey);

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
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<BulkResponse> {
    if (this.isCancelled) {
      throw new ErrorResponse("Bulk execution cancelled due to a previous error.");
    }
    if (!operations.length) return;
    const pkRangeId = operations[0].operationContext.pkRangeId;
    const limiter = this.getLimiterForPKRange(pkRangeId);
    const path = getPathFromLink(this.container.url, ResourceType.item);
    const requestBody: Operation[] = [];
    for (const itemBulkOperation of operations) {
      requestBody.push(this.prepareOperation(itemBulkOperation.operationInput));
    }
    if (!this.options.containerRid) {
      this.options.containerRid = this.container._rid;
    }
    return new Promise<BulkResponse>((resolve, reject) => {
      limiter.take(async () => {
        try {
          // Check if any split/merge has happened on other batches belonging to same partition.
          // If so, don't send this request, and re-batch the operations.
          const stopDispatch = await limiter.isStopped();
          if (stopDispatch) {
            operations.map((operation) => {
              this.reBatchOperation(operation, diagnosticNode);
            });
            // Return empty response as the request is not sent.
            return resolve(BulkResponse.createEmptyResponse(operations, 0, 0, {}));
          }
          const response = await addDiagnosticChild(
            async (childNode: DiagnosticNodeInternal) =>
              this.clientContext.bulk({
                body: requestBody,
                partitionKeyRangeId: pkRangeId,
                path: path,
                resourceId: this.container.url,
                options: this.options,
                diagnosticNode: childNode,
              }),
            diagnosticNode,
            DiagnosticNodeType.BATCH_REQUEST,
          );
          if (!response) {
            throw new ErrorResponse("Failed to fetch bulk response.");
          }
          return resolve(BulkResponse.fromResponseMessage(response, operations));
        } catch (error) {
          if (this.clientContext.enableEncryption) {
            try {
              await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
            } catch (err) {
              this.cancelExecution();
              return reject(err);
            }
          }
          return resolve(BulkResponse.fromResponseMessage(error, operations));
        } finally {
          limiter.leave();
        }
      });
    });
  }

  private prepareOperation(operationInput: ItemOperation): Operation {
    operationInput.partitionKey = convertToInternalPartitionKey(operationInput.partitionKey);
    return {
      ...operationInput,
      partitionKey: JSON.stringify(operationInput.partitionKey),
    } as Operation;
  }

  private async reBatchOperation(
    operation: ItemBulkOperation,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<void> {
    const partitionKeyRangeId = await this.resolvePartitionKeyRangeId(
      operation.operationInput,
      diagnosticNode,
    );
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
        limiter.take(() => {});
      }
      this.limitersByPartitionKeyRangeId.set(pkRangeId, limiter);
    }
    return limiter;
  }

  private cancelExecution(): void {
    this.isCancelled = true;
    this.dispose();
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
      this.clientContext.diagnosticLevel,
      this.clientContext.enableEncryption,
      this.clientContext.getClientConfig(),
      this.container.encryptionProcessor,
    );
    this.streamersByPartitionKeyRangeId.set(pkRangeId, newStreamer);
    return newStreamer;
  }
}
