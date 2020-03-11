// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  GetPartitionPropertiesOptions,
  GetEventHubPropertiesOptions,
  GetPartitionIdsOptions,
  EventHubConsumerClientOptions
} from "./models/public";
import { TokenCredential } from "@azure/identity";
import {
  isTokenCredential,
  parseConnectionString,
  EventHubConnectionStringModel,
  EventHubConnectionConfig,
  SharedKeyCredential,
  ConnectionConfig
} from "@azure/core-amqp";
import { ConnectionContext, ConnectionContextOptions } from "./connectionContext";
import { throwErrorIfConnectionClosed, throwTypeErrorIfParameterMissing } from "./util/error";
import { EventHubProperties } from "./managementClient";
import { EventHubProducerOptions } from "./models/private";
import { EventHubProducer } from "./sender";
import { EventPosition } from "./eventPosition";
import { EventHubConsumerOptions } from "./impl/eventHubClient";
import { EventHubConsumer } from "./receiver";

// Should have the same public API as EventHubClient
export class EventHubClientManager {
  public static readonly defaultConsumerGroupName = "$default";
  public readonly eventHubName: string;
  public readonly fullyQualifiedNamespace: string;

  private readonly _clientOptions: ConnectionContextOptions;
  private readonly _connectionConfig: EventHubConnectionConfig;
  private readonly _credential: SharedKeyCredential | TokenCredential;
  private readonly _redirectEnabled: boolean = false;
  private readonly _coreConnectionContext: ConnectionContext;
  private readonly _hostConnectionContextMap: Map<string, ConnectionContext> = new Map();

  private readonly _connectionProvider = ({
    host,
    hostname,
    port,
    address
  }: {
    hostname: string;
    host: string;
    port: number;
    address: string;
  }): ConnectionContext => {
    if (hostname === "") {
      return this._coreConnectionContext;
    }

    const key = `${host}:${port}`;

    // Check if a connection already exists.
    let connectionContext = this._hostConnectionContextMap.get(key);
    if (connectionContext) {
      return connectionContext;
    }

    const config = EventHubConnectionConfig.createFromConnectionConfig({
      ...this._connectionConfig,
      host,
      hostname,
      port
    });
    config.getReceiverAddress = (partitionId: string, consumerGroup?: string) => {
      return address;
    };
    (config as any).name = address;
    connectionContext = ConnectionContext.create(config, this._credential, this._clientOptions);

    this._hostConnectionContextMap.set(key, connectionContext);
    return connectionContext;
  };

  constructor(connectionString: string, options?: EventHubConsumerClientOptions);
  constructor(
    connectionString: string,
    eventHubName: string,
    options?: EventHubConsumerClientOptions
  );
  constructor(
    host: string,
    eventHubName: string,
    credential: TokenCredential,
    options?: EventHubConsumerClientOptions
  );
  constructor(
    hostOrConnectionString: string,
    eventHubNameOrOptions?: string | EventHubConsumerClientOptions,
    credentialOrOptions?: TokenCredential | EventHubConsumerClientOptions,
    options?: EventHubConsumerClientOptions
  ) {
    let config: EventHubConnectionConfig;
    let credential: TokenCredential | SharedKeyCredential;

    if (!isTokenCredential(credentialOrOptions)) {
      const connectionString = hostOrConnectionString;
      const connectionStringProps = parseConnectionString<EventHubConnectionStringModel>(
        connectionString
      );
      if (!connectionStringProps.EntityPath && typeof eventHubNameOrOptions !== "string") {
        throw new TypeError(
          `Either provide "eventHubName" or the "connectionString" must contain "EntityPath=<your-event-hub-name>".`
        );
      }

      if (
        connectionStringProps.EntityPath &&
        typeof eventHubNameOrOptions === "string" &&
        connectionStringProps.EntityPath !== eventHubNameOrOptions
      ) {
        throw new TypeError(
          `The entity path "${connectionStringProps.EntityPath}" in the connectionString does not match with the provided eventHubName "${eventHubNameOrOptions}".`
        );
      }

      if (typeof eventHubNameOrOptions !== "string") {
        config = EventHubConnectionConfig.create(connectionString);
        options = eventHubNameOrOptions;
      } else {
        config = EventHubConnectionConfig.create(connectionString, eventHubNameOrOptions);
        options = credentialOrOptions;
      }

      credential = new SharedKeyCredential(config.sharedAccessKeyName, config.sharedAccessKey);
    } else {
      const eventHubName = eventHubNameOrOptions;
      let host = hostOrConnectionString;
      credential = credentialOrOptions;
      if (!eventHubName) {
        throw new TypeError(`"eventHubName" is missing.`);
      }
      if (!host.endsWith("/")) {
        host += "/";
      }
      const connectionString = `Endpoint=sb://${host};SharedAccessKeyName=defaultKeyName;SharedAccessKey=defaultKeyValue;EntityPath=${eventHubName}`;
      config = EventHubConnectionConfig.create(connectionString);
    }

    ConnectionConfig.validate(config);

    if (options?.enableRedirects) {
      this._redirectEnabled = options.enableRedirects;
    }
    this._clientOptions = options ?? {};
    this._connectionConfig = config;
    this._credential = credential;
    this.eventHubName = config.entityPath;
    this.fullyQualifiedNamespace = config.host;
    this._coreConnectionContext = ConnectionContext.create(
      this._connectionConfig,
      this._credential,
      this._clientOptions
    );
  }

