// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import { NotificationContent } from "./models";

export interface DownloadMediaHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DownloadMediaHeaderParam {
  headers?: RawHttpHeadersInput & DownloadMediaHeaders;
}

export type DownloadMediaParameters = DownloadMediaHeaderParam &
  RequestParameters;

export interface SendHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface SendBodyParam {
  body?: NotificationContent;
}

export interface SendHeaderParam {
  headers?: RawHttpHeadersInput & SendHeaders;
}

export type SendParameters = SendHeaderParam &
  SendBodyParam &
  RequestParameters;

export interface GetTemplatesHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface GetTemplatesHeaderParam {
  headers?: RawHttpHeadersInput & GetTemplatesHeaders;
}

export type GetTemplatesParameters = GetTemplatesHeaderParam &
  RequestParameters;
