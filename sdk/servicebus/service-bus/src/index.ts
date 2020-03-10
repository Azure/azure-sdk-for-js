// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/// <reference lib="es2015" />
/// <reference lib="esnext.asynciterable" />

export { ServiceBusClientOptions } from "./constructorHelpers";
export {
  TokenType,
  TokenCredential,
  DataTransformer,
  delay,
  MessagingError,
  RetryOptions,
  WebSocketOptions
} from "@azure/core-amqp";

export { OnError, OnMessage } from "./core/messageReceiver";
export { SessionReceiverOptions, SessionMessageHandlerOptions } from "./session/messageSession";

export { CorrelationFilter, RuleDescription } from "./core/managementClient";

export {
  ServiceBusMessage,
  ReceivedMessageInfo,
  SendableMessageInfo,
  DeadLetterOptions,
  ReceiveMode
} from "./serviceBusMessage";
export { Delivery, WebSocketImpl } from "rhea-promise";

export { HttpOperationResponse } from "@azure/core-http";

export { QueueDetails, QueueOptions } from "./serializers/queueResourceSerializer";
export { TopicDetails, TopicOptions } from "./serializers/topicResourceSerializer";
export {
  SubscriptionDetails,
  SubscriptionOptions
} from "./serializers/subscriptionResourceSerializer";
export {
  RuleDetails,
  RuleOptions,
  SqlFilter,
  SqlParameter,
  SqlAction
} from "./serializers/ruleResourceSerializer";

export { MessageCountDetails, AuthorizationRule, EntityStatus } from "./util/utils";

export { ServiceBusSenderClient } from "./serviceBusSenderClient";

export {
  ServiceBusReceiverClient,
  NonSessionReceiver,
  SessionReceiver,
  ClientTypeT,
  SubscriptionRuleManagement
} from "./serviceBusReceiverClient";

export {
  SessionConnections,
  ReceivedMessage,
  ContextWithSettlement,
  Session,
  QueueAuth,
  SubscriptionAuth,
  IterateMessagesOptions,
  ReceiveBatchOptions,
  SubscribeOptions,
  MessageHandlerOptions,
  MessageHandlers,
  ContextType,
  Closeable,
  MessageAndContext,
  MessageIterator
} from "./models";
