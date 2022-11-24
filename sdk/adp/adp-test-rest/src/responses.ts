// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  LongRunningOperationOutput,
  ErrorResponseOutput,
  DiscoveryOutput,
  DiscoveryLroResponseOutput,
  DiscoverySpecialFileOutput,
  PagedDiscoverySpecialFileOutput,
  PagedDiscoveryUploadOutput,
  UploadOutput,
  UploadLroResponseOutput,
  PagedUploadSpecialFileOutput,
  UploadSpecialFileOutput,
  UploadDataFileOutput,
  PagedUploadDataFileOutput,
  PagedUploadResultMeasurementOutput,
  ClassificationSchemaOutput,
  DefaultLroResponseOutput,
  PagedClassificationSchemaOutput,
  MeasurementOutput,
  PagedMeasurementOutput,
  PagedMeasurementWithMetadataOutput,
  MeasurementMetadataBaseOutput,
  MeasurementProcessingResultsBaseOutput,
  StateMachineOutput,
  PagedStateMachineOutput,
  MeasurementMetadataFileInfoBaseOutput,
  MeasurementMetadataSchemaFileInfoBaseOutput,
  MeasurementClassificationOutput,
  PagedMeasurementClassificationOutput,
  DataStreamOutput,
  PagedDataStreamOutput,
  UploadDerivedDataStreamFilesResponseOutput,
  PagedDataStreamsGraphListResponseOutput,
  StorageBaseOutput,
  TagSetOutput,
  TagSetBaseOutput,
  PagedDataStreamFileOutput,
  DataStreamLogsContainerBaseOutput,
  DataStreamClassificationOutput,
  PagedDataStreamClassificationOutput,
} from "./outputModels";

export interface LongRunningOperationsGetStatus200Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** Final location of the operation result. */
  location?: string;
}

/** The request has succeeded. */
export interface LongRunningOperationsGetStatus200Response extends HttpResponse {
  status: "200";
  body: LongRunningOperationOutput;
  headers: RawHttpHeaders & LongRunningOperationsGetStatus200Headers;
}

export interface LongRunningOperationsGetStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DiscoveryOperationsCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: DiscoveryOutput;
}

/** A Discovery resource was successfully created. */
export interface DiscoveryOperationsCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: DiscoveryOutput;
}

export interface DiscoveryOperationsCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DiscoveryOperationsGet200Response extends HttpResponse {
  status: "200";
  body: DiscoveryOutput;
}

export interface DiscoveryOperationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DiscoveryOperationsComplete200Response extends HttpResponse {
  status: "200";
  body: DiscoveryOutput;
}

export interface DiscoveryOperationsComplete202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DiscoveryOperationsComplete202Response extends HttpResponse {
  status: "202";
  body: DiscoveryLroResponseOutput;
  headers: RawHttpHeaders & DiscoveryOperationsComplete202Headers;
}

export interface DiscoveryOperationsCompleteDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface DiscoveryOperationsCompleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DiscoveryOperationsCompleteDefaultHeaders;
}

/** The request has succeeded. */
export interface DiscoveryOperationsCancel200Response extends HttpResponse {
  status: "200";
  body: DiscoveryOutput;
}

export interface DiscoveryOperationsCancel202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DiscoveryOperationsCancel202Response extends HttpResponse {
  status: "202";
  body: DiscoveryLroResponseOutput;
  headers: RawHttpHeaders & DiscoveryOperationsCancel202Headers;
}

export interface DiscoveryOperationsCancelDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface DiscoveryOperationsCancelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DiscoveryOperationsCancelDefaultHeaders;
}

/** The request has succeeded. */
export interface DiscoverySpecialFileOperationsGenerate200Response extends HttpResponse {
  status: "200";
  body: DiscoverySpecialFileOutput;
}

export interface DiscoverySpecialFileOperationsGenerate202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DiscoverySpecialFileOperationsGenerate202Response extends HttpResponse {
  status: "202";
  body: DiscoveryLroResponseOutput;
  headers: RawHttpHeaders & DiscoverySpecialFileOperationsGenerate202Headers;
}

export interface DiscoverySpecialFileOperationsGenerateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DiscoverySpecialFileOperationsListWritableUris200Response extends HttpResponse {
  status: "200";
  body: PagedDiscoverySpecialFileOutput;
}

