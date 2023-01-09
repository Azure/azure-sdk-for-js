// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import {
  DiscoveryCreationParameters,
  UploadCreationParameters,
  ClassificationSchemaCreationParameters,
  MeasurementListRequestParameters,
  StateMachineAction,
  MeasurementClassificationCreationParameters,
  DataStreamCreationParameters,
  UploadDerivedDataStreamFilesRequest,
  FindDataStreamByTagsRequestParameters,
  FindDataStreamByLineageRequestParameters,
  FindDataStreamByLineageGraphRequestParameters,
  StorageCreationParameters,
  TagSetCreationParameters,
} from "./models";

export type GetLongRunningParameters = RequestParameters;

export interface CreateOrReplaceDiscoveryBodyParam {
  /** Parameter of type 'DiscoveryCreationParameters' in the body. */
  body?: DiscoveryCreationParameters;
}

export type CreateOrReplaceDiscoveryParameters = CreateOrReplaceDiscoveryBodyParam &
  RequestParameters;
export type GetDiscoveryParameters = RequestParameters;

export interface CompleteDiscoveryHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the client. */
  "Repeatability-Client-ID"?: string;
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface CompleteDiscoveryHeaderParam {
  headers?: RawHttpHeadersInput & CompleteDiscoveryHeaders;
}

export type CompleteDiscoveryParameters = CompleteDiscoveryHeaderParam & RequestParameters;

export interface CancelDiscoveryHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the client. */
  "Repeatability-Client-ID"?: string;
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface CancelDiscoveryHeaderParam {
  headers?: RawHttpHeadersInput & CancelDiscoveryHeaders;
}

export type CancelDiscoveryParameters = CancelDiscoveryHeaderParam & RequestParameters;
export type GetDiscoverySpecialFileUploadLocationsParameters = RequestParameters;

export interface GenerateDiscoverySpecialFileUploadLocationsHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the client. */
  "Repeatability-Client-ID"?: string;
}

export interface GenerateDiscoverySpecialFileUploadLocationsHeaderParam {
  headers?: RawHttpHeadersInput & GenerateDiscoverySpecialFileUploadLocationsHeaders;
}

export type GenerateDiscoverySpecialFileUploadLocationsParameters = GenerateDiscoverySpecialFileUploadLocationsHeaderParam &
  RequestParameters;
export type GetAllDiscoveryUploadsParameters = RequestParameters;

export interface CreateOrReplaceUploadBodyParam {
  /** Parameter of type 'UploadCreationParameters' in the body. */
  body?: UploadCreationParameters;
}

export type CreateOrReplaceUploadParameters = CreateOrReplaceUploadBodyParam & RequestParameters;
export type GetUploadParameters = RequestParameters;

export interface CompleteUploadHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the client. */
  "Repeatability-Client-ID"?: string;
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface CompleteUploadHeaderParam {
  headers?: RawHttpHeadersInput & CompleteUploadHeaders;
}

export type CompleteUploadParameters = CompleteUploadHeaderParam & RequestParameters;

export interface CancelUploadHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the client. */
  "Repeatability-Client-ID"?: string;
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface CancelUploadHeaderParam {
  headers?: RawHttpHeadersInput & CancelUploadHeaders;
}

export type CancelUploadParameters = CancelUploadHeaderParam & RequestParameters;

export interface GenerateUploadSpecialFilesHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the client. */
  "Repeatability-Client-ID"?: string;
}

export interface GenerateUploadSpecialFilesHeaderParam {
  headers?: RawHttpHeadersInput & GenerateUploadSpecialFilesHeaders;
}

export type GenerateUploadSpecialFilesParameters = GenerateUploadSpecialFilesHeaderParam &
  RequestParameters;
export type GetUploadSpecialFilesParameters = RequestParameters;

export interface GenerateUploadDataFilesHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the client. */
  "Repeatability-Client-ID"?: string;
}

export interface GenerateUploadDataFilesHeaderParam {
  headers?: RawHttpHeadersInput & GenerateUploadDataFilesHeaders;
}

export type GenerateUploadDataFilesParameters = GenerateUploadDataFilesHeaderParam &
  RequestParameters;
