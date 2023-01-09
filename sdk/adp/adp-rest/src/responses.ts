// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  LongRunningOperationOutput,
  ErrorResponseOutput,
  DiscoveryOutput,
  LongRunningOperationResponseOutput,
  PagedDiscoverySpecialFileOutput,
  DiscoverySpecialFileOutput,
  PagedDiscoveryUploadOutput,
  UploadOutput,
  UploadSpecialFileOutput,
  PagedUploadSpecialFileOutput,
  UploadDataFileOutput,
  PagedUploadDataFileOutput,
  PagedUploadResultMeasurementOutput,
  ClassificationSchemaOutput,
  PagedClassificationSchemaOutput,
  MeasurementOutput,
  PagedMeasurementOutput,
  PagedMeasurementWithMetadataOutput,
  MeasurementMetadataBaseOutput,
  MeasurementProcessingResultsBaseOutput,
  StateMachineOutput,
  PagedStateMachineOutput,
  MeasurementMetadataSchemaFileInfoBaseOutput,
  MeasurementClassificationOutput,
  PagedMeasurementClassificationOutput,
  DataStreamOutput,
  PagedDataStreamOutput,
  UploadDerivedDataStreamFilesResponseOutput,
  PagedDataStreamsGraphListResponseOutput,
  StorageOutput,
  StorageBaseOutput,
  TagSetBaseOutput,
  TagSetOutput,
  DataStreamFileOutput,
  PagedDataStreamFileOutput,
  DataStreamLogsContainerBaseOutput,
} from "./outputModels";

export interface GetLongRunning200Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** Final location of the operation result. */
  location?: string;
}

/** The request has succeeded. */
export interface GetLongRunning200Response extends HttpResponse {
  status: "200";
  body: LongRunningOperationOutput;
  headers: RawHttpHeaders & GetLongRunning200Headers;
}

export interface GetLongRunningDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface CreateOrReplaceDiscovery200Response extends HttpResponse {
  status: "200";
  body: DiscoveryOutput;
}

/** A Discovery resource was successfully created. */
export interface CreateOrReplaceDiscovery201Response extends HttpResponse {
  status: "201";
  body: DiscoveryOutput;
}

export interface CreateOrReplaceDiscoveryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetDiscovery200Response extends HttpResponse {
  status: "200";
  body: DiscoveryOutput;
}

export interface GetDiscoveryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface CompleteDiscovery200Response extends HttpResponse {
  status: "200";
  body: DiscoveryOutput;
}

export interface CompleteDiscovery202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: string;
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface CompleteDiscovery202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & CompleteDiscovery202Headers;
}

export interface CompleteDiscoveryDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface CompleteDiscoveryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CompleteDiscoveryDefaultHeaders;
}

/** The request has succeeded. */
export interface CancelDiscovery200Response extends HttpResponse {
  status: "200";
  body: DiscoveryOutput;
}

export interface CancelDiscovery202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: string;
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface CancelDiscovery202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & CancelDiscovery202Headers;
}

export interface CancelDiscoveryDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface CancelDiscoveryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CancelDiscoveryDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDiscoverySpecialFileUploadLocations200Response extends HttpResponse {
  status: "200";
  body: PagedDiscoverySpecialFileOutput;
}

export interface GetDiscoverySpecialFileUploadLocationsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GenerateDiscoverySpecialFileUploadLocations200Response extends HttpResponse {
  status: "200";
  body: DiscoverySpecialFileOutput;
}

export interface GenerateDiscoverySpecialFileUploadLocations202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: string;
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface GenerateDiscoverySpecialFileUploadLocations202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & GenerateDiscoverySpecialFileUploadLocations202Headers;
}

export interface GenerateDiscoverySpecialFileUploadLocationsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetAllDiscoveryUploads200Response extends HttpResponse {
  status: "200";
  body: PagedDiscoveryUploadOutput;
}

export interface GetAllDiscoveryUploadsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface CreateOrReplaceUpload200Response extends HttpResponse {
  status: "200";
  body: UploadOutput;
}

/** A Upload resource was successfully created. */
export interface CreateOrReplaceUpload201Response extends HttpResponse {
  status: "201";
  body: UploadOutput;
}

export interface CreateOrReplaceUploadDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetUpload200Response extends HttpResponse {
  status: "200";
  body: UploadOutput;
}

export interface GetUploadDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface CompleteUpload200Response extends HttpResponse {
  status: "200";
  body: UploadOutput;
}

export interface CompleteUpload202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: string;
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface CompleteUpload202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & CompleteUpload202Headers;
}

export interface CompleteUploadDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface CompleteUploadDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CompleteUploadDefaultHeaders;
}

/** The request has succeeded. */
export interface CancelUpload200Response extends HttpResponse {
  status: "200";
  body: UploadOutput;
}

export interface CancelUpload202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: string;
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface CancelUpload202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & CancelUpload202Headers;
}

export interface CancelUploadDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface CancelUploadDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CancelUploadDefaultHeaders;
}