export interface DiscoverySpecialFileOperationsListWritableUrisDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DiscoveryResultUploadOperationsList200Response extends HttpResponse {
  status: "200";
  body: PagedDiscoveryUploadOutput;
}

export interface DiscoveryResultUploadOperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface UploadOperationsCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: UploadOutput;
}

/** A Upload resource was successfully created. */
export interface UploadOperationsCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: UploadOutput;
}

export interface UploadOperationsCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface UploadOperationsGet200Response extends HttpResponse {
  status: "200";
  body: UploadOutput;
}

export interface UploadOperationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface UploadOperationsComplete200Response extends HttpResponse {
  status: "200";
  body: UploadOutput;
}

export interface UploadOperationsComplete202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface UploadOperationsComplete202Response extends HttpResponse {
  status: "202";
  body: UploadLroResponseOutput;
  headers: RawHttpHeaders & UploadOperationsComplete202Headers;
}

export interface UploadOperationsCompleteDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface UploadOperationsCompleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & UploadOperationsCompleteDefaultHeaders;
}

/** The request has succeeded. */
export interface UploadOperationsCancel200Response extends HttpResponse {
  status: "200";
  body: UploadOutput;
}

export interface UploadOperationsCancel202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface UploadOperationsCancel202Response extends HttpResponse {
  status: "202";
  body: UploadLroResponseOutput;
  headers: RawHttpHeaders & UploadOperationsCancel202Headers;
}

export interface UploadOperationsCancelDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface UploadOperationsCancelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & UploadOperationsCancelDefaultHeaders;
}

/** The request has succeeded. */
export interface UploadSpecialFileOperationsList200Response extends HttpResponse {
  status: "200";
  body: PagedUploadSpecialFileOutput;
}

export interface UploadSpecialFileOperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface UploadSpecialFileOperationsGenerate200Response extends HttpResponse {
  status: "200";
  body: UploadSpecialFileOutput;
}

export interface UploadSpecialFileOperationsGenerate202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface UploadSpecialFileOperationsGenerate202Response extends HttpResponse {
  status: "202";
  body: UploadLroResponseOutput;
  headers: RawHttpHeaders & UploadSpecialFileOperationsGenerate202Headers;
}

export interface UploadSpecialFileOperationsGenerateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface UploadSpecialFileOperationsListWritableUris200Response extends HttpResponse {
  status: "200";
  body: PagedUploadSpecialFileOutput;
}

export interface UploadSpecialFileOperationsListWritableUrisDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface UploadDataFileOperationsGenerate200Response extends HttpResponse {
  status: "200";
  body: UploadDataFileOutput;
}

export interface UploadDataFileOperationsGenerate202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface UploadDataFileOperationsGenerate202Response extends HttpResponse {
  status: "202";
  body: UploadLroResponseOutput;
  headers: RawHttpHeaders & UploadDataFileOperationsGenerate202Headers;
}

export interface UploadDataFileOperationsGenerateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface UploadDataFileOperationsListWritableUris200Response extends HttpResponse {
  status: "200";
  body: PagedUploadDataFileOutput;
}

export interface UploadDataFileOperationsListWritableUrisDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface UploadResultMeasurementOperationsList200Response extends HttpResponse {
  status: "200";
  body: PagedUploadResultMeasurementOutput;
}

export interface UploadResultMeasurementOperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ClassificationSchemaOperationsGet200Response extends HttpResponse {
  status: "200";
  body: ClassificationSchemaOutput;
}

export interface ClassificationSchemaOperationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ClassificationSchemaOperationsCreate200Response extends HttpResponse {
  status: "200";
  body: ClassificationSchemaOutput;
}

export interface ClassificationSchemaOperationsCreate202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ClassificationSchemaOperationsCreate202Response extends HttpResponse {
  status: "202";
  body: DefaultLroResponseOutput;
  headers: RawHttpHeaders & ClassificationSchemaOperationsCreate202Headers;
}

export interface ClassificationSchemaOperationsCreateDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface ClassificationSchemaOperationsCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ClassificationSchemaOperationsCreateDefaultHeaders;
}

