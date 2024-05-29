// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential, TokenCredential } from "@azure/core-auth";
import {
  ReceiveResult,
  AcknowledgeResult,
  ReleaseResult,
  RejectResult,
  PublishCloudEventsOptions,
  ReceiveCloudEventsOptions,
  AcknowledgeCloudEventsOptions,
  ReleaseCloudEventsOptions,
  RejectCloudEventsOptions,
  RenewCloudEventLocksOptions,
  RenewCloudEventLocksResult,
  CloudEvent as CloudEventWireModel,
} from "./cadl-generated/models";
import { randomUUID } from "@azure/core-util";
import { EventGridClient as EventGridClientGenerated } from "./cadl-generated/EventGridClient";
import { EventGridClientOptions } from "./cadl-generated/api";
import { PublishCloudEventOptions, CloudEvent, cloudEventReservedPropertyNames } from "./models";
import { publishCloudEventInBinaryMode } from "./eventGridNamespacesPublishBinaryMode";

/**
 * Event Grid Namespaces Client
 */
export class EventGridNamespacesClient {
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
   * Publish Single Cloud Event to namespace topic. In case of success, the server responds with an HTTP 200
   * status code with an empty JSON object in response. Otherwise, the server can return various error codes.
   * For example, 401: which indicates authorization failure, 403: which indicates quota exceeded or message
   * is too large, 410: which indicates that specific topic is not found, 400: for bad request, and 500: for
   * internal server error.
   *
   * @param event - Event to publish
   * @param topicName - Topic to publish the event
   * @param options - Options to publish
   *
   */
  async publishCloudEvent<T>(
    event: CloudEvent<T>,
    topicName: string,
    options: PublishCloudEventOptions = { requestOptions: {} },
  ): Promise<void> {
    const cloudEventWireModel: CloudEventWireModel = convertCloudEventToModelType(event);

    if (!options.binaryMode) {
      await this._client.publishCloudEvent(topicName, cloudEventWireModel, options);
    } else {
      await publishCloudEventInBinaryMode(
        this._client.getClient(),
        topicName,
        cloudEventWireModel,
        {
          contentType: options.contentType,
          ...options,
        },
      );
    }
  }

  /**
   * Publish Batch Cloud Event to namespace topic. In case of success, the server responds with an HTTP 200
   * status code with an empty JSON object in response. Otherwise, the server can return various error codes.
   * For example, 401: which indicates authorization failure, 403: which indicates quota exceeded or message
   * is too large, 410: which indicates that specific topic is not found, 400: for bad request, and 500: for
   * internal server error.
   *
   * @param events - Events to publish
   * @param topicName - Topic to publish the event
   * @param options - Options to publish
   *
   */
  async publishCloudEvents<T>(
    events: CloudEvent<T>[],
    topicName: string,
    options: PublishCloudEventsOptions = { requestOptions: {} },
  ): Promise<void> {
    const eventsWireModel: Array<CloudEventWireModel> = [];
    for (const individualevent of events) {
      eventsWireModel.push(convertCloudEventToModelType(individualevent));
    }
    await this._client.publishCloudEvents(topicName, eventsWireModel, options);
  }

  /**
   * Receive Batch of Cloud Events from the Event Subscription.
   *
   * @param topicName - Topic to receive
   * @param eventSubscriptionName - Name of the Event Subscription
   * @param options - Options to receive
   *
   */
  receiveCloudEvents(
    topicName: string,
    eventSubscriptionName: string,
    options: ReceiveCloudEventsOptions = { requestOptions: {} },
  ): Promise<ReceiveResult> {
    return this._client.receiveCloudEvents(topicName, eventSubscriptionName, options);
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
  acknowledgeCloudEvents(
    lockTokens: string[],
    topicName: string,
    eventSubscriptionName: string,
    options: AcknowledgeCloudEventsOptions = { requestOptions: {} },
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
  releaseCloudEvents(
    lockTokens: string[],
    topicName: string,
    eventSubscriptionName: string,
    options: ReleaseCloudEventsOptions = { requestOptions: {} },
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
  rejectCloudEvents(
    lockTokens: string[],
    topicName: string,
    eventSubscriptionName: string,
    options: RejectCloudEventsOptions = { requestOptions: {} },
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
  renewCloudEventLocks(
    lockTokens: string[],
    topicName: string,
    eventSubscriptionName: string,
    options: RenewCloudEventLocksOptions = { requestOptions: {} },
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
