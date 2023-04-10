// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

export { EventData, ReceivedEventData } from "./eventData";
export { WebSocketImpl } from "rhea-promise";
export { LastEnqueuedEventProperties } from "./partitionReceiver";
export { OperationOptions } from "./util/operationOptions";
export {
  EventHubClientOptions,
  EventHubConsumerClientOptions,
  LoadBalancingOptions,
  SendBatchOptions,
  CreateBatchOptions,
  GetPartitionIdsOptions,
  GetPartitionPropertiesOptions,
  GetEventHubPropertiesOptions,
} from "./models/public";
export { EventHubConsumerClient } from "./eventHubConsumerClient";
export { EventHubProducerClient } from "./eventHubProducerClient";
export {
  BufferedCloseOptions,
  EventHubBufferedProducerClient,
  EventHubBufferedProducerClientOptions,
  EnqueueEventOptions,
  BufferedFlushOptions,
  OnSendEventsErrorContext,
  OnSendEventsSuccessContext,
} from "./eventHubBufferedProducerClient";
export {
  SubscribeOptions,
  Subscription,
  SubscriptionEventHandlers,
  PartitionContext,
  ProcessErrorHandler,
  ProcessInitializeHandler,
  ProcessCloseHandler,
  ProcessEventsHandler,
} from "./eventHubConsumerClientModels";
export { EventPosition, latestEventPosition, earliestEventPosition } from "./eventPosition";
export { PartitionProperties, EventHubProperties } from "./managementClient";
export { EventDataBatch, TryAddOptions } from "./eventDataBatch";
export { Checkpoint } from "./partitionProcessor";
export { CheckpointStore, PartitionOwnership } from "./eventProcessor";
export { CloseReason } from "./models/public";
export { MessagingError, RetryOptions, RetryMode, WebSocketOptions } from "@azure/core-amqp";
export { TokenCredential } from "@azure/core-auth";
export { logger } from "./logger";
export {
  parseEventHubConnectionString,
  EventHubConnectionStringProperties,
} from "./util/connectionStringUtils";

export * from "./eventDataAdapter";
