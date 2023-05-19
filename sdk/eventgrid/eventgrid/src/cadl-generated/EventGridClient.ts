// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import { ClientOptions } from "./common/interfaces";
import {
  createEventGrid,
  EventGridContext,
  ReceiveResult,
  AcknowledgeResult,
  ReleaseResult,
  RejectResult,
  publishCloudEvent,
  publishCloudEvents,
  receiveCloudEvents,
  acknowledgeCloudEvents,
  releaseCloudEvents,
  rejectCloudEvents,
  PublishCloudEventOptions,
  PublishCloudEventsOptions,
  ReceiveCloudEventsOptions,
  AcknowledgeCloudEventsOptions,
  ReleaseCloudEventsOptions,
  RejectCloudEventsOptions,
} from "./api/index";
import { CloudEvent } from "./rest/models";

export class EventGridClient {
  private _client: EventGridContext;

  /** Azure Messaging EventGrid Client */
  constructor(endpoint: string, credential: AzureKeyCredential, options: ClientOptions = {}) {
    this._client = createEventGrid(endpoint, credential, options);
  }

  publishCloudEvent(
    event: CloudEvent,
    topicName: string,
    options: PublishCloudEventOptions = { requestOptions: {} }
  ): Promise<Record<string, any>> {
    return publishCloudEvent(this._client, event, topicName, options);
  }

  publishCloudEvents(
    events: CloudEvent[],
    topicName: string,
    options: PublishCloudEventsOptions = { requestOptions: {} }
  ): Promise<Record<string, any>> {
    return publishCloudEvents(this._client, events, topicName, options);
  }

  receiveCloudEvents<T>(
    topicName: string,
    eventSubscriptionName: string,
    options: ReceiveCloudEventsOptions = { requestOptions: {} }
  ): Promise<ReceiveResult<T>> {
    return receiveCloudEvents(this._client, topicName, eventSubscriptionName, options);
  }

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

  releaseCloudEvents(
    lockTokens: string[],
    topicName: string,
    eventSubscriptionName: string,
    options: ReleaseCloudEventsOptions = { requestOptions: {} }
  ): Promise<ReleaseResult> {
    return releaseCloudEvents(this._client, lockTokens, topicName, eventSubscriptionName, options);
  }

  rejectCloudEvents(
    lockTokens: string[],
    topicName: string,
    eventSubscriptionName: string,
    options: RejectCloudEventsOptions = { requestOptions: {} }
  ): Promise<RejectResult> {
    return rejectCloudEvents(this._client, lockTokens, topicName, eventSubscriptionName, options);
  }
}
