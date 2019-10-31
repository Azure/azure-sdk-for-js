// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/// <reference lib="esnext.asynciterable" />

export { EventData, ReceivedEventData } from "./eventData";
export { WebSocketImpl } from "rhea-promise";
export { LastEnqueuedEventInfo } from "./eventHubReceiver";
export { ReceiveHandler } from "./receiveHandler";
export {
  AbortSignalOptions,
  EventHubClientOptions,
  EventHubConsumerOptions,
  EventHubProducerOptions,
  SendOptions,
  SendOptionsBase,
  BatchOptions,
  GetPartitionIdsOptions,
  GetPartitionPropertiesOptions,
  GetPropertiesOptions,
  ParentSpanOptions
} from "./eventHubClient";
export { EventHubConsumerClient, OnReceivedEvents, PartitionCheckpointer } from "./eventHubConsumerClient";
export { EventHubProducerClient } from "./eventHubProducerClient";
export { SubscriptionOptions, Subscription, OptionalEventHandlers, OnErrorHandler, OnInitializeHandler, OnCloseHandler } from "./eventHubConsumerClientModels";
export { EventPosition } from "./eventPosition";
export { PartitionProperties, EventHubProperties } from "./managementClient";
export { EventHubProducer } from "./sender";
export { EventIteratorOptions } from "./receiver";
export { EventDataBatch, TryAddOptions } from "./eventDataBatch";
export {
  CloseReason,
  EventProcessorOptions,
  EventProcessorCommonOptions,
  PartitionContext,
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
