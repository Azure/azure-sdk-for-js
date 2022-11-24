// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** A long running operation resource. */
export interface LongRunningOperationOutput {
  /** The unique ID of the operation. */
  operationId: string;
  /**
   * The operation status.
   *
   * Possible values: Created, InProgress, Succeeded, Failed, Canceled
   */
  status: string;
  /** The operation type. */
  operationType?: string;
  /** The operation error. */
  error?: ErrorModelOutput;
  /** The identifier of the service that was last to modify the operation status. */
  lastModifiedBy: string;
  /** The result resource location (URI). */
  resultLocation?: string;
  /** The entity tag for this resource. */
  etag: string;
}

/** The error object. */
export interface ErrorModelOutput {
  /** One of a server-defined set of error codes. */
  code: string;
  /** A human-readable representation of the error. */
  message: string;
  /** The target of the error. */
  target?: string;
  /** An array of details about specific errors that led to this reported error. */
  details: Array<ErrorModelOutput>;
  /** An object containing more specific information than the current object about the error. */
  innererror?: InnerErrorOutput;
}

/** An object containing more specific information about the error. As per Microsoft One API guidelines - https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md#7102-error-condition-responses. */
export interface InnerErrorOutput {
  /** One of a server-defined set of error codes. */
  code: string;
  /** Inner error. */
  innererror?: InnerErrorOutput;
}

/** A response containing error details. */
export interface ErrorResponseOutput {
  /** The error object. */
  error: ErrorModelOutput;
}

