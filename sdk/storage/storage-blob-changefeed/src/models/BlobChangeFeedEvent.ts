// https://msazure.visualstudio.com/One/_git/Storage-XStore?path=%2Fsrc%2FXTable%2FNotifications%2Flib%2FBlobChangeEventv4.json&version=GBmaster

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

export interface BlobChangeFeedEvent {
  topic: string;
  subject: string;
  eventType: BlobChangeFeedEventType;
  eventTime: Date;
  id: string; // GUID
  data: BlobChangeFeedEventData;
  dataVersion?: string;
  metadataVersion: string;
}

export type BlobType = "BlockBlob" | "AppendBlob" | "PageBlob";

export interface BlobChangeFeedEventData {
  api: string;
  clientRequestId: string; // GUID
  requestId: string; // GUID
  etag: string;
  contentType: string;
  contentLength: number;
  blobType: BlobType;
  url: string;
  sequencer: string;
}
