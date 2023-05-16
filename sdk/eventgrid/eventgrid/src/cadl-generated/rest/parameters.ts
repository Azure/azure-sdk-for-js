// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { CloudEvent, AcknowledgeOptions, ReleaseOptions, RejectOptions } from "./models";

export interface PublishCloudEventBodyParam {
  /** Single Cloud Event being published. */
  body: CloudEvent;
}

export interface PublishCloudEventMediaTypesParam {
  /** content type */
  contentType: "application/cloudevents+json; charset=utf-8";
}

export type PublishCloudEventParameters = PublishCloudEventMediaTypesParam &
  PublishCloudEventBodyParam &
  RequestParameters;

export interface PublishCloudEventsBodyParam {
  /** Array of Cloud Events being published. */
  body: Array<CloudEvent>;
}

export interface PublishCloudEventsMediaTypesParam {
  /** content type */
  contentType: "application/cloudevents-batch+json; charset=utf-8";
}

export type PublishCloudEventsParameters = PublishCloudEventsMediaTypesParam &
  PublishCloudEventsBodyParam &
  RequestParameters;

export interface ReceiveCloudEventsQueryParamProperties {
  /** Max Events count to be received. Minimum value is 1, while maximum value is 100 events. If not specified, the default value is 1. */
  maxEvents?: number;
  /** Max wait time value for receive operation in Seconds. It is the time in seconds that the server approximately waits for the availability of an event and responds to the request. If an event is available, the broker responds immediately to the client. Minimum value is 10 seconds, while maximum value is 120 seconds. If not specified, the default value is 60 seconds. */
  maxWaitTime?: number;
}

export interface ReceiveCloudEventsQueryParam {
  queryParameters?: ReceiveCloudEventsQueryParamProperties;
}

export type ReceiveCloudEventsParameters = ReceiveCloudEventsQueryParam & RequestParameters;

export interface AcknowledgeCloudEventsBodyParam {
  /** AcknowledgeOptions. */
  body: AcknowledgeOptions;
}

export interface AcknowledgeCloudEventsMediaTypesParam {
  /** content type */
  contentType: "application/json; charset=utf-8";
}

export type AcknowledgeCloudEventsParameters = AcknowledgeCloudEventsMediaTypesParam &
  AcknowledgeCloudEventsBodyParam &
  RequestParameters;

export interface ReleaseCloudEventsBodyParam {
  /** ReleaseOptions */
  body: ReleaseOptions;
}

export interface ReleaseCloudEventsMediaTypesParam {
  /** content type */
  contentType: "application/json; charset=utf-8";
}

export type ReleaseCloudEventsParameters = ReleaseCloudEventsMediaTypesParam &
  ReleaseCloudEventsBodyParam &
  RequestParameters;

export interface RejectCloudEventsBodyParam {
  /** RejectOptions */
  body: RejectOptions;
}

export interface RejectCloudEventsMediaTypesParam {
  /** content type */
  contentType: "application/json; charset=utf-8";
}

export type RejectCloudEventsParameters = RejectCloudEventsMediaTypesParam &
  RejectCloudEventsBodyParam &
  RequestParameters;
