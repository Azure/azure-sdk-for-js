// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/// <reference lib="esnext.asynciterable" />

export { EventData, ReceivedEventData } from "./eventData";
export { WebSocketImpl } from "rhea-promise";
export { LastEnqueuedEventProperties } from "./eventHubReceiver";
export { OperationOptions, TracingOptions } from "./util/operationOptions";
export {
  EventHubClientOptions,
  SendBatchOptions,
  CreateBatchOptions,
  GetPartitionIdsOptions,
  GetPartitionPropertiesOptions,
  GetEventHubPropertiesOptions
} from "./models/public";
export { EventHubConsumerClient } from "./eventHubConsumerClient";
export { EventHubProducerClient } from "./eventHubProducerClient";
export {
  SubscribeOptions,
  Subscription,
  SubscriptionEventHandlers,
  PartitionContext,
  ProcessErrorHandler,
  ProcessInitializeHandler,
  ProcessCloseHandler,
  ProcessEventsHandler
} from "./eventHubConsumerClientModels";
export { EventPosition, latestEventPosition, earliestEventPosition } from "./eventPosition";
export { PartitionProperties, EventHubProperties } from "./managementClient";
export { EventDataBatch, TryAddOptions } from "./eventDataBatch";
export { Checkpoint } from "./partitionProcessor";
export { CheckpointStore, PartitionOwnership } from "./eventProcessor";
export { CloseReason } from "./models/public";
export { MessagingError, RetryOptions, TokenCredential, WebSocketOptions } from "@azure/core-amqp";
export { logger } from "./log";
