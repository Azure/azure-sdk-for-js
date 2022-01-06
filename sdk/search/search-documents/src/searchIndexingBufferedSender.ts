// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { IndexDocumentsBatch } from "./indexDocumentsBatch";
import {
  IndexDocumentsAction,
  SearchIndexingBufferedSenderOptions,
  SearchIndexingBufferedSenderUploadDocumentsOptions,
  SearchIndexingBufferedSenderMergeDocumentsOptions,
  SearchIndexingBufferedSenderMergeOrUploadDocumentsOptions,
  SearchIndexingBufferedSenderDeleteDocumentsOptions,
  SearchIndexingBufferedSenderFlushDocumentsOptions,
  IndexDocumentsOptions,
} from "./indexModels";
import { IndexDocumentsResult } from "./generated/data/models";
import { OperationOptions } from "@azure/core-client";
import EventEmitter from "events";
import { createSpan } from "./tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import { delay } from "./serviceUtils";
import { getRandomIntegerInclusive } from "./serviceUtils";
import { RestError } from "@azure/core-rest-pipeline";

/**
 * Index Documents Client
 */
export interface IndexDocumentsClient<T> {
  /**
   * Perform a set of index modifications (upload, merge, mergeOrUpload, delete)
   * for the given set of documents.
   *
   * @param batch - An array of actions to perform on the index.
   * @param options - Additional options.
   */
  indexDocuments(
    batch: IndexDocumentsBatch<T>,
    options: IndexDocumentsOptions
  ): Promise<IndexDocumentsResult>;
}

/**
 * Default Batch Size
 */
export const DEFAULT_BATCH_SIZE: number = 512;
/**
 * Default window flush interval
 */
export const DEFAULT_FLUSH_WINDOW: number = 60000;
/**
 * Default number of times to retry.
 */
export const DEFAULT_RETRY_COUNT: number = 3;
/**
 * Default retry delay.
 */
export const DEFAULT_RETRY_DELAY: number = 800;
/**
 * Default Max Delay between retries.
 */
export const DEFAULT_MAX_RETRY_DELAY: number = 60000;

/**
 * Class used to perform buffered operations against a search index,
 * including adding, updating, and removing them.
 */
export class SearchIndexingBufferedSender<T> {
  /**
   * Search Client used to call the underlying IndexBatch operations.
   */
  private client: IndexDocumentsClient<T>;
  /**
   * Indicates if autoFlush is enabled.
   */
  private autoFlush: boolean;
  /**
   * Interval between flushes (in milliseconds).
   */
  private flushWindowInMs: number;
  /**
   * Delay between retries
   */
  private throttlingDelayInMs: number;
  /**
   * Maximum number of Retries
   */
  private maxRetriesPerAction: number;
  /**
   * Max Delay between retries
   */
  private maxThrottlingDelayInMs: number;
  /**
   * Size of the batch.
   */
  private initialBatchActionCount: number;
  /**
   * Batch object used to complete the service call.
   */
  private batchObject: IndexDocumentsBatch<T>;
  /**
   * Clean up for the timer
   */
  private cleanupTimer?: () => void;
  /**
   * Event emitter/publisher used in the Buffered Sender
   */
  private readonly emitter = new EventEmitter();
  /**
   * Method to retrieve the document key
   */
  private documentKeyRetriever: (document: T) => string;

  /**
   * Creates a new instance of SearchIndexingBufferedSender.
   *
   * @param client - Search Client used to call the underlying IndexBatch operations.
   * @param options - Options to modify auto flush.
   *
   */
  constructor(
    client: IndexDocumentsClient<T>,
    documentKeyRetriever: (document: T) => string,
    options: SearchIndexingBufferedSenderOptions = {}
  ) {
    this.client = client;
    this.documentKeyRetriever = documentKeyRetriever;
    // General Configuration properties
    this.autoFlush = options.autoFlush ?? true;
    this.initialBatchActionCount = options.initialBatchActionCount ?? DEFAULT_BATCH_SIZE;
    this.flushWindowInMs = options.flushWindowInMs ?? DEFAULT_FLUSH_WINDOW;
    // Retry specific configuration properties
    this.throttlingDelayInMs = options.throttlingDelayInMs ?? DEFAULT_FLUSH_WINDOW;
    this.maxRetriesPerAction = options.maxRetriesPerAction ?? DEFAULT_RETRY_COUNT;
    this.maxThrottlingDelayInMs = options.maxThrottlingDelayInMs ?? DEFAULT_MAX_RETRY_DELAY;

    this.batchObject = new IndexDocumentsBatch<T>();
    if (this.autoFlush) {
      const interval = setInterval(() => this.flush(), this.flushWindowInMs);
      interval?.unref();
      this.cleanupTimer = () => {
        clearInterval(interval);
      };
    }
  }

