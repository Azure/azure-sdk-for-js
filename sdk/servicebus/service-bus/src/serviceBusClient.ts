// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { generate_uuid } from "rhea-promise";
import { isTokenCredential, TokenCredential } from "@azure/core-amqp";
import {
  ServiceBusClientOptions,
  createConnectionContextForTokenCredential,
  createConnectionContextForConnectionString
} from "./constructorHelpers";
import { ConnectionContext } from "./connectionContext";
import { ClientEntityContext } from "./clientEntityContext";
import { SenderImpl, Sender } from "./sender";
import { CreateSessionReceiverOptions } from "./models";
import { Receiver, ReceiverImpl } from "./receivers/receiver";
import { SessionReceiver, SessionReceiverImpl } from "./receivers/sessionReceiver";
import { ReceivedMessageWithLock, ReceivedMessage } from "./serviceBusMessage";
import {
  SubscriptionRuleManagerImpl,
  SubscriptionRuleManager
} from "./receivers/subscriptionRuleManager";
import { getRetryAttemptTimeoutInMs } from "./util/utils";

/**
 * A client that can create Sender instances for sending messages to queues and
 * topics as well as Receiver instances to receive messages from queues and subscriptions.
 */
export class ServiceBusClient {
  private _connectionContext: ConnectionContext;
  private _clientOptions: ServiceBusClientOptions;

  /**
   *
   * @param connectionString A connection string for Azure Service Bus.
   * NOTE: this connection string can contain an EntityPath, which is ignored.
   * @param options Options for the service bus client.
   */
  constructor(connectionString: string, options?: ServiceBusClientOptions);
  /**
   *
   * @param fullyQualifiedNamespace The full namespace of your Service Bus instance which is
   * likely to be similar to <yournamespace>.servicebus.windows.net.
   * @param credential A credential object used by the client to get the token to authenticate the connection
   * with the Azure Service Bus. See &commat;azure/identity for creating the credentials.
   * @param options - A set of options to apply when configuring the client.
   * - `retryOptions`   : Configures the retry policy for all the operations on the client.
   * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
   * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
   */
  constructor(
    fullyQualifiedNamespace: string,
    credential: TokenCredential,
    options?: ServiceBusClientOptions
  );
  constructor(
    fullyQualifiedNamespaceOrConnectionString1: string,
    credentialOrOptions2?: TokenCredential | ServiceBusClientOptions,
    options3?: ServiceBusClientOptions
  ) {
    if (isTokenCredential(credentialOrOptions2)) {
      const fullyQualifiedNamespace: string = fullyQualifiedNamespaceOrConnectionString1;
      const credential: TokenCredential = credentialOrOptions2;
      this._clientOptions = options3 || {};

      this._connectionContext = createConnectionContextForTokenCredential(
        credential,
        fullyQualifiedNamespace,
        this._clientOptions
      );
    } else {
      const connectionString: string = fullyQualifiedNamespaceOrConnectionString1;
      this._clientOptions = credentialOrOptions2 || {};

      this._connectionContext = createConnectionContextForConnectionString(
        connectionString,
        this._clientOptions
      );
    }
    this._clientOptions.retryOptions = this._clientOptions.retryOptions || {};
    this._clientOptions.retryOptions.timeoutInMs = getRetryAttemptTimeoutInMs(
      this._clientOptions.retryOptions
    );
  }

  /**
   * Creates a receiver for an Azure Service Bus queue.
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   */
  createReceiver(queueName: string, receiveMode: "peekLock"): Receiver<ReceivedMessageWithLock>;
  /**
   * Creates a receiver for an Azure Service Bus queue.
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   */
  createReceiver(queueName: string, receiveMode: "receiveAndDelete"): Receiver<ReceivedMessage>;
  /**
   * Creates a receiver for an Azure Service Bus subscription.
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   */
  createReceiver(
    topicName: string,
    subscriptionName: string,
    receiveMode: "peekLock"
  ): Receiver<ReceivedMessageWithLock>;
  /**
   * Creates a receiver for an Azure Service Bus subscription.
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   */
  createReceiver(
    topicName: string,
    subscriptionName: string,
    receiveMode: "receiveAndDelete"
  ): Receiver<ReceivedMessage>;
  createReceiver(
    queueOrTopicName1: string,
    receiveModeOrSubscriptionName2: "peekLock" | "receiveAndDelete" | string,
    receiveMode3?: "peekLock" | "receiveAndDelete"
  ): Receiver<ReceivedMessageWithLock> | Receiver<ReceivedMessage> {
    // NOTE: we don't currently have any options for this kind of receiver but
    // when we do make sure you pass them in and extract them.
    const { entityPath, receiveMode } = extractReceiverArguments(
      this._connectionContext.config.entityPath,
      queueOrTopicName1,
      receiveModeOrSubscriptionName2,
      receiveMode3
    );

    const clientEntityContext = ClientEntityContext.create(
      entityPath,
      this._connectionContext,
      `${entityPath}/${generate_uuid()}`
    );

    if (receiveMode === "peekLock") {
      return new ReceiverImpl<ReceivedMessageWithLock>(
        clientEntityContext,
        receiveMode,
        this._clientOptions.retryOptions
      );
    } else {
      return new ReceiverImpl<ReceivedMessage>(
        clientEntityContext,
        receiveMode,
        this._clientOptions.retryOptions
      );
    }
  }

