// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import type {
  TranslationsStatusOutput,
  DocumentStatusOutput,
  TranslationStatusOutput,
  DocumentsStatusOutput,
  SupportedFileFormatsOutput,
} from "./outputModels.js";

export interface DocumentTranslate200Headers {
  /** Specifies consumption (the number of characters for which the user will be charged) for the translation job request */
  "x-metered-usage": number;
  /** Specifies the number of successful image translations within a document translation job */
  "total-image-scans-succeeded": number;
  /** Specifies the number of failed image translations within a document translation job */
  "total-image-scans-failed": number;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
  /** response content type */
  "content-type": "application/octet-stream";
}

/** The request has succeeded. */
export interface DocumentTranslate200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & DocumentTranslate200Headers;
}

export interface DocumentTranslateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DocumentTranslateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DocumentTranslateDefaultHeaders;
}

export interface StartTranslation202Headers {
  /** Link to the translation operation status */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface StartTranslation202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & StartTranslation202Headers;
}

export interface StartTranslationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StartTranslationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StartTranslationDefaultHeaders;
}

/** The final response for long-running startTranslation operation */
export interface StartTranslationLogicalResponse extends HttpResponse {
  status: "200";
}

/** The request has succeeded. */
export interface GetTranslationsStatus200Response extends HttpResponse {
  status: "200";
  body: TranslationsStatusOutput;
}

export interface GetTranslationsStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetTranslationsStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetTranslationsStatusDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDocumentStatus200Response extends HttpResponse {
  status: "200";
  body: DocumentStatusOutput;
}

export interface GetDocumentStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDocumentStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetDocumentStatusDefaultHeaders;
}

/** The request has succeeded. */
export interface GetTranslationStatus200Response extends HttpResponse {
  status: "200";
  body: TranslationStatusOutput;
}

export interface GetTranslationStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetTranslationStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetTranslationStatusDefaultHeaders;
}

/** The request has succeeded. */
export interface CancelTranslation200Response extends HttpResponse {
  status: "200";
  body: TranslationStatusOutput;
}

export interface CancelTranslationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CancelTranslationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CancelTranslationDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDocumentsStatus200Response extends HttpResponse {
  status: "200";
  body: DocumentsStatusOutput;
}

export interface GetDocumentsStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDocumentsStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetDocumentsStatusDefaultHeaders;
}

/** The request has succeeded. */
export interface GetSupportedFormats200Response extends HttpResponse {
  status: "200";
  body: SupportedFileFormatsOutput;
}

export interface GetSupportedFormatsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetSupportedFormatsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetSupportedFormatsDefaultHeaders;
}
