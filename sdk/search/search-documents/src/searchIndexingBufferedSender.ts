import {SearchClient} from "./searchClient";
import {IndexDocumentsBatch} from "./indexDocumentsBatch";
import {IndexDocumentsAction, SearchIndexingBufferedSenderOptions, SearchIndexingBufferedSenderUploadDocumentsOptions, SearchIndexingBufferedSenderMergeDocumentsOptions, SearchIndexingBufferedSenderMergeOrUploadDocumentsOptions, SearchIndexingBufferedSenderDeleteDocumentsOptions, SearchIndexingBufferedSenderFlushDocumentsOptions} from "./indexModels";
import {IndexDocumentsResult} from "./generated/data/models";
import {RestError, OperationOptions} from "@azure/core-http";
import EventEmitter from 'events';
import {createSpan} from "./tracing";
import {CanonicalCode} from "@opentelemetry/api";

const DEFAULT_BATCH_SIZE:number = 1000;
const DEFAULT_FLUSH_WINDOW:number = 60000;
const RETRY_COUNT:number = 3;

/**
 * Class used to perform buffered operations against a search index,
 * including adding, updating, and removing them.
 */
export class SearchIndexingBufferedSender<T> {
  private client:SearchClient<T>;
  private autoFlush:boolean;
  private flushWindowInMs:number;
  private batchSize:number;
  private batchObject: IndexDocumentsBatch<T>;
  private cleanupTimer?: () => void;
  private readonly emitter = new EventEmitter();

  constructor(client: SearchClient<T>, options: SearchIndexingBufferedSenderOptions = {}) {
    this.client = client;
    this.autoFlush = options.autoFlush ?? false;
    this.flushWindowInMs = options.flushWindowInMs?? DEFAULT_FLUSH_WINDOW;
    this.batchSize = options.batchSize?? DEFAULT_BATCH_SIZE;
    this.batchObject = new IndexDocumentsBatch<T>();
    if(this.autoFlush) {
      const interval = setInterval(() => this.flush(), this.flushWindowInMs);
      interval?.unref();
      this.cleanupTimer = () => {
        clearInterval(interval);
      }
    }
  }

  public async uploadDocuments(documents: T[], options: SearchIndexingBufferedSenderUploadDocumentsOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexingBufferedSender-uploadDocuments", options);
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

  public async mergeDocuments(documents: T[], options: SearchIndexingBufferedSenderMergeDocumentsOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexingBufferedSender-mergeDocuments", options);
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

  public async mergeOrUploadDocuments(documents: T[], options: SearchIndexingBufferedSenderMergeOrUploadDocumentsOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexingBufferedSender-mergeOrUploadDocuments", options);
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

  public async deleteDocuments(documents: T[], options: SearchIndexingBufferedSenderDeleteDocumentsOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexingBufferedSender-deleteDocuments", options);
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

  public async flush(options: SearchIndexingBufferedSenderFlushDocumentsOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexingBufferedSender-deleteDocuments", options);
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
  public dispose(): void {
    this.cleanupTimer && this.cleanupTimer();
  }

  public on(event: "batchAdded", listener: (e: IndexDocumentsResult) => void): void;
  public on(event: "batchSucceeded", listener: (e: IndexDocumentsResult) => void): void;
  public on(event: "batchFailed", listener: (e: RestError) => void): void;
  public on(event: "batchAdded" | "batchSucceeded" | "batchFailed", listener: (e: any) => void): void {
    this.emitter.on(event, listener);
  }

  public off(event: "batchSucceeded", listener: (e: IndexDocumentsResult) => void): void;
  public off(event: "batchFailed", listener: (e: RestError) => void): void;
  public off(event: "batchSucceeded" | "batchFailed", listener: (e: any) => void): void {
    this.emitter.removeListener(event, listener);
  }

  private isBatchReady(): boolean {
    return (this.batchObject.actions.length >= this.batchSize);
  }

  private async internalFlush(force: boolean, options: OperationOptions = {}): Promise<void> {
    if(force || (this.autoFlush && this.isBatchReady())) {
      // Split it
      const actions:IndexDocumentsAction<T>[] = this.batchObject.actions;
      this.batchObject = new IndexDocumentsBatch<T>();
      while(actions.length > 0) {
        const actionsToSend = actions.splice(0, this.batchSize);
        await this.submitDocuments(actionsToSend, options);
      }
    }
  }

  private async submitDocuments(actionsToSend: IndexDocumentsAction<T>[], options:OperationOptions, retryAttempt:number = 0): Promise<void> {
    try {
      const result = await this.client.indexDocuments(new IndexDocumentsBatch<T>(actionsToSend), options);
      // raise success event
      this.emitter.emit("batchSucceeded", result);
    } catch(e) {
      if(this.isRetryAbleError(e) && retryAttempt < RETRY_COUNT) {
        this.submitDocuments(actionsToSend, options, retryAttempt + 1);
      } else {
        this.emitter.emit("batchFailed", e);
        throw(e);
      }      
    }
  }

  private isRetryAbleError(e: any): boolean {
    return (e.code && (e.code === "422" || e.code === "409" || e.code === "503"));
  }
}
