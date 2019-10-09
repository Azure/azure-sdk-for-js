// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/// <reference lib="es2015" />
/// <reference lib="esnext.asynciterable" />

export { ServiceBusClient, ServiceBusClientOptions } from "./serviceBusClient";
export {
  TokenInfo,
  TokenType,
  TokenProvider,
  DataTransformer,
  delay,
  MessagingError
} from "@azure/amqp-common";

export { QueueClient } from "./queueClient";
export { TopicClient } from "./topicClient";
export { SubscriptionClient } from "./subscriptionClient";

export { Sender } from "./sender";
export { Receiver, SessionReceiver } from "./receiver";

export { MessageHandlerOptions } from "./core/streamingReceiver";
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

export {
  ServiceBusAtomManagementClient,
  ServiceBusAtomManagementClientOptions,
  ListRequestOptions,
  QueueResponse,
  CreateQueueResponse,
  GetQueueResponse,
  ListQueuesResponse,
  UpdateQueueResponse,
  DeleteQueueResponse,
  TopicResponse,
  CreateTopicResponse,
  GetTopicResponse,
  ListTopicsResponse,
  UpdateTopicResponse,
  DeleteTopicResponse,
  SubscriptionResponse,
  CreateSubscriptionResponse,
  GetSubscriptionResponse,
  ListSubscriptionsResponse,
  UpdateSubscriptionResponse,
  DeleteSubscriptionResponse,
  RuleResponse,
  CreateRuleResponse,
  GetRuleResponse,
  ListRulesResponse,
  UpdateRuleResponse,
  DeleteRuleResponse
} from "./serviceBusAtomManagementClient";

export { Queue, QueueOptions } from "./serializers/queueResourceSerializer";
export { Topic, TopicOptions } from "./serializers/topicResourceSerializer";
export { Subscription, SubscriptionOptions } from "./serializers/subscriptionResourceSerializer";
export {
  Rule,
  RuleOptions,
  SqlFilter,
  SqlParameter,
  SqlAction
} from "./serializers/ruleResourceSerializer";

export { CountDetails, AuthorizationRule } from "./util/utils";
