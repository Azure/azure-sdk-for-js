// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/// <reference lib="es2015" />
/// <reference lib="esnext.asynciterable" />

export {
  delay,
  MessagingError,
  type RetryOptions,
  RetryMode,
  TokenType,
  type WebSocketOptions,
} from "@azure/core-amqp";
export type { TokenCredential } from "@azure/core-auth";
export type { OperationOptions } from "@azure/core-client";
export type { Delivery, WebSocketImpl } from "rhea-promise";
export type { ServiceBusClientOptions } from "./constructorHelpers.js";
export type { CorrelationRuleFilter } from "./core/managementClient.js";
export type {
  DeleteMessagesOptions,
  PurgeMessagesOptions,
  CreateMessageBatchOptions,
  GetMessageIteratorOptions,
  MessageHandlers,
  PeekMessagesOptions,
  ProcessErrorArgs,
  ReceiveMessagesOptions,
  ServiceBusReceiverOptions,
  ServiceBusSessionReceiverOptions,
  ServiceBusSenderOptions,
  SubscribeOptions,
} from "./models.js";
export type { OperationOptionsBase, TryAddOptions } from "./modelsToBeSharedWithEventHubs.js";
export type { ServiceBusReceiver } from "./receivers/receiver.js";
export type { ServiceBusSessionReceiver } from "./receivers/sessionReceiver.js";
export type { ServiceBusSender } from "./sender.js";
export type { ServiceBusRuleManager } from "./serviceBusRuleManager.js";
export type { NamespaceProperties } from "./serializers/namespaceResourceSerializer.js";
export type {
  CreateQueueOptions,
  QueueProperties,
  QueueRuntimeProperties,
} from "./serializers/queueResourceSerializer.js";
export type {
  RuleProperties,
  SqlRuleAction,
  SqlRuleFilter,
} from "./serializers/ruleResourceSerializer.js";
export type {
  CreateSubscriptionOptions,
  SubscriptionProperties,
  SubscriptionRuntimeProperties,
} from "./serializers/subscriptionResourceSerializer.js";
export type {
  CreateTopicOptions,
  TopicProperties,
  TopicRuntimeProperties,
} from "./serializers/topicResourceSerializer.js";
export {
  type EntitiesResponse,
  ServiceBusAdministrationClient,
  type WithResponse,
  type ServiceBusAdministrationClientOptions,
} from "./serviceBusAtomManagementClient.js";
export { ServiceBusClient } from "./serviceBusClient.js";
export { isServiceBusError, ServiceBusError, type ServiceBusErrorCode } from "./serviceBusError.js";
export type {
  DeadLetterOptions,
  ServiceBusMessage,
  ServiceBusReceivedMessage,
} from "./serviceBusMessage.js";
export type { ServiceBusMessageBatch } from "./serviceBusMessageBatch.js";
export {
  parseServiceBusConnectionString,
  type ServiceBusConnectionStringProperties,
} from "./util/connectionStringUtils.js";
export type { AuthorizationRule, EntityAvailabilityStatus, EntityStatus } from "./util/utils.js";
export type {
  HttpResponse,
  HttpHeader,
  RawHttpHeaders,
  HttpHeadersLike,
  TransferProgressEvent,
  WebResourceLike,
} from "./util/compat/index.js";
