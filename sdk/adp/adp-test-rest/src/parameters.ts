// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import {
  Discovery,
  Upload,
  ClassificationSchema,
  MeasurementListRequestParameters,
  StateMachineAction,
  CompleteUploadMetadataFileRequest,
  MeasurementClassification,
  DataStream,
  UploadDerivedDataStreamFilesRequest,
  FindDataStreamByTagsRequestParameters,
  FindDataStreamByLineageRequestParameters,
  FindDataStreamByLineageGraphRequestParameters,
  Storage,
  TagSet,
  DataStreamClassification,
} from "./models";

export type LongRunningOperationsGetStatusParameters = RequestParameters;

export interface DiscoveryOperationsCreateOrReplaceBodyParam {
  /** Parameter of type 'DiscoveryCreationParameters' in the body. */
  body?: Discovery;
}

export type DiscoveryOperationsCreateOrReplaceParameters = DiscoveryOperationsCreateOrReplaceBodyParam &
  RequestParameters;
export type DiscoveryOperationsGetParameters = RequestParameters;

export interface DiscoveryOperationsCompleteHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface DiscoveryOperationsCompleteHeaderParam {
  headers?: RawHttpHeadersInput & DiscoveryOperationsCompleteHeaders;
}

export type DiscoveryOperationsCompleteParameters = DiscoveryOperationsCompleteHeaderParam &
  RequestParameters;

export interface DiscoveryOperationsCancelHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface DiscoveryOperationsCancelHeaderParam {
  headers?: RawHttpHeadersInput & DiscoveryOperationsCancelHeaders;
}

export type DiscoveryOperationsCancelParameters = DiscoveryOperationsCancelHeaderParam &
  RequestParameters;

export interface DiscoverySpecialFileOperationsGenerateHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface DiscoverySpecialFileOperationsGenerateHeaderParam {
  headers?: RawHttpHeadersInput & DiscoverySpecialFileOperationsGenerateHeaders;
}

export type DiscoverySpecialFileOperationsGenerateParameters = DiscoverySpecialFileOperationsGenerateHeaderParam &
  RequestParameters;
export type DiscoverySpecialFileOperationsListWritableUrisParameters = RequestParameters;
export type DiscoveryResultUploadOperationsListParameters = RequestParameters;

export interface UploadOperationsCreateOrReplaceBodyParam {
  /** Parameter of type 'UploadCreationParameters' in the body. */
  body?: Upload;
}

export type UploadOperationsCreateOrReplaceParameters = UploadOperationsCreateOrReplaceBodyParam &
  RequestParameters;
export type UploadOperationsGetParameters = RequestParameters;

export interface UploadOperationsCompleteHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface UploadOperationsCompleteHeaderParam {
  headers?: RawHttpHeadersInput & UploadOperationsCompleteHeaders;
}

export type UploadOperationsCompleteParameters = UploadOperationsCompleteHeaderParam &
  RequestParameters;

export interface UploadOperationsCancelHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface UploadOperationsCancelHeaderParam {
  headers?: RawHttpHeadersInput & UploadOperationsCancelHeaders;
}

export type UploadOperationsCancelParameters = UploadOperationsCancelHeaderParam &
  RequestParameters;
export type UploadSpecialFileOperationsListParameters = RequestParameters;

export interface UploadSpecialFileOperationsGenerateHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface UploadSpecialFileOperationsGenerateHeaderParam {
  headers?: RawHttpHeadersInput & UploadSpecialFileOperationsGenerateHeaders;
}

export type UploadSpecialFileOperationsGenerateParameters = UploadSpecialFileOperationsGenerateHeaderParam &
  RequestParameters;
export type UploadSpecialFileOperationsListWritableUrisParameters = RequestParameters;

export interface UploadDataFileOperationsGenerateHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface UploadDataFileOperationsGenerateHeaderParam {
  headers?: RawHttpHeadersInput & UploadDataFileOperationsGenerateHeaders;
}

export type UploadDataFileOperationsGenerateParameters = UploadDataFileOperationsGenerateHeaderParam &
  RequestParameters;
export type UploadDataFileOperationsListWritableUrisParameters = RequestParameters;
export type UploadResultMeasurementOperationsListParameters = RequestParameters;
export type ClassificationSchemaOperationsGetParameters = RequestParameters;

export interface ClassificationSchemaOperationsCreateHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface ClassificationSchemaOperationsCreateBodyParam {
  /** Parameter of type 'ClassificationSchemaCreationParameters' in the body. */
  body?: ClassificationSchema;
}

export interface ClassificationSchemaOperationsCreateHeaderParam {
  headers?: RawHttpHeadersInput & ClassificationSchemaOperationsCreateHeaders;
}

export type ClassificationSchemaOperationsCreateParameters = ClassificationSchemaOperationsCreateHeaderParam &
  ClassificationSchemaOperationsCreateBodyParam &
  RequestParameters;

export interface ClassificationSchemaOperationsDeleteHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface ClassificationSchemaOperationsDeleteHeaderParam {
  headers?: RawHttpHeadersInput & ClassificationSchemaOperationsDeleteHeaders;
}

export type ClassificationSchemaOperationsDeleteParameters = ClassificationSchemaOperationsDeleteHeaderParam &
  RequestParameters;
export type ClassificationSchemaOperationsListParameters = RequestParameters;
export type MeasurementOperationsGetParameters = RequestParameters;

export interface MeasurementOperationsDeleteHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface MeasurementOperationsDeleteHeaderParam {
  headers?: RawHttpHeadersInput & MeasurementOperationsDeleteHeaders;
}

export type MeasurementOperationsDeleteParameters = MeasurementOperationsDeleteHeaderParam &
  RequestParameters;
export type MeasurementOperationsListParameters = RequestParameters;
export type MeasurementOperationsQueryMeasurementsWithMetadataParameters = RequestParameters;

export interface MeasurementOperationsFindByIdsBodyParam {
  /** Parameter of type 'MeasurementListRequestParameters' in the body. */
  body?: MeasurementListRequestParameters;
}

export type MeasurementOperationsFindByIdsParameters = MeasurementOperationsFindByIdsBodyParam &
  RequestParameters;
export type MeasurementMetadataOperationsGetParameters = RequestParameters;
export type MeasurementProcessingResultsOperationsGetParameters = RequestParameters;
export type MeasurementStateMachineOperationsGetParameters = RequestParameters;
export type MeasurementStateMachineOperationsListParameters = RequestParameters;

export interface MeasurementStateMachineOperationsActHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface MeasurementStateMachineOperationsActBodyParam {
  /** Parameter of type 'StateMachineAction' in the body. */
  body?: StateMachineAction;
}

export interface MeasurementStateMachineOperationsActHeaderParam {
  headers?: RawHttpHeadersInput & MeasurementStateMachineOperationsActHeaders;
}

export type MeasurementStateMachineOperationsActParameters = MeasurementStateMachineOperationsActHeaderParam &
  MeasurementStateMachineOperationsActBodyParam &
  RequestParameters;

export interface MeasurementMetadataFileInfoOperationsCompleteHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface MeasurementMetadataFileInfoOperationsCompleteBodyParam {
  /** Parameter of type 'CompleteUploadMetadataFileRequest' in the body. */
  body?: CompleteUploadMetadataFileRequest;
}

export interface MeasurementMetadataFileInfoOperationsCompleteHeaderParam {
  headers?: RawHttpHeadersInput & MeasurementMetadataFileInfoOperationsCompleteHeaders;
}

export type MeasurementMetadataFileInfoOperationsCompleteParameters = MeasurementMetadataFileInfoOperationsCompleteHeaderParam &
  MeasurementMetadataFileInfoOperationsCompleteBodyParam &
  RequestParameters;
export type MeasurementMetadataFileInfoOperationsGetWritableUriParameters = RequestParameters;
export type MeasurementMetadataSchemaFileInfoOperationsGetParameters = RequestParameters;
export type MeasurementClassificationOperationsGetParameters = RequestParameters;

export interface MeasurementClassificationOperationsCreateHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface MeasurementClassificationOperationsCreateBodyParam {
  /** Parameter of type 'MeasurementClassificationCreationParameters' in the body. */
  body?: MeasurementClassification;
}

export interface MeasurementClassificationOperationsCreateHeaderParam {
  headers?: RawHttpHeadersInput & MeasurementClassificationOperationsCreateHeaders;
}

export type MeasurementClassificationOperationsCreateParameters = MeasurementClassificationOperationsCreateHeaderParam &
  MeasurementClassificationOperationsCreateBodyParam &
  RequestParameters;

export interface MeasurementClassificationOperationsDeleteHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface MeasurementClassificationOperationsDeleteHeaderParam {
  headers?: RawHttpHeadersInput & MeasurementClassificationOperationsDeleteHeaders;
}

export type MeasurementClassificationOperationsDeleteParameters = MeasurementClassificationOperationsDeleteHeaderParam &
  RequestParameters;
export type MeasurementClassificationOperationsListParameters = RequestParameters;
export type DataStreamOperationsGetParameters = RequestParameters;

export interface DataStreamOperationsCreateHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface DataStreamOperationsCreateBodyParam {
  /** Parameter of type 'DataStreamCreationParameters' in the body. */
  body?: DataStream;
}

export interface DataStreamOperationsCreateHeaderParam {
  headers?: RawHttpHeadersInput & DataStreamOperationsCreateHeaders;
}

export type DataStreamOperationsCreateParameters = DataStreamOperationsCreateHeaderParam &
  DataStreamOperationsCreateBodyParam &
  RequestParameters;

export interface DataStreamOperationsClearContentHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface DataStreamOperationsClearContentHeaderParam {
  headers?: RawHttpHeadersInput & DataStreamOperationsClearContentHeaders;
}