  /**
   * Uploads the documents/Adds the documents to the upload queue.
   *
   * @param documents - Documents to be uploaded.
   * @param options - Upload options.
   */
  public async uploadDocuments(
    documents: T[],
    options: SearchIndexingBufferedSenderUploadDocumentsOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexingBufferedSender-uploadDocuments",
      options
    );
    try {
      this.batchObject.upload(documents);
      this.emitter.emit("batchAdded", {
        action: "upload",
        documents,
      });
      return this.internalFlush(false, updatedOptions);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Merges the documents/Adds the documents to the merge queue.
   *
   * @param documents - Documents to be merged.
   * @param options - Upload options.
   */
  public async mergeDocuments(
    documents: T[],
    options: SearchIndexingBufferedSenderMergeDocumentsOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexingBufferedSender-mergeDocuments",
      options
    );
    try {
      this.batchObject.merge(documents);
      this.emitter.emit("batchAdded", {
        action: "merge",
        documents,
      });
      return this.internalFlush(false, updatedOptions);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Merges/Uploads the documents/Adds the documents to the merge/upload queue.
   *
   * @param documents - Documents to be merged/uploaded.
   * @param options - Upload options.
   */
  public async mergeOrUploadDocuments(
    documents: T[],
    options: SearchIndexingBufferedSenderMergeOrUploadDocumentsOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexingBufferedSender-mergeOrUploadDocuments",
      options
    );
    try {
      this.batchObject.mergeOrUpload(documents);
      this.emitter.emit("batchAdded", {
        action: "mergeOrUpload",
        documents,
      });
      return this.internalFlush(false, updatedOptions);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes the documents/Adds the documents to the delete queue.
   *
   * @param documents - Documents to be deleted.
   * @param options - Upload options.
   */
  public async deleteDocuments(
    documents: T[],
    options: SearchIndexingBufferedSenderDeleteDocumentsOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexingBufferedSender-deleteDocuments",
      options
    );
    try {
      this.batchObject.delete(documents);
      this.emitter.emit("batchAdded", {
        action: "delete",
        documents,
      });
      return this.internalFlush(false, updatedOptions);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Flushes the queue manually.
   *
   * @param options - Flush options.
   */
  public async flush(
    options: SearchIndexingBufferedSenderFlushDocumentsOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexingBufferedSender-flush", options);
    try {
      if (this.batchObject.actions.length > 0) {
        return this.internalFlush(true, updatedOptions);
      }
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * If using autoFlush: true, call this to cleanup the autoflush timer.
   */
  public async dispose(): Promise<void> {
    if (this.batchObject.actions.length > 0) {
      await this.internalFlush(true);
    }
    if (this.cleanupTimer) {
      this.cleanupTimer();
    }
  }

  /**
   * Attach Batch Added Event
   *
   * @param event - Event to be emitted
   * @param listener - Event Listener
   */
  public on(event: "batchAdded", listener: (e: { action: string; documents: T[] }) => void): void;
  /**
   * Attach Batch Sent Event
   *
   * @param event - Event to be emitted
   * @param listener - Event Listener
   */
  public on(event: "beforeDocumentSent", listener: (e: IndexDocumentsAction<T>) => void): void;
  /**
   * Attach Batch Succeeded Event
   *
   * @param event - Event to be emitted
   * @param listener - Event Listener
   */
  public on(event: "batchSucceeded", listener: (e: IndexDocumentsResult) => void): void;
  /**
   * Attach Batch Failed Event
   *
   * @param event - Event to be emitted
   * @param listener - Event Listener
   */
  public on(event: "batchFailed", listener: (e: RestError) => void): void;
  public on(
    event: "batchAdded" | "beforeDocumentSent" | "batchSucceeded" | "batchFailed" | "batchResizing",
    listener: (e: any) => void
  ): void {
    this.emitter.on(event, listener);
  }

  /**
   * Detach Batch Added Event
   *
   * @param event - Event to be emitted
   * @param listener - Event Listener
   */
  public off(event: "batchAdded", listener: (e: { action: string; documents: T[] }) => void): void;
  /**
   * Detach Batch Sent Event
   *
   * @param event - Event to be emitted
   * @param listener - Event Listener
   */
  public off(event: "beforeDocumentSent", listener: (e: IndexDocumentsAction<T>) => void): void;
  /**
   * Detach Batch Succeeded Event
   *
   * @param event - Event to be emitted
   * @param listener - Event Listener
   */
  public off(event: "batchSucceeded", listener: (e: IndexDocumentsResult) => void): void;
  /**
   * Detach Batch Failed Event
   *
   * @param event - Event to be emitted
   * @param listener - Event Listener
   */
  public off(event: "batchFailed", listener: (e: RestError) => void): void;
  public off(
    event: "batchAdded" | "beforeDocumentSent" | "batchSucceeded" | "batchFailed",
    listener: (e: any) => void
  ): void {
    this.emitter.removeListener(event, listener);
  }

  private isBatchReady(): boolean {
    return this.batchObject.actions.length >= this.initialBatchActionCount;
  }

  private async internalFlush(force: boolean, options: OperationOptions = {}): Promise<void> {
    if (force || (this.autoFlush && this.isBatchReady())) {
      // Split it
      const actions: IndexDocumentsAction<T>[] = this.batchObject.actions;
      this.batchObject = new IndexDocumentsBatch<T>();
      while (actions.length > 0) {
        const actionsToSend = actions.splice(0, this.initialBatchActionCount);
        const { batchToSubmit, submitLater } = this.pruneActions(actionsToSend);
        actions.unshift(...submitLater);
        await this.submitDocuments(batchToSubmit, options);
      }
    }
  }

  private pruneActions(batch: IndexDocumentsAction<T>[]): {
    batchToSubmit: IndexDocumentsAction<T>[];
    submitLater: IndexDocumentsAction<T>[];
  } {
    const hashSet: Set<string> = new Set<string>();
    const resultBatch: IndexDocumentsAction<T>[] = [];
    const pruned: IndexDocumentsAction<T>[] = [];

    for (const document of batch) {
      const key = this.documentKeyRetriever(document as unknown as T);
      if (hashSet.has(key)) {
        pruned.push(document);
      } else {
        hashSet.add(key);
        resultBatch.push(document);
      }
    }
    return { batchToSubmit: resultBatch, submitLater: pruned };
  }

  private async submitDocuments(
    actionsToSend: IndexDocumentsAction<T>[],
    options: OperationOptions,
    retryAttempt: number = 1
  ): Promise<void> {
    try {
      for (const action of actionsToSend) {
        this.emitter.emit("beforeDocumentSent", action);
      }
      const result = await this.client.indexDocuments(
        new IndexDocumentsBatch<T>(actionsToSend),
        options
      );
      // raise success event
      this.emitter.emit("batchSucceeded", result);
    } catch (e) {
      if (e.statusCode && e.statusCode === 413 && actionsToSend.length > 1) {
        // Cut the payload size to half
        const splitActionsArray = [
          actionsToSend.slice(0, actionsToSend.length / 2),
          actionsToSend.slice(actionsToSend.length / 2, actionsToSend.length),
        ];
        this.initialBatchActionCount = splitActionsArray[0].length; // So, we do not want 413 happening again and again
        for (const actions of splitActionsArray) {
          await this.submitDocuments(actions, options);
        }
      } else if (this.isRetryAbleError(e) && retryAttempt <= this.maxRetriesPerAction) {
        // Exponentially increase the delay each time
        const exponentialDelay = this.throttlingDelayInMs * Math.pow(2, retryAttempt);
        // Don't let the delay exceed the maximum
        const clampedExponentialDelay = Math.min(this.maxThrottlingDelayInMs, exponentialDelay);
        // Allow the final value to have some "jitter" (within 50% of the delay size) so
        // that retries across multiple clients don't occur simultaneously.
        const delayWithJitter =
          clampedExponentialDelay / 2 + getRandomIntegerInclusive(0, clampedExponentialDelay / 2);
        await delay(delayWithJitter);
        await this.submitDocuments(actionsToSend, options, retryAttempt + 1);
      } else {
        this.emitter.emit("batchFailed", e);
        throw e;
      }
    }
  }

  private isRetryAbleError(e: any): boolean {
    return e.statusCode && (e.statusCode === 422 || e.statusCode === 409 || e.statusCode === 503);
  }
}