  createConsumer(
    consumerGroup: string,
    partitionId: string,
    eventPosition: EventPosition,
    options: EventHubConsumerOptions = {}
  ): EventHubConsumer {
    if (!options.retryOptions) {
      options.retryOptions = this._clientOptions.retryOptions;
    }

    // Always use the core context for receiver APIs
    const connectionContext = this._coreConnectionContext;
    throwErrorIfConnectionClosed(connectionContext);
    throwTypeErrorIfParameterMissing(
      connectionContext.connectionId,
      "createConsumer",
      "consumerGroup",
      consumerGroup
    );
    throwTypeErrorIfParameterMissing(
      connectionContext.connectionId,
      "createConsumer",
      "partitionId",
      partitionId
    );
    throwTypeErrorIfParameterMissing(
      connectionContext.connectionId,
      "createConsumer",
      "eventPosition",
      eventPosition
    );
    // ensure partition id is a string
    partitionId = String(partitionId);

    const redirectSettings: EventHubConsumerOptions["redirectSettings"] = {
      enabled: this._redirectEnabled,
      connectionProvider: this._redirectEnabled ? this._connectionProvider : undefined
    };

    return new EventHubConsumer(connectionContext, consumerGroup, partitionId, eventPosition, {
      ...options,
      redirectSettings
    });
  }

  createProducer(options: EventHubProducerOptions = {}): EventHubProducer {
    if (!options.retryOptions) {
      options.retryOptions = this._clientOptions.retryOptions;
    }

    // Always use the core context for sender APIs
    const connectionContext = this._coreConnectionContext;
    throwErrorIfConnectionClosed(connectionContext);
    return new EventHubProducer(
      this.eventHubName,
      this._connectionConfig.endpoint,
      this._coreConnectionContext,
      options
    );
  }

  async getPartitionIds(options: GetPartitionIdsOptions = {}): Promise<Array<string>> {
    // Always use the core context for management APIs
    const connectionContext = this._coreConnectionContext;
    throwErrorIfConnectionClosed(connectionContext);

    const runtimeInfo = await this.getProperties(options);
    return runtimeInfo.partitionIds;
  }

  getProperties(options: GetEventHubPropertiesOptions = {}): Promise<EventHubProperties> {
    // Always use the core context for management APIs
    const connectionContext = this._coreConnectionContext;
    throwErrorIfConnectionClosed(connectionContext);

    const managementSession = connectionContext.managementSession;
    if (!managementSession) {
      throw new Error(`Unable to create a management session for the connection.`);
    }

    return managementSession.getHubRuntimeInformation({
      retryOptions: this._clientOptions.retryOptions,
      abortSignal: options.abortSignal
    });
  }

  getPartitionProperties(partitionId: string, options: GetPartitionPropertiesOptions = {}) {
    // Always use the core context for management APIs
    const connectionContext = this._coreConnectionContext;
    throwErrorIfConnectionClosed(connectionContext);
    throwTypeErrorIfParameterMissing(
      connectionContext.connectionId,
      "getPartitionProperties",
      "partitionId",
      partitionId
    );

    // ensure partition id is a string
    partitionId = String(partitionId);
    const managementSession = connectionContext.managementSession;
    if (!managementSession) {
      throw new Error(`Unable to create a management session for the connection.`);
    }

    return managementSession.getPartitionProperties(partitionId, {
      retryOptions: this._clientOptions.retryOptions,
      abortSignal: options.abortSignal
    });
  }

  async close(): Promise<void> {
    return this._close(this._coreConnectionContext);
  }

  private async _close(context: ConnectionContext): Promise<void> {
    try {
      if (!context.connection.isOpen()) {
        return;
      }
      // close all senders
      for (const senderName of Object.keys(context.senders)) {
        await context.senders[senderName].close();
      }
      // close all receievers
      for (const receiverName of Object.keys(context.receivers)) {
        await context.receivers[receiverName].close();
      }
      // close cbs session
      await context.cbsSession.close();
      // close management session
      await context.managementSession?.close();
      await context.connection.close();
      context.wasConnectionCloseCalled = true;
    } catch (err) {
      err = err instanceof Error ? err : JSON.stringify(err);
      throw err;
    }
  }
}
