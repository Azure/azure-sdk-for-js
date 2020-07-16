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
import { BaseCreateReceiverOptions, CreateSessionReceiverOptions } from "./models";
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
   * Creates a receiver for an Azure Service Bus queue.
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
   * In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode, defaulted to receiveAndDelete.
   */
  createReceiver<ModeT extends BaseCreateReceiverOptions>(
    queueName: string,
    options?: ModeT
  ): ModeT extends { receiveMode: "receiveAndDelete" }
    ? Receiver<ReceivedMessage>
    : Receiver<ReceivedMessageWithLock>;
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
   * In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode, defaulted to peekLock.
   */
  createReceiver<ModeT extends BaseCreateReceiverOptions>(
    topicName: string,
    subscriptionName: string,
    options?: ModeT
  ): ModeT extends {
    receiveMode: "receiveAndDelete";
  }
    ? Receiver<ReceivedMessage>
    : Receiver<ReceivedMessageWithLock>;
  createReceiver<
    ModeT extends BaseCreateReceiverOptions = {
      receiveMode: "peekLock";
    }
  >(
    queueOrTopicName1: string,
    optionsOrSubscriptionName2?: ModeT | string,
    options3?: ModeT
  ): ModeT extends {
    receiveMode: "receiveAndDelete";
  }
    ? Receiver<ReceivedMessage>
    : Receiver<ReceivedMessageWithLock> {
    // NOTE: we don't currently have any options for this kind of receiver but
    // when we do make sure you pass them in and extract them.
    const { entityPath, receiveMode } = extractReceiverArguments(
      queueOrTopicName1,
      optionsOrSubscriptionName2,
      options3
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
      ) as any;
    } else {
      return new ReceiverImpl<ReceivedMessage>(
        clientEntityContext,
        receiveMode,
        this._clientOptions.retryOptions
      ) as any;
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
   * In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode, defaulted to peekLock.
   * @param options Options for the receiver itself.
   */
  createSessionReceiver<ModeT extends BaseCreateReceiverOptions>(
    queueName: string,
    options?: CreateSessionReceiverOptions & ModeT
  ): ModeT extends { receiveMode: "receiveAndDelete" }
    ? Promise<SessionReceiver<ReceivedMessage>>
    : Promise<SessionReceiver<ReceivedMessageWithLock>>;
  /**
   * Creates a receiver for a session enabled Azure Service Bus subscription in peekLock mode.
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
   * In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode, defaulted to peekLock.
   * @param options Options for the receiver itself.
   */
  createSessionReceiver<ModeT extends BaseCreateReceiverOptions>(
    topicName: string,
    subscriptionName: string,
    options?: CreateSessionReceiverOptions & ModeT
  ): ModeT extends { receiveMode: "receiveAndDelete" }
    ? Promise<SessionReceiver<ReceivedMessage>>
    : Promise<SessionReceiver<ReceivedMessageWithLock>>;
  async createSessionReceiver<
    ModeT extends BaseCreateReceiverOptions = { receiveMode: "peekLock" }
  >(
    queueOrTopicName1: string,
    optionsOrSubscriptionName2?: (CreateSessionReceiverOptions & ModeT) | string,
    options3?: CreateSessionReceiverOptions & ModeT
  ): Promise<
    ModeT extends { receiveMode: "receiveAndDelete" }
      ? SessionReceiver<ReceivedMessage>
      : SessionReceiver<ReceivedMessageWithLock>
  > {
    const { entityPath, receiveMode, options } = extractReceiverArguments(
      queueOrTopicName1,
      optionsOrSubscriptionName2,
      options3
    );

    const clientEntityContext = ClientEntityContext.create(
      entityPath,
      this._connectionContext,
      `${entityPath}/${generate_uuid()}`
    );

    return <
      Promise<
        ModeT extends { receiveMode: "receiveAndDelete" }
          ? SessionReceiver<ReceivedMessage>
          : SessionReceiver<ReceivedMessageWithLock>
      >
    >SessionReceiverImpl.createInitializedSessionReceiver(
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
   * Creates a receiver for an Azure Service Bus queue's dead letter queue.
   *
   * In peekLock mode(default), the receiver has a lock on the message for the duration specified on the
   * queue. Messages that are not settled within the lock duration will be redelivered.
   *
   * You can settle a message by calling complete(), abandon() or defer() methods on
   * the message.
   *
   * In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * See here for more information about dead letter queues:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues
   *
   * More information about how peekLock and message settlement works here:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode, defaulted to receiveAndDelete.
   */
  createDeadLetterReceiver<ModeT extends BaseCreateReceiverOptions>(
    queueName: string,
    options?: ModeT
  ): ModeT extends { receiveMode: "receiveAndDelete" }
    ? Receiver<ReceivedMessage>
    : Receiver<ReceivedMessageWithLock>;

  /**
   * Creates a receiver for an Azure Service Bus subscription's dead letter queue in receiveAndDelete mode.
   *
   * In peekLock mode(default), the receiver has a lock on the message for the duration specified on the
   * queue. Messages that are not settled within the lock duration will be redelivered.
   *
   * You can settle a message by calling complete(), abandon() or defer() methods on
   * the message.
   *
   * In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * See here for more information about dead letter queues:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues
   *
   * More information about how peekLock and message settlement works here:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode, defaulted to receiveAndDelete.
   */
  createDeadLetterReceiver<ModeT extends BaseCreateReceiverOptions>(
    topicName: string,
    subscriptionName: string,
    options?: ModeT
  ): ModeT extends { receiveMode: "receiveAndDelete" }
    ? Receiver<ReceivedMessage>
    : Receiver<ReceivedMessageWithLock>;
  createDeadLetterReceiver<ModeT extends BaseCreateReceiverOptions = { receiveMode: "peekLock" }>(
    queueOrTopicName1: string,
    optionsOrSubscriptionName2?: ModeT | string,
    options3?: ModeT
  ): ModeT extends { receiveMode: "receiveAndDelete" }
    ? Receiver<ReceivedMessage>
    : Receiver<ReceivedMessageWithLock> {
    // NOTE: we don't currently have any options for this kind of receiver but
    // when we do make sure you pass them in and extract them.
    const { entityPath, receiveMode } = extractReceiverArguments(
      queueOrTopicName1,
      optionsOrSubscriptionName2,
      options3
    );

    const deadLetterEntityPath = `${entityPath}/$DeadLetterQueue`;

    return this.createReceiver(deadLetterEntityPath, { receiveMode }) as any;
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
 * Helper to validate and extract the common arguments from both the create*Receiver() overloads that
 * have this pattern:
 *
 * queue, lockmode, options
 * topic, subscription, lockmode, options
 *
 * @internal
 * @ignore
 */
export function extractReceiverArguments<
  OptionsT extends { receiveMode?: "peekLock" | "receiveAndDelete" }
>(
  queueOrTopicName1: string,
  optionsOrSubscriptionName2: string | OptionsT | undefined,
  definitelyOptions3?: OptionsT
): {
  entityPath: string;
  receiveMode: "peekLock" | "receiveAndDelete";
  options?: Omit<OptionsT, "receiveMode">;
} {
  try {
    if (typeof optionsOrSubscriptionName2 === "string") {
      const topic = queueOrTopicName1;
      const subscription = optionsOrSubscriptionName2;

      return {
        entityPath: `${topic}/Subscriptions/${subscription}`,
        receiveMode:
          definitelyOptions3?.receiveMode === "receiveAndDelete" ? "receiveAndDelete" : "peekLock",
        options: definitelyOptions3
      };
    } else {
      return {
        entityPath: queueOrTopicName1,
        receiveMode:
          optionsOrSubscriptionName2?.receiveMode === "receiveAndDelete"
            ? "receiveAndDelete"
            : "peekLock",
        options: optionsOrSubscriptionName2
      };
    }
  } catch (error) {
    throw new TypeError("Unable to parse the arguments\n" + error);
  }
}
