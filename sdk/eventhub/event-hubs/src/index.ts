// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type { EventData, ReceivedEventData } from "./eventData.js";
export type { WebSocketImpl } from "rhea-promise";
export type { LastEnqueuedEventProperties } from "./partitionReceiver.js";
export type { OperationOptions } from "./util/operationOptions.js";
export type {
  EventHubClientOptions,
  EventHubConsumerClientOptions,
  LoadBalancingOptions,
  SendBatchOptions,
  CreateBatchOptions,
  GetPartitionIdsOptions,
  GetPartitionPropertiesOptions,
  GetEventHubPropertiesOptions,
} from "./models/public.js";
export { EventHubConsumerClient } from "./eventHubConsumerClient.js";
export { EventHubProducerClient } from "./eventHubProducerClient.js";
export {
  type BufferedCloseOptions,
  EventHubBufferedProducerClient,
  type EventHubBufferedProducerClientOptions,
  type EnqueueEventOptions,
  type BufferedFlushOptions,
  type OnSendEventsErrorContext,
  type OnSendEventsSuccessContext,
} from "./eventHubBufferedProducerClient.js";
export type {
  SubscribeOptions,
  Subscription,
  SubscriptionEventHandlers,
  PartitionContext,
  ProcessErrorHandler,
  ProcessInitializeHandler,
  ProcessCloseHandler,
  ProcessEventsHandler,
} from "./eventHubConsumerClientModels.js";
export { type EventPosition, latestEventPosition, earliestEventPosition } from "./eventPosition.js";
export type { PartitionProperties, EventHubProperties } from "./managementClient.js";
export type { EventDataBatch, TryAddOptions } from "./eventDataBatch.js";
export type { Checkpoint } from "./partitionProcessor.js";
export type { CheckpointStore, PartitionOwnership } from "./eventProcessor.js";
export { CloseReason } from "./models/public.js";
export {
  MessagingError,
  type RetryOptions,
  RetryMode,
  type WebSocketOptions,
} from "@azure/core-amqp";
export type { TokenCredential } from "@azure/core-auth";
export { logger } from "./logger.js";
export {
  parseEventHubConnectionString,
  type EventHubConnectionStringProperties,
} from "./util/connectionStringUtils.js";

export * from "./eventDataAdapter.js";
