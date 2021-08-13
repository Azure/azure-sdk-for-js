// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// https://msazure.visualstudio.com/One/_git/Storage-XStore?path=%2Fsrc%2FXTable%2FNotifications%2Flib%2FBlobChangeEventv4.json&version=GBmaster

/**
 * Change feed event record types.
 */
export type BlobChangeFeedEventType =
  | "UnspecifiedEventType"
  | "BlobCreated"
  | "BlobDeleted"
  | "BlobPropertiesUpdated"
  | "BlobSnapshotCreated"
  | "Control"
  | "BlobTierChanged"
  | "BlobAsyncOperationInitiated"
  | "BlobMetadataUpdated";

/**
 * Change feed event record. Contains response data for the {@link BlobChangeFeedClient.listChanges} operation.
 * @see https://docs.microsoft.com/en-us/azure/event-grid/event-schema-blob-storage?toc=/azure/storage/blobs/toc.json#event-properties
 */
export interface BlobChangeFeedEvent {
  /**
   * Full resource path to the event source. This field is not writeable. Event Grid provides this value.
   */
  topic: string;

  /**
   * Publisher-defined path to the event subject.
   */
  subject: string;

  /**
   * One of the registered event types for this event source.
   */
  eventType: BlobChangeFeedEventType;

  /**
   * The time the event is generated based on the provider's UTC time.
   */
  eventTime: Date;

  /**
   * Unique identifier for the event.
   */
  id: string; // GUID

  /**
   * Blob storage event data.
   */
  data: BlobChangeFeedEventData;

  /**
   * The schema version of the data object. The publisher defines the schema version.
   */
  dataVersion?: string;

  /**
   * The schema version of the event metadata. Event Grid defines the schema of the top-level properties. Event Grid provides this value.
   */
  metadataVersion: string;
}

/**
 * The type of blob.
 */
export type BlobType = "BlockBlob" | "AppendBlob" | "PageBlob";

/**
 * Change feed Blob storage event data.
 */
export interface BlobChangeFeedEventData {
  /**
   * The operation that triggered the event.
   */
  api: string;

  /**
   * A client-provided request id for the storage API operation. This id can be used to
   * correlate to Azure Storage diagnostic logs using the "client-request-id" field in the logs,
   * and can be provided in client requests using the "x-ms-client-request-id" header.
   */
  clientRequestId: string; // GUID

  /**
   * Service-generated request id for the storage API operation. Can be used to correlate to Azure Storage
   * diagnostic logs using the "request-id-header" field in the logs and is returned from initiating API call
   * in the 'x-ms-request-id' header.
   */
  requestId: string; // GUID

  /**
   * The value that you can use to perform operations conditionally.
   */
  etag: string;

  /**
   * The content type specified for the blob.
   */
  contentType: string;

  /**
   * The size of the blob in bytes.
   */
  contentLength: number;

  /**
   * The type of blob.
   */
  blobType: BlobType;

  /**
   * The path to the blob. If the client uses a Blob REST API, then the url has this structure:
   * <storage-account-name>.blob.core.windows.net/<container-name>/<file-name>.
   */
  url: string;

  /**
   * An opaque string value representing the logical sequence of events for any particular blob name.
   * Users can use standard string comparison to understand the relative sequence of two events on the same blob name.
   */
  sequencer: string;
}