export type GetUploadDataFilesParameters = RequestParameters;
export type ListMeasurementsParameters = RequestParameters;
export type GetClassificationSchemaParameters = RequestParameters;

export interface CreateClassificationSchemaHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the client. */
  "Repeatability-Client-ID"?: string;
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface CreateClassificationSchemaBodyParam {
  /** Parameter of type 'ClassificationSchemaCreationParameters' in the body. */
  body?: ClassificationSchemaCreationParameters;
}

export interface CreateClassificationSchemaHeaderParam {
  headers?: RawHttpHeadersInput & CreateClassificationSchemaHeaders;
}

export type CreateClassificationSchemaParameters = CreateClassificationSchemaHeaderParam &
  CreateClassificationSchemaBodyParam &
  RequestParameters;

export interface DeleteClassificationSchemaHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface DeleteClassificationSchemaHeaderParam {
  headers?: RawHttpHeadersInput & DeleteClassificationSchemaHeaders;
}

export type DeleteClassificationSchemaParameters = DeleteClassificationSchemaHeaderParam &
  RequestParameters;
export type GetClassificationSchemasParameters = RequestParameters;
export type GetMeasurementParameters = RequestParameters;

export interface DeleteMeasurementHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface DeleteMeasurementHeaderParam {
  headers?: RawHttpHeadersInput & DeleteMeasurementHeaders;
}

export type DeleteMeasurementParameters = DeleteMeasurementHeaderParam & RequestParameters;
export type GetMeasurementsParameters = RequestParameters;
export type GetMeasurementsWithMetadataParameters = RequestParameters;

export interface GetMeasurementsByIdsBodyParam {
  /** Parameter of type 'MeasurementListRequestParameters' in the body. */
  body?: MeasurementListRequestParameters;
}

export type GetMeasurementsByIdsParameters = GetMeasurementsByIdsBodyParam & RequestParameters;
export type GetMeasurementMetadataParameters = RequestParameters;
export type GetMeasurementProcessingResultsParameters = RequestParameters;
export type GetMeasurementStateMachineParameters = RequestParameters;
export type GetMeasurementStateMachinesParameters = RequestParameters;

export interface ActMeasurementStateMachineHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the client. */
  "Repeatability-Client-ID"?: string;
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface ActMeasurementStateMachineBodyParam {
  /** Parameter of type 'StateMachineAction' in the body. */
  body?: StateMachineAction;
}

export interface ActMeasurementStateMachineHeaderParam {
  headers?: RawHttpHeadersInput & ActMeasurementStateMachineHeaders;
}

export type ActMeasurementStateMachineParameters = ActMeasurementStateMachineHeaderParam &
  ActMeasurementStateMachineBodyParam &
  RequestParameters;
export type GetMeasurementMetadataSchemaFileInfoParameters = RequestParameters;
export type GetMeasurementClassificationParameters = RequestParameters;
export type GetMeasurementClassificationsParameters = RequestParameters;

export interface DeleteMeasurementClassificationHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface DeleteMeasurementClassificationHeaderParam {
  headers?: RawHttpHeadersInput & DeleteMeasurementClassificationHeaders;
}

export type DeleteMeasurementClassificationParameters = DeleteMeasurementClassificationHeaderParam &
  RequestParameters;

export interface CreateMeasurementClassificationHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the client. */
  "Repeatability-Client-ID"?: string;
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface CreateMeasurementClassificationBodyParam {
  /** Parameter of type 'MeasurementClassificationCreationParameters' in the body. */
  body?: MeasurementClassificationCreationParameters;
}

export interface CreateMeasurementClassificationHeaderParam {
  headers?: RawHttpHeadersInput & CreateMeasurementClassificationHeaders;
}

export type CreateMeasurementClassificationParameters = CreateMeasurementClassificationHeaderParam &
  CreateMeasurementClassificationBodyParam &
  RequestParameters;

export interface CreateDataStreamHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the client. */
  "Repeatability-Client-ID"?: string;
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface CreateDataStreamBodyParam {
  /** Parameter of type 'DataStreamCreationParameters' in the body. */
  body?: DataStreamCreationParameters;
}

export interface CreateDataStreamHeaderParam {
  headers?: RawHttpHeadersInput & CreateDataStreamHeaders;
}

