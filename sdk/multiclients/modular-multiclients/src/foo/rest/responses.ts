// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import { ResourceOutput, ResourceListOutput } from "./outputModels.js";

/** The request has succeeded. */
export interface CreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ResourceOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ResourceOutput;
}

export interface CreateOrUpdateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateOrUpdateDefaultHeaders;
}

/** The request has succeeded. */
export interface Get200Response extends HttpResponse {
  status: "200";
  body: ResourceOutput;
}

export interface GetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteOperation204Response extends HttpResponse {
  status: "204";
}

export interface DeleteOperationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteOperationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteOperationDefaultHeaders;
}

/** The request has succeeded. */
export interface List200Response extends HttpResponse {
  status: "200";
  body: ResourceListOutput;
}

export interface ListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListDefaultHeaders;
}
