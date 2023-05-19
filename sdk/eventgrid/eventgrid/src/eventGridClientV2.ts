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
} from "./cadl-generated/api/index";
import { CloudEvent, cloudEventReservedPropertyNames } from "./models";
import { v4 as uuidv4 } from "uuid";
import { CloudEvent as CloudEventWireModel } from "./cadl-generated/rest/index";

import { EventGridClient as EventGridClientGenerated } from "./cadl-generated/EventGridClient";

/** The result of the Publish operation. */
export interface PublishResult {}

export class EventGridClient {
  private _client: EventGridClientGenerated;

  /** Azure Messaging EventGrid Client */
  constructor(endpoint: string, credential: AzureKeyCredential, options: ClientOptions = {}) {
    credential.update(`SharedAccessKey ${credential.key}`);
    this._client = new EventGridClientGenerated(endpoint, credential, options);
  }

  publishCloudEvent<T>(
    event: CloudEvent<T>,
    topicName: string,
    options: PublishCloudEventOptions = { requestOptions: {} }
  ): Promise<PublishResult> {
    return this._client.publishCloudEvent(convertCloudEventToModelType(event), topicName, options);
  }

  publishCloudEvents<T>(
    events: CloudEvent<T>[],
    topicName: string,
    options: PublishCloudEventsOptions = { requestOptions: {} }
  ): Promise<PublishResult> {
    const eventsWireModel: Array<CloudEventWireModel> = [];
    for (const individualevent of events) {
      eventsWireModel.concat(convertCloudEventToModelType(individualevent));
    }
    return this._client.publishCloudEvents(eventsWireModel, topicName, options);
  }

  receiveCloudEvents<T>(
    topicName: string,
    eventSubscriptionName: string,
    options: ReceiveCloudEventsOptions = { requestOptions: {} }
  ): Promise<ReceiveResult<T>> {
    return this._client.receiveCloudEvents(topicName, eventSubscriptionName, options);
  }

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

  releaseCloudEvents(
    lockTokens: string[],
    topicName: string,
    eventSubscriptionName: string,
    options: ReleaseCloudEventsOptions = { requestOptions: {} }
  ): Promise<ReleaseResult> {
    return this._client.releaseCloudEvents(lockTokens, topicName, eventSubscriptionName, options);
  }

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
