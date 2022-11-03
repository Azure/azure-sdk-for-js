/** A long running operation resource. */
export interface LongRunningOperationOutput {
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
  /** The operation Id. */
  operationId: string;
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
   * SAS signed URI for uploading or reading the discovery manifest file on Azure Storage.
   * Note, if the discovery status is 'Created' then the URI is signed with 'Write' permissions, otherwise with 'Read' permission.
   * This URI expires in 24 hours.
   */
  manifestUploadUri?: string;
  /**
   * The discovery status.
   *
   * Possible values: Created, GeneratingSpecialFilesUploadInfo, GeneratedSpecialFilesUploadInfo, Completing, Completed, Aborting, Aborted, Failed
   */
  status?: string;
}

/** Discovery long running operation response. */
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
}

/** A discovery special file resource. */
export interface DiscoverySpecialFileOutput {
  /** Client file name. */
  clientFileName: string;
  /** File name on storage. */
  fileUploadUri: string;
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
  manifestDownloadUri: string;
  /** The endpoint uri of the owning resource */
  resourceEndpoint?: string;
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
  manifestUploadUri?: string;
  /**
   * The upload state
   *
   * Possible values: Created, GeneratingSpecialFilesUploadInfo, GeneratedSpecialFilesUploadInfo, GeneratingDataFilesUploadInfo, GeneratedDataFilesUploadInfo, Completing, Completed, Aborting, Aborted, Failed
   */
  status?: string;
  /** The endpoint uri of the owning resource */
  resourceEndpoint?: string;
}

/** The long running operation response */
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
}

/** Special file resource. */
export interface UploadSpecialFileOutput {
  /** File name specified by the client */
  clientFileName: string;
  /**
   * SAS signed URI for uploading file to Azure Storage.
   * This URI expires in 24 hours.
   */
  fileUploadUri: string;
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
   * SAS signed URI for uploading file to Azure Storage.
   * This URI expires in 24 hours.
   */
  fileUploadUri: string;
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
