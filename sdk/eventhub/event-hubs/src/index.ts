// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/// <reference lib="esnext.asynciterable" />

export { EventData, ReceivedEventData } from "./eventData";
export { WebSocketImpl } from "rhea-promise";
export { LastEnqueuedEventInfo } from "./eventHubReceiver";
export {
  AbortSignalOptions,
  EventHubClientOptions,
  EventHubConsumerOptions,
  EventHubProducerOptions,
  SendBatchOptions,
  CreateBatchOptions,
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
export { EventDataBatch, TryAddOptions } from "./eventDataBatch";
export { Checkpoint } from "./partitionProcessor";
export {
  CloseReason,
  EventProcessorOptions,
  PartitionContext,
  PartitionManager,
  PartitionOwnership
} from "./eventProcessor";
export { InMemoryPartitionManager } from "./inMemoryPartitionManager";
export { extractSpanContextFromEventData } from "./diagnostics/instrumentEventData";
export {
  MessagingError,
  DataTransformer,
  DefaultDataTransformer,
  RetryOptions,
  TokenType,
  TokenCredential
} from "@azure/core-amqp";
