// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential, TokenCredential } from "@azure/core-auth";
import {
  PublishCloudEventsOptions as SendEventsOptions,
  CloudEvent as CloudEventWireModel,
} from "./cadl-generated/models";
import { randomUUID } from "@azure/core-util";
import { EventGridClient as EventGridClientGenerated } from "./cadl-generated/EventGridClient";
import { EventGridClientOptions } from "./cadl-generated/api";
import { SendEventOptions, CloudEvent, cloudEventReservedPropertyNames } from "./models";
import { publishCloudEventInBinaryMode } from "./eventGridNamespacesPublishBinaryMode";

/**
 * Event Grid Namespaces Client
 */
export class EventGridSenderClient {
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
  async sendEvent<T>(
    event: CloudEvent<T>,
    topicName: string,
    options: SendEventOptions = { requestOptions: {} },
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
  async sendEvents<T>(
    events: CloudEvent<T>[],
    topicName: string,
    options: SendEventsOptions = { requestOptions: {} },
  ): Promise<void> {
    const eventsWireModel: Array<CloudEventWireModel> = [];
    for (const individualevent of events) {
      eventsWireModel.push(convertCloudEventToModelType(individualevent));
    }
    await this._client.publishCloudEvents(topicName, eventsWireModel, options);
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