  /**
   * Creates a receiver for an Azure Service Bus queue.
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the receiver itself.
   */
  createSessionReceiver(
    queueName: string,
    receiveMode: "peekLock",
    options?: CreateSessionReceiverOptions
  ): Promise<SessionReceiver<ReceivedMessageWithLock>>;
  /**
   * Creates a receiver for an Azure Service Bus queue.
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the receiver itself.
   */
  createSessionReceiver(
    queueName: string,
    receiveMode: "receiveAndDelete",
    options?: CreateSessionReceiverOptions
  ): Promise<SessionReceiver<ReceivedMessage>>;
  /**
   * Creates a receiver for an Azure Service Bus subscription.
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the receiver itself.
   */
  createSessionReceiver(
    topicName: string,
    subscriptionName: string,
    receiveMode: "peekLock",
    options?: CreateSessionReceiverOptions
  ): Promise<SessionReceiver<ReceivedMessageWithLock>>;
  /**
   * Creates a receiver for an Azure Service Bus subscription.
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the receiver itself.
   */
  createSessionReceiver(
    topicName: string,
    subscriptionName: string,
    receiveMode: "receiveAndDelete",
    options?: CreateSessionReceiverOptions
  ): Promise<SessionReceiver<ReceivedMessage>>;
  async createSessionReceiver(
    queueOrTopicName1: string,
    receiveModeOrSubscriptionName2: "peekLock" | "receiveAndDelete" | string,
    receiveModeOrOptions3?: "peekLock" | "receiveAndDelete" | CreateSessionReceiverOptions,
    options4?: CreateSessionReceiverOptions
  ): Promise<SessionReceiver<ReceivedMessage> | SessionReceiver<ReceivedMessageWithLock>> {
    const { entityPath, receiveMode, options } = extractReceiverArguments(
      this._connectionContext.config.entityPath,
      queueOrTopicName1,
      receiveModeOrSubscriptionName2,
      receiveModeOrOptions3,
      options4
    );

    const clientEntityContext = ClientEntityContext.create(
      entityPath,
      this._connectionContext,
      `${entityPath}/${generate_uuid()}`
    );

    return SessionReceiverImpl.createInitializedSessionReceiver(
      clientEntityContext,
      receiveMode,
      {
        sessionId: options?.sessionId,
        autoRenewLockDurationInMs: options?.autoRenewLockDurationInMs
      },
      this._clientOptions.retryOptions
    );
  }

  /**
   * Creates a Sender which can be used to send messages, schedule messages to be sent at a later time
   * and cancel such scheduled messages.
   */
  createSender(queueOrTopicName: string): Sender {
    validateEntityNamesMatch(this._connectionContext.config.entityPath, queueOrTopicName, "sender");

    const clientEntityContext = ClientEntityContext.create(
      queueOrTopicName,
      this._connectionContext,
      `${queueOrTopicName}/${generate_uuid()}`
    );
    return new SenderImpl(clientEntityContext, this._clientOptions.retryOptions);
  }

  /**
   * Gets a SubscriptionRuleManager, which allows you to manage Service Bus subscription rules.
   * More information about subscription rules can be found here: https://docs.microsoft.com/en-us/azure/service-bus-messaging/topic-filters
   * @param topic The topic for the subscription.
   * @param subscription The subscription.
   */
  getSubscriptionRuleManager(topic: string, subscription: string): SubscriptionRuleManager {
    const entityPath = `${topic}/Subscriptions/${subscription}`;
    const clientEntityContext = ClientEntityContext.create(
      entityPath,
      this._connectionContext,
      `${entityPath}/${generate_uuid()}`
    );

    return new SubscriptionRuleManagerImpl(clientEntityContext, this._clientOptions.retryOptions);
  }

