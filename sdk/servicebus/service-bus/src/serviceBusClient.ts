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

  createReceiver(
    queueName: string,
    options?: { receiveMode?: "peekLock" }
  ): Receiver<ReceivedMessageWithLock>;
  createReceiver(
    queueName: string,
    options?: { receiveMode?: "receiveAndDelete" }
  ): Receiver<ReceivedMessage>;
  createReceiver(
    topicName: string,
    subscriptionName: string,
    options?: { receiveMode?: "peekLock" }
  ): Receiver<ReceivedMessageWithLock>;
  createReceiver(
    topicName: string,
    subscriptionName: string,
    options?: { receiveMode?: "receiveAndDelete" }
  ): Receiver<ReceivedMessage>;
  createReceiver(
    queueOrTopicName1: string,
    optionsOrSubscriptionName2?: BaseCreateReceiverOptions | string,
    options3?: BaseCreateReceiverOptions
  ): Receiver<ReceivedMessage> | Receiver<ReceivedMessageWithLock> {
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
      );
    } else {
      return new ReceiverImpl<ReceivedMessage>(
        clientEntityContext,
        receiveMode,
        this._clientOptions.retryOptions
      );
    }
  }

  createSessionReceiver(
    queueName: string,
    options?: CreateSessionReceiverOptions & { receiveMode?: "peekLock" }
  ): Promise<SessionReceiver<ReceivedMessageWithLock>>;
  createSessionReceiver(
    queueName: string,
    options?: CreateSessionReceiverOptions & { receiveMode?: "receiveAndDelete" }
  ): Promise<SessionReceiver<ReceivedMessage>>;
  createSessionReceiver(
    topicName: string,
    subscriptionName: string,
    options?: CreateSessionReceiverOptions & { receiveMode?: "peekLock" }
  ): Promise<SessionReceiver<ReceivedMessageWithLock>>;
  createSessionReceiver(
    topicName: string,
    subscriptionName: string,
    options?: CreateSessionReceiverOptions & { receiveMode?: "receiveAndDelete" }
  ): Promise<SessionReceiver<ReceivedMessage>>;
  async createSessionReceiver(
    queueOrTopicName1: string,
    optionsOrSubscriptionName2?:
      | (CreateSessionReceiverOptions & BaseCreateReceiverOptions)
      | string,
    options3?: CreateSessionReceiverOptions & BaseCreateReceiverOptions
  ): Promise<SessionReceiver<ReceivedMessage> | SessionReceiver<ReceivedMessageWithLock>> {
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

  createDeadLetterReceiver(
    queueName: string,
    options?: { receiveMode?: "peekLock" }
  ): Receiver<ReceivedMessageWithLock>;
  createDeadLetterReceiver(
    queueName: string,
    options?: { receiveMode?: "receiveAndDelete" }
  ): Receiver<ReceivedMessage>;
  createDeadLetterReceiver(
    topicName: string,
    subscriptionName: string,
    options?: { receiveMode?: "peekLock" }
  ): Receiver<ReceivedMessageWithLock>;
  createDeadLetterReceiver(
    topicName: string,
    subscriptionName: string,
    options?: { receiveMode?: "receiveAndDelete" }
  ): Receiver<ReceivedMessage>;
  createDeadLetterReceiver(
    queueOrTopicName1: string,
    optionsOrSubscriptionName2?: BaseCreateReceiverOptions | string,
    options3?: BaseCreateReceiverOptions
  ): Receiver<ReceivedMessage> | Receiver<ReceivedMessageWithLock> {
    // NOTE: we don't currently have any options for this kind of receiver but
    // when we do make sure you pass them in and extract them.
    const { entityPath, receiveMode } = extractReceiverArguments(
      queueOrTopicName1,
      optionsOrSubscriptionName2,
      options3
    );

    const deadLetterEntityPath = `${entityPath}/$DeadLetterQueue`;
    if (receiveMode === "receiveAndDelete") {
      return this.createReceiver(deadLetterEntityPath, { receiveMode: "receiveAndDelete" });
    } else {
      return this.createReceiver(deadLetterEntityPath, { receiveMode: "peekLock" });
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