export interface ClassificationSchemaOperationsDelete202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ClassificationSchemaOperationsDelete202Response extends HttpResponse {
  status: "202";
  body: DefaultLroResponseOutput;
  headers: RawHttpHeaders & ClassificationSchemaOperationsDelete202Headers;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface ClassificationSchemaOperationsDelete204Response extends HttpResponse {
  status: "204";
}

export interface ClassificationSchemaOperationsDeleteDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface ClassificationSchemaOperationsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ClassificationSchemaOperationsDeleteDefaultHeaders;
}

/** The request has succeeded. */
export interface ClassificationSchemaOperationsList200Response extends HttpResponse {
  status: "200";
  body: PagedClassificationSchemaOutput;
}

export interface ClassificationSchemaOperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface MeasurementOperationsGet200Response extends HttpResponse {
  status: "200";
  body: MeasurementOutput;
}

export interface MeasurementOperationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface MeasurementOperationsDelete202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface MeasurementOperationsDelete202Response extends HttpResponse {
  status: "202";
  body: DefaultLroResponseOutput;
  headers: RawHttpHeaders & MeasurementOperationsDelete202Headers;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface MeasurementOperationsDelete204Response extends HttpResponse {
  status: "204";
}

export interface MeasurementOperationsDeleteDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface MeasurementOperationsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & MeasurementOperationsDeleteDefaultHeaders;
}

/** The request has succeeded. */
export interface MeasurementOperationsList200Response extends HttpResponse {
  status: "200";
  body: PagedMeasurementOutput;
}

export interface MeasurementOperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface MeasurementOperationsQueryMeasurementsWithMetadata200Response
  extends HttpResponse {
  status: "200";
  body: PagedMeasurementWithMetadataOutput;
}

export interface MeasurementOperationsQueryMeasurementsWithMetadataDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface MeasurementOperationsFindByIds200Response extends HttpResponse {
  status: "200";
  body: PagedMeasurementOutput;
}

export interface MeasurementOperationsFindByIdsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface MeasurementMetadataOperationsGet200Response extends HttpResponse {
  status: "200";
  body: MeasurementMetadataBaseOutput;
}

export interface MeasurementMetadataOperationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface MeasurementProcessingResultsOperationsGet200Response extends HttpResponse {
  status: "200";
  body: MeasurementProcessingResultsBaseOutput;
}

export interface MeasurementProcessingResultsOperationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface MeasurementStateMachineOperationsGet200Response extends HttpResponse {
  status: "200";
  body: StateMachineOutput;
}

export interface MeasurementStateMachineOperationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface MeasurementStateMachineOperationsList200Response extends HttpResponse {
  status: "200";
  body: PagedStateMachineOutput;
}

export interface MeasurementStateMachineOperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface MeasurementStateMachineOperationsAct200Response extends HttpResponse {
  status: "200";
  body: StateMachineOutput;
}

export interface MeasurementStateMachineOperationsAct202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface MeasurementStateMachineOperationsAct202Response extends HttpResponse {
  status: "202";
  body: DefaultLroResponseOutput;
  headers: RawHttpHeaders & MeasurementStateMachineOperationsAct202Headers;
}

export interface MeasurementStateMachineOperationsActDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface MeasurementStateMachineOperationsActDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & MeasurementStateMachineOperationsActDefaultHeaders;
}

export interface MeasurementMetadataFileInfoOperationsComplete200Headers {
  /** The entity tag for the response. */
  etag?: string;
}

/** The request has succeeded. */
export interface MeasurementMetadataFileInfoOperationsComplete200Response extends HttpResponse {
  status: "200";
  body: MeasurementMetadataFileInfoBaseOutput;
  headers: RawHttpHeaders & MeasurementMetadataFileInfoOperationsComplete200Headers;
}

export interface MeasurementMetadataFileInfoOperationsComplete202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface MeasurementMetadataFileInfoOperationsComplete202Response extends HttpResponse {
  status: "202";
  body: DefaultLroResponseOutput;
  headers: RawHttpHeaders & MeasurementMetadataFileInfoOperationsComplete202Headers;
}

export interface MeasurementMetadataFileInfoOperationsCompleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface MeasurementMetadataFileInfoOperationsGetWritableUri200Headers {
  /** The entity tag for the response. */
  etag?: string;
}

/** The request has succeeded. */
export interface MeasurementMetadataFileInfoOperationsGetWritableUri200Response
  extends HttpResponse {
  status: "200";
  body: MeasurementMetadataFileInfoBaseOutput;
  headers: RawHttpHeaders & MeasurementMetadataFileInfoOperationsGetWritableUri200Headers;
}

