// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readPartitionKeyDefinition } from "../client/ClientUtils";
import type { Container } from "../client/Container";
import type { ClientContext } from "../ClientContext";
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { DiagnosticNodeType } from "../diagnostics/DiagnosticNodeInternal";
import { ErrorResponse, type RequestOptions } from "../request";
import type { PartitionKeyRangeCache } from "../routing";
import type { CosmosBulkOperationResult, CosmosBulkResponse, Operation, OperationInput } from "../utils/batch";
import { isKeyInRange } from "../utils/batch";
import { hashPartitionKey } from "../utils/hashing/hash";
import { ResourceThrottleRetryPolicy } from "../retry";
import { BulkHelperPerPartition } from "./BulkHelperPerPartition";
import { ItemBulkOperationContext } from "./ItemBulkOperationContext";
import { copyObject, getPathFromLink, ResourceType, sleep } from "../common";
import { BulkResponse } from "./BulkResponse";
import type { ItemBulkOperation } from "./ItemBulkOperation";
import { addDiagnosticChild } from "../utils/diagnostics";
import { BulkExecutionRetryPolicy } from "../retry/bulkExecutionRetryPolicy";
import type { RetryPolicy } from "../retry/RetryPolicy";
import { convertToInternalPartitionKey, type PartitionKeyDefinition } from "../documents";

/**
 * BulkHelper for bulk operations in a container.
 * It maintains one @see {@link BulkHelperPerPartition} for each Partition Key Range, which allows independent execution of requests. Semaphores are in place to rate limit the operations
 * at the helper / Partition Key Range level, this means that we can send parallel and independent requests to different Partition Key Ranges, but for the same Range, requests
 * will be limited. Two callback implementations define how a particular request should be executed, and how operations should be retried. When the helper dispatches a batch
 * the batch will create a request and call the execute callback (executeRequest), if conditions are met, it might call the retry callback (reBatchOperation).
 * @hidden
 */

export class BulkHelper {
  private readonly container: Container;
  private readonly clientContext: ClientContext;
  private readonly partitionKeyRangeCache: PartitionKeyRangeCache;
  private readonly helpersByPartitionKeyRangeId: Map<string, BulkHelperPerPartition>;
  private options: RequestOptions;
  private partitionKeyDefinition: PartitionKeyDefinition;
  private partitionKeyDefinitionPromise: Promise<PartitionKeyDefinition>;
  private isCancelled: boolean;
  private operationsCountRef: { processedOperationCount: number, failedOperationCount: number } = { processedOperationCount: 0, failedOperationCount: 0 };

