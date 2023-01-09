// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetLongRunningParameters,
  CreateOrReplaceDiscoveryParameters,
  GetDiscoveryParameters,
  CompleteDiscoveryParameters,
  CancelDiscoveryParameters,
  GetDiscoverySpecialFileUploadLocationsParameters,
  GenerateDiscoverySpecialFileUploadLocationsParameters,
  GetAllDiscoveryUploadsParameters,
  CreateOrReplaceUploadParameters,
  GetUploadParameters,
  CompleteUploadParameters,
  CancelUploadParameters,
  GenerateUploadSpecialFilesParameters,
  GetUploadSpecialFilesParameters,
  GenerateUploadDataFilesParameters,
  GetUploadDataFilesParameters,
  ListMeasurementsParameters,
  GetClassificationSchemaParameters,
  DeleteClassificationSchemaParameters,
  CreateClassificationSchemaParameters,
  GetClassificationSchemasParameters,
  GetMeasurementParameters,
  DeleteMeasurementParameters,
  GetMeasurementsParameters,
  GetMeasurementsWithMetadataParameters,
  GetMeasurementsByIdsParameters,
  GetMeasurementMetadataParameters,
  GetMeasurementProcessingResultsParameters,
  GetMeasurementStateMachineParameters,
  GetMeasurementStateMachinesParameters,
  ActMeasurementStateMachineParameters,
  GetMeasurementMetadataSchemaFileInfoParameters,
  GetMeasurementClassificationParameters,
  DeleteMeasurementClassificationParameters,
  GetMeasurementClassificationsParameters,
  CreateMeasurementClassificationParameters,
  CreateDataStreamParameters,
  GetAllDataStreamParameters,
  GetDataStreamParameters,
  ClearContentOfDataStreamParameters,
  StageFilesForDataStreamParameters,
  CompleteDataStreamParameters,
  FailDataStreamParameters,
  GetDataStreamsByTagsParameters,
  GetDataStreamsByLineageParameters,
  GetDataStreamLineageGraphsByLineageParameters,
  CreateOrReplaceDataStreamStorageParameters,
  GetDataStreamStorageParameters,
  CreateOrReplaceDataStreamTagsParameters,
  GetDataStreamTagsParameters,
  GenerateDataStreamFilesParameters,
  GetDataStreamFilesParameters,
  GetDataStreamLogsContainerLocationParameters,
} from "./parameters";
import {
  GetLongRunning200Response,
  GetLongRunningDefaultResponse,
  CreateOrReplaceDiscovery200Response,
  CreateOrReplaceDiscovery201Response,
  CreateOrReplaceDiscoveryDefaultResponse,
  GetDiscovery200Response,
  GetDiscoveryDefaultResponse,
  CompleteDiscovery200Response,
  CompleteDiscovery202Response,
  CompleteDiscoveryDefaultResponse,
  CancelDiscovery200Response,
  CancelDiscovery202Response,
  CancelDiscoveryDefaultResponse,
  GetDiscoverySpecialFileUploadLocations200Response,
  GetDiscoverySpecialFileUploadLocationsDefaultResponse,
  GenerateDiscoverySpecialFileUploadLocations200Response,
  GenerateDiscoverySpecialFileUploadLocations202Response,
  GenerateDiscoverySpecialFileUploadLocationsDefaultResponse,
  GetAllDiscoveryUploads200Response,
  GetAllDiscoveryUploadsDefaultResponse,
  CreateOrReplaceUpload200Response,
  CreateOrReplaceUpload201Response,
  CreateOrReplaceUploadDefaultResponse,
  GetUpload200Response,
  GetUploadDefaultResponse,
  CompleteUpload200Response,
  CompleteUpload202Response,
  CompleteUploadDefaultResponse,
  CancelUpload200Response,
  CancelUpload202Response,
  CancelUploadDefaultResponse,
  GenerateUploadSpecialFiles200Response,
  GenerateUploadSpecialFiles202Response,
  GenerateUploadSpecialFilesDefaultResponse,
  GetUploadSpecialFiles200Response,
  GetUploadSpecialFilesDefaultResponse,
  GenerateUploadDataFiles200Response,
  GenerateUploadDataFiles202Response,
  GenerateUploadDataFilesDefaultResponse,
  GetUploadDataFiles200Response,
  GetUploadDataFilesDefaultResponse,
  ListMeasurements200Response,
  ListMeasurementsDefaultResponse,
  GetClassificationSchema200Response,
  GetClassificationSchemaDefaultResponse,
  DeleteClassificationSchema202Response,
  DeleteClassificationSchema204Response,
  DeleteClassificationSchemaDefaultResponse,
  CreateClassificationSchema200Response,
  CreateClassificationSchema202Response,
  CreateClassificationSchemaDefaultResponse,
  GetClassificationSchemas200Response,
  GetClassificationSchemasDefaultResponse,
  GetMeasurement200Response,
  GetMeasurementDefaultResponse,
  DeleteMeasurement202Response,
  DeleteMeasurement204Response,
  DeleteMeasurementDefaultResponse,
  GetMeasurements200Response,
  GetMeasurementsDefaultResponse,
  GetMeasurementsWithMetadata200Response,
  GetMeasurementsWithMetadataDefaultResponse,
  GetMeasurementsByIds200Response,
  GetMeasurementsByIdsDefaultResponse,
  GetMeasurementMetadata200Response,
  GetMeasurementMetadataDefaultResponse,
  GetMeasurementProcessingResults200Response,
  GetMeasurementProcessingResultsDefaultResponse,
  GetMeasurementStateMachine200Response,
  GetMeasurementStateMachineDefaultResponse,
  GetMeasurementStateMachines200Response,
  GetMeasurementStateMachinesDefaultResponse,
  ActMeasurementStateMachine200Response,
  ActMeasurementStateMachine202Response,
  ActMeasurementStateMachineDefaultResponse,
  GetMeasurementMetadataSchemaFileInfo200Response,
  GetMeasurementMetadataSchemaFileInfoDefaultResponse,
  GetMeasurementClassification200Response,
  GetMeasurementClassificationDefaultResponse,
  DeleteMeasurementClassification202Response,
  DeleteMeasurementClassification204Response,
  DeleteMeasurementClassificationDefaultResponse,
  GetMeasurementClassifications200Response,
  GetMeasurementClassificationsDefaultResponse,
  CreateMeasurementClassification200Response,
  CreateMeasurementClassification202Response,
  CreateMeasurementClassificationDefaultResponse,
  CreateDataStream200Response,
  CreateDataStream202Response,
  CreateDataStreamDefaultResponse,
  GetAllDataStream200Response,
  GetAllDataStreamDefaultResponse,
  GetDataStream200Response,
  GetDataStreamDefaultResponse,
  ClearContentOfDataStream200Response,
  ClearContentOfDataStream202Response,
  ClearContentOfDataStreamDefaultResponse,
  StageFilesForDataStream200Response,
  StageFilesForDataStreamDefaultResponse,
  CompleteDataStream200Response,
  CompleteDataStream202Response,
  CompleteDataStreamDefaultResponse,
  FailDataStream200Response,
  FailDataStream202Response,
  FailDataStreamDefaultResponse,
  GetDataStreamsByTags200Response,
  GetDataStreamsByTagsDefaultResponse,
  GetDataStreamsByLineage200Response,
  GetDataStreamsByLineageDefaultResponse,
  GetDataStreamLineageGraphsByLineage200Response,
  GetDataStreamLineageGraphsByLineageDefaultResponse,
  CreateOrReplaceDataStreamStorage200Response,
  CreateOrReplaceDataStreamStorage201Response,
  CreateOrReplaceDataStreamStorageDefaultResponse,
  GetDataStreamStorage200Response,
  GetDataStreamStorageDefaultResponse,
  CreateOrReplaceDataStreamTags200Response,
  CreateOrReplaceDataStreamTags201Response,
  CreateOrReplaceDataStreamTagsDefaultResponse,
  GetDataStreamTags200Response,
  GetDataStreamTagsDefaultResponse,
  GenerateDataStreamFiles200Response,
  GenerateDataStreamFiles202Response,
  GenerateDataStreamFilesDefaultResponse,
  GetDataStreamFiles200Response,
  GetDataStreamFilesDefaultResponse,
  GetDataStreamLogsContainerLocation200Response,
  GetDataStreamLogsContainerLocationDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetLongRunning {
  /** Get the details of an LRO. */
  get(
    options?: GetLongRunningParameters
  ): StreamableMethod<GetLongRunning200Response | GetLongRunningDefaultResponse>;
}

export interface CreateOrReplaceDiscovery {
  /** Creates a new ingestion discovery instance. */
  put(
    options?: CreateOrReplaceDiscoveryParameters
  ): StreamableMethod<
    | CreateOrReplaceDiscovery200Response
    | CreateOrReplaceDiscovery201Response
    | CreateOrReplaceDiscoveryDefaultResponse
  >;
  /** Get discovery by ID. */
  get(
    options?: GetDiscoveryParameters
  ): StreamableMethod<GetDiscovery200Response | GetDiscoveryDefaultResponse>;
}

export interface CompleteDiscovery {
  /** Initiates the process of completing the discovery and creating the upload file grouping manifest files. */
  post(
    options?: CompleteDiscoveryParameters
  ): StreamableMethod<
    CompleteDiscovery200Response | CompleteDiscovery202Response | CompleteDiscoveryDefaultResponse
  >;
}

export interface CancelDiscovery {
  /** Initiates the process of cancelling the discovery. */
  post(
    options?: CancelDiscoveryParameters
  ): StreamableMethod<
    CancelDiscovery200Response | CancelDiscovery202Response | CancelDiscoveryDefaultResponse
  >;
}

export interface GetDiscoverySpecialFileUploadLocations {
  /**
   * List special files details for the discovery resource.
   * Returns SAS signed URI that allows uploading special files to Azure Storage.
   * This URI expires in 24 hours.
   */
  post(
    options?: GetDiscoverySpecialFileUploadLocationsParameters
  ): StreamableMethod<
    | GetDiscoverySpecialFileUploadLocations200Response
    | GetDiscoverySpecialFileUploadLocationsDefaultResponse
  >;
}

export interface GenerateDiscoverySpecialFileUploadLocations {
  /** Initiates the process of generating SAS signed URIs for uploading special files for the discovery. */
  post(
    options?: GenerateDiscoverySpecialFileUploadLocationsParameters
  ): StreamableMethod<
    | GenerateDiscoverySpecialFileUploadLocations200Response
    | GenerateDiscoverySpecialFileUploadLocations202Response
    | GenerateDiscoverySpecialFileUploadLocationsDefaultResponse
  >;
}

export interface GetAllDiscoveryUploads {
  /** List upload detail for the discovery resource. */
  get(
    options?: GetAllDiscoveryUploadsParameters
  ): StreamableMethod<GetAllDiscoveryUploads200Response | GetAllDiscoveryUploadsDefaultResponse>;
}

export interface CreateOrReplaceUpload {
  /** Creates a new ingestion upload instance. */
  put(
    options?: CreateOrReplaceUploadParameters
  ): StreamableMethod<
    | CreateOrReplaceUpload200Response
    | CreateOrReplaceUpload201Response
    | CreateOrReplaceUploadDefaultResponse
  >;
  /** Get discovery by ID. */
  get(
    options?: GetUploadParameters
  ): StreamableMethod<GetUpload200Response | GetUploadDefaultResponse>;
}

export interface CompleteUpload {
  /** Initiates the process of completing the upload and creating the measurements. */
  post(
    options?: CompleteUploadParameters
  ): StreamableMethod<
    CompleteUpload200Response | CompleteUpload202Response | CompleteUploadDefaultResponse
  >;
}

export interface CancelUpload {
  /** Initiates the process of cancelling the upload. */
  post(
    options?: CancelUploadParameters
  ): StreamableMethod<
    CancelUpload200Response | CancelUpload202Response | CancelUploadDefaultResponse
  >;
}

export interface GenerateUploadSpecialFiles {
  /** Initiates the process of generating SAS signed URIs for uploading special files for the upload. */
  post(
    options?: GenerateUploadSpecialFilesParameters
  ): StreamableMethod<
    | GenerateUploadSpecialFiles200Response
    | GenerateUploadSpecialFiles202Response
    | GenerateUploadSpecialFilesDefaultResponse
  >;
}

export interface GetUploadSpecialFiles {
  /**
   * List special files details for the upload resource.
   * Returns SAS signed URI that allows uploading special files to Azure Storage.
   * This URI expires in 24 hours.
   */
  post(
    options?: GetUploadSpecialFilesParameters
  ): StreamableMethod<GetUploadSpecialFiles200Response | GetUploadSpecialFilesDefaultResponse>;
}

export interface GenerateUploadDataFiles {
  /** Initiates the process of allocating the data files. */
  post(
    options?: GenerateUploadDataFilesParameters
  ): StreamableMethod<
    | GenerateUploadDataFiles200Response
    | GenerateUploadDataFiles202Response
    | GenerateUploadDataFilesDefaultResponse
  >;
}

export interface GetUploadDataFiles {
  /**
   * List special files details for the upload resource.
   * Returns SAS signed URI that allows uploading data files to Azure Storage.
   * This URI expires in 24 hours.
   */
  post(
    options?: GetUploadDataFilesParameters
  ): StreamableMethod<GetUploadDataFiles200Response | GetUploadDataFilesDefaultResponse>;
}

export interface ListMeasurements {
  /** List of the measurement identifiers that have been created by the upload. */
  get(
    options?: ListMeasurementsParameters
  ): StreamableMethod<ListMeasurements200Response | ListMeasurementsDefaultResponse>;
}

export interface GetClassificationSchema {
  /** Get classification schema by name. */
  get(
    options?: GetClassificationSchemaParameters
  ): StreamableMethod<GetClassificationSchema200Response | GetClassificationSchemaDefaultResponse>;
  /** Deletes the classification schema and all related classification assignments (instances). */
  delete(
    options?: DeleteClassificationSchemaParameters
  ): StreamableMethod<
    | DeleteClassificationSchema202Response
    | DeleteClassificationSchema204Response
    | DeleteClassificationSchemaDefaultResponse
  >;
}

export interface CreateClassificationSchema {
  /** Creates new classification schema. */
  post(
    options?: CreateClassificationSchemaParameters
  ): StreamableMethod<
    | CreateClassificationSchema200Response
    | CreateClassificationSchema202Response
    | CreateClassificationSchemaDefaultResponse
  >;
  /** List all classification schemas. */
  get(
    options?: GetClassificationSchemasParameters
  ): StreamableMethod<
    GetClassificationSchemas200Response | GetClassificationSchemasDefaultResponse
  >;
}

export interface GetMeasurement {
  /** Get measurement by ID. */
  get(
    options?: GetMeasurementParameters
  ): StreamableMethod<GetMeasurement200Response | GetMeasurementDefaultResponse>;
  /** Deletes the measurement. */
  delete(
    options?: DeleteMeasurementParameters
  ): StreamableMethod<
    DeleteMeasurement202Response | DeleteMeasurement204Response | DeleteMeasurementDefaultResponse
  >;
}

export interface GetMeasurements {
  /** Lists the measurements in a workspace. */
  get(
    options?: GetMeasurementsParameters
  ): StreamableMethod<GetMeasurements200Response | GetMeasurementsDefaultResponse>;
}

export interface GetMeasurementsWithMetadata {
  /** Lists the measurements in a workspace with extended metadata. */
  post(
    options?: GetMeasurementsWithMetadataParameters
  ): StreamableMethod<
    GetMeasurementsWithMetadata200Response | GetMeasurementsWithMetadataDefaultResponse
  >;
}

export interface GetMeasurementsByIds {
  /** Lists the measurements in a workspace that are in the given measurement IDs list. */
  post(
    options?: GetMeasurementsByIdsParameters
  ): StreamableMethod<GetMeasurementsByIds200Response | GetMeasurementsByIdsDefaultResponse>;
}

export interface GetMeasurementMetadata {
  /** Returns the measurement metadata. */
  get(
    options?: GetMeasurementMetadataParameters
  ): StreamableMethod<GetMeasurementMetadata200Response | GetMeasurementMetadataDefaultResponse>;
}

export interface GetMeasurementProcessingResults {
  /** Returns the measurement processing result. */
  get(
    options?: GetMeasurementProcessingResultsParameters
  ): StreamableMethod<
    GetMeasurementProcessingResults200Response | GetMeasurementProcessingResultsDefaultResponse
  >;
}

export interface GetMeasurementStateMachine {
  /** Returns the state machine instance for the measurement. */
  get(
    options?: GetMeasurementStateMachineParameters
  ): StreamableMethod<
    GetMeasurementStateMachine200Response | GetMeasurementStateMachineDefaultResponse
  >;
}

export interface GetMeasurementStateMachines {
  /** List state machines instance for the measurement. */
  get(
    options?: GetMeasurementStateMachinesParameters
  ): StreamableMethod<
    GetMeasurementStateMachines200Response | GetMeasurementStateMachinesDefaultResponse
  >;
}

export interface ActMeasurementStateMachine {
  /** Initiates process of applying an action on the measurement. */
  post(
    options?: ActMeasurementStateMachineParameters
  ): StreamableMethod<
    | ActMeasurementStateMachine200Response
    | ActMeasurementStateMachine202Response
    | ActMeasurementStateMachineDefaultResponse
  >;
}

export interface GetMeasurementMetadataSchemaFileInfo {
  /** Returns the measurement metadata schema file information. */
  get(
    options?: GetMeasurementMetadataSchemaFileInfoParameters
  ): StreamableMethod<
    | GetMeasurementMetadataSchemaFileInfo200Response
    | GetMeasurementMetadataSchemaFileInfoDefaultResponse
  >;
}

export interface GetMeasurementClassification {
  /** Get measurement classification by schema name. */
  get(
    options?: GetMeasurementClassificationParameters
  ): StreamableMethod<
    GetMeasurementClassification200Response | GetMeasurementClassificationDefaultResponse
  >;
  /** Unassign the classification from the measurement. */
  delete(
    options?: DeleteMeasurementClassificationParameters
  ): StreamableMethod<
    | DeleteMeasurementClassification202Response
    | DeleteMeasurementClassification204Response
    | DeleteMeasurementClassificationDefaultResponse
  >;
}

export interface GetMeasurementClassifications {
  /** Lists the classifications assigned to the measurement. */
  get(
    options?: GetMeasurementClassificationsParameters
  ): StreamableMethod<
    GetMeasurementClassifications200Response | GetMeasurementClassificationsDefaultResponse
  >;
  /** Assigns classification to the measurement. */
  post(
    options?: CreateMeasurementClassificationParameters
  ): StreamableMethod<
    | CreateMeasurementClassification200Response
    | CreateMeasurementClassification202Response
    | CreateMeasurementClassificationDefaultResponse
  >;
}

export interface CreateDataStream {
  /** Creates new data-stream resource. */
  post(
    options?: CreateDataStreamParameters
  ): StreamableMethod<
    CreateDataStream200Response | CreateDataStream202Response | CreateDataStreamDefaultResponse
  >;
  /**
   * Lists the existing data-streams.
   * Supports the following filter expressions:
   * - filter="type=[System | Raw | Derived]"
   */
  get(
    options?: GetAllDataStreamParameters
  ): StreamableMethod<GetAllDataStream200Response | GetAllDataStreamDefaultResponse>;
}

export interface GetDataStream {
  /** Get data-stream by identifier. */
  get(
    options?: GetDataStreamParameters
  ): StreamableMethod<GetDataStream200Response | GetDataStreamDefaultResponse>;
}

export interface ClearContentOfDataStream {
  /** Clear the data-stream content. */
  post(
    options?: ClearContentOfDataStreamParameters
  ): StreamableMethod<
    | ClearContentOfDataStream200Response
    | ClearContentOfDataStream202Response
    | ClearContentOfDataStreamDefaultResponse
  >;
}

export interface StageFilesForDataStream {
  /**
   * Returns SAS-signed upload URIs for files that need to be uploaded to Azure Storage.
   * This URI expires in 24 hours.
   */
  post(
    options?: StageFilesForDataStreamParameters
  ): StreamableMethod<StageFilesForDataStream200Response | StageFilesForDataStreamDefaultResponse>;
}

export interface CompleteDataStream {
  /** Marks a data stream as completed */
  post(
    options?: CompleteDataStreamParameters
  ): StreamableMethod<
    | CompleteDataStream200Response
    | CompleteDataStream202Response
    | CompleteDataStreamDefaultResponse
  >;
}

export interface FailDataStream {
  /** Marks a data stream as failed */
  post(
    options?: FailDataStreamParameters
  ): StreamableMethod<
    FailDataStream200Response | FailDataStream202Response | FailDataStreamDefaultResponse
  >;
}

export interface GetDataStreamsByTags {
  /** Lists the data-streams by tags. */
  post(
    options?: GetDataStreamsByTagsParameters
  ): StreamableMethod<GetDataStreamsByTags200Response | GetDataStreamsByTagsDefaultResponse>;
}

export interface GetDataStreamsByLineage {
  /** Lists the data-streams by lineage. */
  post(
    options?: GetDataStreamsByLineageParameters
  ): StreamableMethod<GetDataStreamsByLineage200Response | GetDataStreamsByLineageDefaultResponse>;
}

export interface GetDataStreamLineageGraphsByLineage {
  /** Lists the data-streams by lineage graph. */
  post(
    options?: GetDataStreamLineageGraphsByLineageParameters
  ): StreamableMethod<
    | GetDataStreamLineageGraphsByLineage200Response
    | GetDataStreamLineageGraphsByLineageDefaultResponse
  >;
}

export interface CreateOrReplaceDataStreamStorage {
  /**
   * Create or replace storage information of the data-stream.
   * Returns the data-stream storage resource with SAS signed URIs that allow uploading to Azure Storage.
   * The SAS token expires in 24 hours.
   */
  put(
    options?: CreateOrReplaceDataStreamStorageParameters
  ): StreamableMethod<
    | CreateOrReplaceDataStreamStorage200Response
    | CreateOrReplaceDataStreamStorage201Response
    | CreateOrReplaceDataStreamStorageDefaultResponse
  >;
}

export interface GetDataStreamStorage {
  /**
   * Returns the data-stream storage resource with SAS signed URIs that allow uploading to Azure Storage.
   * The SAS token expires in 24 hours.
   */
  post(
    options?: GetDataStreamStorageParameters
  ): StreamableMethod<GetDataStreamStorage200Response | GetDataStreamStorageDefaultResponse>;
}

export interface CreateOrReplaceDataStreamTags {
  /** Create or replace all tags at once. */
  put(
    options?: CreateOrReplaceDataStreamTagsParameters
  ): StreamableMethod<
    | CreateOrReplaceDataStreamTags200Response
    | CreateOrReplaceDataStreamTags201Response
    | CreateOrReplaceDataStreamTagsDefaultResponse
  >;
  /** Returns set of the data-stream tags. */
  get(
    options?: GetDataStreamTagsParameters
  ): StreamableMethod<GetDataStreamTags200Response | GetDataStreamTagsDefaultResponse>;
}

export interface GenerateDataStreamFiles {
  /** Initiates the process of generating SAS signed URIs for accessing the data-stream files. */
  post(
    options?: GenerateDataStreamFilesParameters
  ): StreamableMethod<
    | GenerateDataStreamFiles200Response
    | GenerateDataStreamFiles202Response
    | GenerateDataStreamFilesDefaultResponse
  >;
}

export interface GetDataStreamFiles {
  /** Returns SAS signed URIs for reading special files from Azure Storage. */
  get(
    options?: GetDataStreamFilesParameters
  ): StreamableMethod<GetDataStreamFiles200Response | GetDataStreamFilesDefaultResponse>;
}

export interface GetDataStreamLogsContainerLocation {
  /**
   * Returns SAS signed URI of the data-stream logs folder that allow uploading log files to Azure Storage.
   * The SAS token expires in 24 hours.
   */
  post(
    options?: GetDataStreamLogsContainerLocationParameters
  ): StreamableMethod<
    | GetDataStreamLogsContainerLocation200Response
    | GetDataStreamLogsContainerLocationDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/operations/\{operationId\}' has methods for the following verbs: get */
  (path: "/operations/{operationId}", operationId: string): GetLongRunning;
  /** Resource for '/discoveries/\{discoveryId\}' has methods for the following verbs: put, get */
  (path: "/discoveries/{discoveryId}", discoveryId: string): CreateOrReplaceDiscovery;
  /** Resource for '/discoveries/\{discoveryId\}:complete' has methods for the following verbs: post */
  (path: "/discoveries/{discoveryId}:complete", discoveryId: string): CompleteDiscovery;
  /** Resource for '/discoveries/\{discoveryId\}:cancel' has methods for the following verbs: post */
  (path: "/discoveries/{discoveryId}:cancel", discoveryId: string): CancelDiscovery;
  /** Resource for '/discoveries/\{discoveryId\}/specialFilesUploadInfo:listWritableUris' has methods for the following verbs: post */
  (
    path: "/discoveries/{discoveryId}/specialFilesUploadInfo:listWritableUris",
    discoveryId: string
  ): GetDiscoverySpecialFileUploadLocations;
  /** Resource for '/discoveries/\{discoveryId\}/specialFilesUploadInfo:generate' has methods for the following verbs: post */
  (
    path: "/discoveries/{discoveryId}/specialFilesUploadInfo:generate",
    discoveryId: string
  ): GenerateDiscoverySpecialFileUploadLocations;
  /** Resource for '/discoveries/\{discoveryId\}/uploads' has methods for the following verbs: get */
  (path: "/discoveries/{discoveryId}/uploads", discoveryId: string): GetAllDiscoveryUploads;
  /** Resource for '/uploads/\{uploadId\}' has methods for the following verbs: put, get */
  (path: "/uploads/{uploadId}", uploadId: string): CreateOrReplaceUpload;
  /** Resource for '/uploads/\{uploadId\}:complete' has methods for the following verbs: post */
  (path: "/uploads/{uploadId}:complete", uploadId: string): CompleteUpload;
  /** Resource for '/uploads/\{uploadId\}:cancel' has methods for the following verbs: post */
  (path: "/uploads/{uploadId}:cancel", uploadId: string): CancelUpload;
  /** Resource for '/uploads/\{uploadId\}/specialFilesUploadInfo:generate' has methods for the following verbs: post */
  (
    path: "/uploads/{uploadId}/specialFilesUploadInfo:generate",
    uploadId: string
  ): GenerateUploadSpecialFiles;
  /** Resource for '/uploads/\{uploadId\}/specialFilesUploadInfo:listWritableUris' has methods for the following verbs: post */
  (
    path: "/uploads/{uploadId}/specialFilesUploadInfo:listWritableUris",
    uploadId: string
  ): GetUploadSpecialFiles;
  /** Resource for '/uploads/\{uploadId\}/dataFilesUploadInfo:generate' has methods for the following verbs: post */
  (
    path: "/uploads/{uploadId}/dataFilesUploadInfo:generate",
    uploadId: string
  ): GenerateUploadDataFiles;
  /** Resource for '/uploads/\{uploadId\}/dataFilesUploadInfo:listWritableUris' has methods for the following verbs: post */
  (
    path: "/uploads/{uploadId}/dataFilesUploadInfo:listWritableUris",
    uploadId: string
  ): GetUploadDataFiles;
  /** Resource for '/uploads/\{uploadId\}/measurements' has methods for the following verbs: get */
  (path: "/uploads/{uploadId}/measurements", uploadId: string): ListMeasurements;
  /** Resource for '/classificationSchemas/\{name\}' has methods for the following verbs: get, delete */
  (path: "/classificationSchemas/{name}", name: string): GetClassificationSchema;
  /** Resource for '/classificationSchemas' has methods for the following verbs: post, get */
  (path: "/classificationSchemas"): CreateClassificationSchema;
  /** Resource for '/measurements/\{measurementId\}' has methods for the following verbs: get, delete */
  (path: "/measurements/{measurementId}", measurementId: string): GetMeasurement;
  /** Resource for '/measurements' has methods for the following verbs: get */
  (path: "/measurements"): GetMeasurements;
  /** Resource for '/measurements:queryMeasurementsWithMetadata' has methods for the following verbs: post */
  (path: "/measurements:queryMeasurementsWithMetadata"): GetMeasurementsWithMetadata;
  /** Resource for '/measurements:findByIds' has methods for the following verbs: post */
  (path: "/measurements:findByIds"): GetMeasurementsByIds;
  /** Resource for '/measurements/\{measurementId\}/metadata' has methods for the following verbs: get */
  (path: "/measurements/{measurementId}/metadata", measurementId: string): GetMeasurementMetadata;
  /** Resource for '/measurements/\{measurementId\}/processingResults' has methods for the following verbs: get */
  (
    path: "/measurements/{measurementId}/processingResults",
    measurementId: string
  ): GetMeasurementProcessingResults;
  /** Resource for '/measurements/\{measurementId\}/stateMachines/\{id\}' has methods for the following verbs: get */
  (
    path: "/measurements/{measurementId}/stateMachines/{id}",
    measurementId: string,
    id: string
  ): GetMeasurementStateMachine;
  /** Resource for '/measurements/\{measurementId\}/stateMachines' has methods for the following verbs: get */
  (
    path: "/measurements/{measurementId}/stateMachines",
    measurementId: string
  ): GetMeasurementStateMachines;
  /** Resource for '/measurements/\{measurementId\}/stateMachines/\{id\}:act' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/stateMachines/{id}:act",
    measurementId: string,
    id: string
  ): ActMeasurementStateMachine;
  /** Resource for '/measurements/\{measurementId\}/metadataSchemaFileInfo' has methods for the following verbs: get */
  (
    path: "/measurements/{measurementId}/metadataSchemaFileInfo",
    measurementId: string
  ): GetMeasurementMetadataSchemaFileInfo;
  /** Resource for '/measurements/\{measurementId\}/classifications/\{schemaName\}' has methods for the following verbs: get, delete */
  (
    path: "/measurements/{measurementId}/classifications/{schemaName}",
    measurementId: string,
    schemaName: string
  ): GetMeasurementClassification;
  /** Resource for '/measurements/\{measurementId\}/classifications' has methods for the following verbs: get, post */
  (
    path: "/measurements/{measurementId}/classifications",
    measurementId: string
  ): GetMeasurementClassifications;
  /** Resource for '/measurements/\{measurementId\}/dataStreams' has methods for the following verbs: post, get */
  (path: "/measurements/{measurementId}/dataStreams", measurementId: string): CreateDataStream;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}' has methods for the following verbs: get */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}",
    measurementId: string,
    dataStreamId: string
  ): GetDataStream;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}:clearContent' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}:clearContent",
    measurementId: string,
    dataStreamId: string
  ): ClearContentOfDataStream;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}:stageFiles' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}:stageFiles",
    measurementId: string,
    dataStreamId: string
  ): StageFilesForDataStream;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}:complete' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}:complete",
    measurementId: string,
    dataStreamId: string
  ): CompleteDataStream;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}:fail' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}:fail",
    measurementId: string,
    dataStreamId: string
  ): FailDataStream;
  /** Resource for '/measurements/\{measurementId\}/dataStreams:findByTags' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams:findByTags",
    measurementId: string
  ): GetDataStreamsByTags;
  /** Resource for '/measurements/\{measurementId\}/dataStreams:findByLineage' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams:findByLineage",
    measurementId: string
  ): GetDataStreamsByLineage;
  /** Resource for '/measurements/\{measurementId\}/dataStreams:getLineageGraphsByLineage' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams:getLineageGraphsByLineage",
    measurementId: string
  ): GetDataStreamLineageGraphsByLineage;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}/storage' has methods for the following verbs: put */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}/storage",
    measurementId: string,
    dataStreamId: string
  ): CreateOrReplaceDataStreamStorage;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}/storage:getWithWritableUris' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}/storage:getWithWritableUris",
    measurementId: string,
    dataStreamId: string
  ): GetDataStreamStorage;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}/tags' has methods for the following verbs: put, get */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}/tags",
    measurementId: string,
    dataStreamId: string
  ): CreateOrReplaceDataStreamTags;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}/files:generate' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}/files:generate",
    measurementId: string,
    dataStreamId: string
  ): GenerateDataStreamFiles;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}/files' has methods for the following verbs: get */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}/files",
    measurementId: string,
    dataStreamId: string
  ): GetDataStreamFiles;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}/logs:getWritableUri' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}/logs:getWritableUri",
    measurementId: string,
    dataStreamId: string
  ): GetDataStreamLogsContainerLocation;
}

export type AdpRestClient = Client & {
  path: Routes;
};
