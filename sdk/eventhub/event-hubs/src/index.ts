// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/// <reference lib="esnext.asynciterable" />

export { EventData, ReceivedEventData } from "./eventData";
export { WebSocketImpl } from "rhea-promise";
export { OnMessage, OnError } from "./eventHubReceiver";
export { ReceiveHandler } from "./streamingReceiver";
export {
  EventHubClient,
  EventHubClientOptions,
  EventHubConsumerOptions,
  EventHubProducerOptions,
  RetryOptions,
  SendOptions
} from "./eventHubClient";
export { EventPosition, EventPositionOptions } from "./eventPosition";
export { PartitionProperties, EventHubProperties } from "./managementClient";
export { EventHubProducer } from "./sender";
export { EventHubConsumer, EventIteratorOptions } from "./receiver";
export {
  MessagingError,
  DataTransformer,
  DefaultDataTransformer,
  TokenType,
  TokenCredential,
  SharedKeyCredential,
  delay
} from "@azure/core-amqp";
