// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  PagedOperationSummaryOutput,
  OperationDetailsOutput,
  DocumentModelBuildOperationDetailsOutput,
  ResourceDetailsOutput,
  AnalyzeResultOperationOutput,
  DocumentModelDetailsOutput,
  CopyAuthorizationOutput,
  PagedDocumentModelSummaryOutput,
  PagedDocumentClassifierDetailsOutput,
  DocumentClassifierDetailsOutput,
} from "./outputModels";

/** The request has succeeded. */
export interface ListOperations200Response extends HttpResponse {
  status: "200";
  body: PagedOperationSummaryOutput;
}

export interface ListOperationsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListOperationsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListOperationsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetOperation200Response extends HttpResponse {
  status: "200";
  body: OperationDetailsOutput;
}

export interface GetOperationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetOperationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetOperationDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDocumentBuildOperation200Response extends HttpResponse {
  status: "200";
  body: DocumentModelBuildOperationDetailsOutput;
}

export interface GetDocumentBuildOperationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDocumentBuildOperationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetDocumentBuildOperationDefaultHeaders;
}

/** The request has succeeded. */
export interface GetResourceInfo200Response extends HttpResponse {
  status: "200";
  body: ResourceDetailsOutput;
}

export interface GetResourceInfoDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetResourceInfoDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetResourceInfoDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAnalyzeResult200Response extends HttpResponse {
  status: "200";
  body: AnalyzeResultOperationOutput;
}

export interface GetAnalyzeResultDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAnalyzeResultDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAnalyzeResultDefaultHeaders;
}

export interface AnalyzeDocumentFromStream202Headers {
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface AnalyzeDocumentFromStream202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & AnalyzeDocumentFromStream202Headers;
}

export interface AnalyzeDocumentFromStreamDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AnalyzeDocumentFromStreamDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AnalyzeDocumentFromStreamDefaultHeaders;
}

/** The final response for long-running analyzeDocumentFromStream operation */
export interface AnalyzeDocumentFromStreamLogicalResponse extends HttpResponse {
  status: "200";
}

export interface AnalyzeDocument202Headers {
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface AnalyzeDocument202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & AnalyzeDocument202Headers;
}

export interface AnalyzeDocumentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AnalyzeDocumentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AnalyzeDocumentDefaultHeaders;
}

/** The final response for long-running analyzeDocument operation */
export interface AnalyzeDocumentLogicalResponse extends HttpResponse {
  status: "200";
}

/** The request has succeeded. */
export interface GetModel200Response extends HttpResponse {
  status: "200";
  body: DocumentModelDetailsOutput;
}

export interface GetModelDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetModelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetModelDefaultHeaders;
}

export interface BuildDocument202Headers {
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface BuildDocument202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & BuildDocument202Headers;
}

export interface BuildDocumentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface BuildDocumentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & BuildDocumentDefaultHeaders;
}

/** The final response for long-running buildDocument operation */
export interface BuildDocumentLogicalResponse extends HttpResponse {
  status: "200";
}

/** The request has succeeded. */
export interface AuthorizeModelCopy200Response extends HttpResponse {
  status: "200";
  body: CopyAuthorizationOutput;
}

export interface AuthorizeModelCopyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AuthorizeModelCopyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AuthorizeModelCopyDefaultHeaders;
}

/** The request has succeeded. */
export interface ListModels200Response extends HttpResponse {
  status: "200";
  body: PagedDocumentModelSummaryOutput;
}

export interface ListModelsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListModelsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListModelsDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteModel204Response extends HttpResponse {
  status: "204";
}

export interface DeleteModelDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteModelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteModelDefaultHeaders;
}

/** The request has succeeded. */
export interface ListClassifiers200Response extends HttpResponse {
  status: "200";
  body: PagedDocumentClassifierDetailsOutput;
}

export interface ListClassifiersDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListClassifiersDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListClassifiersDefaultHeaders;
}

/** The request has succeeded. */
export interface GetClassifier200Response extends HttpResponse {
  status: "200";
  body: DocumentClassifierDetailsOutput;
}

export interface GetClassifierDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetClassifierDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetClassifierDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteClassifier204Response extends HttpResponse {
  status: "204";
}

export interface DeleteClassifierDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteClassifierDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteClassifierDefaultHeaders;
}

export interface ClassifyDocumentFromStream202Headers {
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ClassifyDocumentFromStream202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & ClassifyDocumentFromStream202Headers;
}

export interface ClassifyDocumentFromStreamDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ClassifyDocumentFromStreamDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ClassifyDocumentFromStreamDefaultHeaders;
}

/** The final response for long-running classifyDocumentFromStream operation */
export interface ClassifyDocumentFromStreamLogicalResponse
  extends HttpResponse {
  status: "200";
}

export interface ClassifyDocument202Headers {
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ClassifyDocument202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & ClassifyDocument202Headers;
}

export interface ClassifyDocumentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ClassifyDocumentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ClassifyDocumentDefaultHeaders;
}

/** The final response for long-running classifyDocument operation */
export interface ClassifyDocumentLogicalResponse extends HttpResponse {
  status: "200";
}

/** The request has succeeded. */
export interface GetClassifyResult200Response extends HttpResponse {
  status: "200";
  body: AnalyzeResultOperationOutput;
}

export interface GetClassifyResultDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetClassifyResultDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetClassifyResultDefaultHeaders;
}
