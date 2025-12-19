// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse } from "@azure-rest/core-client";
import type { CollectionConfigurationInfoOutput, ServiceErrorOutput } from "./outputModels.js";

export interface IsSubscribed200Headers {
  /** A boolean flag indicating whether there are active user sessions 'watching' the instrumentation key. If true, the client must start collecting data and posting it to Live Metrics. Otherwise, the client must keep pinging. */
  "x-ms-qps-subscribed": string;
  /** An encoded string that indicates whether the collection configuration is changed. */
  "x-ms-qps-configuration-etag": string;
  /** Recommended time (in milliseconds) before the client should ping the service again. This header exists only when the instrumentation key is not subscribed to. */
  "x-ms-qps-service-polling-interval-hint"?: string;
  /** Contains a URI of the service endpoint that the client must permanently use for the particular resource. This header exists only when the client is talking to Live Metrics global endpoint. */
  "x-ms-qps-service-endpoint-redirect-v2"?: string;
}

/** The request has succeeded. */
export interface IsSubscribed200Response extends HttpResponse {
  status: "200";
  body: CollectionConfigurationInfoOutput;
  headers: RawHttpHeaders & IsSubscribed200Headers;
}

export interface IsSubscribedDefaultResponse extends HttpResponse {
  status: string;
  body: ServiceErrorOutput;
}

export interface Publish200Headers {
  /** Tells the client whether the input instrumentation key is subscribed to. */
  "x-ms-qps-subscribed": string;
  /** An encoded string that indicates whether the collection configuration is changed. */
  "x-ms-qps-configuration-etag": string;
}

/** The request has succeeded. */
export interface Publish200Response extends HttpResponse {
  status: "200";
  body: CollectionConfigurationInfoOutput;
  headers: RawHttpHeaders & Publish200Headers;
}

export interface PublishDefaultResponse extends HttpResponse {
  status: string;
  body: ServiceErrorOutput;
}