export interface MeasurementMetadataFileInfoOperationsGetWritableUriDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface MeasurementMetadataSchemaFileInfoOperationsGet200Response extends HttpResponse {
  status: "200";
  body: MeasurementMetadataSchemaFileInfoBaseOutput;
}

export interface MeasurementMetadataSchemaFileInfoOperationsGetDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface MeasurementClassificationOperationsGet200Response extends HttpResponse {
  status: "200";
  body: MeasurementClassificationOutput;
}

export interface MeasurementClassificationOperationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface MeasurementClassificationOperationsCreate200Response extends HttpResponse {
  status: "200";
  body: MeasurementClassificationOutput;
}

export interface MeasurementClassificationOperationsCreate202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface MeasurementClassificationOperationsCreate202Response extends HttpResponse {
  status: "202";
  body: DefaultLroResponseOutput;
  headers: RawHttpHeaders & MeasurementClassificationOperationsCreate202Headers;
}

export interface MeasurementClassificationOperationsCreateDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface MeasurementClassificationOperationsCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & MeasurementClassificationOperationsCreateDefaultHeaders;
}

export interface MeasurementClassificationOperationsDelete202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface MeasurementClassificationOperationsDelete202Response extends HttpResponse {
  status: "202";
  body: DefaultLroResponseOutput;
  headers: RawHttpHeaders & MeasurementClassificationOperationsDelete202Headers;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface MeasurementClassificationOperationsDelete204Response extends HttpResponse {
  status: "204";
}

export interface MeasurementClassificationOperationsDeleteDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface MeasurementClassificationOperationsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & MeasurementClassificationOperationsDeleteDefaultHeaders;
}

/** The request has succeeded. */
export interface MeasurementClassificationOperationsList200Response extends HttpResponse {
  status: "200";
  body: PagedMeasurementClassificationOutput;
}

export interface MeasurementClassificationOperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DataStreamOperationsGet200Response extends HttpResponse {
  status: "200";
  body: DataStreamOutput;
}

export interface DataStreamOperationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DataStreamOperationsCreate200Response extends HttpResponse {
  status: "200";
  body: DataStreamOutput;
}

export interface DataStreamOperationsCreate202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DataStreamOperationsCreate202Response extends HttpResponse {
  status: "202";
  body: DefaultLroResponseOutput;
  headers: RawHttpHeaders & DataStreamOperationsCreate202Headers;
}

export interface DataStreamOperationsCreateDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface DataStreamOperationsCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DataStreamOperationsCreateDefaultHeaders;
}

/** The request has succeeded. */
export interface DataStreamOperationsClearContent200Response extends HttpResponse {
  status: "200";
  body: DataStreamOutput;
}

export interface DataStreamOperationsClearContent202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DataStreamOperationsClearContent202Response extends HttpResponse {
  status: "202";
  body: DefaultLroResponseOutput;
  headers: RawHttpHeaders & DataStreamOperationsClearContent202Headers;
}

export interface DataStreamOperationsClearContentDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface DataStreamOperationsClearContentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DataStreamOperationsClearContentDefaultHeaders;
}

/** The request has succeeded. */
export interface DataStreamOperationsList200Response extends HttpResponse {
  status: "200";
  body: PagedDataStreamOutput;
}

export interface DataStreamOperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DataStreamOperationsStageFiles200Response extends HttpResponse {
  status: "200";
  body: UploadDerivedDataStreamFilesResponseOutput;
}

export interface DataStreamOperationsStageFilesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DataStreamOperationsComplete200Response extends HttpResponse {
  status: "200";
  body: DataStreamOutput;
}

export interface DataStreamOperationsComplete202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DataStreamOperationsComplete202Response extends HttpResponse {
  status: "202";
  body: DefaultLroResponseOutput;
  headers: RawHttpHeaders & DataStreamOperationsComplete202Headers;
}

export interface DataStreamOperationsCompleteDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface DataStreamOperationsCompleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DataStreamOperationsCompleteDefaultHeaders;
}

/** The request has succeeded. */
export interface DataStreamOperationsFail200Response extends HttpResponse {
  status: "200";
  body: DataStreamOutput;
}

export interface DataStreamOperationsFail202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DataStreamOperationsFail202Response extends HttpResponse {
  status: "202";
  body: DefaultLroResponseOutput;
  headers: RawHttpHeaders & DataStreamOperationsFail202Headers;
}

