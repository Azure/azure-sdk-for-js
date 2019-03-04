// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export { Namespace, NamespaceOptions } from "./namespace";
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
export { Receiver, MessageReceiverOptions, SessionReceiver } from "./receiver";

export { MessageHandlerOptions } from "./core/streamingReceiver";
export { OnError, OnMessage } from "./core/messageReceiver";
export { SessionReceiverOptions, SessionMessageHandlerOptions } from "./session/messageSession";

export { SQLExpression, CorrelationFilter, RuleDescription } from "./core/managementClient";

export {
  ServiceBusMessage,
  ReceivedMessageInfo,
  SendableMessageInfo,
  DeadLetterOptions,
  ReceiveMode
} from "./serviceBusMessage";
export { AmqpError, Delivery } from "rhea-promise";
