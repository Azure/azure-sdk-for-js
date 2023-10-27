// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import { ClientOptions } from "./cadl-generated/common/interfaces";
import {
  ReceiveResult,
  AcknowledgeResult,
  ReleaseResult,
  RejectResult,
  PublishCloudEventOptions,
  PublishCloudEventsOptions,
  ReceiveCloudEventsOptions,
  AcknowledgeCloudEventsOptions,
  ReleaseCloudEventsOptions,
  RejectCloudEventsOptions,
  PublishResultOutput,
} from "./cadl-generated/api/index";
import { CloudEvent, cloudEventReservedPropertyNames } from "./models";
import { v4 as uuidv4 } from "uuid";
import { CloudEvent as CloudEventWireModel } from "./cadl-generated/rest/index";
import { EventGridClient as EventGridClientGenerated } from "./cadl-generated/EventGridClient";

/**
 * Event Grid Client
 */
export class EventGridClient {
  private _client: EventGridClientGenerated;

  /** Azure Messaging EventGrid Client */
  constructor(endpoint: string, credential: AzureKeyCredential, options: ClientOptions = {}) {
    credential.update(`SharedAccessKey ${credential.key}`);
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
  publishCloudEvent<T>(
    event: CloudEvent<T>,
    topicName: string,
    options: PublishCloudEventOptions = { requestOptions: {} }
  ): Promise<PublishResultOutput> {
    return this._client.publishCloudEvent(convertCloudEventToModelType(event), topicName, options);
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
  publishCloudEvents<T>(
    events: CloudEvent<T>[],
    topicName: string,
    options: PublishCloudEventsOptions = { requestOptions: {} }
  ): Promise<PublishResultOutput> {
    const eventsWireModel: Array<CloudEventWireModel> = [];
    for (const individualevent of events) {
      eventsWireModel.push(convertCloudEventToModelType(individualevent));
    }
    return this._client.publishCloudEvents(eventsWireModel, topicName, options);
  }

  /**
   * Receive Batch of Cloud Events from the Event Subscription.
   *
   * @param topicName - Topic to receive
   * @param eventSubscriptionName - Name of the Event Subscription
   * @param options - Options to receive
   *
   */
  receiveCloudEvents<T>(
    topicName: string,
    eventSubscriptionName: string,
    options: ReceiveCloudEventsOptions = { requestOptions: {} }
  ): Promise<ReceiveResult<T>> {
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
    options: AcknowledgeCloudEventsOptions = { requestOptions: {} }
  ): Promise<AcknowledgeResult> {
    return this._client.acknowledgeCloudEvents(
      lockTokens,
      topicName,
      eventSubscriptionName,
      options
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
    options: ReleaseCloudEventsOptions = { requestOptions: {} }
  ): Promise<ReleaseResult> {
    return this._client.releaseCloudEvents(lockTokens, topicName, eventSubscriptionName, options);
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
    options: RejectCloudEventsOptions = { requestOptions: {} }
  ): Promise<RejectResult> {
    return this._client.rejectCloudEvents(lockTokens, topicName, eventSubscriptionName, options);
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
    id: event.id ?? uuidv4(),
    time: event.time ?? new Date(),
    subject: event.subject,
    dataschema: event.dataschema,
    ...(event.extensionAttributes ?? []),
  };

  if (event.data instanceof Uint8Array) {
    if (!event.datacontenttype) {
      throw new Error(
        "a data content type must be provided when sending an event with binary data"
      );
    }

    converted.datacontenttype = event.datacontenttype;
    converted.data_base64 = event.data;
  } else {
    converted.datacontenttype = event.datacontenttype ?? "application/json";
    converted.data = event.data;
  }

  return converted;
}
