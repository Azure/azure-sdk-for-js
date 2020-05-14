export type BlobChangeFeedEventType = "BlobCreate" | "BlobDeleted";

export interface BlobChangeFeedEvent {
  topic: string;
  subject: string;
  eventType: BlobChangeFeedEventType;
  eventTime: string;
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
  eTag: string;
  contentType: string;
  contentLength: number;
  blobType: BlobType;
  url: string;
  sequencer: string;

  // For HNS only.
  destinationUrl?: string;
  sourceUrl?: string;
  recursive?: string;
}