export type DataStreamOperationsClearContentParameters = DataStreamOperationsClearContentHeaderParam &
  RequestParameters;

export interface DataStreamOperationsListQueryParamProperties {
  /** Filter the result list using the given expression. */
  filter?: string;
}

export interface DataStreamOperationsListQueryParam {
  queryParameters?: DataStreamOperationsListQueryParamProperties;
}

export type DataStreamOperationsListParameters = DataStreamOperationsListQueryParam &
  RequestParameters;

export interface DataStreamOperationsStageFilesBodyParam {
  /** Parameter of type 'UploadDerivedDataStreamFilesRequest' in the body. */
  body?: UploadDerivedDataStreamFilesRequest;
}

export type DataStreamOperationsStageFilesParameters = DataStreamOperationsStageFilesBodyParam &
  RequestParameters;

export interface DataStreamOperationsCompleteHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface DataStreamOperationsCompleteHeaderParam {
  headers?: RawHttpHeadersInput & DataStreamOperationsCompleteHeaders;
}

export type DataStreamOperationsCompleteParameters = DataStreamOperationsCompleteHeaderParam &
  RequestParameters;

export interface DataStreamOperationsFailHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface DataStreamOperationsFailHeaderParam {
  headers?: RawHttpHeadersInput & DataStreamOperationsFailHeaders;
}

export type DataStreamOperationsFailParameters = DataStreamOperationsFailHeaderParam &
  RequestParameters;

export interface DataStreamOperationsFindByTagsBodyParam {
  /** Parameter of type 'FindDataStreamByTagsRequestParameters' in the body. */
  body?: FindDataStreamByTagsRequestParameters;
}

export type DataStreamOperationsFindByTagsParameters = DataStreamOperationsFindByTagsBodyParam &
  RequestParameters;

export interface DataStreamOperationsFindByLineageBodyParam {
  /** Parameter of type 'FindDataStreamByLineageRequestParameters' in the body. */
  body?: FindDataStreamByLineageRequestParameters;
}

export type DataStreamOperationsFindByLineageParameters = DataStreamOperationsFindByLineageBodyParam &
  RequestParameters;

export interface DataStreamOperationsGetLineageGraphsByLineageBodyParam {
  /** Parameter of type 'FindDataStreamByLineageGraphRequestParameters' in the body. */
  body?: FindDataStreamByLineageGraphRequestParameters;
}

export type DataStreamOperationsGetLineageGraphsByLineageParameters = DataStreamOperationsGetLineageGraphsByLineageBodyParam &
  RequestParameters;

export interface DataStreamsStorageOperationsCreateBodyParam {
  /** Parameter of type 'StorageCreationParameters' in the body. */
  body?: Storage;
}

export type DataStreamsStorageOperationsCreateParameters = DataStreamsStorageOperationsCreateBodyParam &
  RequestParameters;
export type DataStreamsStorageOperationsGetWritableUrisParameters = RequestParameters;
export type DataStreamTagsOperationsGetParameters = RequestParameters;

export interface DataStreamTagsOperationsCreateBodyParam {
  /** Parameter of type 'TagSetCreationParameters' in the body. */
  body?: TagSet;
}

export type DataStreamTagsOperationsCreateParameters = DataStreamTagsOperationsCreateBodyParam &
  RequestParameters;
export type DataStreamFileOperationsListParameters = RequestParameters;

export interface DataStreamFileOperationsGenerateHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface DataStreamFileOperationsGenerateHeaderParam {
  headers?: RawHttpHeadersInput & DataStreamFileOperationsGenerateHeaders;
}

export type DataStreamFileOperationsGenerateParameters = DataStreamFileOperationsGenerateHeaderParam &
  RequestParameters;
export type DataStreamLogsContainerOperationsGetWritableUriParameters = RequestParameters;
export type DataStreamClassificationOperationsGetParameters = RequestParameters;

export interface DataStreamClassificationOperationsCreateHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface DataStreamClassificationOperationsCreateBodyParam {
  /** Parameter of type 'DataStreamClassificationCreationParameters' in the body. */
  body?: DataStreamClassification;
}

export interface DataStreamClassificationOperationsCreateHeaderParam {
  headers?: RawHttpHeadersInput & DataStreamClassificationOperationsCreateHeaders;
}

export type DataStreamClassificationOperationsCreateParameters = DataStreamClassificationOperationsCreateHeaderParam &
  DataStreamClassificationOperationsCreateBodyParam &
  RequestParameters;

export interface DataStreamClassificationOperationsDeleteHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface DataStreamClassificationOperationsDeleteHeaderParam {
  headers?: RawHttpHeadersInput & DataStreamClassificationOperationsDeleteHeaders;
}

export type DataStreamClassificationOperationsDeleteParameters = DataStreamClassificationOperationsDeleteHeaderParam &
  RequestParameters;
export type DataStreamClassificationOperationsListParameters = RequestParameters;
