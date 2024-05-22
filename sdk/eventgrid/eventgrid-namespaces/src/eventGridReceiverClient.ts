// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential, TokenCredential } from "@azure/core-auth";
import {
  AcknowledgeResult,
  ReleaseResult,
  RejectResult,
  ReceiveCloudEventsOptions as ReceiveEventsOptions,
  AcknowledgeCloudEventsOptions as AcknowledgeEventsOptions,
  ReleaseCloudEventsOptions as ReleaseEventsOptions,
  RejectCloudEventsOptions as RejectEventsOptions,
  RenewCloudEventLocksOptions as RenewEventLocksOptions,
  RenewCloudEventLocksResult,
  CloudEvent as CloudEventWireModel,
} from "./cadl-generated/models";
import { randomUUID } from "@azure/core-util";
import { EventGridClient as EventGridClientGenerated } from "./cadl-generated/EventGridClient";
import { EventGridClientOptions } from "./cadl-generated/api";
import { CloudEvent, cloudEventReservedPropertyNames, ReceiveResult } from "./models";

/**
 * Event Grid Namespaces Client
 */
export class EventGridReceiverClient {
  private _client: EventGridClientGenerated;

  /** Azure Messaging EventGrid Client */
  constructor(
    endpoint: string,
    credential: AzureKeyCredential | TokenCredential,
    options: EventGridClientOptions = {},
  ) {
    // credential.update(`SharedAccessKey ${credential.key}`);
    this._client = new EventGridClientGenerated(endpoint, credential, options);
  }

  /**
   * Receive Batch of Cloud Events from the Event Subscription.
   *
   * @param topicName - Topic to receive
   * @param eventSubscriptionName - Name of the Event Subscription
   * @param options - Options to receive
   *
   */
  async receiveEvents<T>(
    topicName: string,
    eventSubscriptionName: string,
    options: ReceiveEventsOptions = { requestOptions: {} },
  ): Promise<ReceiveResult<T>> {
    const result = await this._client.receiveCloudEvents(topicName, eventSubscriptionName, options);

    const modifiedResult: ReceiveResult<T> = {
      details: result.value.map((receiveDetails) => {
        const cloudEvent: CloudEvent<T> = {
          type: receiveDetails.event.type,
          source: receiveDetails.event.source,
          id: receiveDetails.event.id,
          time: receiveDetails.event.time,
          dataschema: receiveDetails.event.dataschema,
          datacontenttype: receiveDetails.event.datacontenttype,
          data: receiveDetails.event.data as T,
          subject: receiveDetails.event.subject,
          specversion: receiveDetails.event.specversion,
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
   * @param topicName - Topic Name
   * @param eventSubscriptionName - Name of the Event Subscription
   * @param options - Options to Acknowledge
   *
   */
  acknowledgeEvents(
    lockTokens: string[],
    topicName: string,
    eventSubscriptionName: string,
    options: AcknowledgeEventsOptions = { requestOptions: {} },
  ): Promise<AcknowledgeResult> {
    return this._client.acknowledgeCloudEvents(
      topicName,
      eventSubscriptionName,
      { lockTokens },
      options,
    );
  }

  /**
   * Release batch of Cloud Events. The server responds with an HTTP 200 status code if at least one event is
   * successfully released. The response body will include the set of successfully released lockTokens, along
   * with other failed lockTokens with their corresponding error information.
   *
   * @param lockTokens - Lock Tokens
   * @param topicName - Topic Name
   * @param eventSubscriptionName - Name of the Event Subscription
   * @param options - Options to release
   *
   */
  releaseEvents(
    lockTokens: string[],
    topicName: string,
    eventSubscriptionName: string,
    options: ReleaseEventsOptions = { requestOptions: {} },
  ): Promise<ReleaseResult> {
    return this._client.releaseCloudEvents(
      topicName,
      eventSubscriptionName,
      { lockTokens },
      options,
    );
  }

  /**
   * Reject batch of Cloud Events.
   *
   * @param lockTokens - Lock Tokens
   * @param topicName - Topic Name
   * @param eventSubscriptionName - Name of the Event Subscription
   * @param options - Options to reject
   *
   */
  rejectEvents(
    lockTokens: string[],
    topicName: string,
    eventSubscriptionName: string,
    options: RejectEventsOptions = { requestOptions: {} },
  ): Promise<RejectResult> {
    return this._client.rejectCloudEvents(
      topicName,
      eventSubscriptionName,
      { lockTokens },
      options,
    );
  }

  /**
   * Renew lock for batch of Cloud Events.
   *
   * @param lockTokens - Lock Tokens
   * @param topicName - Topic Name
   * @param eventSubscriptionName - Name of the Event Subscription
   * @param options - Options to renew
   */
  renewEventLocks(
    lockTokens: string[],
    topicName: string,
    eventSubscriptionName: string,
    options: RenewEventLocksOptions = { requestOptions: {} },
  ): Promise<RenewCloudEventLocksResult> {
    return this._client.renewCloudEventLocks(
      topicName,
      eventSubscriptionName,
      { lockTokens },
      options,
    );
  }
}

export function convertCloudEventToModelType<T>(event: CloudEvent<T>): CloudEventWireModel {
  if (event.extensionAttributes) {
    for (const propName in event.extensionAttributes) {
      // Per the cloud events spec: "CloudEvents attribute names MUST consist of lower-case letters ('a' to 'z') or digits ('0' to '9') from the ASCII character set"
      // they also can not match an existing defined property name.

      if (
        !/^[a-z0-9]*$/.test(propName) ||
        cloudEventReservedPropertyNames.indexOf(propName) !== -1
      ) {
        throw new Error(`invalid extension attribute name: ${propName}`);
      }
    }
  }

  const converted: CloudEventWireModel = {
    specversion: event.specversion ?? "1.0",
    type: event.type,
    source: event.source,
    id: event.id ?? randomUUID(),
    time: event.time ?? new Date(),
    subject: event.subject,
    dataschema: event.dataschema,
    ...(event.extensionAttributes ?? []),
  };

  if (event.data instanceof Uint8Array) {
    if (!event.datacontenttype) {
      throw new Error(
        "a data content type must be provided when sending an event with binary data",
      );
    }

    converted.datacontenttype = event.datacontenttype;
    converted.dataBase64 = event.data;
  } else {
    converted.datacontenttype =
      event.datacontenttype ?? "application/cloudevents+json; charset=utf-8";
    converted.data = event.data;
  }

  return converted;
}
