// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import type {
  DeidentificationJobOutput,
  PagedDeidentificationJobOutput,
  PagedDeidentificationDocumentDetailsOutput,
  DeidentificationResultOutput,
} from "./outputModels.js";

export interface GetJob200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface GetJob200Response extends HttpResponse {
  status: "200";
  body: DeidentificationJobOutput;
  headers: RawHttpHeaders & GetJob200Headers;
}

export interface GetJobDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetJobDefaultHeaders;
}

export interface DeidentifyDocuments200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded. */
export interface DeidentifyDocuments200Response extends HttpResponse {
  status: "200";
  body: DeidentificationJobOutput;
  headers: RawHttpHeaders & DeidentifyDocuments200Headers;
}

export interface DeidentifyDocuments201Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface DeidentifyDocuments201Response extends HttpResponse {
  status: "201";
  body: DeidentificationJobOutput;
  headers: RawHttpHeaders & DeidentifyDocuments201Headers;
}

export interface DeidentifyDocumentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeidentifyDocumentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeidentifyDocumentsDefaultHeaders;
}

/** The final response for long-running deidentifyDocuments operation */
export interface DeidentifyDocumentsLogicalResponse extends HttpResponse {
  status: "200";
  body: DeidentificationJobOutput;
}

export interface ListJobs200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ListJobs200Response extends HttpResponse {
  status: "200";
  body: PagedDeidentificationJobOutput;
  headers: RawHttpHeaders & ListJobs200Headers;
}

export interface ListJobsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListJobsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListJobsDefaultHeaders;
}

export interface ListJobDocuments200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ListJobDocuments200Response extends HttpResponse {
  status: "200";
  body: PagedDeidentificationDocumentDetailsOutput;
  headers: RawHttpHeaders & ListJobDocuments200Headers;
}

export interface ListJobDocumentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListJobDocumentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListJobDocumentsDefaultHeaders;
}

export interface CancelJob200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface CancelJob200Response extends HttpResponse {
  status: "200";
  body: DeidentificationJobOutput;
  headers: RawHttpHeaders & CancelJob200Headers;
}

export interface CancelJobDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CancelJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CancelJobDefaultHeaders;
}

export interface DeleteJob204Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteJob204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & DeleteJob204Headers;
}

export interface DeleteJobDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteJobDefaultHeaders;
}

export interface DeidentifyText200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeidentifyText200Response extends HttpResponse {
  status: "200";
  body: DeidentificationResultOutput;
  headers: RawHttpHeaders & DeidentifyText200Headers;
}

export interface DeidentifyTextDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeidentifyTextDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeidentifyTextDefaultHeaders;
}
