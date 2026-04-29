// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RestError } from "@azure/core-rest-pipeline";
import type { IndexDocumentsResult } from "./models/azure/search/documents/index.js";
import { IndexDocumentsBatch } from "./indexDocumentsBatch.js";
import type {
  IndexDocumentsAction,
  IndexDocumentsOptions,
  SearchIndexingBufferedSenderDeleteDocumentsOptions,
  SearchIndexingBufferedSenderFlushDocumentsOptions,
  SearchIndexingBufferedSenderMergeDocumentsOptions,
  SearchIndexingBufferedSenderMergeOrUploadDocumentsOptions,
  SearchIndexingBufferedSenderOptions,
  SearchIndexingBufferedSenderUploadDocumentsOptions,
} from "./indexModels.js";

/**
 * Index Documents Client
 */
export interface IndexDocumentsClient<TModel extends object> {
  /**
   * Perform a set of index modifications (upload, merge, mergeOrUpload, delete)
   * for the given set of documents.
   *
   * @param batch - An array of actions to perform on the index.
   * @param options - Additional options.
   */
  indexDocuments(
    batch: IndexDocumentsBatch<TModel>,
    options: IndexDocumentsOptions,
  ): Promise<IndexDocumentsResult>;
}

/**
 * Default batch size.
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

const unsupported = "SearchIndexingBufferedSender is not supported in the browser.";

/**
 * Class used to perform buffered operations against a search index,
 * including adding, updating, and removing them.
 */
export class SearchIndexingBufferedSender<TModel extends object> {
  /**
   * Creates a new instance of SearchIndexingBufferedSender.
   *
   * @param _client - Search Client used to call the underlying IndexBatch operations.
   * @param _documentKeyRetriever - Method to retrieve the document key.
   * @param _options - Options to modify auto flush.
   */
  constructor(
    _client: IndexDocumentsClient<TModel>,
    _documentKeyRetriever: (document: TModel) => string,
    _options?: SearchIndexingBufferedSenderOptions,
  ) {
    throw new Error(unsupported);
  }

  /**
   * Uploads the documents/Adds the documents to the upload queue.
   *
   * @param _documents - Documents to be uploaded.
   * @param _options - Upload options.
   */
  public async uploadDocuments(
    _documents: TModel[],
    _options?: SearchIndexingBufferedSenderUploadDocumentsOptions,
  ): Promise<void> {
    throw new Error(unsupported);
  }

  /**
   * Merges the documents/Adds the documents to the merge queue.
   *
   * @param _documents - Documents to be merged.
   * @param _options - Upload options.
   */
  public async mergeDocuments(
    _documents: TModel[],
    _options?: SearchIndexingBufferedSenderMergeDocumentsOptions,
  ): Promise<void> {
    throw new Error(unsupported);
  }

  /**
   * Merges/Uploads the documents/Adds the documents to the merge/upload queue.
   *
   * @param _documents - Documents to be merged/uploaded.
   * @param _options - Upload options.
   */
  public async mergeOrUploadDocuments(
    _documents: TModel[],
    _options?: SearchIndexingBufferedSenderMergeOrUploadDocumentsOptions,
  ): Promise<void> {
    throw new Error(unsupported);
  }

  /**
   * Deletes the documents/Adds the documents to the delete queue.
   *
   * @param _documents - Documents to be deleted.
   * @param _options - Upload options.
   */
  public async deleteDocuments(
    _documents: TModel[],
    _options?: SearchIndexingBufferedSenderDeleteDocumentsOptions,
  ): Promise<void> {
    throw new Error(unsupported);
  }

  /**
   * Flushes the queue manually.
   *
   * @param _options - Flush options.
   */
  public async flush(_options?: SearchIndexingBufferedSenderFlushDocumentsOptions): Promise<void> {
    throw new Error(unsupported);
  }

  /**
   * If using autoFlush, call this to cleanup the autoflush timer.
   */
  public async dispose(): Promise<void> {
    throw new Error(unsupported);
  }

  /**
   * Attach Batch Added Event
   *
   * @param event - Event to be emitted
   * @param listener - Event Listener
   */
  public on(
    event: "batchAdded",
    listener: (e: { action: string; documents: TModel[] }) => void,
  ): void;
  /**
   * Attach Batch Sent Event
   *
   * @param event - Event to be emitted
   * @param listener - Event Listener
   */
  public on(event: "beforeDocumentSent", listener: (e: IndexDocumentsAction<TModel>) => void): void;
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
    _event:
      | "batchAdded"
      | "beforeDocumentSent"
      | "batchSucceeded"
      | "batchFailed"
      | "batchResizing",
    _listener: (e: any) => void,
  ): void {
    throw new Error(unsupported);
  }

  /**
   * Detach Batch Added Event
   *
   * @param event - Event to be emitted
   * @param listener - Event Listener
   */
  public off(
    event: "batchAdded",
    listener: (e: { action: string; documents: TModel[] }) => void,
  ): void;
  /**
   * Detach Batch Sent Event
   *
   * @param event - Event to be emitted
   * @param listener - Event Listener
   */
  public off(
    event: "beforeDocumentSent",
    listener: (e: IndexDocumentsAction<TModel>) => void,
  ): void;
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
    _event: "batchAdded" | "beforeDocumentSent" | "batchSucceeded" | "batchFailed",
    _listener: (e: any) => void,
  ): void {
    throw new Error(unsupported);
  }
}
