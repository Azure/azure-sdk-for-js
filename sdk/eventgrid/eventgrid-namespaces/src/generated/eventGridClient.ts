// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createEventGrid,
  EventGridContext,
  EventGridClientOptionalParams,
} from "./api/index.js";
import {
  CloudEvent,
  PublishResult,
  ReceiveResult,
  AcknowledgeResult,
  ReleaseResult,
  RejectResult,
  RenewLocksResult,
} from "./models/models.js";
import {
  RenewCloudEventLocksOptionalParams,
  RejectCloudEventsOptionalParams,
  ReleaseCloudEventsOptionalParams,
  AcknowledgeCloudEventsOptionalParams,
  ReceiveCloudEventsOptionalParams,
  PublishCloudEventsOptionalParams,
  PublishCloudEventOptionalParams,
} from "./api/options.js";
import {
  renewCloudEventLocks,
  rejectCloudEvents,
  releaseCloudEvents,
  acknowledgeCloudEvents,
  receiveCloudEvents,
  publishCloudEvents,
  publishCloudEvent,
} from "./api/operations.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { KeyCredential, TokenCredential } from "@azure/core-auth";

export { EventGridClientOptionalParams } from "./api/eventGridContext.js";

export class EventGridClient {
  private _client: EventGridContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Messaging EventGrid Client */
  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: EventGridClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createEventGrid(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Renew locks for a batch of Cloud Events. The response will include the set of successfully renewed lock tokens, along with other failed lock tokens with their corresponding error information. Successfully renewed locks will ensure that the associated event is only available to the consumer that holds the renewed lock. */
  renewCloudEventLocks(
    topicName: string,
    eventSubscriptionName: string,
    lockTokens: string[],
    options: RenewCloudEventLocksOptionalParams = { requestOptions: {} },
  ): Promise<RenewLocksResult> {
    return renewCloudEventLocks(
      this._client,
      topicName,
      eventSubscriptionName,
      lockTokens,
      options,
    );
  }

  /** Reject a batch of Cloud Events. The response will include the set of successfully rejected lock tokens, along with other failed lock tokens with their corresponding error information. Successfully rejected events will be dead-lettered and can no longer be received by a consumer. */
  rejectCloudEvents(
    topicName: string,
    eventSubscriptionName: string,
    lockTokens: string[],
    options: RejectCloudEventsOptionalParams = { requestOptions: {} },
  ): Promise<RejectResult> {
    return rejectCloudEvents(
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
    return releaseCloudEvents(
      this._client,
      topicName,
      eventSubscriptionName,
      lockTokens,
      options,
    );
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

  /** Receive a batch of Cloud Events from a subscription. */
  receiveCloudEvents(
    topicName: string,
    eventSubscriptionName: string,
    options: ReceiveCloudEventsOptionalParams = { requestOptions: {} },
  ): Promise<ReceiveResult> {
    return receiveCloudEvents(
      this._client,
      topicName,
      eventSubscriptionName,
      options,
    );
  }

  /** Publish a batch of Cloud Events to a namespace topic. */
  publishCloudEvents(
    topicName: string,
    events: CloudEvent[],
    options: PublishCloudEventsOptionalParams = { requestOptions: {} },
  ): Promise<PublishResult> {
    return publishCloudEvents(this._client, topicName, events, options);
  }

  /** Publish a single Cloud Event to a namespace topic. */
  publishCloudEvent(
    topicName: string,
    event: CloudEvent,
    options: PublishCloudEventOptionalParams = { requestOptions: {} },
  ): Promise<PublishResult> {
    return publishCloudEvent(this._client, topicName, event, options);
  }
}
