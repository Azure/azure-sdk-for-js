// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, AzureKeyCredential } from "@azure/core-auth";
import { ClientOptions } from "./common/interfaces.js";
import {
  createAzureMessagingEventGrid,
  AzureMessagingEventGridContext,
  CloudEventEvent,
  ReceiveResponse,
  LockToken,
  LockTokensResponse,
  publishCloudEvent,
  publishCloudEvents,
  receiveCloudEvents,
  acknowledgeCloudEvents,
  releaseCloudEvents,
  PublishCloudEventOptions,
  publishCloudEventsOptions,
  receiveCloudEventsOptions,
  acknowledgeCloudEventsOptions,
  releaseCloudEventsOptions,
} from "./api/index.js";

export class AzureMessagingEventGrid {
  private _client: AzureMessagingEventGridContext;

  /** Azure Messaging EventGrid Client */
  constructor(
    endpoint: string,
    credential: AzureKeyCredential | TokenCredential,
    options: ClientOptions = {}
  ) {
    this._client = createAzureMessagingEventGrid(endpoint, credential, options);
  }

  publishCloudEvent(
    id: string,
    source: string,
    type: string,
    specversion: string,
    topicName: string,
    options: PublishCloudEventOptions = { requestOptions: {} }
  ): Promise<void> {
    return publishCloudEvent(this._client, id, source, type, specversion, topicName, options);
  }

  publishCloudEvents(
    events: CloudEventEvent[],
    topicName: string,
    options: publishCloudEventsOptions = { requestOptions: {} }
  ): Promise<void> {
    return publishCloudEvents(this._client, events, topicName, options);
  }

  receiveCloudEvents(
    topicName: string,
    eventSubscriptionName: string,
    options: receiveCloudEventsOptions = { requestOptions: {} }
  ): Promise<ReceiveResponse> {
    return receiveCloudEvents(this._client, topicName, eventSubscriptionName, options);
  }

  acknowledgeCloudEvents(
    lockTokens: string[],
    topicName: string,
    eventSubscriptionName: string,
    options: acknowledgeCloudEventsOptions = { requestOptions: {} }
  ): Promise<LockTokensResponse> {
    return acknowledgeCloudEvents(
      this._client,
      lockTokens,
      topicName,
      eventSubscriptionName,
      options
    );
  }

  releaseCloudEvents(
    tokens: LockToken[],
    topicName: string,
    eventSubscriptionName: string,
    options: releaseCloudEventsOptions = { requestOptions: {} }
  ): Promise<LockTokensResponse> {
    return releaseCloudEvents(this._client, tokens, topicName, eventSubscriptionName, options);
  }
}
