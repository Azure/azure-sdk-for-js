// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import {
  CloudEvent,
  ReceiveResult,
  AcknowledgeResult,
  ReleaseResult,
  RejectResult,
  RenewCloudEventLocksResult,
} from "./models/models";
import {
  PublishCloudEventOptions,
  PublishCloudEventsOptions,
  ReceiveCloudEventsOptions,
  AcknowledgeCloudEventsOptions,
  ReleaseCloudEventsOptions,
  RejectCloudEventsOptions,
  RenewCloudEventLocksOptions,
} from "./models/options";
import {
  createEventGrid,
  EventGridClientOptions,
  EventGridContext,
  publishCloudEvent,
  publishCloudEvents,
  receiveCloudEvents,
  acknowledgeCloudEvents,
  releaseCloudEvents,
  rejectCloudEvents,
  renewCloudEventLocks,
} from "./api/index";

export { EventGridClientOptions } from "./api/EventGridContext";

export class EventGridClient {
  private _client: EventGridContext;

  getClient(): EventGridContext {
    return this._client;
  }

  /** Azure Messaging EventGrid Client */
  constructor(
    endpoint: string,
    credential: any | TokenCredential,
    options: EventGridClientOptions = {}
  ) {
    this._client = createEventGrid(endpoint, credential, options);
  }

  /** Publish Single Cloud Event to namespace topic. In case of success, the server responds with an HTTP 200 status code with an empty JSON object in response. Otherwise, the server can return various error codes. For example, 401: which indicates authorization failure, 403: which indicates quota exceeded or message is too large, 410: which indicates that specific topic is not found, 400: for bad request, and 500: for internal server error. */
  publishCloudEvent(
    id: string,
    source: string,
    type: string,
    specversion: string,
    topicName: string,
    options: PublishCloudEventOptions = { requestOptions: {} }
  ): Promise<Record<string, any>> {
    return publishCloudEvent(this._client, id, source, type, specversion, topicName, options);
  }

  /** Publish Batch Cloud Event to namespace topic. In case of success, the server responds with an HTTP 200 status code with an empty JSON object in response. Otherwise, the server can return various error codes. For example, 401: which indicates authorization failure, 403: which indicates quota exceeded or message is too large, 410: which indicates that specific topic is not found, 400: for bad request, and 500: for internal server error. */
  publishCloudEvents(
    events: CloudEvent[],
    topicName: string,
    options: PublishCloudEventsOptions = { requestOptions: {} }
  ): Promise<Record<string, any>> {
    return publishCloudEvents(this._client, events, topicName, options);
  }

  /** Receive Batch of Cloud Events from the Event Subscription. */
  receiveCloudEvents<T>(
    topicName: string,
    eventSubscriptionName: string,
    options: ReceiveCloudEventsOptions = { requestOptions: {} }
  ): Promise<ReceiveResult<T>> {
    return receiveCloudEvents(this._client, topicName, eventSubscriptionName, options);
  }

  /** Acknowledge batch of Cloud Events. The server responds with an HTTP 200 status code if the request is successfully accepted. The response body will include the set of successfully acknowledged lockTokens, along with other failed lockTokens with their corresponding error information. Successfully acknowledged events will no longer be available to any consumer. */
  acknowledgeCloudEvents(
    lockTokens: string[],
    topicName: string,
    eventSubscriptionName: string,
    options: AcknowledgeCloudEventsOptions = { requestOptions: {} }
  ): Promise<AcknowledgeResult> {
    return acknowledgeCloudEvents(
      this._client,
      lockTokens,
      topicName,
      eventSubscriptionName,
      options
    );
  }

  /** Release batch of Cloud Events. The server responds with an HTTP 200 status code if the request is successfully accepted. The response body will include the set of successfully released lockTokens, along with other failed lockTokens with their corresponding error information. */
  releaseCloudEvents(
    lockTokens: string[],
    topicName: string,
    eventSubscriptionName: string,
    options: ReleaseCloudEventsOptions = { requestOptions: {} }
  ): Promise<ReleaseResult> {
    return releaseCloudEvents(this._client, lockTokens, topicName, eventSubscriptionName, options);
  }

  /** Reject batch of Cloud Events. The server responds with an HTTP 200 status code if the request is successfully accepted. The response body will include the set of successfully rejected lockTokens, along with other failed lockTokens with their corresponding error information. */
  rejectCloudEvents(
    lockTokens: string[],
    topicName: string,
    eventSubscriptionName: string,
    options: RejectCloudEventsOptions = { requestOptions: {} }
  ): Promise<RejectResult> {
    return rejectCloudEvents(this._client, lockTokens, topicName, eventSubscriptionName, options);
  }

  /** Renew lock for batch of Cloud Events. The server responds with an HTTP 200 status code if the request is successfully accepted. The response body will include the set of successfully renewed lockTokens, along with other failed lockTokens with their corresponding error information. */
  renewCloudEventLocks(
    lockTokens: string[],
    topicName: string,
    eventSubscriptionName: string,
    options: RenewCloudEventLocksOptions = { requestOptions: {} }
  ): Promise<RenewCloudEventLocksResult> {
    return renewCloudEventLocks(
      this._client,
      lockTokens,
      topicName,
      eventSubscriptionName,
      options
    );
  }
}
