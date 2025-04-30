// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import type {
  AnalyzeImageResultOutput,
  AnalyzeTextResultOutput,
  ShieldPromptResultOutput,
  DetectTextProtectedMaterialResultOutput,
  TextBlocklistOutput,
  PagedTextBlocklistOutput,
  AddOrUpdateTextBlocklistItemsResultOutput,
  TextBlocklistItemOutput,
  PagedTextBlocklistItemOutput,
} from "./outputModels.js";

/** The request has succeeded. */
export interface AnalyzeImage200Response extends HttpResponse {
  status: "200";
  body: AnalyzeImageResultOutput;
}

export interface AnalyzeImageDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AnalyzeImageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AnalyzeImageDefaultHeaders;
}

/** The request has succeeded. */
export interface AnalyzeText200Response extends HttpResponse {
  status: "200";
  body: AnalyzeTextResultOutput;
}

export interface AnalyzeTextDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AnalyzeTextDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AnalyzeTextDefaultHeaders;
}

/** The request has succeeded. */
export interface ShieldPrompt200Response extends HttpResponse {
  status: "200";
  body: ShieldPromptResultOutput;
}

export interface ShieldPromptDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ShieldPromptDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ShieldPromptDefaultHeaders;
}

/** The request has succeeded. */
export interface DetectTextProtectedMaterial200Response extends HttpResponse {
  status: "200";
  body: DetectTextProtectedMaterialResultOutput;
}

export interface DetectTextProtectedMaterialDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DetectTextProtectedMaterialDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DetectTextProtectedMaterialDefaultHeaders;
}

/** The request has succeeded. */
export interface GetTextBlocklist200Response extends HttpResponse {
  status: "200";
  body: TextBlocklistOutput;
}

export interface GetTextBlocklistDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetTextBlocklistDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetTextBlocklistDefaultHeaders;
}

/** The request has succeeded. */
export interface CreateOrUpdateTextBlocklist200Response extends HttpResponse {
  status: "200";
  body: TextBlocklistOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateOrUpdateTextBlocklist201Response extends HttpResponse {
  status: "201";
  body: TextBlocklistOutput;
}

export interface CreateOrUpdateTextBlocklistDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateOrUpdateTextBlocklistDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateOrUpdateTextBlocklistDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteTextBlocklist204Response extends HttpResponse {
  status: "204";
}

export interface DeleteTextBlocklistDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteTextBlocklistDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteTextBlocklistDefaultHeaders;
}

/** The request has succeeded. */
export interface ListTextBlocklists200Response extends HttpResponse {
  status: "200";
  body: PagedTextBlocklistOutput;
}

export interface ListTextBlocklistsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListTextBlocklistsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListTextBlocklistsDefaultHeaders;
}

/** The request has succeeded. */
export interface AddOrUpdateBlocklistItems200Response extends HttpResponse {
  status: "200";
  body: AddOrUpdateTextBlocklistItemsResultOutput;
}

export interface AddOrUpdateBlocklistItemsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AddOrUpdateBlocklistItemsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AddOrUpdateBlocklistItemsDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface RemoveBlocklistItems204Response extends HttpResponse {
  status: "204";
}

export interface RemoveBlocklistItemsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface RemoveBlocklistItemsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & RemoveBlocklistItemsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetTextBlocklistItem200Response extends HttpResponse {
  status: "200";
  body: TextBlocklistItemOutput;
}

export interface GetTextBlocklistItemDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetTextBlocklistItemDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetTextBlocklistItemDefaultHeaders;
}

/** The request has succeeded. */
export interface ListTextBlocklistItems200Response extends HttpResponse {
  status: "200";
  body: PagedTextBlocklistItemOutput;
}

export interface ListTextBlocklistItemsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListTextBlocklistItemsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListTextBlocklistItemsDefaultHeaders;
}