  /**
   * Creates a receiver for an Azure Service Bus queue's dead letter queue.
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   */
  createDeadLetterReceiver(
    queueName: string,
    receiveMode: "peekLock"
  ): Receiver<ReceivedMessageWithLock>;
  /**
   * Creates a receiver for an Azure Service Bus queue's dead letter queue.
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   */
  createDeadLetterReceiver(
    queueName: string,
    receiveMode: "receiveAndDelete"
  ): Receiver<ReceivedMessage>;
  /**
   * Creates a receiver for an Azure Service Bus subscription's dead letter queue.
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   */
  createDeadLetterReceiver(
    topicName: string,
    subscriptionName: string,
    receiveMode: "peekLock"
  ): Receiver<ReceivedMessageWithLock>;
  /**
   * Creates a receiver for an Azure Service Bus subscription's dead letter queue.
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   */
  createDeadLetterReceiver(
    topicName: string,
    subscriptionName: string,
    receiveMode: "receiveAndDelete"
  ): Receiver<ReceivedMessage>;
  createDeadLetterReceiver(
    queueOrTopicName1: string,
    receiveModeOrSubscriptionName2: "peekLock" | "receiveAndDelete" | string,
    receiveMode3?: "peekLock" | "receiveAndDelete"
  ): Receiver<ReceivedMessageWithLock> | Receiver<ReceivedMessage> {
    // NOTE: we don't currently have any options for this kind of receiver but
    // when we do make sure you pass them in and extract them.
    const { entityPath, receiveMode } = extractReceiverArguments(
      this._connectionContext.config.entityPath,
      queueOrTopicName1,
      receiveModeOrSubscriptionName2,
      receiveMode3
    );

    const deadLetterEntityPath = `${entityPath}/$DeadLetterQueue`;

    if (receiveMode === "peekLock") {
      return this.createReceiver(deadLetterEntityPath, receiveMode);
    } else {
      return this.createReceiver(deadLetterEntityPath, receiveMode);
    }
  }

  /**
   * Closes the underlying AMQP connection.
   * NOTE: this will also disconnect any Receiver or Sender instances created from this
   * instance.
   */
  close(): Promise<void> {
    return ConnectionContext.close(this._connectionContext);
  }
}

/**
 * @internal
 * @ignore
 * @param {*} mode
 * @returns {(mode is "peekLock" | "receiveAndDelete")}
 */
function isReceiveMode(mode: any): mode is "peekLock" | "receiveAndDelete" {
  return mode && typeof mode === "string" && (mode === "peekLock" || mode === "receiveAndDelete");
}

/**
 * Helper to validate and extract the common arguments from both the get*Receiver() overloads that
 * have this pattern:
 *
 * queue, lockmode, options
 * topic, subscription, lockmode, options
 *
 * @internal
 * @ignore
 */
export function extractReceiverArguments<OptionsT>(
  connectionStringEntityName: string | undefined,
  queueOrTopicName1: string,
  receiveModeOrSubscriptionName2: "peekLock" | "receiveAndDelete" | string,
  receiveModeOrOptions3: "peekLock" | "receiveAndDelete" | OptionsT,
  definitelyOptions4?: OptionsT
): {
  entityPath: string;
  receiveMode: "peekLock" | "receiveAndDelete";
  options?: OptionsT;
} {
  if (isReceiveMode(receiveModeOrOptions3)) {
    const topic = queueOrTopicName1;
    const subscription = receiveModeOrSubscriptionName2;

    validateEntityNamesMatch(connectionStringEntityName, topic, "receiver-topic");

    return {
      entityPath: `${topic}/Subscriptions/${subscription}`,
      receiveMode: receiveModeOrOptions3,
      options: definitelyOptions4
    };
  } else if (isReceiveMode(receiveModeOrSubscriptionName2)) {
    validateEntityNamesMatch(connectionStringEntityName, queueOrTopicName1, "receiver-queue");

    return {
      entityPath: queueOrTopicName1,
      receiveMode: receiveModeOrSubscriptionName2,
      options: receiveModeOrOptions3
    };
  } else {
    throw new TypeError("Invalid receiveMode provided");
  }
}

/**
 * @internal
 * @ignore
 */
export function validateEntityNamesMatch(
  connectionStringEntityName: string | undefined,
  queueOrTopicName: string,
  senderOrReceiverType: "receiver-topic" | "receiver-queue" | "sender"
) {
  if (!connectionStringEntityName) {
    return;
  }

  if (queueOrTopicName !== connectionStringEntityName) {
    let entityType;
    let senderOrReceiver;

    switch (senderOrReceiverType) {
      case "receiver-queue":
        entityType = "queue";
        senderOrReceiver = "Receiver";
        break;
      case "receiver-topic":
        entityType = "topic";
        senderOrReceiver = "Receiver";
        break;
      case "sender":
        entityType = "queue/topic";
        senderOrReceiver = "Sender";
        break;
    }

    throw new Error(
      `The connection string for this ServiceBusClient had an EntityPath of '${connectionStringEntityName}' which doesn't match the name of the ${entityType} for this ${senderOrReceiver} ('${queueOrTopicName}')`
    );
  }
}
