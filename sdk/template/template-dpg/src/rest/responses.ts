// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { HttpResponse } from "@azure-rest/core-client";
import { WidgetOutput, WidgetErrorOutput, AnalyzeResultOutput } from "./outputModels.js";

/** The request has succeeded. */
export interface ListWidgets200Response extends HttpResponse {
  status: "200";
  body: Array<WidgetOutput>;
}

export interface ListWidgetsDefaultResponse extends HttpResponse {
  status: string;
  body: WidgetErrorOutput;
}

/** The request has succeeded. */
export interface GetWidget200Response extends HttpResponse {
  status: "200";
  body: WidgetOutput;
}

export interface GetWidgetDefaultResponse extends HttpResponse {
  status: string;
  body: WidgetErrorOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateWidget201Response extends HttpResponse {
  status: "201";
  body: WidgetOutput;
}

export interface CreateWidgetDefaultResponse extends HttpResponse {
  status: string;
  body: WidgetErrorOutput;
}

/** The request has succeeded. */
export interface UpdateWidget200Response extends HttpResponse {
  status: "200";
  body: WidgetOutput;
}

export interface UpdateWidgetDefaultResponse extends HttpResponse {
  status: string;
  body: WidgetErrorOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteWidget204Response extends HttpResponse {
  status: "204";
}

export interface DeleteWidgetDefaultResponse extends HttpResponse {
  status: string;
  body: WidgetErrorOutput;
}

/** The request has succeeded. */
export interface AnalyzeWidget200Response extends HttpResponse {
  status: "200";
  body: AnalyzeResultOutput;
}

export interface AnalyzeWidgetDefaultResponse extends HttpResponse {
  status: string;
  body: WidgetErrorOutput;
}
