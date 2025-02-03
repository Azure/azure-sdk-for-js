// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import { NotificationContent } from "./models.js";

export interface GetMediaHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface GetMediaHeaderParam {
  headers?: RawHttpHeadersInput & GetMediaHeaders;
}

export type GetMediaParameters = GetMediaHeaderParam & RequestParameters;

export interface SendHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface SendBodyParam {
  /** Details of the message to send. */
  body: NotificationContent;
}

export interface SendHeaderParam {
  headers?: RawHttpHeadersInput & SendHeaders;
}

export type SendParameters = SendHeaderParam &
  SendBodyParam &
  RequestParameters;

export interface ListTemplatesHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ListTemplatesQueryParamProperties {
  /** Number of objects to return per page. */
  maxpagesize?: number;
}

export interface ListTemplatesQueryParam {
  queryParameters?: ListTemplatesQueryParamProperties;
}

export interface ListTemplatesHeaderParam {
  headers?: RawHttpHeadersInput & ListTemplatesHeaders;
}

export type ListTemplatesParameters = ListTemplatesQueryParam &
  ListTemplatesHeaderParam &
  RequestParameters;