  private operationPromisesList: Promise<CosmosBulkOperationResult>[] = [];
  private congestionControlTimer: NodeJS.Timeout;
  private readonly congestionControlDelayInMs: number = 1000;

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
    this.helpersByPartitionKeyRangeId = new Map();
    this.options = options;
    this.executeRequest = this.executeRequest.bind(this);
    this.reBatchOperation = this.reBatchOperation.bind(this);
    this.isCancelled = false;
    this.runCongestionControlTimer();
  }

  /**
   * adds operation(s) to the helper
   * @param operationInput - bulk operation or list of bulk operations
   */
  async execute(operationInput: OperationInput[]): Promise<CosmosBulkResponse> {
    if (this.isCancelled) {
      throw new ErrorResponse("Bulk execution cancelled due to a previous error.");
    }
    const addOperationPromises: Promise<void>[] = [];
    for (let i = 0; i < operationInput.length; i++) {
      if (i % 1000 === 0) {
        await sleep(0);
      }
      addOperationPromises.push(this.addOperation(operationInput[i]));
    }
    await Promise.allSettled(addOperationPromises);
    while (this.operationsCountRef.processedOperationCount < operationInput.length) {
      // wait for all operations to be fulfilled
      this.helpersByPartitionKeyRangeId.forEach((helper) => {
        helper.dispatchUnfilledBatch();
      });
      await sleep(1000);
    }
    const operationResults = await Promise.allSettled(this.operationPromisesList);
    const bulkResponse = {
      operations: operationResults.map((operationResult) => {
        if (operationResult.status === "fulfilled") {
          return operationResult.value;
        } else {
          return operationResult.reason;
        }
      }),
      isSuccess: this.operationsCountRef.failedOperationCount ? false : true,
    }
    if(this.congestionControlTimer) {
      clearInterval(this.congestionControlTimer);
    }
    return bulkResponse;
  }

  private async addOperation(operation: OperationInput): Promise<void> {
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
        // operation = await this.encryptionHelper(operation, diagnosticNode);
      }
      partitionKeyRangeId = await this.resolvePartitionKeyRangeId(operation, diagnosticNode);
    } catch (error) {
      operationError = error;
    }
    const helperForPartition = this.gethelperForPKRange(partitionKeyRangeId);
    // TODO: change implementation to add just retry context instead of retry policy in operation context
    const retryPolicy = this.getRetryPolicy();
    const context = new ItemBulkOperationContext(partitionKeyRangeId, retryPolicy, diagnosticNode);
    const itemOperation: ItemBulkOperation = {
      plainTextOperationInput: plainTextOperation,
      operationInput: operation,
      operationContext: context,
    };
    this.operationPromisesList.push(context.operationPromise);
    // if there was an error during encryption or resolving pkRangeId, reject the operation
    if (operationError) {
      context.fail(operationError);
      return Promise.reject();
    }
    return helperForPartition.add(itemOperation);
  }

  // private async encryptionHelper(
  //   operation: ItemOperation,
  //   diagnosticNode: DiagnosticNodeInternal,
  // ): Promise<ItemOperation> {
  //   const partitionKeyInternal = convertToInternalPartitionKey(operation.partitionKey);
  //   operation.partitionKey =
  //     await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(partitionKeyInternal);
  //   switch (operation.operationType) {
  //     case BulkOperationType.Create:
  //     case BulkOperationType.Upsert:
  //       operation.resourceBody = await this.container.encryptionProcessor.encrypt(
  //         operation.resourceBody,
  //         diagnosticNode,
  //       );
  //       break;
  //     case BulkOperationType.Read:
  //     case BulkOperationType.Delete:
  //       operation.id = await this.container.encryptionProcessor.getEncryptedId(operation.id);
  //       break;
  //     case BulkOperationType.Replace:
  //       operation.id = await this.container.encryptionProcessor.getEncryptedId(operation.id);
  //       operation.resourceBody = await this.container.encryptionProcessor.encrypt(
  //         operation.resourceBody,
  //         diagnosticNode,
  //       );
  //       break;
  //     case BulkOperationType.Patch: {
  //       operation.id = await this.container.encryptionProcessor.getEncryptedId(operation.id);
  //       const body = operation.resourceBody;
  //       const patchRequestBody = (Array.isArray(body) ? body : body.operations) as PatchOperation[];
  //       for (const patchOperation of patchRequestBody) {
  //         if ("value" in patchOperation) {
  //           patchOperation.value = await this.container.encryptionProcessor.encryptProperty(
  //             patchOperation.path,
  //             patchOperation.value,
  //           );
  //         }
  //       }
  //       break;
  //     }
  //   }
  //   return operation;
  // }

  private async resolvePartitionKeyRangeId(
    operation: OperationInput,
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
    const path = getPathFromLink(this.container.url, ResourceType.item);
    const requestBody: Operation[] = [];
    for (const itemBulkOperation of operations) {
      requestBody.push(this.prepareOperation(itemBulkOperation.operationInput));
    }
    if (!this.options.containerRid) {
      this.options.containerRid = this.container._rid;
    }
    try {
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
      return BulkResponse.fromResponseMessage(response, operations);
    } catch (error) {
      if (this.clientContext.enableEncryption) {
        try {
          await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
        } catch (err) {
          this.cancelExecution();
          return;
        }
      }
      return BulkResponse.fromResponseMessage(error, operations);
    }
  }

  private prepareOperation(operationInput: OperationInput): Operation {
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
    const helper = this.gethelperForPKRange(partitionKeyRangeId);
    helper.add(operation);
  }

  private cancelExecution(): void {
    this.isCancelled = true;
  }

  private gethelperForPKRange(pkRangeId: string): BulkHelperPerPartition {
    if (this.helpersByPartitionKeyRangeId.has(pkRangeId)) {
      return this.helpersByPartitionKeyRangeId.get(pkRangeId);
    }
    // const limiter = this.getLimiterForPKRange(pkRangeId);
    const newhelper = new BulkHelperPerPartition(
      this.executeRequest,
      this.reBatchOperation,
      this.clientContext.diagnosticLevel,
      this.clientContext.enableEncryption,
      this.clientContext.getClientConfig(),
      this.container.encryptionProcessor,
      this.operationsCountRef
    );
    this.helpersByPartitionKeyRangeId.set(pkRangeId, newhelper);
    return newhelper;
  }

  private runCongestionControlTimer(): void {
    this.congestionControlTimer = setInterval(() => {
      this.helpersByPartitionKeyRangeId.forEach((helper) => {
        helper.runCongestionAlgorithm();
      });
    }, this.congestionControlDelayInMs);
  }
}
