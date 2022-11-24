// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LongRunningOperationsGetStatusParameters,
  DiscoveryOperationsCreateOrReplaceParameters,
  DiscoveryOperationsGetParameters,
  DiscoveryOperationsCompleteParameters,
  DiscoveryOperationsCancelParameters,
  DiscoverySpecialFileOperationsGenerateParameters,
  DiscoverySpecialFileOperationsListWritableUrisParameters,
  DiscoveryResultUploadOperationsListParameters,
  UploadOperationsCreateOrReplaceParameters,
  UploadOperationsGetParameters,
  UploadOperationsCompleteParameters,
  UploadOperationsCancelParameters,
  UploadSpecialFileOperationsListParameters,
  UploadSpecialFileOperationsGenerateParameters,
  UploadSpecialFileOperationsListWritableUrisParameters,
  UploadDataFileOperationsGenerateParameters,
  UploadDataFileOperationsListWritableUrisParameters,
  UploadResultMeasurementOperationsListParameters,
  ClassificationSchemaOperationsGetParameters,
  ClassificationSchemaOperationsDeleteParameters,
  ClassificationSchemaOperationsCreateParameters,
  ClassificationSchemaOperationsListParameters,
  MeasurementOperationsGetParameters,
  MeasurementOperationsDeleteParameters,
  MeasurementOperationsListParameters,
  MeasurementOperationsQueryMeasurementsWithMetadataParameters,
  MeasurementOperationsFindByIdsParameters,
  MeasurementMetadataOperationsGetParameters,
  MeasurementProcessingResultsOperationsGetParameters,
  MeasurementStateMachineOperationsGetParameters,
  MeasurementStateMachineOperationsListParameters,
  MeasurementStateMachineOperationsActParameters,
  MeasurementMetadataFileInfoOperationsCompleteParameters,
  MeasurementMetadataFileInfoOperationsGetWritableUriParameters,
  MeasurementMetadataSchemaFileInfoOperationsGetParameters,
  MeasurementClassificationOperationsGetParameters,
  MeasurementClassificationOperationsDeleteParameters,
  MeasurementClassificationOperationsCreateParameters,
  MeasurementClassificationOperationsListParameters,
  DataStreamOperationsGetParameters,
  DataStreamOperationsCreateParameters,
  DataStreamOperationsListParameters,
  DataStreamOperationsClearContentParameters,
  DataStreamOperationsStageFilesParameters,
  DataStreamOperationsCompleteParameters,
  DataStreamOperationsFailParameters,
  DataStreamOperationsFindByTagsParameters,
  DataStreamOperationsFindByLineageParameters,
  DataStreamOperationsGetLineageGraphsByLineageParameters,
  DataStreamsStorageOperationsCreateParameters,
  DataStreamsStorageOperationsGetWritableUrisParameters,
  DataStreamTagsOperationsGetParameters,
  DataStreamTagsOperationsCreateParameters,
  DataStreamFileOperationsListParameters,
  DataStreamFileOperationsGenerateParameters,
  DataStreamLogsContainerOperationsGetWritableUriParameters,
  DataStreamClassificationOperationsGetParameters,
  DataStreamClassificationOperationsDeleteParameters,
  DataStreamClassificationOperationsCreateParameters,
  DataStreamClassificationOperationsListParameters,
} from "./parameters";
import {
  LongRunningOperationsGetStatus200Response,
  LongRunningOperationsGetStatusDefaultResponse,
  DiscoveryOperationsCreateOrReplace200Response,
  DiscoveryOperationsCreateOrReplace201Response,
  DiscoveryOperationsCreateOrReplaceDefaultResponse,
  DiscoveryOperationsGet200Response,
  DiscoveryOperationsGetDefaultResponse,
  DiscoveryOperationsComplete200Response,
  DiscoveryOperationsComplete202Response,
  DiscoveryOperationsCompleteDefaultResponse,
  DiscoveryOperationsCancel200Response,
  DiscoveryOperationsCancel202Response,
  DiscoveryOperationsCancelDefaultResponse,
  DiscoverySpecialFileOperationsGenerate200Response,
  DiscoverySpecialFileOperationsGenerate202Response,
  DiscoverySpecialFileOperationsGenerateDefaultResponse,
  DiscoverySpecialFileOperationsListWritableUris200Response,
  DiscoverySpecialFileOperationsListWritableUrisDefaultResponse,
  DiscoveryResultUploadOperationsList200Response,
  DiscoveryResultUploadOperationsListDefaultResponse,
  UploadOperationsCreateOrReplace200Response,
  UploadOperationsCreateOrReplace201Response,
  UploadOperationsCreateOrReplaceDefaultResponse,
  UploadOperationsGet200Response,
  UploadOperationsGetDefaultResponse,
  UploadOperationsComplete200Response,
  UploadOperationsComplete202Response,
  UploadOperationsCompleteDefaultResponse,
  UploadOperationsCancel200Response,
  UploadOperationsCancel202Response,
  UploadOperationsCancelDefaultResponse,
  UploadSpecialFileOperationsList200Response,
  UploadSpecialFileOperationsListDefaultResponse,
  UploadSpecialFileOperationsGenerate200Response,
  UploadSpecialFileOperationsGenerate202Response,
  UploadSpecialFileOperationsGenerateDefaultResponse,
  UploadSpecialFileOperationsListWritableUris200Response,
  UploadSpecialFileOperationsListWritableUrisDefaultResponse,
  UploadDataFileOperationsGenerate200Response,
  UploadDataFileOperationsGenerate202Response,
  UploadDataFileOperationsGenerateDefaultResponse,
  UploadDataFileOperationsListWritableUris200Response,
  UploadDataFileOperationsListWritableUrisDefaultResponse,
  UploadResultMeasurementOperationsList200Response,
  UploadResultMeasurementOperationsListDefaultResponse,
  ClassificationSchemaOperationsGet200Response,
  ClassificationSchemaOperationsGetDefaultResponse,
  ClassificationSchemaOperationsDelete202Response,
  ClassificationSchemaOperationsDelete204Response,
  ClassificationSchemaOperationsDeleteDefaultResponse,
  ClassificationSchemaOperationsCreate200Response,
  ClassificationSchemaOperationsCreate202Response,
  ClassificationSchemaOperationsCreateDefaultResponse,
  ClassificationSchemaOperationsList200Response,
  ClassificationSchemaOperationsListDefaultResponse,
  MeasurementOperationsGet200Response,
  MeasurementOperationsGetDefaultResponse,
  MeasurementOperationsDelete202Response,
  MeasurementOperationsDelete204Response,
  MeasurementOperationsDeleteDefaultResponse,
  MeasurementOperationsList200Response,
  MeasurementOperationsListDefaultResponse,
  MeasurementOperationsQueryMeasurementsWithMetadata200Response,
  MeasurementOperationsQueryMeasurementsWithMetadataDefaultResponse,
  MeasurementOperationsFindByIds200Response,
  MeasurementOperationsFindByIdsDefaultResponse,
  MeasurementMetadataOperationsGet200Response,
  MeasurementMetadataOperationsGetDefaultResponse,
  MeasurementProcessingResultsOperationsGet200Response,
  MeasurementProcessingResultsOperationsGetDefaultResponse,
  MeasurementStateMachineOperationsGet200Response,
  MeasurementStateMachineOperationsGetDefaultResponse,
  MeasurementStateMachineOperationsList200Response,
  MeasurementStateMachineOperationsListDefaultResponse,
  MeasurementStateMachineOperationsAct200Response,
  MeasurementStateMachineOperationsAct202Response,
  MeasurementStateMachineOperationsActDefaultResponse,
  MeasurementMetadataFileInfoOperationsComplete200Response,
  MeasurementMetadataFileInfoOperationsComplete202Response,
  MeasurementMetadataFileInfoOperationsCompleteDefaultResponse,
  MeasurementMetadataFileInfoOperationsGetWritableUri200Response,
  MeasurementMetadataFileInfoOperationsGetWritableUriDefaultResponse,
  MeasurementMetadataSchemaFileInfoOperationsGet200Response,
  MeasurementMetadataSchemaFileInfoOperationsGetDefaultResponse,
  MeasurementClassificationOperationsGet200Response,
  MeasurementClassificationOperationsGetDefaultResponse,
  MeasurementClassificationOperationsDelete202Response,
  MeasurementClassificationOperationsDelete204Response,
  MeasurementClassificationOperationsDeleteDefaultResponse,
  MeasurementClassificationOperationsCreate200Response,
  MeasurementClassificationOperationsCreate202Response,
  MeasurementClassificationOperationsCreateDefaultResponse,
  MeasurementClassificationOperationsList200Response,
  MeasurementClassificationOperationsListDefaultResponse,
  DataStreamOperationsGet200Response,
  DataStreamOperationsGetDefaultResponse,
  DataStreamOperationsCreate200Response,
  DataStreamOperationsCreate202Response,
  DataStreamOperationsCreateDefaultResponse,
  DataStreamOperationsList200Response,
  DataStreamOperationsListDefaultResponse,
  DataStreamOperationsClearContent200Response,
  DataStreamOperationsClearContent202Response,
  DataStreamOperationsClearContentDefaultResponse,
  DataStreamOperationsStageFiles200Response,
  DataStreamOperationsStageFilesDefaultResponse,
  DataStreamOperationsComplete200Response,
  DataStreamOperationsComplete202Response,
  DataStreamOperationsCompleteDefaultResponse,
  DataStreamOperationsFail200Response,
  DataStreamOperationsFail202Response,
  DataStreamOperationsFailDefaultResponse,
  DataStreamOperationsFindByTags200Response,
  DataStreamOperationsFindByTagsDefaultResponse,
  DataStreamOperationsFindByLineage200Response,
  DataStreamOperationsFindByLineageDefaultResponse,
  DataStreamOperationsGetLineageGraphsByLineage200Response,
  DataStreamOperationsGetLineageGraphsByLineageDefaultResponse,
  DataStreamsStorageOperationsCreate200Response,
  DataStreamsStorageOperationsCreate201Response,
  DataStreamsStorageOperationsCreateDefaultResponse,
  DataStreamsStorageOperationsGetWritableUris200Response,
  DataStreamsStorageOperationsGetWritableUrisDefaultResponse,
  DataStreamTagsOperationsGet200Response,
  DataStreamTagsOperationsGetDefaultResponse,
  DataStreamTagsOperationsCreate200Response,
  DataStreamTagsOperationsCreate201Response,
  DataStreamTagsOperationsCreateDefaultResponse,
  DataStreamFileOperationsList200Response,
  DataStreamFileOperationsListDefaultResponse,
  DataStreamFileOperationsGenerate200Response,
  DataStreamFileOperationsGenerate202Response,
  DataStreamFileOperationsGenerateDefaultResponse,
  DataStreamLogsContainerOperationsGetWritableUri200Response,
  DataStreamLogsContainerOperationsGetWritableUriDefaultResponse,
  DataStreamClassificationOperationsGet200Response,
  DataStreamClassificationOperationsGetDefaultResponse,
  DataStreamClassificationOperationsDelete202Response,
  DataStreamClassificationOperationsDelete204Response,
  DataStreamClassificationOperationsDeleteDefaultResponse,
  DataStreamClassificationOperationsCreate200Response,
  DataStreamClassificationOperationsCreate202Response,
  DataStreamClassificationOperationsCreateDefaultResponse,
  DataStreamClassificationOperationsList200Response,
  DataStreamClassificationOperationsListDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface LongRunningOperationsGetStatus {
  /** Get the details of an LRO. */
  get(
    options?: LongRunningOperationsGetStatusParameters
  ): StreamableMethod<
    | LongRunningOperationsGetStatus200Response
    | LongRunningOperationsGetStatusDefaultResponse
  >;
}

export interface DiscoveryOperationsCreateOrReplace {
  /** Creates a new ingestion discovery instance. */
  put(
    options?: DiscoveryOperationsCreateOrReplaceParameters
  ): StreamableMethod<
    | DiscoveryOperationsCreateOrReplace200Response
    | DiscoveryOperationsCreateOrReplace201Response
    | DiscoveryOperationsCreateOrReplaceDefaultResponse
  >;
  /** Get discovery by ID. */
  get(
    options?: DiscoveryOperationsGetParameters
  ): StreamableMethod<
    DiscoveryOperationsGet200Response | DiscoveryOperationsGetDefaultResponse
  >;
}

export interface DiscoveryOperationsComplete {
  /** Initiates the process of completing the discovery and creating the upload file grouping manifest files. */
  post(
    options?: DiscoveryOperationsCompleteParameters
  ): StreamableMethod<
    | DiscoveryOperationsComplete200Response
    | DiscoveryOperationsComplete202Response
    | DiscoveryOperationsCompleteDefaultResponse
  >;
}

export interface DiscoveryOperationsCancel {
  /** Initiates the process of cancelling the discovery. */
  post(
    options?: DiscoveryOperationsCancelParameters
  ): StreamableMethod<
    | DiscoveryOperationsCancel200Response
    | DiscoveryOperationsCancel202Response
    | DiscoveryOperationsCancelDefaultResponse
  >;
}

export interface DiscoverySpecialFileOperationsGenerate {
  /** Initiates the process of generating SAS signed URIs for uploading special files for the discovery. */
  post(
    options?: DiscoverySpecialFileOperationsGenerateParameters
  ): StreamableMethod<
    | DiscoverySpecialFileOperationsGenerate200Response
    | DiscoverySpecialFileOperationsGenerate202Response
    | DiscoverySpecialFileOperationsGenerateDefaultResponse
  >;
}

export interface DiscoverySpecialFileOperationsListWritableUris {
  /**
   * List special files details for the discovery resource.
   * Returns SAS signed URI that allows uploading special files to Azure Storage.
   * This URI expires in 24 hours.
   */
  post(
    options?: DiscoverySpecialFileOperationsListWritableUrisParameters
  ): StreamableMethod<
    | DiscoverySpecialFileOperationsListWritableUris200Response
    | DiscoverySpecialFileOperationsListWritableUrisDefaultResponse
  >;
}

export interface DiscoveryResultUploadOperationsList {
  /** List upload detail for the discovery resource. */
  get(
    options?: DiscoveryResultUploadOperationsListParameters
  ): StreamableMethod<
    | DiscoveryResultUploadOperationsList200Response
    | DiscoveryResultUploadOperationsListDefaultResponse
  >;
}

export interface UploadOperationsCreateOrReplace {
  /** Creates a new ingestion upload instance. */
  put(
    options?: UploadOperationsCreateOrReplaceParameters
  ): StreamableMethod<
    | UploadOperationsCreateOrReplace200Response
    | UploadOperationsCreateOrReplace201Response
    | UploadOperationsCreateOrReplaceDefaultResponse
  >;
  /** Get discovery by ID. */
  get(
    options?: UploadOperationsGetParameters
  ): StreamableMethod<
    UploadOperationsGet200Response | UploadOperationsGetDefaultResponse
  >;
}

export interface UploadOperationsComplete {
  /** Initiates the process of completing the upload and creating the measurements. */
  post(
    options?: UploadOperationsCompleteParameters
  ): StreamableMethod<
    | UploadOperationsComplete200Response
    | UploadOperationsComplete202Response
    | UploadOperationsCompleteDefaultResponse
  >;
}

export interface UploadOperationsCancel {
  /** Initiates the process of cancelling the upload. */
  post(
    options?: UploadOperationsCancelParameters
  ): StreamableMethod<
    | UploadOperationsCancel200Response
    | UploadOperationsCancel202Response
    | UploadOperationsCancelDefaultResponse
  >;
}

export interface UploadSpecialFileOperationsList {
  /** Returns SAS signed URIs for reading special files from Azure Storage. */
  get(
    options?: UploadSpecialFileOperationsListParameters
  ): StreamableMethod<
    | UploadSpecialFileOperationsList200Response
    | UploadSpecialFileOperationsListDefaultResponse
  >;
}

export interface UploadSpecialFileOperationsGenerate {
  /** Initiates the process of generating SAS signed URIs for uploading special files for the upload. */
  post(
    options?: UploadSpecialFileOperationsGenerateParameters
  ): StreamableMethod<
    | UploadSpecialFileOperationsGenerate200Response
    | UploadSpecialFileOperationsGenerate202Response
    | UploadSpecialFileOperationsGenerateDefaultResponse
  >;
}

export interface UploadSpecialFileOperationsListWritableUris {
  /**
   * List special files details for the upload resource.
   * Returns SAS signed URI that allows uploading special files to Azure Storage.
   * This URI expires in 24 hours.
   */
  post(
    options?: UploadSpecialFileOperationsListWritableUrisParameters
  ): StreamableMethod<
    | UploadSpecialFileOperationsListWritableUris200Response
    | UploadSpecialFileOperationsListWritableUrisDefaultResponse
  >;
}

export interface UploadDataFileOperationsGenerate {
  /** Initiates the process of allocating the data files. */
  post(
    options?: UploadDataFileOperationsGenerateParameters
  ): StreamableMethod<
    | UploadDataFileOperationsGenerate200Response
    | UploadDataFileOperationsGenerate202Response
    | UploadDataFileOperationsGenerateDefaultResponse
  >;
}

export interface UploadDataFileOperationsListWritableUris {
  /**
   * List special files details for the upload resource.
   * Returns SAS signed URI that allows uploading data files to Azure Storage.
   * This URI expires in 24 hours.
   */
  post(
    options?: UploadDataFileOperationsListWritableUrisParameters
  ): StreamableMethod<
    | UploadDataFileOperationsListWritableUris200Response
    | UploadDataFileOperationsListWritableUrisDefaultResponse
  >;
}

export interface UploadResultMeasurementOperationsList {
  /** List of the measurement identifiers that have been created by the upload. */
  get(
    options?: UploadResultMeasurementOperationsListParameters
  ): StreamableMethod<
    | UploadResultMeasurementOperationsList200Response
    | UploadResultMeasurementOperationsListDefaultResponse
  >;
}

export interface ClassificationSchemaOperationsGet {
  /** Get classification schema by name. */
  get(
    options?: ClassificationSchemaOperationsGetParameters
  ): StreamableMethod<
    | ClassificationSchemaOperationsGet200Response
    | ClassificationSchemaOperationsGetDefaultResponse
  >;
  /** Deletes the classification schema and all related classification assignments (instances). */
  delete(
    options?: ClassificationSchemaOperationsDeleteParameters
  ): StreamableMethod<
    | ClassificationSchemaOperationsDelete202Response
    | ClassificationSchemaOperationsDelete204Response
    | ClassificationSchemaOperationsDeleteDefaultResponse
  >;
}

export interface ClassificationSchemaOperationsCreate {
  /** Creates new classification schema. */
  post(
    options?: ClassificationSchemaOperationsCreateParameters
  ): StreamableMethod<
    | ClassificationSchemaOperationsCreate200Response
    | ClassificationSchemaOperationsCreate202Response
    | ClassificationSchemaOperationsCreateDefaultResponse
  >;
  /** List all classification schemas. */
  get(
    options?: ClassificationSchemaOperationsListParameters
  ): StreamableMethod<
    | ClassificationSchemaOperationsList200Response
    | ClassificationSchemaOperationsListDefaultResponse
  >;
}

export interface MeasurementOperationsGet {
  /** Get measurement by ID. */
  get(
    options?: MeasurementOperationsGetParameters
  ): StreamableMethod<
    | MeasurementOperationsGet200Response
    | MeasurementOperationsGetDefaultResponse
  >;
  /** Deletes the measurement. */
  delete(
    options?: MeasurementOperationsDeleteParameters
  ): StreamableMethod<
    | MeasurementOperationsDelete202Response
    | MeasurementOperationsDelete204Response
    | MeasurementOperationsDeleteDefaultResponse
  >;
}

export interface MeasurementOperationsList {
  /** Lists the measurements in a workspace. */
  get(
    options?: MeasurementOperationsListParameters
  ): StreamableMethod<
    | MeasurementOperationsList200Response
    | MeasurementOperationsListDefaultResponse
  >;
}

export interface MeasurementOperationsQueryMeasurementsWithMetadata {
  /** Lists the measurements in a workspace with extended metadata. */
  post(
    options?: MeasurementOperationsQueryMeasurementsWithMetadataParameters
  ): StreamableMethod<
    | MeasurementOperationsQueryMeasurementsWithMetadata200Response
    | MeasurementOperationsQueryMeasurementsWithMetadataDefaultResponse
  >;
}

export interface MeasurementOperationsFindByIds {
  /** Lists the measurements in a workspace that are in the given measurement IDs list. */
  post(
    options?: MeasurementOperationsFindByIdsParameters
  ): StreamableMethod<
    | MeasurementOperationsFindByIds200Response
    | MeasurementOperationsFindByIdsDefaultResponse
  >;
}

export interface MeasurementMetadataOperationsGet {
  /** Returns the measurement metadata. */
  get(
    options?: MeasurementMetadataOperationsGetParameters
  ): StreamableMethod<
    | MeasurementMetadataOperationsGet200Response
    | MeasurementMetadataOperationsGetDefaultResponse
  >;
}

export interface MeasurementProcessingResultsOperationsGet {
  /** Returns the measurement processing result. */
  get(
    options?: MeasurementProcessingResultsOperationsGetParameters
  ): StreamableMethod<
    | MeasurementProcessingResultsOperationsGet200Response
    | MeasurementProcessingResultsOperationsGetDefaultResponse
  >;
}

export interface MeasurementStateMachineOperationsGet {
  /** Returns the state machine instance for the measurement. */
  get(
    options?: MeasurementStateMachineOperationsGetParameters
  ): StreamableMethod<
    | MeasurementStateMachineOperationsGet200Response
    | MeasurementStateMachineOperationsGetDefaultResponse
  >;
}

export interface MeasurementStateMachineOperationsList {
  /** List state machines instance for the measurement. */
  get(
    options?: MeasurementStateMachineOperationsListParameters
  ): StreamableMethod<
    | MeasurementStateMachineOperationsList200Response
    | MeasurementStateMachineOperationsListDefaultResponse
  >;
}

export interface MeasurementStateMachineOperationsAct {
  /** Initiates process of applying an action on the measurement. */
  post(
    options?: MeasurementStateMachineOperationsActParameters
  ): StreamableMethod<
    | MeasurementStateMachineOperationsAct200Response
    | MeasurementStateMachineOperationsAct202Response
    | MeasurementStateMachineOperationsActDefaultResponse
  >;
}

export interface MeasurementMetadataFileInfoOperationsComplete {
  /** Initiates a process that replaces the measurement's metadata file */
  post(
    options?: MeasurementMetadataFileInfoOperationsCompleteParameters
  ): StreamableMethod<
    | MeasurementMetadataFileInfoOperationsComplete200Response
    | MeasurementMetadataFileInfoOperationsComplete202Response
    | MeasurementMetadataFileInfoOperationsCompleteDefaultResponse
  >;
}

export interface MeasurementMetadataFileInfoOperationsGetWritableUri {
  /**
   * Returns SAS signed URI that allows uploading temporary measurement metadata file to Azure Storage.
   * This URI expires in 24 hours.
   */
  post(
    options?: MeasurementMetadataFileInfoOperationsGetWritableUriParameters
  ): StreamableMethod<
    | MeasurementMetadataFileInfoOperationsGetWritableUri200Response
    | MeasurementMetadataFileInfoOperationsGetWritableUriDefaultResponse
  >;
}

export interface MeasurementMetadataSchemaFileInfoOperationsGet {
  /** Returns the measurement metadata schema file information. */
  get(
    options?: MeasurementMetadataSchemaFileInfoOperationsGetParameters
  ): StreamableMethod<
    | MeasurementMetadataSchemaFileInfoOperationsGet200Response
    | MeasurementMetadataSchemaFileInfoOperationsGetDefaultResponse
  >;
}

export interface MeasurementClassificationOperationsGet {
  /** Get measurement classification by schema name. */
  get(
    options?: MeasurementClassificationOperationsGetParameters
  ): StreamableMethod<
    | MeasurementClassificationOperationsGet200Response
    | MeasurementClassificationOperationsGetDefaultResponse
  >;
  /** Unassign the classification from the measurement. */
  delete(
    options?: MeasurementClassificationOperationsDeleteParameters
  ): StreamableMethod<
    | MeasurementClassificationOperationsDelete202Response
    | MeasurementClassificationOperationsDelete204Response
    | MeasurementClassificationOperationsDeleteDefaultResponse
  >;
}

export interface MeasurementClassificationOperationsCreate {
  /** Assigns classification to the measurement. */
  post(
    options?: MeasurementClassificationOperationsCreateParameters
  ): StreamableMethod<
    | MeasurementClassificationOperationsCreate200Response
    | MeasurementClassificationOperationsCreate202Response
    | MeasurementClassificationOperationsCreateDefaultResponse
  >;
  /** Lists the classifications assigned to the measurement. */
  get(
    options?: MeasurementClassificationOperationsListParameters
  ): StreamableMethod<
    | MeasurementClassificationOperationsList200Response
    | MeasurementClassificationOperationsListDefaultResponse
  >;
}

export interface DataStreamOperationsGet {
  /** Get data-stream by identifier. */
  get(
    options?: DataStreamOperationsGetParameters
  ): StreamableMethod<
    DataStreamOperationsGet200Response | DataStreamOperationsGetDefaultResponse
  >;
}

export interface DataStreamOperationsCreate {
  /** Creates new data-stream resource. */
  post(
    options?: DataStreamOperationsCreateParameters
  ): StreamableMethod<
    | DataStreamOperationsCreate200Response
    | DataStreamOperationsCreate202Response
    | DataStreamOperationsCreateDefaultResponse
  >;
  /**
   * Lists the existing data-streams.
   * Supports the following filter expressions:
   * - filter="type=[System | Raw | Derived]"
   */
  get(
    options?: DataStreamOperationsListParameters
  ): StreamableMethod<
    | DataStreamOperationsList200Response
    | DataStreamOperationsListDefaultResponse
  >;
}

export interface DataStreamOperationsClearContent {
  /** Clear the data-stream content. */
  post(
    options?: DataStreamOperationsClearContentParameters
  ): StreamableMethod<
    | DataStreamOperationsClearContent200Response
    | DataStreamOperationsClearContent202Response
    | DataStreamOperationsClearContentDefaultResponse
  >;
}

export interface DataStreamOperationsStageFiles {
  /**
   * Returns SAS-signed upload URIs for files that need to be uploaded to Azure Storage.
   * This URI expires in 24 hours.
   */
  post(
    options?: DataStreamOperationsStageFilesParameters
  ): StreamableMethod<
    | DataStreamOperationsStageFiles200Response
    | DataStreamOperationsStageFilesDefaultResponse
  >;
}

export interface DataStreamOperationsComplete {
  /** Marks a data stream as completed */
  post(
    options?: DataStreamOperationsCompleteParameters
  ): StreamableMethod<
    | DataStreamOperationsComplete200Response
    | DataStreamOperationsComplete202Response
    | DataStreamOperationsCompleteDefaultResponse
  >;
}

export interface DataStreamOperationsFail {
  /** Marks a data stream as failed */
  post(
    options?: DataStreamOperationsFailParameters
  ): StreamableMethod<
    | DataStreamOperationsFail200Response
    | DataStreamOperationsFail202Response
    | DataStreamOperationsFailDefaultResponse
  >;
}

export interface DataStreamOperationsFindByTags {
  /** Lists the data-streams by tags. */
  post(
    options?: DataStreamOperationsFindByTagsParameters
  ): StreamableMethod<
    | DataStreamOperationsFindByTags200Response
    | DataStreamOperationsFindByTagsDefaultResponse
  >;
}

export interface DataStreamOperationsFindByLineage {
  /** Lists the data-streams by lineage. */
  post(
    options?: DataStreamOperationsFindByLineageParameters
  ): StreamableMethod<
    | DataStreamOperationsFindByLineage200Response
    | DataStreamOperationsFindByLineageDefaultResponse
  >;
}

export interface DataStreamOperationsGetLineageGraphsByLineage {
  /** Lists the data-streams by lineage graph. */
  post(
    options?: DataStreamOperationsGetLineageGraphsByLineageParameters
  ): StreamableMethod<
    | DataStreamOperationsGetLineageGraphsByLineage200Response
    | DataStreamOperationsGetLineageGraphsByLineageDefaultResponse
  >;
}

export interface DataStreamsStorageOperationsCreate {
  /**
   * Create or replace storage information of the data-stream.
   * Returns the data-stream storage resource with SAS signed URIs that allow uploading to Azure Storage.
   * The SAS token expires in 24 hours.
   */
  put(
    options?: DataStreamsStorageOperationsCreateParameters
  ): StreamableMethod<
    | DataStreamsStorageOperationsCreate200Response
    | DataStreamsStorageOperationsCreate201Response
    | DataStreamsStorageOperationsCreateDefaultResponse
  >;
}

export interface DataStreamsStorageOperationsGetWritableUris {
  /**
   * Returns the data-stream storage resource with SAS signed URIs that allow uploading to Azure Storage.
   * The SAS token expires in 24 hours.
   */
  post(
    options?: DataStreamsStorageOperationsGetWritableUrisParameters
  ): StreamableMethod<
    | DataStreamsStorageOperationsGetWritableUris200Response
    | DataStreamsStorageOperationsGetWritableUrisDefaultResponse
  >;
}

export interface DataStreamTagsOperationsGet {
  /** Returns set of the data-stream tags. */
  get(
    options?: DataStreamTagsOperationsGetParameters
  ): StreamableMethod<
    | DataStreamTagsOperationsGet200Response
    | DataStreamTagsOperationsGetDefaultResponse
  >;
  /** Create or replace all tags at once. */
  put(
    options?: DataStreamTagsOperationsCreateParameters
  ): StreamableMethod<
    | DataStreamTagsOperationsCreate200Response
    | DataStreamTagsOperationsCreate201Response
    | DataStreamTagsOperationsCreateDefaultResponse
  >;
}

export interface DataStreamFileOperationsList {
  /** Returns SAS signed URIs for reading special files from Azure Storage. */
  get(
    options?: DataStreamFileOperationsListParameters
  ): StreamableMethod<
    | DataStreamFileOperationsList200Response
    | DataStreamFileOperationsListDefaultResponse
  >;
}

export interface DataStreamFileOperationsGenerate {
  /** Initiates the process of generating SAS signed URIs for accessing the data-stream files. */
  post(
    options?: DataStreamFileOperationsGenerateParameters
  ): StreamableMethod<
    | DataStreamFileOperationsGenerate200Response
    | DataStreamFileOperationsGenerate202Response
    | DataStreamFileOperationsGenerateDefaultResponse
  >;
}

export interface DataStreamLogsContainerOperationsGetWritableUri {
  /**
   * Returns SAS signed URI of the data-stream logs folder that allow uploading log files to Azure Storage.
   * The SAS token expires in 24 hours.
   */
  post(
    options?: DataStreamLogsContainerOperationsGetWritableUriParameters
  ): StreamableMethod<
    | DataStreamLogsContainerOperationsGetWritableUri200Response
    | DataStreamLogsContainerOperationsGetWritableUriDefaultResponse
  >;
}

export interface DataStreamClassificationOperationsGet {
  /** Get classification by schema name. */
  get(
    options?: DataStreamClassificationOperationsGetParameters
  ): StreamableMethod<
    | DataStreamClassificationOperationsGet200Response
    | DataStreamClassificationOperationsGetDefaultResponse
  >;
  /** Unassign the classification from the data-stream. */
  delete(
    options?: DataStreamClassificationOperationsDeleteParameters
  ): StreamableMethod<
    | DataStreamClassificationOperationsDelete202Response
    | DataStreamClassificationOperationsDelete204Response
    | DataStreamClassificationOperationsDeleteDefaultResponse
  >;
}

export interface DataStreamClassificationOperationsCreate {
  /** Assigns the classification to the data-stream. */
  post(
    options?: DataStreamClassificationOperationsCreateParameters
  ): StreamableMethod<
    | DataStreamClassificationOperationsCreate200Response
    | DataStreamClassificationOperationsCreate202Response
    | DataStreamClassificationOperationsCreateDefaultResponse
  >;
  /** Lists the classifications assigned to the data-stream. */
  get(
    options?: DataStreamClassificationOperationsListParameters
  ): StreamableMethod<
    | DataStreamClassificationOperationsList200Response
    | DataStreamClassificationOperationsListDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/operations/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/operations/{operationId}",
    operationId: string
  ): LongRunningOperationsGetStatus;
  /** Resource for '/discoveries/\{discoveryId\}' has methods for the following verbs: put, get */
  (
    path: "/discoveries/{discoveryId}",
    discoveryId: string
  ): DiscoveryOperationsCreateOrReplace;
  /** Resource for '/discoveries/\{discoveryId\}:complete' has methods for the following verbs: post */
  (
    path: "/discoveries/{discoveryId}:complete",
    discoveryId: string
  ): DiscoveryOperationsComplete;
  /** Resource for '/discoveries/\{discoveryId\}:cancel' has methods for the following verbs: post */
  (
    path: "/discoveries/{discoveryId}:cancel",
    discoveryId: string
  ): DiscoveryOperationsCancel;
  /** Resource for '/discoveries/\{discoveryId\}/specialFilesUploadInfo:generate' has methods for the following verbs: post */
  (
    path: "/discoveries/{discoveryId}/specialFilesUploadInfo:generate",
    discoveryId: string
  ): DiscoverySpecialFileOperationsGenerate;
  /** Resource for '/discoveries/\{discoveryId\}/specialFilesUploadInfo:listWritableUris' has methods for the following verbs: post */
  (
    path: "/discoveries/{discoveryId}/specialFilesUploadInfo:listWritableUris",
    discoveryId: string
  ): DiscoverySpecialFileOperationsListWritableUris;
  /** Resource for '/discoveries/\{discoveryId\}/uploads' has methods for the following verbs: get */
  (
    path: "/discoveries/{discoveryId}/uploads",
    discoveryId: string
  ): DiscoveryResultUploadOperationsList;
  /** Resource for '/uploads/\{uploadId\}' has methods for the following verbs: put, get */
  (
    path: "/uploads/{uploadId}",
    uploadId: string
  ): UploadOperationsCreateOrReplace;
  /** Resource for '/uploads/\{uploadId\}:complete' has methods for the following verbs: post */
  (
    path: "/uploads/{uploadId}:complete",
    uploadId: string
  ): UploadOperationsComplete;
  /** Resource for '/uploads/\{uploadId\}:cancel' has methods for the following verbs: post */
  (
    path: "/uploads/{uploadId}:cancel",
    uploadId: string
  ): UploadOperationsCancel;
  /** Resource for '/uploads/\{uploadId\}/specialFilesUploadInfo' has methods for the following verbs: get */
  (
    path: "/uploads/{uploadId}/specialFilesUploadInfo",
    uploadId: string
  ): UploadSpecialFileOperationsList;
  /** Resource for '/uploads/\{uploadId\}/specialFilesUploadInfo:generate' has methods for the following verbs: post */
  (
    path: "/uploads/{uploadId}/specialFilesUploadInfo:generate",
    uploadId: string
  ): UploadSpecialFileOperationsGenerate;
  /** Resource for '/uploads/\{uploadId\}/specialFilesUploadInfo:listWritableUris' has methods for the following verbs: post */
  (
    path: "/uploads/{uploadId}/specialFilesUploadInfo:listWritableUris",
    uploadId: string
  ): UploadSpecialFileOperationsListWritableUris;
  /** Resource for '/uploads/\{uploadId\}/dataFilesUploadInfo:generate' has methods for the following verbs: post */
  (
    path: "/uploads/{uploadId}/dataFilesUploadInfo:generate",
    uploadId: string
  ): UploadDataFileOperationsGenerate;
  /** Resource for '/uploads/\{uploadId\}/dataFilesUploadInfo:listWritableUris' has methods for the following verbs: post */
  (
    path: "/uploads/{uploadId}/dataFilesUploadInfo:listWritableUris",
    uploadId: string
  ): UploadDataFileOperationsListWritableUris;
  /** Resource for '/uploads/\{uploadId\}/measurements' has methods for the following verbs: get */
  (
    path: "/uploads/{uploadId}/measurements",
    uploadId: string
  ): UploadResultMeasurementOperationsList;
  /** Resource for '/classificationSchemas/\{name\}' has methods for the following verbs: get, delete */
  (
    path: "/classificationSchemas/{name}",
    name: string
  ): ClassificationSchemaOperationsGet;
  /** Resource for '/classificationSchemas' has methods for the following verbs: post, get */
  (path: "/classificationSchemas"): ClassificationSchemaOperationsCreate;
  /** Resource for '/measurements/\{measurementId\}' has methods for the following verbs: get, delete */
  (
    path: "/measurements/{measurementId}",
    measurementId: string
  ): MeasurementOperationsGet;
  /** Resource for '/measurements' has methods for the following verbs: get */
  (path: "/measurements"): MeasurementOperationsList;
  /** Resource for '/measurements:queryMeasurementsWithMetadata' has methods for the following verbs: post */
  (
    path: "/measurements:queryMeasurementsWithMetadata"
  ): MeasurementOperationsQueryMeasurementsWithMetadata;
  /** Resource for '/measurements:findByIds' has methods for the following verbs: post */
  (path: "/measurements:findByIds"): MeasurementOperationsFindByIds;
  /** Resource for '/measurements/\{measurementId\}/metadata' has methods for the following verbs: get */
  (
    path: "/measurements/{measurementId}/metadata",
    measurementId: string
  ): MeasurementMetadataOperationsGet;
  /** Resource for '/measurements/\{measurementId\}/processingResults' has methods for the following verbs: get */
  (
    path: "/measurements/{measurementId}/processingResults",
    measurementId: string
  ): MeasurementProcessingResultsOperationsGet;
  /** Resource for '/measurements/\{measurementId\}/stateMachines/\{id\}' has methods for the following verbs: get */
  (
    path: "/measurements/{measurementId}/stateMachines/{id}",
    measurementId: string,
    id: string
  ): MeasurementStateMachineOperationsGet;
  /** Resource for '/measurements/\{measurementId\}/stateMachines' has methods for the following verbs: get */
  (
    path: "/measurements/{measurementId}/stateMachines",
    measurementId: string
  ): MeasurementStateMachineOperationsList;
  /** Resource for '/measurements/\{measurementId\}/stateMachines/\{id\}:act' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/stateMachines/{id}:act",
    measurementId: string,
    id: string
  ): MeasurementStateMachineOperationsAct;
  /** Resource for '/measurements/\{measurementId\}/metadataFileInfo:complete' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/metadataFileInfo:complete",
    measurementId: string
  ): MeasurementMetadataFileInfoOperationsComplete;
  /** Resource for '/measurements/\{measurementId\}/metadataFileInfo:getWritableUri' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/metadataFileInfo:getWritableUri",
    measurementId: string
  ): MeasurementMetadataFileInfoOperationsGetWritableUri;
  /** Resource for '/measurements/\{measurementId\}/metadataSchemaFileInfo' has methods for the following verbs: get */
  (
    path: "/measurements/{measurementId}/metadataSchemaFileInfo",
    measurementId: string
  ): MeasurementMetadataSchemaFileInfoOperationsGet;
  /** Resource for '/measurements/\{measurementId\}/classifications/\{schemaName\}' has methods for the following verbs: get, delete */
  (
    path: "/measurements/{measurementId}/classifications/{schemaName}",
    measurementId: string,
    schemaName: string
  ): MeasurementClassificationOperationsGet;
  /** Resource for '/measurements/\{measurementId\}/classifications' has methods for the following verbs: post, get */
  (
    path: "/measurements/{measurementId}/classifications",
    measurementId: string
  ): MeasurementClassificationOperationsCreate;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}' has methods for the following verbs: get */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}",
    measurementId: string,
    dataStreamId: string
  ): DataStreamOperationsGet;
  /** Resource for '/measurements/\{measurementId\}/dataStreams' has methods for the following verbs: post, get */
  (
    path: "/measurements/{measurementId}/dataStreams",
    measurementId: string
  ): DataStreamOperationsCreate;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}:clearContent' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}:clearContent",
    measurementId: string,
    dataStreamId: string
  ): DataStreamOperationsClearContent;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}:stageFiles' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}:stageFiles",
    measurementId: string,
    dataStreamId: string
  ): DataStreamOperationsStageFiles;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}:complete' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}:complete",
    measurementId: string,
    dataStreamId: string
  ): DataStreamOperationsComplete;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}:fail' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}:fail",
    measurementId: string,
    dataStreamId: string
  ): DataStreamOperationsFail;
  /** Resource for '/measurements/\{measurementId\}/dataStreams:findByTags' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams:findByTags",
    measurementId: string
  ): DataStreamOperationsFindByTags;
  /** Resource for '/measurements/\{measurementId\}/dataStreams:findByLineage' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams:findByLineage",
    measurementId: string
  ): DataStreamOperationsFindByLineage;
  /** Resource for '/measurements/\{measurementId\}/dataStreams:getLineageGraphsByLineage' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams:getLineageGraphsByLineage",
    measurementId: string
  ): DataStreamOperationsGetLineageGraphsByLineage;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}/storage' has methods for the following verbs: put */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}/storage",
    measurementId: string,
    dataStreamId: string
  ): DataStreamsStorageOperationsCreate;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}/storage:getWritableUris' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}/storage:getWritableUris",
    measurementId: string,
    dataStreamId: string
  ): DataStreamsStorageOperationsGetWritableUris;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}/tags' has methods for the following verbs: get, put */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}/tags",
    measurementId: string,
    dataStreamId: string
  ): DataStreamTagsOperationsGet;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}/files' has methods for the following verbs: get */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}/files",
    measurementId: string,
    dataStreamId: string
  ): DataStreamFileOperationsList;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}/files:generate' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}/files:generate",
    measurementId: string,
    dataStreamId: string
  ): DataStreamFileOperationsGenerate;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}/logs:getWritableUri' has methods for the following verbs: post */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}/logs:getWritableUri",
    measurementId: string,
    dataStreamId: string
  ): DataStreamLogsContainerOperationsGetWritableUri;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}/classifications/\{schemaName\}' has methods for the following verbs: get, delete */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}/classifications/{schemaName}",
    measurementId: string,
    dataStreamId: string,
    schemaName: string
  ): DataStreamClassificationOperationsGet;
  /** Resource for '/measurements/\{measurementId\}/dataStreams/\{dataStreamId\}/classifications' has methods for the following verbs: post, get */
  (
    path: "/measurements/{measurementId}/dataStreams/{dataStreamId}/classifications",
    measurementId: string,
    dataStreamId: string
  ): DataStreamClassificationOperationsCreate;
}

export type ADPRestClient = Client & {
  path: Routes;
};
