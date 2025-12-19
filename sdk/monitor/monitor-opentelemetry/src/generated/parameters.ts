// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import type { RequestParameters } from "@azure-rest/core-client";
import type { MonitoringDataPoint } from "./models.js";

export interface IsSubscribedHeaders {
  /** Timestamp when the client transmits the metrics and documents to Live Metrics. A 8-byte long type of ticks. */
  "x-ms-qps-transmission-time"?: number;
  /** Computer name where Application Insights SDK lives. Live Metrics uses machine name with instance name as a backup. */
  "x-ms-qps-machine-name"?: string;
  /** Service instance name where Application Insights SDK lives. Live Metrics uses machine name with instance name as a backup. */
  "x-ms-qps-instance-name"?: string;
  /** Identifies an Application Insights SDK as trusted agent to report metrics and documents. */
  "x-ms-qps-stream-id"?: string;
  /** Cloud role name of the service. */
  "x-ms-qps-role-name"?: string;
  /** Version/generation of the data contract (MonitoringDataPoint) between the client and Live Metrics. */
  "x-ms-qps-invariant-version"?: string;
  /** An encoded string that indicates whether the collection configuration is changed. */
  "x-ms-qps-configuration-etag"?: string;
}

export interface IsSubscribedBodyParam {
  /** Data contract between Application Insights client SDK and Live Metrics. /QuickPulseService.svc/ping uses this as a backup source of machine name, instance name and invariant version. */
  body?: MonitoringDataPoint;
}

export interface IsSubscribedQueryParamProperties {
  /** The instrumentation key of the target Application Insights component for which the client checks whether there's any subscription to it. */
  ikey: string;
}

export interface IsSubscribedQueryParam {
  queryParameters: IsSubscribedQueryParamProperties;
}

export interface IsSubscribedHeaderParam {
  headers?: RawHttpHeadersInput & IsSubscribedHeaders;
}

export type IsSubscribedParameters = IsSubscribedQueryParam &
  IsSubscribedHeaderParam &
  IsSubscribedBodyParam &
  RequestParameters;

export interface PublishHeaders {
  /** An encoded string that indicates whether the collection configuration is changed. */
  "x-ms-qps-configuration-etag"?: string;
  /** Timestamp when the client transmits the metrics and documents to Live Metrics. A 8-byte long type of ticks. */
  "x-ms-qps-transmission-time"?: number;
}

export interface PublishBodyParam {
  /** Data contract between the client and Live Metrics. /QuickPulseService.svc/ping uses this as a backup source of machine name, instance name and invariant version. */
  body?: Array<MonitoringDataPoint>;
}

export interface PublishQueryParamProperties {
  /** The instrumentation key of the target Application Insights component for which the client checks whether there's any subscription to it. */
  ikey: string;
}

export interface PublishQueryParam {
  queryParameters: PublishQueryParamProperties;
}

export interface PublishHeaderParam {
  headers?: RawHttpHeadersInput & PublishHeaders;
}

export type PublishParameters = PublishQueryParam &
  PublishHeaderParam &
  PublishBodyParam &
  RequestParameters;
