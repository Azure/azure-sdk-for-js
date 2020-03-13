// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { generate_uuid } from "rhea-promise";
import { isTokenCredential, TokenCredential } from "@azure/core-auth";
import {
  ServiceBusClientOptions,
  createConnectionContextForTokenCredential,
  createConnectionContextForConnectionString
} from "./constructorHelpers";
import { ConnectionContext } from "./connectionContext";
import { ClientEntityContext } from "./clientEntityContext";
import { ClientType } from "./client";
import { Sender } from "./sender";
import { GetSessionReceiverOptions, ContextWithSettlement } from "./models";
import { Receiver, ReceiverImpl, SubscriptionRuleManagement } from "./receivers/receiver";
import { SessionReceiver, SessionReceiverImpl } from "./receivers/sessionReceiver";

export class ServiceBusClient {
  private _connectionContext: ConnectionContext;

  /**
   *
   * @param connectionString A connection string for Azure Service Bus.
   * NOTE: this connection string can contain an EntityPath, which is ignored.
   * @param options Options for the service bus client.
   */
  constructor(connectionString: string, options?: ServiceBusClientOptions);
  /**
   *
   * @param host The hostname of your Azure Service Bus.
   * @param tokenCredential A valid TokenCredential for Service Bus or a
   * Service Bus entity.
   * @param options Options for the service bus client.
   */
  constructor(
    hostName: string,
    tokenCredential: TokenCredential,
    options?: ServiceBusClientOptions
  );
  constructor(
    connectionStringOrHostName1: string,
    tokenCredentialOrServiceBusOptions2?: TokenCredential | ServiceBusClientOptions,
    options3?: ServiceBusClientOptions
  ) {
    if (isTokenCredential(tokenCredentialOrServiceBusOptions2)) {
      const hostName: string = connectionStringOrHostName1;
      const tokenCredential: TokenCredential = tokenCredentialOrServiceBusOptions2;
      const options: ServiceBusClientOptions | undefined = options3;

      this._connectionContext = createConnectionContextForTokenCredential(
        tokenCredential,
        hostName,
        options
      );
    } else {
      const connectionString: string = connectionStringOrHostName1;
      const options: ServiceBusClientOptions | undefined = tokenCredentialOrServiceBusOptions2;

      this._connectionContext = createConnectionContextForConnectionString(
        connectionString,
        options
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
  getReceiver(queueName: string, receiveMode: "peekLock"): Receiver<ContextWithSettlement>;
  /**
   * Creates a receiver for an Azure Service Bus queue.
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the receiver itself.
   */
  getReceiver(queueName: string, receiveMode: "receiveAndDelete"): Receiver<{}>;
  /**
   * Creates a receiver for an Azure Service Bus subscription.
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the receiver itself.
   */
  getReceiver(
    topicName: string,
    subscriptionName: string,
    receiveMode: "peekLock"
  ): Receiver<ContextWithSettlement> & SubscriptionRuleManagement;
  /**
   * Creates a receiver for an Azure Service Bus subscription.
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the receiver itself.
   */
  getReceiver(
    topicName: string,
    subscriptionName: string,
    receiveMode: "receiveAndDelete"
  ): Receiver<{}> & SubscriptionRuleManagement;
  getReceiver(
    queueOrTopicName1: string,
    receiveModeOrSubscriptionName2: "peekLock" | "receiveAndDelete" | string,
    receiveMode3?: "peekLock" | "receiveAndDelete"
  ):
    | Receiver<ContextWithSettlement>
    | Receiver<{}>
    | (Receiver<ContextWithSettlement> & SubscriptionRuleManagement)
    | (Receiver<{}> & SubscriptionRuleManagement) {
    let entityPath: string;
    let receiveMode: "peekLock" | "receiveAndDelete";
    let entityType: "queue" | "subscription";

    if (isReceiveMode(receiveMode3)) {
      entityType = "subscription";
      const topic = queueOrTopicName1;
      const subscription = receiveModeOrSubscriptionName2;
      entityPath = `${topic}/Subscriptions/${subscription}`;
      receiveMode = receiveMode3;
    } else if (isReceiveMode(receiveModeOrSubscriptionName2)) {
      entityType = "queue";
      entityPath = queueOrTopicName1;
      receiveMode = receiveModeOrSubscriptionName2;
    } else {
      throw new TypeError("Invalid receiveMode provided");
    }

    const clientEntityContext = ClientEntityContext.create(
      entityPath,
      ClientType.ServiceBusReceiverClient,
      this._connectionContext,
      `${entityPath}/${generate_uuid()}`
    );

    if (receiveMode === "peekLock") {
      return new ReceiverImpl<ContextWithSettlement>(clientEntityContext, receiveMode, entityType);
    } else {
      return new ReceiverImpl<{}>(clientEntityContext, receiveMode, entityType);
    }
  }

  /**
   * Creates a receiver for an Azure Service Bus queue.
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the receiver itself.
   */
  getSessionReceiver(
    queueName: string,
    receiveMode: "peekLock",
    options?: GetSessionReceiverOptions
  ): SessionReceiver<ContextWithSettlement>;
  /**
   * Creates a receiver for an Azure Service Bus queue.
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the receiver itself.
   */
  getSessionReceiver(
    queueName: string,
    receiveMode: "receiveAndDelete",
    options?: GetSessionReceiverOptions
  ): SessionReceiver<{}>;
  /**
   * Creates a receiver for an Azure Service Bus subscription.
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the receiver itself.
   */
  getSessionReceiver(
    topicName: string,
    subscriptionName: string,
    receiveMode: "peekLock",
    options?: GetSessionReceiverOptions
  ): SessionReceiver<ContextWithSettlement> & SubscriptionRuleManagement;
  /**
   * Creates a receiver for an Azure Service Bus subscription.
   *
   * @param topicName Name of the topic for the subscription we want to receive from.
   * @param subscriptionName Name of the subscription (under the `topic`) that we want to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the receiver itself.
   */
  getSessionReceiver(
    topicName: string,
    subscriptionName: string,
    receiveMode: "receiveAndDelete",
    options?: GetSessionReceiverOptions
  ): SessionReceiver<"receiveAndDelete"> & SubscriptionRuleManagement;
  getSessionReceiver(
    queueOrTopicName1: string,
    receiveModeOrSubscriptionName2: "peekLock" | "receiveAndDelete" | string,
    receiveModeOrOptions3?: "peekLock" | "receiveAndDelete" | GetSessionReceiverOptions,
    options4?: GetSessionReceiverOptions
  ):
    | SessionReceiver<ContextWithSettlement>
    | SessionReceiver<{}>
    | (SessionReceiver<{}> & SubscriptionRuleManagement)
    | (SessionReceiver<ContextWithSettlement> & SubscriptionRuleManagement) {
    let entityPath: string;
    let receiveMode: "peekLock" | "receiveAndDelete";
    let entityType: "queue" | "subscription";
    let options: GetSessionReceiverOptions | undefined;

    if (isReceiveMode(receiveModeOrOptions3)) {
      entityType = "subscription";
      const topic = queueOrTopicName1;
      const subscription = receiveModeOrSubscriptionName2;
      entityPath = `${topic}/Subscriptions/${subscription}`;
      receiveMode = receiveModeOrOptions3;
      options = options4;
    } else if (isReceiveMode(receiveModeOrSubscriptionName2)) {
      entityType = "queue";
      entityPath = queueOrTopicName1;
      receiveMode = receiveModeOrSubscriptionName2;
      options = receiveModeOrOptions3 as GetSessionReceiverOptions | undefined;
    } else {
      throw new TypeError("Invalid receiveMode provided");
    }

    const clientEntityContext = ClientEntityContext.create(
      entityPath,
      ClientType.ServiceBusReceiverClient,
      this._connectionContext,
      `${entityPath}/${generate_uuid()}`
    );

    // TODO: .NET actually tries to open the session here so we'd need to be async for that.
    return new SessionReceiverImpl(clientEntityContext, receiveMode, entityType, {
      sessionId: options?.sessionId,
      maxSessionAutoRenewLockDurationInSeconds: options?.maxSessionAutoRenewLockDurationInSeconds
    });
  }

  /**
   * Creates a Sender which can be used to send messages, schedule messages to be sent at a later time
   * and cancel such scheduled messages.
   */
  getSender(queueOrTopicName: string): Sender {
    const clientEntityContext = ClientEntityContext.create(
      queueOrTopicName,
      ClientType.ServiceBusReceiverClient,
      this._connectionContext,
      `${queueOrTopicName}/${generate_uuid()}`
    );

    return new Sender(clientEntityContext);
  }

  close(): Promise<void> {
    return ConnectionContext.close(this._connectionContext);
  }
}

function isReceiveMode(mode: any): mode is "peekLock" | "receiveAndDelete" {
  return mode && typeof mode === "string" && (mode === "peekLock" || mode === "receiveAndDelete");
}
