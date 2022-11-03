import {
  LongRunningOperationsGetParameters,
  DiscoveriesCreateOrReplaceParameters,
  DiscoveriesGetParameters,
  DiscoveriesCompleteParameters,
  DiscoveriesCancelParameters,
  DiscoverySpecialFilesListParameters,
  DiscoverySpecialFilesGenerateParameters,
  DiscoveryResultUploadsListParameters,
  UploadsCreateOrReplaceParameters,
  UploadsGetParameters,
  UploadsCompleteParameters,
  UploadsCancelParameters,
  UploadSpecialFilesListParameters,
  UploadSpecialFilesGenerateParameters,
  UploadDataFilesListParameters,
  UploadDataFilesGenerateParameters,
  UploadResultMeasurementsListParameters,
} from "./parameters";
import {
  LongRunningOperationsGet200Response,
  LongRunningOperationsGetDefaultResponse,
  DiscoveriesCreateOrReplace200Response,
  DiscoveriesCreateOrReplace201Response,
  DiscoveriesCreateOrReplaceDefaultResponse,
  DiscoveriesGet200Response,
  DiscoveriesGetDefaultResponse,
  DiscoveriesComplete202Response,
  DiscoveriesCompleteDefaultResponse,
  DiscoveriesCancel202Response,
  DiscoveriesCancelDefaultResponse,
  DiscoverySpecialFilesList200Response,
  DiscoverySpecialFilesListDefaultResponse,
  DiscoverySpecialFilesGenerate202Response,
  DiscoverySpecialFilesGenerateDefaultResponse,
  DiscoveryResultUploadsList200Response,
  DiscoveryResultUploadsListDefaultResponse,
  UploadsCreateOrReplace200Response,
  UploadsCreateOrReplace201Response,
  UploadsCreateOrReplaceDefaultResponse,
  UploadsGet200Response,
  UploadsGetDefaultResponse,
  UploadsComplete202Response,
  UploadsCompleteDefaultResponse,
  UploadsCancel202Response,
  UploadsCancelDefaultResponse,
  UploadSpecialFilesList200Response,
  UploadSpecialFilesListDefaultResponse,
  UploadSpecialFilesGenerate202Response,
  UploadSpecialFilesGenerateDefaultResponse,
  UploadDataFilesList200Response,
  UploadDataFilesListDefaultResponse,
  UploadDataFilesGenerate202Response,
  UploadDataFilesGenerateDefaultResponse,
  UploadResultMeasurementsList200Response,
  UploadResultMeasurementsListDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

/** Contains operations for LongRunningOperations operations */
export interface LongRunningOperationsOperations {
  /** Get the details of an LRO. */
  get(
    operationId: string,
    options?: LongRunningOperationsGetParameters
  ): StreamableMethod<
    | LongRunningOperationsGet200Response
    | LongRunningOperationsGetDefaultResponse
  >;
}

/** Contains operations for Discoveries operations */
export interface DiscoveriesOperations {
  /** Creates a new ingestion discovery instance. */
  createOrReplace(
    discoveryId: string,
    options?: DiscoveriesCreateOrReplaceParameters
  ): StreamableMethod<
    | DiscoveriesCreateOrReplace200Response
    | DiscoveriesCreateOrReplace201Response
    | DiscoveriesCreateOrReplaceDefaultResponse
  >;
  /** Get discovery by ID. */
  get(
    discoveryId: string,
    options?: DiscoveriesGetParameters
  ): StreamableMethod<
    DiscoveriesGet200Response | DiscoveriesGetDefaultResponse
  >;
  /** Initiates the process of completing the discovery and creating the upload file grouping manifest files. */
  complete(
    discoveryId: string,
    options?: DiscoveriesCompleteParameters
  ): StreamableMethod<
    DiscoveriesComplete202Response | DiscoveriesCompleteDefaultResponse
  >;
  /** Initiates the process of cancelling the discovery. */
  cancel(
    discoveryId: string,
    options?: DiscoveriesCancelParameters
  ): StreamableMethod<
    DiscoveriesCancel202Response | DiscoveriesCancelDefaultResponse
  >;
}

/** Contains operations for DiscoverySpecialFiles operations */
export interface DiscoverySpecialFilesOperations {
  /** List special files details for the discovery resource. */
  list(
    discoveryId: string,
    options?: DiscoverySpecialFilesListParameters
  ): StreamableMethod<
    | DiscoverySpecialFilesList200Response
    | DiscoverySpecialFilesListDefaultResponse
  >;
  /** Initiates the process of generating SAS signed URIs for uploading special files for the discovery. */
  generate(
    discoveryId: string,
    options?: DiscoverySpecialFilesGenerateParameters
  ): StreamableMethod<
    | DiscoverySpecialFilesGenerate202Response
    | DiscoverySpecialFilesGenerateDefaultResponse
  >;
}

/** Contains operations for DiscoveryResultUploads operations */
export interface DiscoveryResultUploadsOperations {
  /** List upload detail for the discovery resource. */
  list(
    discoveryId: string,
    options?: DiscoveryResultUploadsListParameters
  ): StreamableMethod<
    | DiscoveryResultUploadsList200Response
    | DiscoveryResultUploadsListDefaultResponse
  >;
}

/** Contains operations for Uploads operations */
export interface UploadsOperations {
  /** Creates a new ingestion upload instance. */
  createOrReplace(
    uploadId: string,
    options?: UploadsCreateOrReplaceParameters
  ): StreamableMethod<
    | UploadsCreateOrReplace200Response
    | UploadsCreateOrReplace201Response
    | UploadsCreateOrReplaceDefaultResponse
  >;
  /** Get discovery by ID. */
  get(
    uploadId: string,
    options?: UploadsGetParameters
  ): StreamableMethod<UploadsGet200Response | UploadsGetDefaultResponse>;
  /** Initiates the process of completing the upload and creating the measurements. */
  complete(
    uploadId: string,
    options?: UploadsCompleteParameters
  ): StreamableMethod<
    UploadsComplete202Response | UploadsCompleteDefaultResponse
  >;
  /** Initiates the process of cancelling the upload. */
  cancel(
    uploadId: string,
    options?: UploadsCancelParameters
  ): StreamableMethod<UploadsCancel202Response | UploadsCancelDefaultResponse>;
}

/** Contains operations for UploadSpecialFiles operations */
export interface UploadSpecialFilesOperations {
  /** List special files for the upload. */
  list(
    uploadId: string,
    options?: UploadSpecialFilesListParameters
  ): StreamableMethod<
    UploadSpecialFilesList200Response | UploadSpecialFilesListDefaultResponse
  >;
  /** Initiates the process of generating SAS signed URIs for uploading special files for the upload. */
  generate(
    uploadId: string,
    options?: UploadSpecialFilesGenerateParameters
  ): StreamableMethod<
    | UploadSpecialFilesGenerate202Response
    | UploadSpecialFilesGenerateDefaultResponse
  >;
}

/** Contains operations for UploadDataFiles operations */
export interface UploadDataFilesOperations {
  /** List data files for the upload. */
  list(
    uploadId: string,
    options?: UploadDataFilesListParameters
  ): StreamableMethod<
    UploadDataFilesList200Response | UploadDataFilesListDefaultResponse
  >;
  /** Initiates the process of sharding the data files. */
  generate(
    uploadId: string,
    options?: UploadDataFilesGenerateParameters
  ): StreamableMethod<
    UploadDataFilesGenerate202Response | UploadDataFilesGenerateDefaultResponse
  >;
}

/** Contains operations for UploadResultMeasurements operations */
export interface UploadResultMeasurementsOperations {
  /** List of the measurement identifiers that have been created by the upload. */
  list(
    uploadId: string,
    options?: UploadResultMeasurementsListParameters
  ): StreamableMethod<
    | UploadResultMeasurementsList200Response
    | UploadResultMeasurementsListDefaultResponse
  >;
}

export interface LongRunningOperationsGet {
  /** Get the details of an LRO. */
  get(
    options?: LongRunningOperationsGetParameters
  ): StreamableMethod<
    | LongRunningOperationsGet200Response
    | LongRunningOperationsGetDefaultResponse
  >;
}

export interface DiscoveriesCreateOrReplace {
  /** Creates a new ingestion discovery instance. */
  put(
    options?: DiscoveriesCreateOrReplaceParameters
  ): StreamableMethod<
    | DiscoveriesCreateOrReplace200Response
    | DiscoveriesCreateOrReplace201Response
    | DiscoveriesCreateOrReplaceDefaultResponse
  >;
  /** Get discovery by ID. */
  get(
    options?: DiscoveriesGetParameters
  ): StreamableMethod<
    DiscoveriesGet200Response | DiscoveriesGetDefaultResponse
  >;
}

export interface DiscoveriesComplete {
  /** Initiates the process of completing the discovery and creating the upload file grouping manifest files. */
  post(
    options?: DiscoveriesCompleteParameters
  ): StreamableMethod<
    DiscoveriesComplete202Response | DiscoveriesCompleteDefaultResponse
  >;
}

export interface DiscoveriesCancel {
  /** Initiates the process of cancelling the discovery. */
  post(
    options?: DiscoveriesCancelParameters
  ): StreamableMethod<
    DiscoveriesCancel202Response | DiscoveriesCancelDefaultResponse
  >;
}

export interface DiscoverySpecialFilesList {
  /** List special files details for the discovery resource. */
  get(
    options?: DiscoverySpecialFilesListParameters
  ): StreamableMethod<
    | DiscoverySpecialFilesList200Response
    | DiscoverySpecialFilesListDefaultResponse
  >;
}

export interface DiscoverySpecialFilesGenerate {
  /** Initiates the process of generating SAS signed URIs for uploading special files for the discovery. */
  post(
    options?: DiscoverySpecialFilesGenerateParameters
  ): StreamableMethod<
    | DiscoverySpecialFilesGenerate202Response
    | DiscoverySpecialFilesGenerateDefaultResponse
  >;
}

export interface DiscoveryResultUploadsList {
  /** List upload detail for the discovery resource. */
  get(
    options?: DiscoveryResultUploadsListParameters
  ): StreamableMethod<
    | DiscoveryResultUploadsList200Response
    | DiscoveryResultUploadsListDefaultResponse
  >;
}

export interface UploadsCreateOrReplace {
  /** Creates a new ingestion upload instance. */
  put(
    options?: UploadsCreateOrReplaceParameters
  ): StreamableMethod<
    | UploadsCreateOrReplace200Response
    | UploadsCreateOrReplace201Response
    | UploadsCreateOrReplaceDefaultResponse
  >;
  /** Get discovery by ID. */
  get(
    options?: UploadsGetParameters
  ): StreamableMethod<UploadsGet200Response | UploadsGetDefaultResponse>;
}

export interface UploadsComplete {
  /** Initiates the process of completing the upload and creating the measurements. */
  post(
    options?: UploadsCompleteParameters
  ): StreamableMethod<
    UploadsComplete202Response | UploadsCompleteDefaultResponse
  >;
}

export interface UploadsCancel {
  /** Initiates the process of cancelling the upload. */
  post(
    options?: UploadsCancelParameters
  ): StreamableMethod<UploadsCancel202Response | UploadsCancelDefaultResponse>;
}

export interface UploadSpecialFilesList {
  /** List special files for the upload. */
  get(
    options?: UploadSpecialFilesListParameters
  ): StreamableMethod<
    UploadSpecialFilesList200Response | UploadSpecialFilesListDefaultResponse
  >;
}

export interface UploadSpecialFilesGenerate {
  /** Initiates the process of generating SAS signed URIs for uploading special files for the upload. */
  post(
    options?: UploadSpecialFilesGenerateParameters
  ): StreamableMethod<
    | UploadSpecialFilesGenerate202Response
    | UploadSpecialFilesGenerateDefaultResponse
  >;
}

export interface UploadDataFilesList {
  /** List data files for the upload. */
  get(
    options?: UploadDataFilesListParameters
  ): StreamableMethod<
    UploadDataFilesList200Response | UploadDataFilesListDefaultResponse
  >;
}

export interface UploadDataFilesGenerate {
  /** Initiates the process of sharding the data files. */
  post(
    options?: UploadDataFilesGenerateParameters
  ): StreamableMethod<
    UploadDataFilesGenerate202Response | UploadDataFilesGenerateDefaultResponse
  >;
}

export interface UploadResultMeasurementsList {
  /** List of the measurement identifiers that have been created by the upload. */
  get(
    options?: UploadResultMeasurementsListParameters
  ): StreamableMethod<
    | UploadResultMeasurementsList200Response
    | UploadResultMeasurementsListDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/operations/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/operations/{operationId}",
    operationId: string
  ): LongRunningOperationsGet;
  /** Resource for '/discoveries/\{discoveryId\}' has methods for the following verbs: put, get */
  (
    path: "/discoveries/{discoveryId}",
    discoveryId: string
  ): DiscoveriesCreateOrReplace;
  /** Resource for '/discoveries/\{discoveryId\}:complete' has methods for the following verbs: post */
  (
    path: "/discoveries/{discoveryId}:complete",
    discoveryId: string
  ): DiscoveriesComplete;
  /** Resource for '/discoveries/\{discoveryId\}:cancel' has methods for the following verbs: post */
  (
    path: "/discoveries/{discoveryId}:cancel",
    discoveryId: string
  ): DiscoveriesCancel;
  /** Resource for '/discoveries/\{discoveryId\}/specialFilesUploadInfo' has methods for the following verbs: get */
  (
    path: "/discoveries/{discoveryId}/specialFilesUploadInfo",
    discoveryId: string
  ): DiscoverySpecialFilesList;
  /** Resource for '/discoveries/\{discoveryId\}/specialFilesUploadInfo:generate' has methods for the following verbs: post */
  (
    path: "/discoveries/{discoveryId}/specialFilesUploadInfo:generate",
    discoveryId: string
  ): DiscoverySpecialFilesGenerate;
  /** Resource for '/discoveries/\{discoveryId\}/uploads' has methods for the following verbs: get */
  (
    path: "/discoveries/{discoveryId}/uploads",
    discoveryId: string
  ): DiscoveryResultUploadsList;
  /** Resource for '/uploads/\{uploadId\}' has methods for the following verbs: put, get */
  (path: "/uploads/{uploadId}", uploadId: string): UploadsCreateOrReplace;
  /** Resource for '/uploads/\{uploadId\}:complete' has methods for the following verbs: post */
  (path: "/uploads/{uploadId}:complete", uploadId: string): UploadsComplete;
  /** Resource for '/uploads/\{uploadId\}:cancel' has methods for the following verbs: post */
  (path: "/uploads/{uploadId}:cancel", uploadId: string): UploadsCancel;
  /** Resource for '/uploads/\{uploadId\}/specialFilesUploadInfo' has methods for the following verbs: get */
  (
    path: "/uploads/{uploadId}/specialFilesUploadInfo",
    uploadId: string
  ): UploadSpecialFilesList;
  /** Resource for '/uploads/\{uploadId\}/specialFilesUploadInfo:generate' has methods for the following verbs: post */
  (
    path: "/uploads/{uploadId}/specialFilesUploadInfo:generate",
    uploadId: string
  ): UploadSpecialFilesGenerate;
  /** Resource for '/uploads/\{uploadId\}/dataFilesUploadInfo' has methods for the following verbs: get */
  (
    path: "/uploads/{uploadId}/dataFilesUploadInfo",
    uploadId: string
  ): UploadDataFilesList;
  /** Resource for '/uploads/\{uploadId\}/dataFilesUploadInfo:generate' has methods for the following verbs: post */
  (
    path: "/uploads/{uploadId}/dataFilesUploadInfo:generate",
    uploadId: string
  ): UploadDataFilesGenerate;
  /** Resource for '/uploads/\{uploadId\}/measurements' has methods for the following verbs: get */
  (
    path: "/uploads/{uploadId}/measurements",
    uploadId: string
  ): UploadResultMeasurementsList;
}

export type AutonomousDevelopmentPlatformClient = Client & {
  path: Routes;
  longRunningOperations: LongRunningOperationsOperations;
  discoveries: DiscoveriesOperations;
  discoverySpecialFiles: DiscoverySpecialFilesOperations;
  discoveryResultUploads: DiscoveryResultUploadsOperations;
  uploads: UploadsOperations;
  uploadSpecialFiles: UploadSpecialFilesOperations;
  uploadDataFiles: UploadDataFilesOperations;
  uploadResultMeasurements: UploadResultMeasurementsOperations;
};
