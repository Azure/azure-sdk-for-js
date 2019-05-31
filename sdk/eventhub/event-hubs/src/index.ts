// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/// <reference lib="esnext.asynciterable" />

export { EventData, ReceivedEventData } from "./eventData";
export { WebSocketImpl } from "rhea-promise";
export { LastEnqueuedInfo, OnMessage, OnError } from "./eventHubReceiver";
export { ReceiveHandler } from "./streamingReceiver";
export {
  EventHubClient,
  ReceiverOptions,
  EventHubClientOptions,
  BatchingOptions,
  RetryOptions,
  SenderOptions
} from "./eventHubClient";
export { EventPosition } from "./eventPosition";
export { PartitionProperties, EventHubProperties } from "./managementClient";
export { Sender } from "./sender";
export { Receiver } from "./receiver";
export {
  MessagingError,
  DataTransformer,
  DefaultDataTransformer,
  TokenType,
  TokenProvider,
  TokenInfo,
  AadTokenProvider,
  SasTokenProvider
} from "@azure/amqp-common";