export interface DataStreamOperationsFailDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface DataStreamOperationsFailDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DataStreamOperationsFailDefaultHeaders;
}

/** The request has succeeded. */
export interface DataStreamOperationsFindByTags200Response extends HttpResponse {
  status: "200";
  body: PagedDataStreamOutput;
}

export interface DataStreamOperationsFindByTagsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DataStreamOperationsFindByLineage200Response extends HttpResponse {
  status: "200";
  body: PagedDataStreamOutput;
}

export interface DataStreamOperationsFindByLineageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DataStreamOperationsGetLineageGraphsByLineage200Response extends HttpResponse {
  status: "200";
  body: PagedDataStreamsGraphListResponseOutput;
}

export interface DataStreamOperationsGetLineageGraphsByLineageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DataStreamsStorageOperationsCreate200Response extends HttpResponse {
  status: "200";
  body: StorageBaseOutput;
}

/** A StorageBase resource was successfully created. */
export interface DataStreamsStorageOperationsCreate201Response extends HttpResponse {
  status: "201";
  body: StorageBaseOutput;
}

export interface DataStreamsStorageOperationsCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DataStreamsStorageOperationsGetWritableUris200Response extends HttpResponse {
  status: "200";
  body: StorageBaseOutput;
}

export interface DataStreamsStorageOperationsGetWritableUrisDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DataStreamTagsOperationsGet200Response extends HttpResponse {
  status: "200";
  body: TagSetOutput;
}

export interface DataStreamTagsOperationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DataStreamTagsOperationsCreate200Response extends HttpResponse {
  status: "200";
  body: TagSetBaseOutput;
}

/** A TagSetBase resource was successfully created. */
export interface DataStreamTagsOperationsCreate201Response extends HttpResponse {
  status: "201";
  body: TagSetBaseOutput;
}

export interface DataStreamTagsOperationsCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DataStreamFileOperationsList200Response extends HttpResponse {
  status: "200";
  body: PagedDataStreamFileOutput;
}

export interface DataStreamFileOperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DataStreamFileOperationsGenerate200Response extends HttpResponse {
  status: "200";
  body: PagedDataStreamFileOutput;
}

export interface DataStreamFileOperationsGenerate202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DataStreamFileOperationsGenerate202Response extends HttpResponse {
  status: "202";
  body: DefaultLroResponseOutput;
  headers: RawHttpHeaders & DataStreamFileOperationsGenerate202Headers;
}

export interface DataStreamFileOperationsGenerateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DataStreamLogsContainerOperationsGetWritableUri200Response extends HttpResponse {
  status: "200";
  body: DataStreamLogsContainerBaseOutput;
}

export interface DataStreamLogsContainerOperationsGetWritableUriDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DataStreamClassificationOperationsGet200Response extends HttpResponse {
  status: "200";
  body: DataStreamClassificationOutput;
}

export interface DataStreamClassificationOperationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DataStreamClassificationOperationsCreate200Response extends HttpResponse {
  status: "200";
  body: DataStreamClassificationOutput;
}

export interface DataStreamClassificationOperationsCreate202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DataStreamClassificationOperationsCreate202Response extends HttpResponse {
  status: "202";
  body: DefaultLroResponseOutput;
  headers: RawHttpHeaders & DataStreamClassificationOperationsCreate202Headers;
}

export interface DataStreamClassificationOperationsCreateDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface DataStreamClassificationOperationsCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DataStreamClassificationOperationsCreateDefaultHeaders;
}

export interface DataStreamClassificationOperationsDelete202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DataStreamClassificationOperationsDelete202Response extends HttpResponse {
  status: "202";
  body: DefaultLroResponseOutput;
  headers: RawHttpHeaders & DataStreamClassificationOperationsDelete202Headers;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DataStreamClassificationOperationsDelete204Response extends HttpResponse {
  status: "204";
}

export interface DataStreamClassificationOperationsDeleteDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface DataStreamClassificationOperationsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DataStreamClassificationOperationsDeleteDefaultHeaders;
}

/** The request has succeeded. */
export interface DataStreamClassificationOperationsList200Response extends HttpResponse {
  status: "200";
  body: PagedDataStreamClassificationOutput;
}

export interface DataStreamClassificationOperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
