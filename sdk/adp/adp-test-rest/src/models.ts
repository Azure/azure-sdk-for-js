// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** A discovery resource. */
export interface Discovery {
  /** The discovery identifier. */
  discoveryId: string;
  /** ID of the external package (for example, the disk which contained data) which was used upon the creation of upload */
  externalPackageId?: string;
  /**
   * SAS signed URI for accessing the discovery manifest file on Azure Storage.
   * This URI expires in 24 hours.
   */
  manifestUri?: string;
  /**
   * The discovery status.
   *
   * Possible values: Created, GeneratingSpecialFilesUploadInfo, GeneratedSpecialFilesUploadInfo, Completing, Completed, Aborting, Aborted, Failed
   */
  status?: string;
  /** The entity tag for this resource. */
  etag: string;
}

/** An upload resource. */
export interface Upload {
  /** ID of the external package (for example, the disk which contained data) which was used upon the creation of upload. */
  externalPackageId?: string;
  /** The discovery identifier. */
  discoveryId?: string;
  /**
   * The upload state
   *
   * Possible values: Created, GeneratingSpecialFilesUploadInfo, GeneratedSpecialFilesUploadInfo, GeneratingDataFilesUploadInfo, GeneratedDataFilesUploadInfo, Completing, Completed, Aborting, Aborted, Failed
   */
  status?: string;
  /** The entity tag for this resource. */
  etag: string;
}

/** Classification schema resource model. */
export interface ClassificationSchema {
  /** Classification schema identifier. */
  name: string;
  /** Classification schema definition (JSON schema as string). */
  schemaDefinition: string;
  /** The entity tag for this resource. */
  etag: string;
}

/** A wrapper for the List of measurements IDs */
export interface MeasurementListRequestParameters {
  /** The measurement IDs list */
  measurementIds: string[];
}

/** State machine action name. */
export interface StateMachineAction {
  /** The state machine action name. */
  actionName: string;
}

/** Request parameters for the complete upload metadata file API */
export interface CompleteUploadMetadataFileRequest {
  /** The ETag of the uploaded metadata file */
  pendingFileETag: string;
}

/** Measurement classification */
export interface MeasurementClassification {
  /** Classification schema name. */
  schemaName: string;
  /** Classification object model (JSON as string) */
  classificationObject: string;
  /** The entity tag for this resource. */
  etag: string;
}

/** A data-stream resource */
export interface DataStream {
  /** The data stream identifier */
  dataStreamId: string;
  /** The data stream lineage information */
  lineage: DataStreamLineage;
  /**
   * The data stream status
   *
   * Possible values: Created, Completing, Completed, Failed, Failing, Clearing, Cleared
   */
  status: string;
  /**
   * The data stream type
   *
   * Possible values: System, Raw, Derived
   */
  type: string;
  /** The entity tag for this resource. */
  etag: string;
}

/** Data stream lineage information */
export interface DataStreamLineage {
  /** The data stream's metadata */
  producerMetadata: Record<string, string>;
  /** The data stream's inputs */
  inputs: Array<DataStreamInput>;
}

/** Data-stream input definition. */
export interface DataStreamInput {
  /** The source data-stream identifier */
  sourceDataStreamId: string;
  /** Collection of the data stream's channels */
  channels?: string[];
}

/** Data stream file upload parameters */
export interface UploadDerivedDataStreamFilesRequest {
  /** The information of the files that are to be uploaded */
  files: Array<DerivedDataStreamFileInformation>;
}

/** Information about a file */
export interface DerivedDataStreamFileInformation {
  /** The file name as provided by the client */
  clientFileName: string;
  /** The file recording UTC timestamp as provided by the client */
  recordingTimestampUtc?: Date | string;
}

/** Data stream search by tags parameters */
export interface FindDataStreamByTagsRequestParameters {
  /** The list of tags to search for */
  tags: Record<string, string>;
}

/** Data stream search by lineage query parameters */
export interface FindDataStreamByLineageRequestParameters {
  /** The data-stream lineage to search for */
  lineage: object;
}

/** Processing objects graph */
export interface FindDataStreamByLineageGraphRequestParameters {
  /** The processing objects */
  processingObjects: Array<ProcessingObject>;
  /** The processing objects edges */
  edges: Array<ProcessingObjectEdge>;
}

/** Processing object node information in a processing objects Graph */
export interface ProcessingObject {
  /** The processing object metadata */
  metadata: Record<string, string>;
  /** A request unique ID to identify processing objects in graph */
  id: string;
}

/** Processing objects edge */
export interface ProcessingObjectEdge {
  /** The source processing object ID */
  sourceId: string;
  /** The target processing object ID */
  targetId: string;
}

/** A data-stream with unsharded storage resource */
export interface Storage {
  /**
   * The data stream storage identifier.
   * Not in use as this is a singleton resource.
   * TODO: check with CADL team how to define a singleton child resource without key.
   */
  id: string;
  /** Storage type. */
  type: string;
  /** The data stream rolling information */
  rollingInformation?: object;
  /**
   * SAS signed URI for downloading the data stream storage manifest file from Azure Storage.
   * This URI expires in 24 hours.
   */
  manifestUri: string;
  /** The list of shards associated with the data stream */
  shards: Array<DataStreamShardAccessInformation>;
  /** The entity tag for this resource. */
  etag: string;
}

/** Data stream rolling information */
export interface DataStreamRollingInformation {
  /**
   * Data stream rolling strategy
   *
   * Possible values: Time, Size
   */
  strategy: string;
  /**
   * Data stream rolling unit
   *
   * Possible values: Seconds, Minutes, kB, MB, GB
   */
  unit: string;
  /** Data stream rolling value */
  value: number;
}

/** The access information to the data stream shard */
export interface DataStreamShardAccessInformation {
  /**
   * SAS signed URI for reading the shard folder content from Azure Storage.
   * This URI expires in 24 hours.
   */
  shardFolderUri: string;
  /**
   * SAS signed URI for reading the shard manifest file from Azure Storage.
   * This URI expires in 24 hours.
   */
  manifestFileUri: string;
}

/** A data-stream tags. */
export interface TagSet {
  /**
   * The data stream tag set identifier.
   * Not in use as this is a singleton resource. Tags could be set or returned as singleton set.
   * TODO: check with CADL team how to define a singleton child resource without key.
   */
  id: string;
  /** Set of data-stream tags. */
  tags: Array<Tag>;
}

/** Tag element. */
export interface Tag {
  /** Tag identifier */
  key: string;
  /** Tag value. */
  value: string;
}

/** The data-stream classification. */
export interface DataStreamClassification {
  /** Classification schema name. */
  schemaName: string;
  /** Classification object model (JSON as string) */
  classificationObject: string;
  /** The entity tag for this resource. */
  etag: string;
}
