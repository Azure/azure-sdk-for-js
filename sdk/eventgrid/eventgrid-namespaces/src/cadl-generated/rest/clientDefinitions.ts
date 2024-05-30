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
  /** Publish a single Cloud Event to a namespace topic. */
  post(
    options: PublishCloudEventParameters,
  ): StreamableMethod<PublishCloudEvent200Response | PublishCloudEventDefaultResponse>;
  /** Publish a batch of Cloud Events to a namespace topic. */
  post(
    options: PublishCloudEventsParameters,
  ): StreamableMethod<PublishCloudEvents200Response | PublishCloudEventsDefaultResponse>;
}

export interface ReceiveCloudEvents {
  /** Receive a batch of Cloud Events from a subscription. */
  post(
    options?: ReceiveCloudEventsParameters,
  ): StreamableMethod<ReceiveCloudEvents200Response | ReceiveCloudEventsDefaultResponse>;
}

export interface AcknowledgeCloudEvents {
  /** Acknowledge a batch of Cloud Events. The response will include the set of successfully acknowledged lock tokens, along with other failed lock tokens with their corresponding error information. Successfully acknowledged events will no longer be available to be received by any consumer. */
  post(
    options?: AcknowledgeCloudEventsParameters,
  ): StreamableMethod<AcknowledgeCloudEvents200Response | AcknowledgeCloudEventsDefaultResponse>;
}

export interface ReleaseCloudEvents {
  /** Release a batch of Cloud Events. The response will include the set of successfully released lock tokens, along with other failed lock tokens with their corresponding error information. Successfully released events can be received by consumers. */
  post(
    options: ReleaseCloudEventsParameters,
  ): StreamableMethod<ReleaseCloudEvents200Response | ReleaseCloudEventsDefaultResponse>;
}

export interface RejectCloudEvents {
  /** Reject a batch of Cloud Events. The response will include the set of successfully rejected lock tokens, along with other failed lock tokens with their corresponding error information. Successfully rejected events will be dead-lettered and can no longer be received by a consumer. */
  post(
    options?: RejectCloudEventsParameters,
  ): StreamableMethod<RejectCloudEvents200Response | RejectCloudEventsDefaultResponse>;
}

export interface RenewCloudEventLocks {
  /** Renew locks for a batch of Cloud Events. The response will include the set of successfully renewed lock tokens, along with other failed lock tokens with their corresponding error information. Successfully renewed locks will ensure that the associated event is only available to the consumer that holds the renewed lock. */
  post(
    options?: RenewCloudEventLocksParameters,
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
