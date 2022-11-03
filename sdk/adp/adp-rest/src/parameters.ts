import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import { Discovery, Upload } from "./models";

export type LongRunningOperationsGetParameters = RequestParameters;

export interface DiscoveriesCreateOrReplaceBodyParam {
  /** Auto-generated wrapper for template parameter 'DiscoveryCreationParameters' */
  body?: Discovery;
}

export type DiscoveriesCreateOrReplaceParameters =
  DiscoveriesCreateOrReplaceBodyParam & RequestParameters;
export type DiscoveriesGetParameters = RequestParameters;

export interface DiscoveriesCompleteHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface DiscoveriesCompleteHeaderParam {
  headers?: RawHttpHeadersInput & DiscoveriesCompleteHeaders;
}

export type DiscoveriesCompleteParameters = DiscoveriesCompleteHeaderParam &
  RequestParameters;

export interface DiscoveriesCancelHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface DiscoveriesCancelHeaderParam {
  headers?: RawHttpHeadersInput & DiscoveriesCancelHeaders;
}

export type DiscoveriesCancelParameters = DiscoveriesCancelHeaderParam &
  RequestParameters;
export type DiscoverySpecialFilesListParameters = RequestParameters;
export type DiscoverySpecialFilesGenerateParameters = RequestParameters;
export type DiscoveryResultUploadsListParameters = RequestParameters;

export interface UploadsCreateOrReplaceBodyParam {
  /** Auto-generated wrapper for template parameter 'UploadCreationParameters' */
  body?: Upload;
}

export type UploadsCreateOrReplaceParameters = UploadsCreateOrReplaceBodyParam &
  RequestParameters;
export type UploadsGetParameters = RequestParameters;

export interface UploadsCompleteHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface UploadsCompleteHeaderParam {
  headers?: RawHttpHeadersInput & UploadsCompleteHeaders;
}

export type UploadsCompleteParameters = UploadsCompleteHeaderParam &
  RequestParameters;

export interface UploadsCancelHeaders {
  /** The long running operation identifier. Operation-Id should be valid UUID string. */
  "operation-id"?: string;
}

export interface UploadsCancelHeaderParam {
  headers?: RawHttpHeadersInput & UploadsCancelHeaders;
}

export type UploadsCancelParameters = UploadsCancelHeaderParam &
  RequestParameters;
export type UploadSpecialFilesListParameters = RequestParameters;
export type UploadSpecialFilesGenerateParameters = RequestParameters;
export type UploadDataFilesListParameters = RequestParameters;
export type UploadDataFilesGenerateParameters = RequestParameters;
export type UploadResultMeasurementsListParameters = RequestParameters;
