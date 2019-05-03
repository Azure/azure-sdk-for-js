// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export { EventData, EventHubDeliveryAnnotations, EventHubMessageAnnotations } from "./eventData";
export { Delivery, AmqpError, Message, MessageHeader, MessageProperties, Dictionary, WebSocketImpl } from "rhea-promise";
export { ReceiverRuntimeInfo, OnMessage, OnError } from "./eventHubReceiver";
export { ReceiveHandler } from "./streamingReceiver";
export { EventHubClient, ReceiveOptions, ClientOptionsBase, ClientOptions } from "./eventHubClient";
export { EventPosition } from "./eventPosition";
export { EventHubPartitionRuntimeInformation, EventHubRuntimeInformation } from "./managementClient";
import { Constants } from "@azure/amqp-common";
export const aadEventHubsAudience = Constants.aadEventHubsAudience;
export {
  delay,
  Timeout,
  EventHubConnectionStringModel,
  parseConnectionString,
  IotHubConnectionStringModel,
  StorageConnectionStringModel,
  isIotHubConnectionString,
  ErrorNameConditionMapper,
  ConditionStatusMapper,
  ConditionErrorNameMapper,
  MessagingError,
  DataTransformer,
  DefaultDataTransformer,
  TokenType,
  TokenProvider,
  TokenInfo,
  AadTokenProvider,
  SasTokenProvider,
  ConnectionConfig,
  EventHubConnectionConfig
} from "@azure/amqp-common";
