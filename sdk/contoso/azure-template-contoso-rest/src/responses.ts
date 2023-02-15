// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  WidgetOutput,
  ErrorResponseOutput,
  ResourceOperationStatusOutput,
  OperationStatusOutput,
  WidgetListOutput,
} from "./outputModels";

/** The request has succeeded. */
export interface GetWidget200Response extends HttpResponse {
  status: "200";
  body: WidgetOutput;
}

export interface GetWidgetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetWidgetOperationStatus200Response extends HttpResponse {
  status: "200";
  body: ResourceOperationStatusOutput;
}

export interface GetWidgetOperationStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface CreateOrUpdateWidget200Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded. */
export interface CreateOrUpdateWidget200Response extends HttpResponse {
  status: "200";
  body: WidgetOutput;
  headers: RawHttpHeaders & CreateOrUpdateWidget200Headers;
}

export interface CreateOrUpdateWidget201Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateOrUpdateWidget201Response extends HttpResponse {
  status: "201";
  body: WidgetOutput;
  headers: RawHttpHeaders & CreateOrUpdateWidget201Headers;
}

export interface CreateOrUpdateWidgetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface DeleteWidget202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DeleteWidget202Response extends HttpResponse {
  status: "202";
  body: OperationStatusOutput;
  headers: RawHttpHeaders & DeleteWidget202Headers;
}

export interface DeleteWidgetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ListWidgets200Response extends HttpResponse {
  status: "200";
  body: WidgetListOutput;
}

export interface ListWidgetsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
