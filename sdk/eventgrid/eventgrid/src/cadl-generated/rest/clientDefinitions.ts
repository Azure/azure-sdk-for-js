// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PublishCloudEventParameters,
  publishCloudEventsParameters,
  receiveCloudEventsParameters,
  acknowledgeCloudEventsParameters,
  releaseCloudEventsParameters,
} from "./parameters";
import {
  PublishCloudEvent200Response,
  PublishCloudEventDefaultResponse,
  publishCloudEvents200Response,
  publishCloudEventsDefaultResponse,
  receiveCloudEvents201Response,
  receiveCloudEventsDefaultResponse,
  acknowledgeCloudEvents200Response,
  acknowledgeCloudEventsDefaultResponse,
  releaseCloudEvents200Response,
  releaseCloudEventsDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface PublishCloudEvent {
  /** Publish Single Cloud Event to namespace topic. */
  post(
    options: PublishCloudEventParameters
  ): StreamableMethod<PublishCloudEvent200Response | PublishCloudEventDefaultResponse>;
  /** Publish Batch of Cloud Events to namespace topic. */
  post(
    options: publishCloudEventsParameters
  ): StreamableMethod<publishCloudEvents200Response | publishCloudEventsDefaultResponse>;
}

export interface receiveCloudEvents {
  /** Receive Batch of Cloud Events from the Event Subscription. */
  post(
    options?: receiveCloudEventsParameters
  ): StreamableMethod<receiveCloudEvents201Response | receiveCloudEventsDefaultResponse>;
}

export interface acknowledgeCloudEvents {
  /** Acknowledge Cloud Events. */
  post(
    options: acknowledgeCloudEventsParameters
  ): StreamableMethod<acknowledgeCloudEvents200Response | acknowledgeCloudEventsDefaultResponse>;
}

export interface releaseCloudEvents {
  /** Release Cloud Events. */
  post(
    options: releaseCloudEventsParameters
  ): StreamableMethod<releaseCloudEvents200Response | releaseCloudEventsDefaultResponse>;
}

export interface Routes {
  /** Resource for '/topics/\{topicName\}:publish' has methods for the following verbs: post */
  (path: "/topics/{topicName}:publish", topicName: string): PublishCloudEvent;
  /** Resource for '/topics/\{topicName\}/eventsubscriptions/\{eventSubscriptionName\}:receive' has methods for the following verbs: post */
  (
    path: "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:receive",
    topicName: string,
    eventSubscriptionName: string
  ): receiveCloudEvents;
  /** Resource for '/topics/\{topicName\}/eventsubscriptions/\{eventSubscriptionName\}:acknowledge' has methods for the following verbs: post */
  (
    path: "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:acknowledge",
    topicName: string,
    eventSubscriptionName: string
  ): acknowledgeCloudEvents;
  /** Resource for '/topics/\{topicName\}/eventsubscriptions/\{eventSubscriptionName\}:release' has methods for the following verbs: post */
  (
    path: "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:release",
    topicName: string,
    eventSubscriptionName: string
  ): releaseCloudEvents;
}

export type AzureMessagingEventGridClient = Client & {
  path: Routes;
};
