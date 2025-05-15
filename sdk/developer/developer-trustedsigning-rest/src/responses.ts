// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import type {
  OperationStatusSignResultErrorOutput,
  PagedExtendedKeyUsageOutput,
  ResourceOperationStatusCertificateProfileNameSignResultErrorResponseOutput,
} from "./outputModels.js";

/** The request has succeeded. */
export interface GetSigningStatus200Response extends HttpResponse {
  status: "200";
  body: OperationStatusSignResultErrorOutput;
}

export interface GetSigningStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetSigningStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetSigningStatusDefaultHeaders;
}

export interface GetSignRootCertificate200Headers {
  /** The content type of the x509 cert. */
  "content-type": "application/x-x509-ca-cert";
}

/** The request has succeeded. */
export interface GetSignRootCertificate200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetSignRootCertificate200Headers;
}

export interface GetSignRootCertificateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetSignRootCertificateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetSignRootCertificateDefaultHeaders;
}

/** The request has succeeded. */
export interface ListExtendedKeyUsages200Response extends HttpResponse {
  status: "200";
  body: PagedExtendedKeyUsageOutput;
}

export interface ListExtendedKeyUsagesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListExtendedKeyUsagesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListExtendedKeyUsagesDefaultHeaders;
}

export interface Sign202Headers {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface Sign202Response extends HttpResponse {
  status: "202";
  body: ResourceOperationStatusCertificateProfileNameSignResultErrorResponseOutput;
  headers: RawHttpHeaders & Sign202Headers;
}

export interface SignDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface SignDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & SignDefaultHeaders;
}

/** The final response for long-running sign operation */
export interface SignLogicalResponse extends HttpResponse {
  status: "200";
  body: ResourceOperationStatusCertificateProfileNameSignResultErrorResponseOutput;
}
