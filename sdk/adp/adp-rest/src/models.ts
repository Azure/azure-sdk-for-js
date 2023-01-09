// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Discovery resource creation parameters. */
export interface DiscoveryCreationParameters {
  /** ID of the external package (for example, the disk which contained data) which was used upon the creation of upload */
  externalPackageId?: string;
}

/** Upload resource creation parameters */
export interface UploadCreationParameters {
  /** ID of the external package (for example, the disk which contained data) which was used upon the creation of upload. */
  externalPackageId?: string;
  /** The discovery identifier. */
  discoveryId?: string;
}

/** ClassificationSchema resource creation parameters. */
export interface ClassificationSchemaCreationParameters {
  /** Classification schema definition (JSON schema as string). */
  schemaDefinition: string;
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

/** MeasurementClassification resource creation parameters. */
export interface MeasurementClassificationCreationParameters {
  /** Classification schema name. */
  schemaName: string;
  /** Classification object model (JSON as string) */
  classificationObject: string;
}

/** DataStream resource creation parameters */
export interface DataStreamCreationParameters {
  /** The data stream lineage information */
  lineage: object;
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

/** Storage resource creation parameters */
export interface StorageCreationParameters {
  /**
   * Storage type.
   *
   * Possible values: shardedStorage, storage
   */
  type: string;
  /** The data stream rolling information */
  rollingInformation?: object;
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

/** Storage resource creation parameters */
export interface TagSetCreationParameters {
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
