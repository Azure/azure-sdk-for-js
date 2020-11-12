// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="es2015" />
/// <reference lib="esnext.asynciterable" />

export { delay, MessagingError, RetryOptions, TokenType, WebSocketOptions } from "@azure/core-amqp";
export { TokenCredential } from "@azure/core-auth";
export { OperationOptions } from "@azure/core-http";
export { Delivery, WebSocketImpl } from "rhea-promise";
export { ServiceBusClientOptions } from "./constructorHelpers";
export { CorrelationRuleFilter } from "./core/managementClient";
export {
  CreateMessageBatchOptions,
  ServiceBusReceiverOptions,
  ServiceBusSessionReceiverOptions,
  GetMessageIteratorOptions,
  MessageHandlers,
  ProcessErrorArgs,
  PeekMessagesOptions,
  ReceiveMessagesOptions,
  ReceiveMode,
  SubscribeOptions
} from "./models";
export { OperationOptionsBase, TryAddOptions } from "./modelsToBeSharedWithEventHubs";
export { ServiceBusReceiver } from "./receivers/receiver";
export { ServiceBusSessionReceiver } from "./receivers/sessionReceiver";
export { ServiceBusSender } from "./sender";
export { NamespaceProperties } from "./serializers/namespaceResourceSerializer";
export {
  CreateQueueOptions,
  QueueProperties,
  QueueRuntimeProperties
} from "./serializers/queueResourceSerializer";
export { RuleProperties, SqlRuleAction, SqlRuleFilter } from "./serializers/ruleResourceSerializer";
export {
  CreateSubscriptionOptions,
  SubscriptionProperties,
  SubscriptionRuntimeProperties
} from "./serializers/subscriptionResourceSerializer";
export {
  CreateTopicOptions,
  TopicProperties,
  TopicRuntimeProperties
} from "./serializers/topicResourceSerializer";
export {
  EntitiesResponse,
  WithResponse,
  ServiceBusAdministrationClient
} from "./serviceBusAtomManagementClient";
export { ServiceBusClient } from "./serviceBusClient";
export {
  DeadLetterOptions,
  ServiceBusReceivedMessage,
  ServiceBusMessage
} from "./serviceBusMessage";
export { ServiceBusMessageBatch } from "./serviceBusMessageBatch";
export { AuthorizationRule, EntityStatus, EntityAvailabilityStatus } from "./util/utils";
export {
  parseServiceBusConnectionString,
  ServiceBusConnectionStringProperties
} from "./util/connectionStringUtils";
export { isServiceBusError, ServiceBusError, ServiceBusErrorCode } from "./serviceBusError";
