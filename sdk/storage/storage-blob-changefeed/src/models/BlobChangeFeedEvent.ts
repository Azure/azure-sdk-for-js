export type BlobChangeFeedEventType = "BlobCreate" | "BlobDeleted";

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

  // For HNS only.
  contentOffset?: number;
  destinationUrl?: string;
  sourceUrl?: string;
  recursive?: string;
}
