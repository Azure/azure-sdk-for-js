// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/// <reference lib="esnext.asynciterable" />

export { EventData, ReceivedEventData } from "./eventData";
export { WebSocketImpl } from "rhea-promise";
export { OnMessage, OnError, LastEnqueuedEventInfo } from "./eventHubReceiver";
export { ReceiveHandler } from "./receiveHandler";
export {
  AbortSignalOptions,
  EventHubClientOptions,
  EventHubConsumerOptions,
  EventHubProducerOptions,
  SendOptions,
  BatchOptions,
  GetPartitionIdsOptions,
  GetPartitionPropertiesOptions,
  GetPropertiesOptions,
  ParentSpanOptions
} from "./eventHubClient";
export { EventHubConsumerClient, OnReceivedEvents } from "./eventHubConsumerClient";
export { EventHubProducerClient } from "./eventHubProducerClient";
export { SubscriptionOptions, Subscription, OptionalEventHandlers } from "./eventHubConsumerClientModels";
export { EventPosition } from "./eventPosition";
export { PartitionProperties, EventHubProperties } from "./managementClient";
export { EventHubProducer } from "./sender";
export { EventHubConsumer, EventIteratorOptions } from "./receiver";
export { EventDataBatch, TryAddOptions } from "./eventDataBatch";
export {
  EventProcessor,
  CloseReason,
  EventProcessorOptions,
  PartitionContext,
  PartitionCheckpointer,
  PartitionManager,
  PartitionOwnership
} from "./eventProcessor";
export {
  PartitionLoadBalancer
} from "./partitionLoadBalancer";
export { InMemoryPartitionManager } from "./inMemoryPartitionManager";
export { PartitionProcessor, Checkpoint } from "./partitionProcessor";
export { extractSpanContextFromEventData } from "./diagnostics/instrumentEventData";
export {
  MessagingError,
  DataTransformer,
  DefaultDataTransformer,
  RetryOptions,
  TokenType,
  TokenCredential,
  delay
} from "@azure/core-amqp";
