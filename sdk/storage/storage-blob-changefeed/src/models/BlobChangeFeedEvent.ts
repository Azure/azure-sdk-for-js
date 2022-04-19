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
  | "BlobMetadataUpdated"
  | "RestorePointMarkerCreated";

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
   * The schema version of the data object. The publisher defines the schema version.
   */
  schemaVersion?: number;

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
 * The AccessTier.
 */
export type AccessTier =
  | "P4"
  | "P6"
  | "P10"
  | "P15"
  | "P20"
  | "P30"
  | "P40"
  | "P50"
  | "P60"
  | "P70"
  | "P80"
  | "Hot"
  | "Cool"
  | "Archive";

/**
 * A blob property that was updated.
 */
export interface BlobPropertyChange {
  /**
   * The name of the property that was updated.
   */
  propertyName: string;
  /**
   * The previous value of the property.
   */
  oldValue: string;
  /**
   * The new value of the property.
   */
  newValue: string;
}
/**
 * Blob properties that were updated during an event.
 */
export type UpdatedBlobProperties = Record<string, BlobPropertyChange>;
/**
 * Previous info for Change Feed Event.
 */
export interface ChangeFeedEventPreviousInfo {
  /**
   * Soft delete snapshot.
   */
  softDeleteSnapshot?: string;
  /**
   * If the blob was soft deleted.
   */
  isBlobSoftDeleted: boolean;
  /**
   * Blob version.
   */
  newBlobVersion?: string;
  /**
   * Last version.
   */
  oldBlobVersion?: string;
  /**
   * Previous Access Tier
   */
  previousTier?: AccessTier;
}

/**
 * ChangeFeedEvent AsyncOperationInfo
 */
export interface BlobOperationResult {
  /**
   * Destination access tier.
   */
  destinationAccessTier?: AccessTier;
  /**
   * If the operation was async.
   */
  isAsync: boolean;
  /**
   * Copy Id.
   */
  copyId?: string;
}

/**
 * Blob tags that were updated as part of the change feed event.
 */
export interface BlobTagsChange {
  /**
   * Previous Tags.
   */
  oldTags: Record<string, string>;
  /**
   * New Tags.
   */
  newTags: Record<string, string>;
}

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
   * The offset in bytes of a write operation taken at the point where the event-triggering application completed
   * writing to the file.
   * Appears only for events triggered on blob storage accounts that have a hierarchical namespace.
   */
  contentOffset?: number;

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
   * The url of the file that will exist after the operation completes. For example, if a file is renamed,
   * the destinationUrl property contains the url of the new file name.
   * Appears only for events triggered on blob storage accounts that have a hierarchical namespace.
   */
  destinationUrl?: string;

  /**
   * The url of the file that exists prior to the operation. For example, if a file is renamed, the sourceUrl
   * contains the url of the original file name prior to the rename operation.
   * Appears only for events triggered on blob storage accounts that have a hierarchical namespace.
   */
  sourceUrl?: string;

  /**
   * True to perform the operation on all child directories; otherwise False.
   * Appears only for events triggered on blob storage accounts that have a hierarchical namespace.
   */
  isRecursive?: boolean;

  /**
   * An opaque string value representing the logical sequence of events for any particular blob name.
   * Users can use standard string comparison to understand the relative sequence of two events on the same blob name.
   */
  sequencer: string;

  /**
   * Previous info for the blob.
   */
  previousInfo?: ChangeFeedEventPreviousInfo;

  /**
   * Blob properties that were updated during this event.
   */
  updatedBlobProperties?: UpdatedBlobProperties;

  /**
   * Blob tags that were updated during this event.
   */
  updatedBlobTags?: BlobTagsChange;

  /**
   * The Snapshot associated with the event.
   */
  snapshot?: string;

  /**
   * Version of the blob.
   */
  blobVersion?: string;

  /**
   * Version of the container the blob is in.
   */
  containerVersion?: string;

  /**
   * Access Tier of the blob.
   */
  blobAccessTier?: AccessTier;
  /**
   * AsyncOperationInfo
   */
  longRunningOperationInfo?: BlobOperationResult;
}
