import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  LongRunningOperationOutput,
  ErrorResponseOutput,
  DiscoveryOutput,
  DiscoveryLroResponseOutput,
  PagedDiscoverySpecialFileOutput,
  PagedDiscoveryUploadOutput,
  UploadOutput,
  UploadLroResponseOutput,
  PagedUploadSpecialFileOutput,
  PagedUploadDataFileOutput,
  PagedUploadResultMeasurementOutput,
} from "./outputModels";

export interface LongRunningOperationsGet200Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** Final location of the operation result. */
  location?: string;
}

/** The request has succeeded. */
export interface LongRunningOperationsGet200Response extends HttpResponse {
  status: "200";
  body: LongRunningOperationOutput;
  headers: RawHttpHeaders & LongRunningOperationsGet200Headers;
}

export interface LongRunningOperationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DiscoveriesCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: DiscoveryOutput;
}

/** A Discovery resource was successfully created. */
export interface DiscoveriesCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: DiscoveryOutput;
}

export interface DiscoveriesCreateOrReplaceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DiscoveriesGet200Response extends HttpResponse {
  status: "200";
  body: DiscoveryOutput;
}

export interface DiscoveriesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface DiscoveriesComplete202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DiscoveriesComplete202Response extends HttpResponse {
  status: "202";
  body: DiscoveryLroResponseOutput;
  headers: RawHttpHeaders & DiscoveriesComplete202Headers;
}

export interface DiscoveriesCompleteDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface DiscoveriesCompleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DiscoveriesCompleteDefaultHeaders;
}

export interface DiscoveriesCancel202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DiscoveriesCancel202Response extends HttpResponse {
  status: "202";
  body: DiscoveryLroResponseOutput;
  headers: RawHttpHeaders & DiscoveriesCancel202Headers;
}

export interface DiscoveriesCancelDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface DiscoveriesCancelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DiscoveriesCancelDefaultHeaders;
}

/** The request has succeeded. */
export interface DiscoverySpecialFilesList200Response extends HttpResponse {
  status: "200";
  body: PagedDiscoverySpecialFileOutput;
}

export interface DiscoverySpecialFilesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface DiscoverySpecialFilesGenerate202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DiscoverySpecialFilesGenerate202Response extends HttpResponse {
  status: "202";
  body: DiscoveryLroResponseOutput;
  headers: RawHttpHeaders & DiscoverySpecialFilesGenerate202Headers;
}

export interface DiscoverySpecialFilesGenerateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DiscoveryResultUploadsList200Response extends HttpResponse {
  status: "200";
  body: PagedDiscoveryUploadOutput;
}

export interface DiscoveryResultUploadsListDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface UploadsCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: UploadOutput;
}

/** A Upload resource was successfully created. */
export interface UploadsCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: UploadOutput;
}

export interface UploadsCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface UploadsGet200Response extends HttpResponse {
  status: "200";
  body: UploadOutput;
}

export interface UploadsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface UploadsComplete202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface UploadsComplete202Response extends HttpResponse {
  status: "202";
  body: UploadLroResponseOutput;
  headers: RawHttpHeaders & UploadsComplete202Headers;
}

export interface UploadsCompleteDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface UploadsCompleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & UploadsCompleteDefaultHeaders;
}

export interface UploadsCancel202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface UploadsCancel202Response extends HttpResponse {
  status: "202";
  body: UploadLroResponseOutput;
  headers: RawHttpHeaders & UploadsCancel202Headers;
}

export interface UploadsCancelDefaultHeaders {
  /** Error code for specific error that occurred. */
  "x-ms-error-code": string;
}

export interface UploadsCancelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & UploadsCancelDefaultHeaders;
}

/** The request has succeeded. */
export interface UploadSpecialFilesList200Response extends HttpResponse {
  status: "200";
  body: PagedUploadSpecialFileOutput;
}

export interface UploadSpecialFilesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface UploadSpecialFilesGenerate202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface UploadSpecialFilesGenerate202Response extends HttpResponse {
  status: "202";
  body: UploadLroResponseOutput;
  headers: RawHttpHeaders & UploadSpecialFilesGenerate202Headers;
}

export interface UploadSpecialFilesGenerateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface UploadDataFilesList200Response extends HttpResponse {
  status: "200";
  body: PagedUploadDataFileOutput;
}

export interface UploadDataFilesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface UploadDataFilesGenerate202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface UploadDataFilesGenerate202Response extends HttpResponse {
  status: "202";
  body: UploadLroResponseOutput;
  headers: RawHttpHeaders & UploadDataFilesGenerate202Headers;
}

export interface UploadDataFilesGenerateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface UploadResultMeasurementsList200Response extends HttpResponse {
  status: "200";
  body: PagedUploadResultMeasurementOutput;
}

export interface UploadResultMeasurementsListDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
