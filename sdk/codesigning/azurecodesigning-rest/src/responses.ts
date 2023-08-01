// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  OperationStatusOutput,
  ExtendedKeyUsageListOutput,
  ResourceOperationStatusOutput,
} from "./outputModels";

/** The request has succeeded. */
export interface GetCodeSigningStatus200Response extends HttpResponse {
  status: "200";
  body: OperationStatusOutput;
}

export interface GetCodeSigningStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetCodeSigningStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetCodeSigningStatusDefaultHeaders;
}

/** The final response for long-running getCodeSigningStatus operation */
export interface GetCodeSigningStatusLogicalResponse extends HttpResponse {
  status: "200";
  body: OperationStatusOutput;
}

/** The request has succeeded. */
export interface GetSignRootCertificate200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
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
export interface ListSignEkus200Response extends HttpResponse {
  status: "200";
  body: ExtendedKeyUsageListOutput;
}

export interface ListSignEkusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListSignEkusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListSignEkusDefaultHeaders;
}

export interface Sign202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface Sign202Response extends HttpResponse {
  status: "202";
  body: ResourceOperationStatusOutput;
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
  body: ResourceOperationStatusOutput;
}
