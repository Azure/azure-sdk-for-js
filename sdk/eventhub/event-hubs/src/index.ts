// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/// <reference lib="esnext.asynciterable" />

export { EventData, ReceivedEventData } from "./eventData";
export { WebSocketImpl } from "rhea-promise";
export { LastEnqueuedEventInfo } from "./eventHubReceiver";
export {
  AbortSignalOptions,
  EventHubClientOptions,
  SendBatchOptions,
  CreateBatchOptions,
  GetPartitionIdsOptions,
  GetPartitionPropertiesOptions,
  GetPropertiesOptions,
  ParentSpanOptions
} from "./eventHubClient";
export { EventHubConsumerClient, PartitionCheckpointer } from "./eventHubConsumerClient";
export { EventHubProducerClient } from "./eventHubProducerClient";
export {
  SubscriptionOptions,
  Subscription,
  SubscriptionEventHandlers,
  ProcessErrorHandler,
  ProcessInitializeHandler,
  ProcessCloseHandler,
  ProcessEvents
} from "./eventHubConsumerClientModels";
export { EventPosition } from "./eventPosition";
export { PartitionProperties, EventHubProperties } from "./managementClient";
export { EventDataBatch, TryAddOptions } from "./eventDataBatch";
export { Checkpoint } from "./partitionProcessor";
export {
  CloseReason,
  EventProcessorOptions,
  EventProcessorBatchOptions,
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
