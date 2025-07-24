// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import type {
  WidgetSuiteOutput,
  ResourceOperationStatusWidgetSuiteWidgetSuiteErrorOutput,
  OperationStatusErrorOutput,
  PagedWidgetSuiteOutput,
} from "./outputModels.js";

/** The request has succeeded. */
export interface GetWidget200Response extends HttpResponse {
  status: "200";
  body: WidgetSuiteOutput;
}

export interface GetWidgetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetWidgetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetWidgetDefaultHeaders;
}

/** The request has succeeded. */
export interface GetWidgetOperationStatus200Response extends HttpResponse {
  status: "200";
  body: ResourceOperationStatusWidgetSuiteWidgetSuiteErrorOutput;
}

export interface GetWidgetOperationStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetWidgetOperationStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetWidgetOperationStatusDefaultHeaders;
}

export interface CreateOrUpdateWidget200Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded. */
export interface CreateOrUpdateWidget200Response extends HttpResponse {
  status: "200";
  body: WidgetSuiteOutput;
  headers: RawHttpHeaders & CreateOrUpdateWidget200Headers;
}

export interface CreateOrUpdateWidget201Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateOrUpdateWidget201Response extends HttpResponse {
  status: "201";
  body: WidgetSuiteOutput;
  headers: RawHttpHeaders & CreateOrUpdateWidget201Headers;
}

export interface CreateOrUpdateWidgetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateOrUpdateWidgetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateOrUpdateWidgetDefaultHeaders;
}

/** The final response for long-running createOrUpdateWidget operation */
export interface CreateOrUpdateWidgetLogicalResponse extends HttpResponse {
  status: "200";
  body: WidgetSuiteOutput;
}

export interface DeleteWidget202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DeleteWidget202Response extends HttpResponse {
  status: "202";
  body: OperationStatusErrorOutput;
  headers: RawHttpHeaders & DeleteWidget202Headers;
}

export interface DeleteWidgetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteWidgetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteWidgetDefaultHeaders;
}

/** The final response for long-running deleteWidget operation */
export interface DeleteWidgetLogicalResponse extends HttpResponse {
  status: "200";
  body: OperationStatusErrorOutput;
}

/** The request has succeeded. */
export interface ListWidgets200Response extends HttpResponse {
  status: "200";
  body: PagedWidgetSuiteOutput;
}

export interface ListWidgetsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListWidgetsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListWidgetsDefaultHeaders;
}
