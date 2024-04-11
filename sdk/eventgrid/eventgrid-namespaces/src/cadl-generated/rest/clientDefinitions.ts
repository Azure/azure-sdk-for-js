// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PublishCloudEventParameters,
  PublishCloudEventsParameters,
  ReceiveCloudEventsParameters,
  AcknowledgeCloudEventsParameters,
  ReleaseCloudEventsParameters,
  RejectCloudEventsParameters,
  RenewCloudEventLocksParameters,
} from "./parameters";
import {
  PublishCloudEvent200Response,
  PublishCloudEventDefaultResponse,
  PublishCloudEvents200Response,
  PublishCloudEventsDefaultResponse,
  ReceiveCloudEvents200Response,
  ReceiveCloudEventsDefaultResponse,
  AcknowledgeCloudEvents200Response,
  AcknowledgeCloudEventsDefaultResponse,
  ReleaseCloudEvents200Response,
  ReleaseCloudEventsDefaultResponse,
  RejectCloudEvents200Response,
  RejectCloudEventsDefaultResponse,
  RenewCloudEventLocks200Response,
  RenewCloudEventLocksDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface PublishCloudEvent {
  /** Publish Single Cloud Event to namespace topic. In case of success, the server responds with an HTTP 200 status code with an empty JSON object in response. Otherwise, the server can return various error codes. For example, 401: which indicates authorization failure, 403: which indicates quota exceeded or message is too large, 410: which indicates that specific topic is not found, 400: for bad request, and 500: for internal server error. */
  post(
    options: PublishCloudEventParameters,
  ): StreamableMethod<PublishCloudEvent200Response | PublishCloudEventDefaultResponse>;
  /** Publish Batch Cloud Event to namespace topic. In case of success, the server responds with an HTTP 200 status code with an empty JSON object in response. Otherwise, the server can return various error codes. For example, 401: which indicates authorization failure, 403: which indicates quota exceeded or message is too large, 410: which indicates that specific topic is not found, 400: for bad request, and 500: for internal server error. */
  post(
    options: PublishCloudEventsParameters,
  ): StreamableMethod<PublishCloudEvents200Response | PublishCloudEventsDefaultResponse>;
}

export interface ReceiveCloudEvents {
  /** Receive Batch of Cloud Events from the Event Subscription. */
  post(
    options?: ReceiveCloudEventsParameters,
  ): StreamableMethod<ReceiveCloudEvents200Response | ReceiveCloudEventsDefaultResponse>;
}

export interface AcknowledgeCloudEvents {
  /** Acknowledge batch of Cloud Events. The server responds with an HTTP 200 status code if the request is successfully accepted. The response body will include the set of successfully acknowledged lockTokens, along with other failed lockTokens with their corresponding error information. Successfully acknowledged events will no longer be available to any consumer. */
  post(
    options: AcknowledgeCloudEventsParameters,
  ): StreamableMethod<AcknowledgeCloudEvents200Response | AcknowledgeCloudEventsDefaultResponse>;
}

export interface ReleaseCloudEvents {
  /** Release batch of Cloud Events. The server responds with an HTTP 200 status code if the request is successfully accepted. The response body will include the set of successfully released lockTokens, along with other failed lockTokens with their corresponding error information. */
  post(
    options: ReleaseCloudEventsParameters,
  ): StreamableMethod<ReleaseCloudEvents200Response | ReleaseCloudEventsDefaultResponse>;
}

export interface RejectCloudEvents {
  /** Reject batch of Cloud Events. The server responds with an HTTP 200 status code if the request is successfully accepted. The response body will include the set of successfully rejected lockTokens, along with other failed lockTokens with their corresponding error information. */
  post(
    options: RejectCloudEventsParameters,
  ): StreamableMethod<RejectCloudEvents200Response | RejectCloudEventsDefaultResponse>;
}

export interface RenewCloudEventLocks {
  /** Renew lock for batch of Cloud Events. The server responds with an HTTP 200 status code if the request is successfully accepted. The response body will include the set of successfully renewed lockTokens, along with other failed lockTokens with their corresponding error information. */
  post(
    options: RenewCloudEventLocksParameters,
  ): StreamableMethod<RenewCloudEventLocks200Response | RenewCloudEventLocksDefaultResponse>;
}

export interface Routes {
  /** Resource for '/topics/\{topicName\}:publish' has methods for the following verbs: post */
  (path: "/topics/{topicName}:publish", topicName: string): PublishCloudEvent;
  /** Resource for '/topics/\{topicName\}/eventsubscriptions/\{eventSubscriptionName\}:receive' has methods for the following verbs: post */
  (
    path: "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:receive",
    topicName: string,
    eventSubscriptionName: string,
  ): ReceiveCloudEvents;
  /** Resource for '/topics/\{topicName\}/eventsubscriptions/\{eventSubscriptionName\}:acknowledge' has methods for the following verbs: post */
  (
    path: "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:acknowledge",
    topicName: string,
    eventSubscriptionName: string,
  ): AcknowledgeCloudEvents;
  /** Resource for '/topics/\{topicName\}/eventsubscriptions/\{eventSubscriptionName\}:release' has methods for the following verbs: post */
  (
    path: "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:release",
    topicName: string,
    eventSubscriptionName: string,
  ): ReleaseCloudEvents;
  /** Resource for '/topics/\{topicName\}/eventsubscriptions/\{eventSubscriptionName\}:reject' has methods for the following verbs: post */
  (
    path: "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:reject",
    topicName: string,
    eventSubscriptionName: string,
  ): RejectCloudEvents;
  /** Resource for '/topics/\{topicName\}/eventsubscriptions/\{eventSubscriptionName\}:renewLock' has methods for the following verbs: post */
  (
    path: "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:renewLock",
    topicName: string,
    eventSubscriptionName: string,
  ): RenewCloudEventLocks;
}

export type EventGridContext = Client & {
  path: Routes;
};
