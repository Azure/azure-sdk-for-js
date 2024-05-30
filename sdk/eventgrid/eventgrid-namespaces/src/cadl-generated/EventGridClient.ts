// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  CloudEvent,
  PublishResult,
  ReceiveResult,
  AcknowledgeResult,
  ReleaseResult,
  RejectResult,
  RenewCloudEventLocksResult,
} from "./models/models";
import {
  PublishCloudEventOptionalParams,
  PublishCloudEventsOptionalParams,
  ReceiveCloudEventsOptionalParams,
  AcknowledgeCloudEventsOptionalParams,
  ReleaseCloudEventsOptionalParams,
  RejectCloudEventsOptionalParams,
  RenewCloudEventLocksOptionalParams,
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
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Messaging EventGrid Client */
  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: EventGridClientOptions = {},
  ) {
    this._client = createEventGrid(endpointParam, credential, options);
    this.pipeline = this._client.pipeline;
  }

  /** Publish a single Cloud Event to a namespace topic. */
  publishCloudEvent(
    topicName: string,
    event: CloudEvent,
    options: PublishCloudEventOptionalParams = { requestOptions: {} },
  ): Promise<PublishResult> {
    return publishCloudEvent(this._client, topicName, event, options);
  }

  /** Publish a batch of Cloud Events to a namespace topic. */
  publishCloudEvents(
    topicName: string,
    events: CloudEvent[],
    options: PublishCloudEventsOptionalParams = { requestOptions: {} },
  ): Promise<PublishResult> {
    return publishCloudEvents(this._client, topicName, events, options);
  }

  /** Receive a batch of Cloud Events from a subscription. */
  receiveCloudEvents(
    topicName: string,
    eventSubscriptionName: string,
    options: ReceiveCloudEventsOptionalParams = { requestOptions: {} },
  ): Promise<ReceiveResult> {
    return receiveCloudEvents(this._client, topicName, eventSubscriptionName, options);
  }

  /** Acknowledge a batch of Cloud Events. The response will include the set of successfully acknowledged lock tokens, along with other failed lock tokens with their corresponding error information. Successfully acknowledged events will no longer be available to be received by any consumer. */
  acknowledgeCloudEvents(
    topicName: string,
    eventSubscriptionName: string,
    lockTokens: string[],
    options: AcknowledgeCloudEventsOptionalParams = { requestOptions: {} },
  ): Promise<AcknowledgeResult> {
    return acknowledgeCloudEvents(
      this._client,
      topicName,
      eventSubscriptionName,
      lockTokens,
      options,
    );
  }

  /** Release a batch of Cloud Events. The response will include the set of successfully released lock tokens, along with other failed lock tokens with their corresponding error information. Successfully released events can be received by consumers. */
  releaseCloudEvents(
    topicName: string,
    eventSubscriptionName: string,
    lockTokens: string[],
    options: ReleaseCloudEventsOptionalParams = { requestOptions: {} },
  ): Promise<ReleaseResult> {
    return releaseCloudEvents(this._client, topicName, eventSubscriptionName, lockTokens, options);
  }

  /** Reject a batch of Cloud Events. The response will include the set of successfully rejected lock tokens, along with other failed lock tokens with their corresponding error information. Successfully rejected events will be dead-lettered and can no longer be received by a consumer. */
  rejectCloudEvents(
    topicName: string,
    eventSubscriptionName: string,
    lockTokens: string[],
    options: RejectCloudEventsOptionalParams = { requestOptions: {} },
  ): Promise<RejectResult> {
    return rejectCloudEvents(this._client, topicName, eventSubscriptionName, lockTokens, options);
  }

  /** Renew locks for a batch of Cloud Events. The response will include the set of successfully renewed lock tokens, along with other failed lock tokens with their corresponding error information. Successfully renewed locks will ensure that the associated event is only available to the consumer that holds the renewed lock. */
  renewCloudEventLocks(
    topicName: string,
    eventSubscriptionName: string,
    lockTokens: string[],
    options: RenewCloudEventLocksOptionalParams = { requestOptions: {} },
  ): Promise<RenewCloudEventLocksResult> {
    return renewCloudEventLocks(
      this._client,
      topicName,
      eventSubscriptionName,
      lockTokens,
      options,
    );
  }
}