/** The request has succeeded. */
export interface GenerateUploadSpecialFiles200Response extends HttpResponse {
  status: "200";
  body: UploadSpecialFileOutput;
}

export interface GenerateUploadSpecialFiles202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: string;
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface GenerateUploadSpecialFiles202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & GenerateUploadSpecialFiles202Headers;
}

export interface GenerateUploadSpecialFilesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetUploadSpecialFiles200Response extends HttpResponse {
  status: "200";
  body: PagedUploadSpecialFileOutput;
}

export interface GetUploadSpecialFilesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GenerateUploadDataFiles200Response extends HttpResponse {
  status: "200";
  body: UploadDataFileOutput;
}

export interface GenerateUploadDataFiles202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: string;
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface GenerateUploadDataFiles202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & GenerateUploadDataFiles202Headers;
}

export interface GenerateUploadDataFilesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetUploadDataFiles200Response extends HttpResponse {
  status: "200";
  body: PagedUploadDataFileOutput;
}

export interface GetUploadDataFilesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ListMeasurements200Response extends HttpResponse {
  status: "200";
  body: PagedUploadResultMeasurementOutput;
}

export interface ListMeasurementsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetClassificationSchema200Response extends HttpResponse {
  status: "200";
  body: ClassificationSchemaOutput;
}

export interface GetClassificationSchemaDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface CreateClassificationSchema200Response extends HttpResponse {
  status: "200";
  body: ClassificationSchemaOutput;
}

export interface CreateClassificationSchema202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: string;
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface CreateClassificationSchema202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & CreateClassificationSchema202Headers;
}

export interface CreateClassificationSchemaDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface CreateClassificationSchemaDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CreateClassificationSchemaDefaultHeaders;
}

export interface DeleteClassificationSchema202Headers {
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DeleteClassificationSchema202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & DeleteClassificationSchema202Headers;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteClassificationSchema204Response extends HttpResponse {
  status: "204";
}

export interface DeleteClassificationSchemaDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface DeleteClassificationSchemaDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DeleteClassificationSchemaDefaultHeaders;
}

/** The request has succeeded. */
export interface GetClassificationSchemas200Response extends HttpResponse {
  status: "200";
  body: PagedClassificationSchemaOutput;
}

export interface GetClassificationSchemasDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetMeasurement200Response extends HttpResponse {
  status: "200";
  body: MeasurementOutput;
}

export interface GetMeasurementDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface DeleteMeasurement202Headers {
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DeleteMeasurement202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & DeleteMeasurement202Headers;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteMeasurement204Response extends HttpResponse {
  status: "204";
}

export interface DeleteMeasurementDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface DeleteMeasurementDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DeleteMeasurementDefaultHeaders;
}

/** The request has succeeded. */
export interface GetMeasurements200Response extends HttpResponse {
  status: "200";
  body: PagedMeasurementOutput;
}

export interface GetMeasurementsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetMeasurementsWithMetadata200Response extends HttpResponse {
  status: "200";
  body: PagedMeasurementWithMetadataOutput;
}

export interface GetMeasurementsWithMetadataDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetMeasurementsByIds200Response extends HttpResponse {
  status: "200";
  body: PagedMeasurementOutput;
}

export interface GetMeasurementsByIdsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetMeasurementMetadata200Response extends HttpResponse {
  status: "200";
  body: MeasurementMetadataBaseOutput;
}

export interface GetMeasurementMetadataDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetMeasurementProcessingResults200Response extends HttpResponse {
  status: "200";
  body: MeasurementProcessingResultsBaseOutput;
}

export interface GetMeasurementProcessingResultsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetMeasurementStateMachine200Response extends HttpResponse {
  status: "200";
  body: StateMachineOutput;
}

export interface GetMeasurementStateMachineDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetMeasurementStateMachines200Response extends HttpResponse {
  status: "200";
  body: PagedStateMachineOutput;
}

export interface GetMeasurementStateMachinesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ActMeasurementStateMachine200Response extends HttpResponse {
  status: "200";
  body: StateMachineOutput;
}

export interface ActMeasurementStateMachine202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: string;
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ActMeasurementStateMachine202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & ActMeasurementStateMachine202Headers;
}

export interface ActMeasurementStateMachineDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface ActMeasurementStateMachineDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ActMeasurementStateMachineDefaultHeaders;
}

/** The request has succeeded. */
export interface GetMeasurementMetadataSchemaFileInfo200Response extends HttpResponse {
  status: "200";
  body: MeasurementMetadataSchemaFileInfoBaseOutput;
}

export interface GetMeasurementMetadataSchemaFileInfoDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetMeasurementClassification200Response extends HttpResponse {
  status: "200";
  body: MeasurementClassificationOutput;
}

export interface GetMeasurementClassificationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetMeasurementClassifications200Response extends HttpResponse {
  status: "200";
  body: PagedMeasurementClassificationOutput;
}

