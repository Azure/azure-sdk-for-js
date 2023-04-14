// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { CloudEventEvent, LockTokenInput, LockToken } from "./models";

export interface PublishCloudEventBodyParam {
  /** Single Cloud Event being published. */
  body: CloudEventEvent;
}

export interface PublishCloudEventMediaTypesParam {
  /** content type */
  contentType: "application/cloudevents+json; charset=utf-8";
}

export type PublishCloudEventParameters = PublishCloudEventMediaTypesParam &
  PublishCloudEventBodyParam &
  RequestParameters;

export interface publishCloudEventsBodyParam {
  /** Array of Cloud Events being published. */
  body: Array<CloudEventEvent>;
}

export interface publishCloudEventsMediaTypesParam {
  /** content type */
  contentType: "application/cloudevents-batch+json; charset=utf-8";
}

export type publishCloudEventsParameters = publishCloudEventsMediaTypesParam &
  publishCloudEventsBodyParam &
  RequestParameters;

export interface receiveCloudEventsQueryParamProperties {
  /** Max Events count to be received. */
  maxEvents?: number;
  /** Timeout value for receive operation in Seconds. Default is 60 seconds. */
  timeout?: number;
}

export interface receiveCloudEventsQueryParam {
  queryParameters?: receiveCloudEventsQueryParamProperties;
}

export type receiveCloudEventsParameters = receiveCloudEventsQueryParam & RequestParameters;

export interface acknowledgeCloudEventsBodyParam {
  /** Array of LockTokens for the corresponding received Cloud Events to be acknowledged. */
  body: LockTokenInput;
}

export interface acknowledgeCloudEventsMediaTypesParam {
  /** content type */
  contentType: "application/json; charset=utf-8";
}

export type acknowledgeCloudEventsParameters = acknowledgeCloudEventsMediaTypesParam &
  acknowledgeCloudEventsBodyParam &
  RequestParameters;

export interface releaseCloudEventsBodyParam {
  /** Array of LockTokens for the corresponding received Cloud Events to be acknowledged. */
  body: Array<LockToken>;
}

export interface releaseCloudEventsMediaTypesParam {
  /** content type */
  contentType: "application/json; charset=utf-8";
}

export type releaseCloudEventsParameters = releaseCloudEventsMediaTypesParam &
  releaseCloudEventsBodyParam &
  RequestParameters;
