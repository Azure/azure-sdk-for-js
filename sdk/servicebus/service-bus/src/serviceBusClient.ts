// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  NonSessionReceiver,
  SubscriptionRuleManagement,
  SessionReceiver,
  ReceiverClientImplementation
} from "./serviceBusReceiverClient";
import { generate_uuid } from "rhea-promise";
import { ServiceBusClientOptions, TokenCredential } from "..";
import { isTokenCredential } from "@azure/core-auth";
import {
  createConnectionContextForTokenCredential,
  createConnectionContextForConnectionString
} from "../old/serviceBusClient";
import { ConnectionContext } from "../connectionContext";
import { ClientType } from "../client";
import { ClientEntityContext } from "../clientEntityContext";
import { isReceiveMode } from "./constructorHelpers";
import { Sender } from "../sender";

export class ServiceBusClient {
  private _connectionContext: ConnectionContext;

  /**
   *
   * @param connectionString A connection string for Azure Service Bus.
   * NOTE: this connection string can contain an EntityPath, which is ignored.
   */
  constructor(connectionString: string);
  /**
   *
   * @param host The hostname of your Azure Service Bus.
   * @param tokenCredential A valid TokenCredential for Service Bus or a
   * Service Bus entity.
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
   * Creates a client for an Azure Service Bus queue.
   *
   * @param queueName The name of the queue to receive from.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  createReceiver(queueName: string, receiveMode: "peekLock"): NonSessionReceiver<"peekLock">;
  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param queueAuth Data needed to connect to a queue.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  createReceiver(
    queueName: string,
    receiveMode: "receiveAndDelete"
  ): NonSessionReceiver<"receiveAndDelete">;
  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param subscriptionAuth Data needed to connect to a subscription.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  createReceiver(
    topicName: string,
    subscriptionName: string,
    receiveMode: "peekLock"
  ): NonSessionReceiver<"peekLock"> & SubscriptionRuleManagement;
  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param subscriptionAuth Data needed to connect to a subscription.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  createReceiver(
    topicName: string,
    subscriptionName: string,
    receiveMode: "receiveAndDelete"
  ): NonSessionReceiver<"receiveAndDelete"> & SubscriptionRuleManagement;
  createReceiver(
    queueOrTopicName1: string,
    receiveModeOrSubscriptionName2: "peekLock" | "receiveAndDelete" | string,
    receiveMode3?: "peekLock" | "receiveAndDelete"
  ):
    | NonSessionReceiver<"peekLock">
    | NonSessionReceiver<"receiveAndDelete">
    | (NonSessionReceiver<"peekLock"> & SubscriptionRuleManagement)
    | (NonSessionReceiver<"receiveAndDelete"> & SubscriptionRuleManagement) {
    let entityPath: string;
    let receiveMode: "peekLock" | "receiveAndDelete";

    if (isReceiveMode(receiveMode3)) {
      const topic = queueOrTopicName1;
      const subscription = receiveModeOrSubscriptionName2;
      entityPath = `${topic}/Subscriptions/${subscription}`;

      receiveMode = receiveMode3;
    } else if (isReceiveMode(receiveModeOrSubscriptionName2)) {
      entityPath = queueOrTopicName1;
      receiveMode = receiveModeOrSubscriptionName2;
    } else {
      throw new TypeError("Invalid parameters for creating a receiver");
    }

    const clientEntityContext = ClientEntityContext.create(
      entityPath,
      ClientType.ServiceBusReceiverClient,
      this._connectionContext,
      `${entityPath}/${generate_uuid()}`
    );

    return new ReceiverClientImplementation(receiveMode, clientEntityContext, false);
  }

  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param queueAuth Data needed to connect to a queue.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  createSessionReceiver(
    queueName: string,
    receiveMode: "peekLock",
    sessionId: string | ""
  ): SessionReceiver<"peekLock">;
  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param queueAuth Data needed to connect to a queue.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  createSessionReceiver(
    queueName: string,
    receiveMode: "receiveAndDelete",
    sessionId: string | ""
  ): SessionReceiver<"receiveAndDelete">;
  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param subscriptionAuth Data needed to connect to a subscription.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  createSessionReceiver(
    topicName: string,
    subscriptionName: string,
    receiveMode: "peekLock",
    sessionId: string | ""
  ): SessionReceiver<"peekLock"> & SubscriptionRuleManagement;
  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param subscriptionAuth Data needed to connect to a subscription.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  createSessionReceiver(
    topicName: string,
    subscriptionName: string,
    receiveMode: "receiveAndDelete",
    sessionId: string | ""
  ): SessionReceiver<"receiveAndDelete"> & SubscriptionRuleManagement;
  createSessionReceiver(
    queueOrTopicName1: string,
    receiveModeOrSubscriptionName2: "peekLock" | "receiveAndDelete" | string,
    receiveModeOrSessionId3?: "peekLock" | "receiveAndDelete" | string | "",
    sessionIdOrOptions4?: string | "" | ServiceBusClientOptions,
    options5?: ServiceBusClientOptions
  ):
    | SessionReceiver<"peekLock">
    | SessionReceiver<"receiveAndDelete">
    | (SessionReceiver<"receiveAndDelete"> & SubscriptionRuleManagement)
    | (SessionReceiver<"peekLock"> & SubscriptionRuleManagement) {
    let entityPath: string;
    let receiveMode: "peekLock" | "receiveAndDelete";
    let sessionId: string;

    if (isReceiveMode(receiveModeOrSessionId3) && typeof sessionIdOrOptions4 === "string") {
      const topic = queueOrTopicName1;
      const subscription = receiveModeOrSubscriptionName2;
      entityPath = `${topic}/Subscriptions/${subscription}`;
      receiveMode = receiveModeOrSessionId3;
      sessionId = sessionIdOrOptions4;
    } else if (
      isReceiveMode(receiveModeOrSubscriptionName2) &&
      typeof receiveModeOrSessionId3 === "string"
    ) {
      entityPath = queueOrTopicName1;
      receiveMode = receiveModeOrSubscriptionName2;
      sessionId = receiveModeOrSessionId3;
    } else {
      throw new TypeError("Invalid parameters for creating a receiver");
    }

    const clientEntityContext = ClientEntityContext.create(
      entityPath,
      ClientType.ServiceBusReceiverClient,
      this._connectionContext,
      `${entityPath}/${generate_uuid()}`
    );

    // TODO: .NET actually tries to open the session here so we'd need to be async for that.
    return new ReceiverClientImplementation(
      receiveMode,
      clientEntityContext,
      sessionId === "" ? undefined : sessionId
    );
  }

  /**
   * Creates a Sender which can be used to send messages, schedule messages to be sent at a later time
   * and cancel such scheduled messages.
   */
  createSender(queueOrTopicName: string): Sender {
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
