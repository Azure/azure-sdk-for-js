// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  WidgetResponseOutput,
  ResourceOperationStatusOutput,
  CreateWidgetRequestOutput,
  OperationStatusOutput,
  PagedWidgetResponseOutput,
} from "./outputModels";

/** The request has succeeded. */
export interface GetWidget200Response extends HttpResponse {
  status: "200";
  body: WidgetResponseOutput;
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
  body: ResourceOperationStatusOutput;
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

export interface NewWidget200Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded. */
export interface NewWidget200Response extends HttpResponse {
  status: "200";
  body: CreateWidgetRequestOutput;
  headers: RawHttpHeaders & NewWidget200Headers;
}

export interface NewWidget201Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface NewWidget201Response extends HttpResponse {
  status: "201";
  body: CreateWidgetRequestOutput;
  headers: RawHttpHeaders & NewWidget201Headers;
}

export interface NewWidgetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface NewWidgetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & NewWidgetDefaultHeaders;
}

/** The final response for long-running newWidget operation */
export interface NewWidgetLogicalResponse extends HttpResponse {
  status: "200";
  body: CreateWidgetRequestOutput;
}

export interface EraseWidget202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface EraseWidget202Response extends HttpResponse {
  status: "202";
  body: OperationStatusOutput;
  headers: RawHttpHeaders & EraseWidget202Headers;
}

export interface EraseWidgetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface EraseWidgetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & EraseWidgetDefaultHeaders;
}

/** The final response for long-running eraseWidget operation */
export interface EraseWidgetLogicalResponse extends HttpResponse {
  status: "200";
  body: OperationStatusOutput;
}

/** The request has succeeded. */
export interface RetrieveAllWidgets200Response extends HttpResponse {
  status: "200";
  body: PagedWidgetResponseOutput;
}

export interface RetrieveAllWidgetsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface RetrieveAllWidgetsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & RetrieveAllWidgetsDefaultHeaders;
}