export interface GetMeasurementClassificationsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface DeleteMeasurementClassification202Headers {
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DeleteMeasurementClassification202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & DeleteMeasurementClassification202Headers;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteMeasurementClassification204Response extends HttpResponse {
  status: "204";
}

export interface DeleteMeasurementClassificationDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface DeleteMeasurementClassificationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DeleteMeasurementClassificationDefaultHeaders;
}

/** The request has succeeded. */
export interface CreateMeasurementClassification200Response extends HttpResponse {
  status: "200";
  body: MeasurementClassificationOutput;
}

export interface CreateMeasurementClassification202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: string;
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface CreateMeasurementClassification202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & CreateMeasurementClassification202Headers;
}

export interface CreateMeasurementClassificationDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface CreateMeasurementClassificationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CreateMeasurementClassificationDefaultHeaders;
}

/** The request has succeeded. */
export interface CreateDataStream200Response extends HttpResponse {
  status: "200";
  body: DataStreamOutput;
}

export interface CreateDataStream202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: string;
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface CreateDataStream202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & CreateDataStream202Headers;
}

export interface CreateDataStreamDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface CreateDataStreamDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CreateDataStreamDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDataStream200Response extends HttpResponse {
  status: "200";
  body: DataStreamOutput;
}

export interface GetDataStreamDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetAllDataStream200Response extends HttpResponse {
  status: "200";
  body: PagedDataStreamOutput;
}

export interface GetAllDataStreamDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ClearContentOfDataStream200Response extends HttpResponse {
  status: "200";
  body: DataStreamOutput;
}

export interface ClearContentOfDataStream202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: string;
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ClearContentOfDataStream202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & ClearContentOfDataStream202Headers;
}

export interface ClearContentOfDataStreamDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface ClearContentOfDataStreamDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ClearContentOfDataStreamDefaultHeaders;
}

/** The request has succeeded. */
export interface StageFilesForDataStream200Response extends HttpResponse {
  status: "200";
  body: UploadDerivedDataStreamFilesResponseOutput;
}

export interface StageFilesForDataStreamDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface CompleteDataStream200Response extends HttpResponse {
  status: "200";
  body: DataStreamOutput;
}

export interface CompleteDataStream202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: string;
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface CompleteDataStream202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & CompleteDataStream202Headers;
}

export interface CompleteDataStreamDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface CompleteDataStreamDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CompleteDataStreamDefaultHeaders;
}

/** The request has succeeded. */
export interface FailDataStream200Response extends HttpResponse {
  status: "200";
  body: DataStreamOutput;
}

export interface FailDataStream202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: string;
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface FailDataStream202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & FailDataStream202Headers;
}

export interface FailDataStreamDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface FailDataStreamDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FailDataStreamDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDataStreamsByTags200Response extends HttpResponse {
  status: "200";
  body: PagedDataStreamOutput;
}

export interface GetDataStreamsByTagsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetDataStreamsByLineage200Response extends HttpResponse {
  status: "200";
  body: PagedDataStreamOutput;
}

export interface GetDataStreamsByLineageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetDataStreamLineageGraphsByLineage200Response extends HttpResponse {
  status: "200";
  body: PagedDataStreamsGraphListResponseOutput;
}

export interface GetDataStreamLineageGraphsByLineageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface CreateOrReplaceDataStreamStorage200Response extends HttpResponse {
  status: "200";
  body: StorageOutput;
}

/** A Storage resource was successfully created. */
export interface CreateOrReplaceDataStreamStorage201Response extends HttpResponse {
  status: "201";
  body: StorageOutput;
}

export interface CreateOrReplaceDataStreamStorageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetDataStreamStorage200Response extends HttpResponse {
  status: "200";
  body: StorageBaseOutput;
}

export interface GetDataStreamStorageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface CreateOrReplaceDataStreamTags200Response extends HttpResponse {
  status: "200";
  body: TagSetBaseOutput;
}

/** A TagSetBase resource was successfully created. */
export interface CreateOrReplaceDataStreamTags201Response extends HttpResponse {
  status: "201";
  body: TagSetBaseOutput;
}

export interface CreateOrReplaceDataStreamTagsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetDataStreamTags200Response extends HttpResponse {
  status: "200";
  body: TagSetOutput;
}

export interface GetDataStreamTagsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GenerateDataStreamFiles200Response extends HttpResponse {
  status: "200";
  body: DataStreamFileOutput;
}

export interface GenerateDataStreamFiles202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: string;
  /** The location for monitoring the operation status. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface GenerateDataStreamFiles202Response extends HttpResponse {
  status: "202";
  body: LongRunningOperationResponseOutput;
  headers: RawHttpHeaders & GenerateDataStreamFiles202Headers;
}

export interface GenerateDataStreamFilesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetDataStreamFiles200Response extends HttpResponse {
  status: "200";
  body: PagedDataStreamFileOutput;
}

export interface GetDataStreamFilesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetDataStreamLogsContainerLocation200Response extends HttpResponse {
  status: "200";
  body: DataStreamLogsContainerBaseOutput;
}

export interface GetDataStreamLogsContainerLocationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
