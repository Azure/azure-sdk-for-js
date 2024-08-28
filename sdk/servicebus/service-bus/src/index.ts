// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/// <reference lib="es2015" />
/// <reference lib="esnext.asynciterable" />

export {
  delay,
  MessagingError,
  RetryOptions,
  RetryMode,
  TokenType,
  WebSocketOptions,
} from "@azure/core-amqp";
export { TokenCredential } from "@azure/core-auth";
export { OperationOptions } from "@azure/core-client";
export { Delivery, WebSocketImpl } from "rhea-promise";
export { ServiceBusClientOptions } from "./constructorHelpers.js";
export { CorrelationRuleFilter } from "./core/managementClient.js";
export {
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
export { OperationOptionsBase, TryAddOptions } from "./modelsToBeSharedWithEventHubs.js";
export { ServiceBusReceiver } from "./receivers/receiver.js";
export { ServiceBusSessionReceiver } from "./receivers/sessionReceiver.js";
export { ServiceBusSender } from "./sender.js";
export { ServiceBusRuleManager } from "./serviceBusRuleManager.js";
export { NamespaceProperties } from "./serializers/namespaceResourceSerializer.js";
export {
  CreateQueueOptions,
  QueueProperties,
  QueueRuntimeProperties,
} from "./serializers/queueResourceSerializer.js";
export { RuleProperties, SqlRuleAction, SqlRuleFilter } from "./serializers/ruleResourceSerializer.js";
export {
  CreateSubscriptionOptions,
  SubscriptionProperties,
  SubscriptionRuntimeProperties,
} from "./serializers/subscriptionResourceSerializer.js";
export {
  CreateTopicOptions,
  TopicProperties,
  TopicRuntimeProperties,
} from "./serializers/topicResourceSerializer.js";
export {
  EntitiesResponse,
  ServiceBusAdministrationClient,
  WithResponse,
  ServiceBusAdministrationClientOptions,
} from "./serviceBusAtomManagementClient.js";
export { ServiceBusClient } from "./serviceBusClient.js";
export { isServiceBusError, ServiceBusError, ServiceBusErrorCode } from "./serviceBusError.js";
export {
  DeadLetterOptions,
  ServiceBusMessage,
  ServiceBusReceivedMessage,
} from "./serviceBusMessage.js";
export { ServiceBusMessageBatch } from "./serviceBusMessageBatch.js";
export {
  parseServiceBusConnectionString,
  ServiceBusConnectionStringProperties,
} from "./util/connectionStringUtils.js";
export { AuthorizationRule, EntityAvailabilityStatus, EntityStatus } from "./util/utils.js";
export {
  HttpResponse,
  HttpHeader,
  RawHttpHeaders,
  HttpHeadersLike,
  TransferProgressEvent,
  WebResourceLike,
} from "./util/compat/index.js";
