// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export { Namespace, NamespaceOptions } from "./namespace";
export {
  ConnectionConfig,
  TokenInfo,
  TokenType,
  TokenProvider,
  DataTransformer,
  DefaultDataTransformer,
  delay,
  Timeout,
  MessagingError
} from "@azure/amqp-common";

export { QueueClient } from "./queueClient";
export { TopicClient } from "./topicClient";
export { SubscriptionClient } from "./subscriptionClient";

export { Sender } from "./sender";
export { Receiver, MessageReceiverOptions } from "./receiver";

export { MessageHandlerOptions } from "./core/streamingReceiver";
export { OnError, OnMessage } from "./core/messageReceiver";
export { MessageSession, SessionReceiverOptions } from "./session/messageSession";

export { SQLExpression, CorrelationFilter, RuleDescription } from "./core/managementClient";

export {
  ServiceBusMessage,
  ReceivedMessageInfo,
  SendableMessageInfo,
  DeadLetterOptions,
  ReceiveMode
} from "./serviceBusMessage";
export { AmqpError, Delivery, Dictionary, generate_uuid as generateUuid } from "rhea-promise";