export type CreateDataStreamParameters = CreateDataStreamHeaderParam &
  CreateDataStreamBodyParam &
  RequestParameters;
export type GetDataStreamParameters = RequestParameters;

export interface GetAllDataStreamQueryParamProperties {
  /** Filter the result list using the given expression. */
  filter?: string;
}

export interface GetAllDataStreamQueryParam {
  queryParameters?: GetAllDataStreamQueryParamProperties;
}

export type GetAllDataStreamParameters = GetAllDataStreamQueryParam & RequestParameters;

export interface ClearContentOfDataStreamHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the client. */
  "Repeatability-Client-ID"?: string;
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface ClearContentOfDataStreamHeaderParam {
  headers?: RawHttpHeadersInput & ClearContentOfDataStreamHeaders;
}

export type ClearContentOfDataStreamParameters = ClearContentOfDataStreamHeaderParam &
  RequestParameters;

export interface StageFilesForDataStreamBodyParam {
  /** Parameter of type 'UploadDerivedDataStreamFilesRequest' in the body. */
  body?: UploadDerivedDataStreamFilesRequest;
}

export type StageFilesForDataStreamParameters = StageFilesForDataStreamBodyParam &
  RequestParameters;

export interface CompleteDataStreamHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the client. */
  "Repeatability-Client-ID"?: string;
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface CompleteDataStreamHeaderParam {
  headers?: RawHttpHeadersInput & CompleteDataStreamHeaders;
}

export type CompleteDataStreamParameters = CompleteDataStreamHeaderParam & RequestParameters;

export interface FailDataStreamHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the client. */
  "Repeatability-Client-ID"?: string;
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface FailDataStreamHeaderParam {
  headers?: RawHttpHeadersInput & FailDataStreamHeaders;
}

export type FailDataStreamParameters = FailDataStreamHeaderParam & RequestParameters;

export interface GetDataStreamsByTagsBodyParam {
  /** Parameter of type 'FindDataStreamByTagsRequestParameters' in the body. */
  body?: FindDataStreamByTagsRequestParameters;
}

export type GetDataStreamsByTagsParameters = GetDataStreamsByTagsBodyParam & RequestParameters;

export interface GetDataStreamsByLineageBodyParam {
  /** Parameter of type 'FindDataStreamByLineageRequestParameters' in the body. */
  body?: FindDataStreamByLineageRequestParameters;
}

export type GetDataStreamsByLineageParameters = GetDataStreamsByLineageBodyParam &
  RequestParameters;

export interface GetDataStreamLineageGraphsByLineageBodyParam {
  /** Parameter of type 'FindDataStreamByLineageGraphRequestParameters' in the body. */
  body?: FindDataStreamByLineageGraphRequestParameters;
}

export type GetDataStreamLineageGraphsByLineageParameters = GetDataStreamLineageGraphsByLineageBodyParam &
  RequestParameters;

export interface CreateOrReplaceDataStreamStorageBodyParam {
  /** Parameter of type 'StorageCreationParameters' in the body. */
  body?: StorageCreationParameters;
}

export type CreateOrReplaceDataStreamStorageParameters = CreateOrReplaceDataStreamStorageBodyParam &
  RequestParameters;
export type GetDataStreamStorageParameters = RequestParameters;

export interface CreateOrReplaceDataStreamTagsBodyParam {
  /** Parameter of type 'TagSetCreationParameters' in the body. */
  body?: TagSetCreationParameters;
}

export type CreateOrReplaceDataStreamTagsParameters = CreateOrReplaceDataStreamTagsBodyParam &
  RequestParameters;
export type GetDataStreamTagsParameters = RequestParameters;

export interface GenerateDataStreamFilesHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the client. */
  "Repeatability-Client-ID"?: string;
}

export interface GenerateDataStreamFilesHeaderParam {
  headers?: RawHttpHeadersInput & GenerateDataStreamFilesHeaders;
}

export type GenerateDataStreamFilesParameters = GenerateDataStreamFilesHeaderParam &
  RequestParameters;
export type GetDataStreamFilesParameters = RequestParameters;
export type GetDataStreamLogsContainerLocationParameters = RequestParameters;
