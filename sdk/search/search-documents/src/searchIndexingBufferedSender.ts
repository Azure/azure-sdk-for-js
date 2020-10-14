import {
  IndexDocumentsAction,
  SearchIndexingBufferedSenderUploadDocumentsOptions,
  SearchIndexingBufferedSenderMergeDocumentsOptions,
  SearchIndexingBufferedSenderMergeOrUploadDocumentsOptions,
  SearchIndexingBufferedSenderDeleteDocumentsOptions,
  SearchIndexingBufferedSenderFlushDocumentsOptions
} from "./indexModels";
import { IndexDocumentsResult } from "./generated/data/models";
import { RestError } from "@azure/core-http";

/**
 * Class used to perform buffered operations against a search index,
 * including adding, updating, and removing them.
 */
export interface SearchIndexingBufferedSender<T> {
  /**
   * Uploads the documents/Adds the documents to the upload queue.
   *
   * @param documents Documents to be uploaded.
   * @param options Upload options.
   */
  uploadDocuments(
    documents: T[],
    options?: SearchIndexingBufferedSenderUploadDocumentsOptions
  ): Promise<void>;

  /**
   * Merges the documents/Adds the documents to the merge queue.
   *
   * @param documents Documents to be merged.
   * @param options Upload options.
   */
  mergeDocuments(
    documents: T[],
    options?: SearchIndexingBufferedSenderMergeDocumentsOptions
  ): Promise<void>;

  /**
   * Merges/Uploads the documents/Adds the documents to the merge/upload queue.
   *
   * @param documents Documents to be merged/uploaded.
   * @param options Upload options.
   */
  mergeOrUploadDocuments(
    documents: T[],
    options?: SearchIndexingBufferedSenderMergeOrUploadDocumentsOptions
  ): Promise<void>;

  /**
   * Deletes the documents/Adds the documents to the delete queue.
   *
   * @param documents Documents to be deleted.
   * @param options Upload options.
   */
  deleteDocuments(
    documents: T[],
    options?: SearchIndexingBufferedSenderDeleteDocumentsOptions
  ): Promise<void>;

  /**
   * Flushes the queue manually.
   *
   * @param options Flush options.
   */
  flush(options?: SearchIndexingBufferedSenderFlushDocumentsOptions): Promise<void>;

  /**
   * If using autoFlush: true, call this to cleanup the autoflush timer.
   */
  dispose(): Promise<void>;

  /**
   * Attach Batch Added Event
   *
   * @param event Event to be emitted
   * @param listener Event Listener
   */
  on(event: "batchAdded", listener: (e: { action: string; documents: T[] }) => void): void;
  /**
   * Attach Batch Sent Event
   *
   * @param event Event to be emitted
   * @param listener Event Listener
   */
  on(event: "beforeDocumentSent", listener: (e: IndexDocumentsAction<T>) => void): void;
  /**
   * Attach Batch Succeeded Event
   *
   * @param event Event to be emitted
   * @param listener Event Listener
   */
  on(event: "batchSucceeded", listener: (e: IndexDocumentsResult) => void): void;
  /**
   * Attach Batch Failed Event
   *
   * @param event Event to be emitted
   * @param listener Event Listener
   */
  on(event: "batchFailed", listener: (e: RestError) => void): void;

  /**
   * Detach Batch Added Event
   *
   * @param event Event to be emitted
   * @param listener Event Listener
   */
  off(event: "batchAdded", listener: (e: { action: string; documents: T[] }) => void): void;
  /**
   * Detach Batch Sent Event
   *
   * @param event Event to be emitted
   * @param listener Event Listener
   */
  off(event: "beforeDocumentSent", listener: (e: IndexDocumentsAction<T>) => void): void;
  /**
   * Detach Batch Succeeded Event
   *
   * @param event Event to be emitted
   * @param listener Event Listener
   */
  off(event: "batchSucceeded", listener: (e: IndexDocumentsResult) => void): void;
  /**
   * Detach Batch Failed Event
   *
   * @param event Event to be emitted
   * @param listener Event Listener
   */
  off(event: "batchFailed", listener: (e: RestError) => void): void;
}
