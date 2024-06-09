// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential, TokenCredential } from "@azure/core-auth";
import {
  AcknowledgeResult,
  ReleaseResult,
  RejectResult,
  RenewLocksResult,
} from "./cadl-generated/models";
import { EventGridClient as EventGridClientGenerated } from "./cadl-generated/EventGridClient";
import {
  CloudEvent,
  ReceiveResult,
  ReceiveEventsOptions,
  AcknowledgeEventsOptions,
  ReleaseEventsOptions,
  RejectEventsOptions,
  RenewEventLocksOptions,
  EventGridReceiverClientOptions,
} from "./models";
import { cloudEventDistributedTracingEnricherPolicy } from "./cloudEventDistrubtedTracingEnricherPolicy";
import { tracingPolicyName } from "@azure/core-rest-pipeline";
import { uint8ArrayToString } from "@azure/core-util";

/**
 * Event Grid Namespaces Client
 */
export class EventGridReceiverClient {
  private _client: EventGridClientGenerated;
  private _topicName: string | undefined;
  private _eventSubscriptionName: string | undefined;

  /** Azure Messaging EventGrid Client */
  constructor(
    endpoint: string,
    credential: AzureKeyCredential | TokenCredential,
    options: EventGridReceiverClientOptions = {},
  ) {
    this._client = new EventGridClientGenerated(endpoint, credential, options);
    this._topicName = options?.topicName ?? undefined;
    this._eventSubscriptionName = options?.eventSubscriptionName ?? undefined;
    this._client.pipeline.addPolicy(cloudEventDistributedTracingEnricherPolicy(), {
      afterPolicies: [tracingPolicyName],
    });
  }

  /**
   * Receive Batch of Cloud Events from the Event Subscription.
   *
   * @param options - Options to receive
   *
   */
  async receiveEvents<T>(
    options: ReceiveEventsOptions = { requestOptions: {} },
  ): Promise<ReceiveResult<T>> {
    const topicName = options?.topicName ?? this._topicName;

    if (!topicName) {
      throw new Error("Topic name is required");
    }

    const eventSubscriptionName = options?.eventSubscriptionName ?? this._eventSubscriptionName;

    if (!eventSubscriptionName) {
      throw new Error("Event Subscription name is required");
    }

    const result = await this._client.receiveCloudEvents(topicName, eventSubscriptionName, options);

    const modifiedResult: ReceiveResult<T> = {
      details: result.details.map((receiveDetails) => {
        const cloudEvent: CloudEvent<T> = {
          type: receiveDetails.event.type,
          source: receiveDetails.event.source,
          id: receiveDetails.event.id,
          time: receiveDetails.event.time,
          dataSchema: receiveDetails.event.dataschema,
          dataContentType: receiveDetails.event.datacontenttype,
          subject: receiveDetails.event.subject,
          specVersion: receiveDetails.event.specversion,
          data: receiveDetails.event.data
            ? (receiveDetails.event.data as T)
            : receiveDetails.event.dataBase64
              ? (uint8ArrayToString(receiveDetails.event.dataBase64, "base64") as T)
              : undefined,
        };
        return {
          brokerProperties: receiveDetails.brokerProperties,
          event: cloudEvent,
        };
      }),
    };

    return modifiedResult;
  }

  /**
   * Acknowledge batch of Cloud Events. The server responds with an HTTP 200 status code if at least one
   * event is successfully acknowledged. The response body will include the set of successfully acknowledged
   * lockTokens, along with other failed lockTokens with their corresponding error information. Successfully
   * acknowledged events will no longer be available to any consumer.
   *
   * @param lockTokens - Lock Tokens
   * @param options - Options to Acknowledge
   *
   */
  acknowledgeEvents(
    lockTokens: string[],
    options: AcknowledgeEventsOptions = { requestOptions: {} },
  ): Promise<AcknowledgeResult> {
    const topicName = options?.topicName ?? this._topicName;

    if (!topicName) {
      throw new Error("Topic name is required");
    }

    const eventSubscriptionName = options?.eventSubscriptionName ?? this._eventSubscriptionName;

    if (!eventSubscriptionName) {
      throw new Error("Event Subscription name is required");
    }

    return this._client.acknowledgeCloudEvents(
      topicName,
      eventSubscriptionName,
      lockTokens,
      options,
    );
  }

  /**
   * Release batch of Cloud Events. The server responds with an HTTP 200 status code if at least one event is
   * successfully released. The response body will include the set of successfully released lockTokens, along
   * with other failed lockTokens with their corresponding error information.
   *
   * @param lockTokens - Lock Tokens
   * @param options - Options to release
   *
   */
  releaseEvents(
    lockTokens: string[],
    options: ReleaseEventsOptions = { requestOptions: {} },
  ): Promise<ReleaseResult> {
    const topicName = options?.topicName ?? this._topicName;

    if (!topicName) {
      throw new Error("Topic name is required");
    }

    const eventSubscriptionName = options?.eventSubscriptionName ?? this._eventSubscriptionName;

    if (!eventSubscriptionName) {
      throw new Error("Event Subscription name is required");
    }

    return this._client.releaseCloudEvents(topicName, eventSubscriptionName, lockTokens, {
      ...options,
      releaseDelayInSeconds: options.releaseDelay,
    });
  }

  /**
   * Reject batch of Cloud Events.
   *
   * @param lockTokens - Lock Tokens
   * @param options - Options to reject
   *
   */
  rejectEvents(
    lockTokens: string[],
    options: RejectEventsOptions = { requestOptions: {} },
  ): Promise<RejectResult> {
    const topicName = options?.topicName ?? this._topicName;

    if (!topicName) {
      throw new Error("Topic name is required");
    }

    const eventSubscriptionName = options?.eventSubscriptionName ?? this._eventSubscriptionName;

    if (!eventSubscriptionName) {
      throw new Error("Event Subscription name is required");
    }

    return this._client.rejectCloudEvents(topicName, eventSubscriptionName, lockTokens, options);
  }

  /**
   * Renew lock for batch of Cloud Events.
   *
   * @param lockTokens - Lock Tokens
   * @param options - Options to renew
   */
  renewEventLocks(
    lockTokens: string[],
    options: RenewEventLocksOptions = { requestOptions: {} },
  ): Promise<RenewLocksResult> {
    const topicName = options?.topicName ?? this._topicName;

    if (!topicName) {
      throw new Error("Topic name is required");
    }

    const eventSubscriptionName = options?.eventSubscriptionName ?? this._eventSubscriptionName;

    if (!eventSubscriptionName) {
      throw new Error("Event Subscription name is required");
    }

    return this._client.renewCloudEventLocks(topicName, eventSubscriptionName, lockTokens, options);
  }
}
