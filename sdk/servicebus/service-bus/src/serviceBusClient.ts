// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { generate_uuid } from "rhea-promise";
import { TokenCredential, isTokenCredential } from "@azure/core-amqp";
import {
  ServiceBusClientOptions,
  createConnectionContextForConnectionString,
  createConnectionContextForTokenCredential
} from "./constructorHelpers";
import { ConnectionContext } from "./connectionContext";
import { ClientEntityContext } from "./clientEntityContext";
import { Sender, SenderImpl } from "./sender";
import { CreateSessionReceiverOptions } from "./models";
import { Receiver, ReceiverImpl } from "./receivers/receiver";
import { SessionReceiver, SessionReceiverImpl } from "./receivers/sessionReceiver";
import { ReceivedMessage, ReceivedMessageWithLock } from "./serviceBusMessage";

/**
 * A client that can create Sender instances for sending messages to queues and
 * topics as well as Receiver instances to receive messages from queues and subscriptions.
 */
export class ServiceBusClient {
  private _connectionContext: ConnectionContext;
  private _clientOptions: ServiceBusClientOptions;
  /**
   * The fully qualified namespace of the Service Bus instance for which this client is created.
   * This is likely to be similar to <yournamespace>.servicebus.windows.net.
   *
   * @type {string}
   * @memberof ServiceBusClient
   */
  public fullyQualifiedNamespace: string;
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
   * If you're using an own implementation of the `TokenCredential` interface against AAD, then set the "scopes" for service-bus
   * to be `["https://servicebus.azure.net//user_impersonation"]` to get the appropriate token.
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
    this.fullyQualifiedNamespace = this._connectionContext.config.host;
    this._clientOptions.retryOptions = this._clientOptions.retryOptions || {};

