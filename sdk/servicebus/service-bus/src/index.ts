// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/// <reference lib="es2015" />
/// <reference lib="esnext.asynciterable" />

export { ServiceBusClient, ServiceBusClientOptions } from "./serviceBusClient";
export {
  TokenType,
  TokenCredential,
  DataTransformer,
  delay,
  MessagingError,
  RetryOptions,
  WebSocketOptions
} from "@azure/core-amqp";

export { QueueClient } from "./queueClient";
export { TopicClient } from "./topicClient";
export { SubscriptionClient } from "./subscriptionClient";
export { ServiceBusSenderClient } from "./senderClient";
export { ServiceBusReceiverClient } from "./receiverClient";
// export { ServiceBusReceiverQueueClient } from "./queueReceiverClient";
// export { ServiceBusReceiverSubscriptionClient } from "./subscriptionReceiverClient";

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
export { ReceiverClient, NonSessionReceiverClient, SessionReceiverClient } from "./receiverClient2";