/** A discovery resource. */
export interface DiscoveryOutput {
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

/** LRO of DiscoveryOperationType type */
export interface DiscoveryLroResponseOutput {
  /** The operation Id. */
  operationId: string;
  /**
   * The operation status.
   *
   * Possible values: Created, InProgress, Succeeded, Failed, Canceled
   */
  status: string;
  /**
   * The operation type.
   *
   * Possible values: CompleteDiscovery, FinalizeFileList, AbortDiscovery
   */
  operationType?: string;
  /** The operation error. */
  error?: ErrorModelOutput;
  /** The identifier of the service that was last to modify the operation status. */
  lastModifiedBy: string;
  /** The result resource location (URI). */
  resultLocation?: string;
  /** The entity tag for this resource. */
  etag: string;
}

/** A discovery special file resource. */
export interface DiscoverySpecialFileOutput {
  /** Client file name. */
  clientFileName: string;
  /** File name on storage. */
  fileUri: string;
}

/** Paged collection of DiscoverySpecialFile items */
export interface PagedDiscoverySpecialFileOutput {
  /** The DiscoverySpecialFile items on this page */
  value: Array<DiscoverySpecialFileOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** A discovery upload resource. */
export interface DiscoveryUploadOutput {
  /** Upload identifier. */
  uploadId: string;
  /**
   * SAS signed URI for downloading the manifest file from Azure Storage.
   * The manifest file contains list of all files in the group.
   * This URI expires in 24 hours.
   */
  manifestUri: string;
  /** The endpoint uri of the owning resource */
  readonly resourceEndpoint?: string;
}

/** Paged collection of DiscoveryUpload items */
export interface PagedDiscoveryUploadOutput {
  /** The DiscoveryUpload items on this page */
  value: Array<DiscoveryUploadOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** An upload resource. */
export interface UploadOutput {
  /** ID of the external package (for example, the disk which contained data) which was used upon the creation of upload. */
  externalPackageId?: string;
  /** The discovery identifier. */
  discoveryId?: string;
  /**
   * SAS signed URI for uploading or reading the upload manifest file on Azure Storage.
   * Note, if the upload status is 'Created' then the URI is signed with 'Write' permissions, otherwise with 'Read' permission.
   * This URI expires in 24 hours.
   */
  readonly manifestUri?: string;
  /**
   * The upload state
   *
   * Possible values: Created, GeneratingSpecialFilesUploadInfo, GeneratedSpecialFilesUploadInfo, GeneratingDataFilesUploadInfo, GeneratedDataFilesUploadInfo, Completing, Completed, Aborting, Aborted, Failed
   */
  status?: string;
  /** The endpoint uri of the owning resource */
  readonly resourceEndpoint?: string;
  /** The entity tag for this resource. */
  etag: string;
}

/** LRO of UploadOperationType type */
export interface UploadLroResponseOutput {
  /** The operation Id. */
  operationId: string;
  /**
   * The operation status.
   *
   * Possible values: Created, InProgress, Succeeded, Failed, Canceled
   */
  status: string;
  /**
   * The operation type.
   *
   * Possible values: FinalizeFileList, ShardFiles, CompleteUpload, AbortUpload
   */
  operationType?: string;
  /** The operation error. */
  error?: ErrorModelOutput;
  /** The identifier of the service that was last to modify the operation status. */
  lastModifiedBy: string;
  /** The result resource location (URI). */
  resultLocation?: string;
  /** The entity tag for this resource. */
  etag: string;
}

/** Special file resource. */
export interface UploadSpecialFileOutput {
  /** File name specified by the client */
  clientFileName: string;
  /**
   * SAS signed URI for uploading (write) file to Azure Storage.
   * This URI expires in 24 hours.
   */
  fileUri: string;
}

/** Paged collection of UploadSpecialFile items */
export interface PagedUploadSpecialFileOutput {
  /** The UploadSpecialFile items on this page */
  value: Array<UploadSpecialFileOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Data file resource. */
export interface UploadDataFileOutput {
  /** File name specified by the client */
  clientFileName: string;
  /**
   * SAS signed URI for uploading (write) file to Azure Storage.
   * This URI expires in 24 hours.
   */
  fileUri: string;
}

/** Paged collection of UploadDataFile items */
export interface PagedUploadDataFileOutput {
  /** The UploadDataFile items on this page */
  value: Array<UploadDataFileOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** A measurement resource created as result of the upload. */
export interface UploadResultMeasurementOutput {
  /** Measurement identifier. */
  measurementId: string;
}

/** Paged collection of UploadResultMeasurement items */
export interface PagedUploadResultMeasurementOutput {
  /** The UploadResultMeasurement items on this page */
  value: Array<UploadResultMeasurementOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Classification schema resource model. */
export interface ClassificationSchemaOutput {
  /** Classification schema identifier. */
  name: string;
  /** Classification schema definition (JSON schema as string). */
  schemaDefinition: string;
  /** The entity tag for this resource. */
  etag: string;
}

export interface DefaultLroResponseOutput {
  /** The operation Id. */
  operationId: string;
  /**
   * The operation status.
   *
   * Possible values: Created, InProgress, Succeeded, Failed, Canceled
   */
  status: string;
  /**
   * The operation type.
   *
   * Possible values: default
   */
  operationType?: string;
  /** The operation error. */
  error?: ErrorModelOutput;
  /** The identifier of the service that was last to modify the operation status. */
  lastModifiedBy: string;
  /** The result resource location (URI). */
  resultLocation?: string;
  /** The entity tag for this resource. */
  etag: string;
}

/** Paged collection of ClassificationSchema items */
export interface PagedClassificationSchemaOutput {
  /** The ClassificationSchema items on this page */
  value: Array<ClassificationSchemaOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** A measurement resource */
export interface MeasurementOutput {
  /** The measurement identifier. */
  measurementId: string;
  /** The storage account location which contains the measurement */
  location: string;
  /** The UTC time the measurement was ingested at */
  ingestTimestampUtc?: string;
  /** The endpoint uri of the owning resource */
  readonly resourceEndpoint?: string;
  /**  The ID of the external package (for example, the disk which contained data) as specified by the customer upon data ingestion */
  externalPackageId?: string;
  /** ID of the upload process which caused the creation of this measurement */
  uploadId?: string;
  /** ID of the discovery process which caused the creation of this measurement */
  discoveryId?: string;
  /** The UTC time the measurement was recorded at */
  recordTimestampUtc?: string;
  /** The entity tag for this resource. */
  etag: string;
}

/** Paged collection of Measurement items */
export interface PagedMeasurementOutput {
  /** The Measurement items on this page */
  value: Array<MeasurementOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Custom query data set: Measurement and metadata. */
export interface MeasurementWithMetadataOutput {
  /** The measurement identifier. */
  measurementId: string;
  /** The storage account location which contains the measurement */
  location: string;
  /** The UTC time the measurement was ingested at */
  ingestTimestampUtc?: string;
  /** The endpoint uri of the owning resource */
  readonly resourceEndpoint?: string;
  /**  The ID of the external package (for example, the disk which contained data) as specified by the customer upon data ingestion */
  externalPackageId?: string;
  /** ID of the upload process which caused the creation of this measurement */
  uploadId?: string;
  /** ID of the discovery process which caused the creation of this measurement */
  discoveryId?: string;
  /** The UTC time the measurement was recorded at */
  recordTimestampUtc?: string;
  /** The entity tag for this resource. */
  etag: string;
  /** The measurement metadata dictionary */
  metadata: Record<string, string>;
}

/** Paged collection of MeasurementWithMetadata items */
export interface PagedMeasurementWithMetadataOutput {
  /** The MeasurementWithMetadata items on this page */
  value: Array<MeasurementWithMetadataOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Measurement metadata without resource identifier. */
export interface MeasurementMetadataBaseOutput {
  /** The measurement metadata dictionary */
  metadata: Record<string, string>;
}

/** The measurement's validation result */
export interface MeasurementProcessingResultsBaseOutput {
  /** The measurement's validity */
  validationPassed?: boolean;
  /** The measurement's rule validation results */
  results?: Array<MeasurementRuleValidationResultOutput>;
}

/** The result of evaluation of measurement validation rule */
export interface MeasurementRuleValidationResultOutput {
  /** Measurement validation rule category */
  ruleCategory?: string;
  /** Measurement validation rule name */
  ruleName?: string;
  /** Measurement validation rule metadata */
  details?: Record<string, string>;
  /** Measurement validation rule evaluation result */
  validationPassed?: boolean;
  /** Measurement validation error message */
  validationError?: string;
}

/** State machine */
export interface StateMachineOutput {
  /** The state machine identifier. */
  id: string;
  /** Type of the state machine */
  type: string;
  /** Type of the state machine */
  availableActionNames: string[];
}

/** Paged collection of StateMachine items */
export interface PagedStateMachineOutput {
  /** The StateMachine items on this page */
  value: Array<StateMachineOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Measurement metadata file information model. */
export interface MeasurementMetadataFileInfoBaseOutput {
  /** The measurement's metadata file name */
  metadataFileName: string;
  /**
   * SAS signed URI to measurement metadata file.
   * If file already exists on storage then ETag of this file will be returned in the response header.
   * This URI expires in 24 hours.
   */
  metadataFileUri: string;
}

/** Measurement metadata schema file information model. */
export interface MeasurementMetadataSchemaFileInfoBaseOutput {
  /** Measurement schema file name. */
  schemaFileName?: string;
  /**
   * SAS signed URI for downloading the measurement metadata schema file from Azure Storage.
   * This URI expires in 24 hours.
   */
  schemaFileUri: string;
}

/** Measurement classification */
export interface MeasurementClassificationOutput {
  /** Classification schema name. */
  schemaName: string;
  /** Classification object model (JSON as string) */
  classificationObject: string;
  /** The entity tag for this resource. */
  etag: string;
}

/** Paged collection of MeasurementClassification items */
export interface PagedMeasurementClassificationOutput {
  /** The MeasurementClassification items on this page */
  value: Array<MeasurementClassificationOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** A data-stream resource */
export interface DataStreamOutput {
  /** The data stream identifier */
  dataStreamId: string;
  /** The endpoint uri of the owning resource */
  readonly resourceEndpoint?: string;
  /** The data stream lineage information */
  lineage: DataStreamLineageOutput;
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
export interface DataStreamLineageOutput {
  /** The data stream's metadata */
  producerMetadata: Record<string, string>;
  /** The data stream's inputs */
  inputs: Array<DataStreamInputOutput>;
}

/** Data-stream input definition. */
export interface DataStreamInputOutput {
  /** The source data-stream identifier */
  sourceDataStreamId: string;
  /** Collection of the data stream's channels */
  channels?: string[];
}

/** Paged collection of DataStream items */
export interface PagedDataStreamOutput {
  /** The DataStream items on this page */
  value: Array<DataStreamOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Data stream file upload request parameters */
export interface UploadDerivedDataStreamFilesResponseOutput {
  /** Per-file upload instructions */
  files: Array<FileUploadInformationOutput>;
}

/** File upload information */
export interface FileUploadInformationOutput {
  /** File name specified by the client */
  clientFileName: string;
  /**
   * SAS signed URI for uploading (write) file to Azure Storage.
   * This URI expires in 24 hours.
   */
  fileUri: string;
}

/** List of graphs of matched data streams by processing objects graph */
export interface DataStreamsGraphListResponseOutput {
  /** List of data streams matched graphs */
  dataStreamsGraphs: Array<DataStreamsGraphOutput>;
}

/** Graph of matched data streams by processing objects graph */
export interface DataStreamsGraphOutput {
  /** Dictionary of data stream by processing object id */
  dataStreamByProcessingObjectId: Record<string, DataStreamOutput>;
}

/** Paged collection of DataStreamsGraphListResponse items */
export interface PagedDataStreamsGraphListResponseOutput {
  /** The DataStreamsGraphListResponse items on this page */
  value: Array<DataStreamsGraphListResponseOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Data stream rolling information */
export interface DataStreamRollingInformationOutput {
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
export interface DataStreamShardAccessInformationOutput {
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

/** Common data-stream storage model. */
export interface StorageBaseOutput {
  /** Storage type. */
  type: string;
  /** The data stream rolling information */
  rollingInformation?: DataStreamRollingInformationOutput;
  /**
   * SAS signed URI for downloading the data stream storage manifest file from Azure Storage.
   * This URI expires in 24 hours.
   */
  manifestUri: string;
  /**
   * SAS signed URI for accessing the data stream data stored on the Azure Storage.
   * This URI expires in 24 hours.
   */
  readonly dataFolderUri?: string;
  /** The list of shards associated with the data stream */
  shards: Array<DataStreamShardAccessInformationOutput>;
  /** The entity tag for this resource. */
  etag: string;
}

/** A data-stream tags. */
export interface TagSetOutput {
  /**
   * The data stream tag set identifier.
   * Not in use as this is a singleton resource. Tags could be set or returned as singleton set.
   * TODO: check with CADL team how to define a singleton child resource without key.
   */
  id: string;
  /** Set of data-stream tags. */
  tags: Array<TagOutput>;
}

/** Tag element. */
export interface TagOutput {
  /** Tag identifier */
  key: string;
  /** Tag value. */
  value: string;
}

/** Tag set. */
export interface TagSetBaseOutput {
  /** Set of data-stream tags. */
  tags: Array<TagOutput>;
}

/** Data-stream file list. */
export interface DataStreamFileOutput {
  /** Client file name. */
  clientFileName: string;
  /**
   * SAS signed URI for downloading the file from Azure Storage.
   * This URI expires in 24 hours.
   */
  fileUri: string;
  /** UTC date and time indicating the start of file recording */
  externalTimeStamp: string;
  /** Size in bytes */
  size: number;
}

/** Paged collection of DataStreamFile items */
export interface PagedDataStreamFileOutput {
  /** The DataStreamFile items on this page */
  value: Array<DataStreamFileOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Data-stream logs folder */
export interface DataStreamLogsContainerBaseOutput {
  /**
   * SAS signed URI for accessing the logs container on Azure Storage.
   * This URI expires in 24 hours.
   */
  logFolderUri: string;
}

/** The data-stream classification. */
export interface DataStreamClassificationOutput {
  /** Classification schema name. */
  schemaName: string;
  /** Classification object model (JSON as string) */
  classificationObject: string;
  /** The entity tag for this resource. */
  etag: string;
}

/** Paged collection of DataStreamClassification items */
export interface PagedDataStreamClassificationOutput {
  /** The DataStreamClassification items on this page */
  value: Array<DataStreamClassificationOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}