    const timeoutInMs = this._clientOptions.retryOptions.timeoutInMs;
    if (
      timeoutInMs != undefined &&
      (typeof timeoutInMs !== "number" || !isFinite(timeoutInMs) || timeoutInMs <= 0)
    ) {
      throw new Error(`${timeoutInMs} is an invalid value for retryOptions.timeoutInMs`);
    }
  }

  /**
   * Creates a receiver for an Azure Service Bus queue in peekLock mode.
   *
   * In peekLock mode, the receiver has a lock on the message for the duration specified on the
   * queue.
   *
   * Messages that are not settled within the lock duration will be redelivered as many times as
   * the max delivery count set on the queue, after which they get sent to a separate dead letter
   * queue.
   *
   * You can settle a message by calling complete(), abandon(), defer() or deadletter() methods on
   * the message.
   *
   * More information about how peekLock and message settlement works here:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode, defaulted to peekLock.
   */
  createReceiver(queueName: string, receiveMode: "peekLock"): Receiver<ReceivedMessageWithLock>;
  /**
   * Creates a receiver for an Azure Service Bus queue in receiveAndDelete mode.
   *
   * In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode, defaulted to receiveAndDelete.
   */
  createReceiver(queueName: string, receiveMode: "receiveAndDelete"): Receiver<ReceivedMessage>;
  /**
   * Creates a receiver for an Azure Service Bus subscription in peekLock mode.
   *
   * In peekLock mode, the receiver has a lock on the message for the duration specified on the
   * subscription.
   *
   * Messages that are not settled within the lock duration will be redelivered as many times as
   * the max delivery count set on the subscription, after which they get sent to a separate dead letter
   * queue.
   *
   * You can settle a message by calling complete(), abandon(), defer() or deadletter() methods on
   * the message.
   *
   * More information about how peekLock and message settlement works here:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode, defaulted to peekLock.
   */
  createReceiver(
    topicName: string,
    subscriptionName: string,
    receiveMode: "peekLock"
  ): Receiver<ReceivedMessageWithLock>;
  /**
   * Creates a receiver for an Azure Service Bus subscription in receiveAndDelete mode.
   *
   * In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode, defaulted to receiveAndDelete.
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
   * Creates a receiver for a session enabled Azure Service Bus queue in peekLock mode.
   *
   * In peekLock mode, the receiver has a lock on the session for the duration specified on the
   * queue.
   *
   * Messages that are not settled within the lock duration will be redelivered as many times as
   * the max delivery count set on the queue, after which they get sent to a separate dead letter
   * queue.
   *
   * You can settle a message by calling complete(), abandon(), defer() or deadletter() methods on
   * the message.
   *
   * More information about how peekLock and message settlement works here:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode, defaulted to peekLock.
   * @param options Options for the receiver itself.
   */
  createSessionReceiver(
    queueName: string,
    receiveMode: "peekLock",
    options?: CreateSessionReceiverOptions
  ): Promise<SessionReceiver<ReceivedMessageWithLock>>;
  /**
   * Creates a receiver for a session enabled Azure Service Bus queue in receiveAndDelete mode.
   *
   * In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode, defaulted to receiveAndDelete.
   * @param options Options for the receiver itself.
   */
  createSessionReceiver(
    queueName: string,
    receiveMode: "receiveAndDelete",
    options?: CreateSessionReceiverOptions
  ): Promise<SessionReceiver<ReceivedMessage>>;
  /**
   * Creates a receiver for a session enabled Azure Service Bus subscription in peekLock mode.
   *
   * In peekLock mode, the receiver has a lock on the session for the duration specified on the
   * subscription.
   *
   * Messages that are not settled within the lock duration will be redelivered as many times as
   * the max delivery count set on the subscription, after which they get sent to a separate dead letter
   * queue.
   *
   * You can settle a message by calling complete(), abandon(), defer() or deadletter() methods on
   * the message.
   *
   * More information about how peekLock and message settlement works here:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode, defaulted to peekLock.
   * @param options Options for the receiver itself.
   */
  createSessionReceiver(
    topicName: string,
    subscriptionName: string,
    receiveMode: "peekLock",
    options?: CreateSessionReceiverOptions
  ): Promise<SessionReceiver<ReceivedMessageWithLock>>;
  /**
   * Creates a receiver for a session enabled Azure Service Bus subscription in receiveAndDelete mode.
   *
   * In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode, defaulted to receiveAndDelete.
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
   * Creates a Sender which can be used to send messages, schedule messages to be
   * sent at a later time and cancel such scheduled messages.
   * @param queueOrTopicName The name of a queue or topic to send messages to.
   */
  createSender(queueOrTopicName: string): Sender {
    const clientEntityContext = ClientEntityContext.create(
      queueOrTopicName,
      this._connectionContext,
      `${queueOrTopicName}/${generate_uuid()}`
    );
    return new SenderImpl(clientEntityContext, this._clientOptions.retryOptions);
  }

  /**
   * Creates a receiver for an Azure Service Bus queue's dead letter queue in peekLock mode.
   *
   * In peekLock mode, the receiver has a lock on the message for the duration specified on the
   * queue.
   *
   * In peekLock mode, the receiver has a lock on the message for the duration specified on the
   * queue. Messages that are not settled within the lock duration will be redelivered.
   *
   * You can settle a message by calling complete(), abandon() or defer() methods on
   * the message.
   *
   * See here for more information about dead letter queues:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues
   *
   * More information about how peekLock and message settlement works here:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode, defaulted to peekLock.
   */
  createDeadLetterReceiver(
    queueName: string,
    receiveMode: "peekLock"
  ): Receiver<ReceivedMessageWithLock>;
  /**
   * Creates a receiver for an Azure Service Bus queue's dead letter queue in receiveAndDelete mode.
   *
   * In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * See here for more information about dead letter queues:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode, defaulted to receiveAndDelete.
   */
  createDeadLetterReceiver(
    queueName: string,
    receiveMode: "receiveAndDelete"
  ): Receiver<ReceivedMessage>;
  /**
   * Creates a receiver for an Azure Service Bus subscription's dead letter queue in peekLock mode.
   *
   * In peekLock mode, the receiver has a lock on the message for the duration specified on the
   * subscription. Messages that are not settled within the lock duration will be redelivered.
   *
   * You can settle a message by calling complete(), abandon() or defer() methods on
   * the message.
   *
   * See here for more information about dead letter queues:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues
   *
   * More information about how peekLock and message settlement works here:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode, defaulted to peekLock.
   */
  createDeadLetterReceiver(
    topicName: string,
    subscriptionName: string,
    receiveMode: "peekLock"
  ): Receiver<ReceivedMessageWithLock>;
  /**
   * Creates a receiver for an Azure Service Bus subscription's dead letter queue in receiveAndDelete mode.
   *
   * In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * See here for more information about dead letter queues:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode, defaulted to receiveAndDelete.
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
 * Helper to validate and extract the common arguments from both the create*Receiver() overloads that
 * have this pattern:
 *
 * queue, lockmode, options
 * topic, subscription, lockmode, options
 *
 * @internal
 * @ignore
 */
export function extractReceiverArguments<OptionsT>(
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

    return {
      entityPath: `${topic}/Subscriptions/${subscription}`,
      receiveMode: receiveModeOrOptions3,
      options: definitelyOptions4
    };
  } else if (isReceiveMode(receiveModeOrSubscriptionName2)) {
    return {
      entityPath: queueOrTopicName1,
      receiveMode: receiveModeOrSubscriptionName2,
      options: receiveModeOrOptions3
    };
  } else {
    throw new TypeError("Invalid receiveMode provided");
  }
}
