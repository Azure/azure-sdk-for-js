import { SearchClient } from "./searchClient";
import { IndexDocumentsBatch } from "./indexDocumentsBatch";
import {
  IndexDocumentsAction,
  SearchIndexingBufferedSenderOptions,
  SearchIndexingBufferedSenderUploadDocumentsOptions,
  SearchIndexingBufferedSenderMergeDocumentsOptions,
  SearchIndexingBufferedSenderMergeOrUploadDocumentsOptions,
  SearchIndexingBufferedSenderDeleteDocumentsOptions,
  SearchIndexingBufferedSenderFlushDocumentsOptions
} from "./indexModels";
import { IndexDocumentsResult } from "./generated/data/models";
import { RestError, OperationOptions } from "@azure/core-http";
import EventEmitter from "events";
import { createSpan } from "./tracing";
import { CanonicalCode } from "@opentelemetry/api";
import { SearchIndexingBufferedSender } from "./searchIndexingBufferedSender";

/**
 * Default Batch Size
 */
export const DEFAULT_BATCH_SIZE: number = 1000;
/**
 * Default window flush interval
 */
export const DEFAULT_FLUSH_WINDOW: number = 60000;
/**
 * Default number of times to retry
 */
export const DEFAULT_RETRY_COUNT: number = 3;

/**
 * Class used to perform buffered operations against a search index,
 * including adding, updating, and removing them.
 */
class SearchIndexingBufferedSenderImpl<T> implements SearchIndexingBufferedSender<T> {
  /**
   * Search Client used to call the underlying IndexBatch operations.
   */
  private client: SearchClient<T>;
  /**
   * Indicates if autoFlush is enabled.
   */
  private autoFlush: boolean;
  /**
   * Interval between flushes (in milliseconds).
   */
  private flushWindowInMs: number;
  /**
   * Size of the batch.
   */
  private batchSize: number;
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
   * Creates a new instance of SearchIndexingBufferedSender.
   *
   * @param client Search Client used to call the underlying IndexBatch operations.
   * @param options Options to modify auto flush.
   *
   */
  constructor(client: SearchClient<T>, options: SearchIndexingBufferedSenderOptions = {}) {
    this.client = client;
    this.autoFlush = options.autoFlush ?? false;
    this.flushWindowInMs = DEFAULT_FLUSH_WINDOW;
    this.batchSize = DEFAULT_BATCH_SIZE;
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
   * @param documents Documents to be uploaded.
   * @param options Upload options.
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
        documents
      });
      return this.internalFlush(false, updatedOptions);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Merges the documents/Adds the documents to the merge queue.
   *
   * @param documents Documents to be merged.
   * @param options Upload options.
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
        documents
      });
      return this.internalFlush(false, updatedOptions);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Merges/Uploads the documents/Adds the documents to the merge/upload queue.
   *
   * @param documents Documents to be merged/uploaded.
   * @param options Upload options.
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
        documents
      });
      return this.internalFlush(false, updatedOptions);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes the documents/Adds the documents to the delete queue.
   *
   * @param documents Documents to be deleted.
   * @param options Upload options.
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
        documents
      });
      return this.internalFlush(false, updatedOptions);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Flushes the queue manually.
   *
   * @param options Flush options.
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
        code: CanonicalCode.UNKNOWN,
        message: e.message
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
    this.cleanupTimer && this.cleanupTimer();
  }

  /**
   * Attach Batch Added Event
   *
   * @param event Event to be emitted
   * @param listener Event Listener
   */
  public on(event: "batchAdded", listener: (e: { action: string; documents: T[] }) => void): void;
  /**
   * Attach Batch Sent Event
   *
   * @param event Event to be emitted
   * @param listener Event Listener
   */
  public on(event: "beforeDocumentSent", listener: (e: IndexDocumentsAction<T>) => void): void;
  /**
   * Attach Batch Succeeded Event
   *
   * @param event Event to be emitted
   * @param listener Event Listener
   */
  public on(event: "batchSucceeded", listener: (e: IndexDocumentsResult) => void): void;
  /**
   * Attach Batch Failed Event
   *
   * @param event Event to be emitted
   * @param listener Event Listener
   */
  public on(event: "batchFailed", listener: (e: RestError) => void): void;
  public on(
    event: "batchAdded" | "beforeDocumentSent" | "batchSucceeded" | "batchFailed",
    listener: (e: any) => void
  ): void {
    this.emitter.on(event, listener);
  }

  /**
   * Detach Batch Added Event
   *
   * @param event Event to be emitted
   * @param listener Event Listener
   */
  public off(event: "batchAdded", listener: (e: { action: string; documents: T[] }) => void): void;
  /**
   * Detach Batch Sent Event
   *
   * @param event Event to be emitted
   * @param listener Event Listener
   */
  public off(event: "beforeDocumentSent", listener: (e: IndexDocumentsAction<T>) => void): void;
  /**
   * Detach Batch Succeeded Event
   *
   * @param event Event to be emitted
   * @param listener Event Listener
   */
  public off(event: "batchSucceeded", listener: (e: IndexDocumentsResult) => void): void;
  /**
   * Detach Batch Failed Event
   *
   * @param event Event to be emitted
   * @param listener Event Listener
   */
  public off(event: "batchFailed", listener: (e: RestError) => void): void;
  public off(
    event: "batchAdded" | "beforeDocumentSent" | "batchSucceeded" | "batchFailed",
    listener: (e: any) => void
  ): void {
    this.emitter.removeListener(event, listener);
  }

  private isBatchReady(): boolean {
    return this.batchObject.actions.length >= this.batchSize;
  }

  private async internalFlush(force: boolean, options: OperationOptions = {}): Promise<void> {
    if (force || (this.autoFlush && this.isBatchReady())) {
      // Split it
      const actions: IndexDocumentsAction<T>[] = this.batchObject.actions;
      this.batchObject = new IndexDocumentsBatch<T>();
      while (actions.length > 0) {
        const actionsToSend = actions.splice(0, this.batchSize);
        await this.submitDocuments(actionsToSend, options);
      }
    }
  }

  private async submitDocuments(
    actionsToSend: IndexDocumentsAction<T>[],
    options: OperationOptions,
    retryAttempt: number = 0
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
      if (this.isRetryAbleError(e) && retryAttempt < DEFAULT_RETRY_COUNT) {
        this.submitDocuments(actionsToSend, options, retryAttempt + 1);
      } else {
        this.emitter.emit("batchFailed", e);
        throw e;
      }
    }
  }

  private isRetryAbleError(e: any): boolean {
    return e.code && (e.code === "422" || e.code === "409" || e.code === "503");
  }
}
/**
 * Creates an object that satisfies the `SearchIndexingBufferedSender` interface.
 * @param client Search Client used to call the underlying IndexBatch operations.
 * @param options Options to modify auto flush.
 */
export function createSearchIndexingBufferedSender<T>(
  searchClient: SearchClient<T>,
  options: SearchIndexingBufferedSenderOptions = {}
): SearchIndexingBufferedSender<T> {
  return new SearchIndexingBufferedSenderImpl(searchClient, options);
}
