// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ConnectionContext, ConnectionContextConfig } from "./connectionContext";
import {
  ConnectionConfig,
  EventHubConnectionConfig,
  EventHubConnectionStringModel,
  SharedKeyCredential,
  TokenCredential,
  isTokenCredential,
  parseConnectionString
} from "@azure/core-amqp";
import { EventHubClientOptions } from "./models/public";

/**
 * The information needed to connect directly to a service node.
 * @internal
 * @ignore
 */
export interface GetDirectConnectionContextOptions {
  address: string;
  host: string;
  hostname: string;
  port: number;
}

/**
 * Manages the creation of `ConnectionContext` that can be used to
 * connect to the service gateway or directly to a service node.
 * @internal
 * @ignore
 */
export class ConnectionContextManager {
  private readonly _credential: TokenCredential | SharedKeyCredential;
  private readonly _gatewayConnectionConfig: ConnectionContextConfig;
  private readonly _gatewayConnectionContext: ConnectionContext;
  private readonly _options: EventHubClientOptions;

  private readonly _directConnectionsSet: Set<ConnectionContext> = new Set();

  constructor(
    hostOrConnectionString: string,
    eventHubNameOrOptions?: string | EventHubClientOptions,
    credentialOrOptions?: TokenCredential | EventHubClientOptions,
    options?: EventHubClientOptions
  ) {
    let config: EventHubConnectionConfig;
    let credential: TokenCredential | SharedKeyCredential;
    hostOrConnectionString = String(hostOrConnectionString);

    if (!isTokenCredential(credentialOrOptions)) {
      const parsedCS = parseConnectionString<EventHubConnectionStringModel>(hostOrConnectionString);
      if (
        !(
          parsedCS.EntityPath ||
          (typeof eventHubNameOrOptions === "string" && eventHubNameOrOptions)
        )
      ) {
        throw new TypeError(
          `Either provide "eventHubName" or the "connectionString": "${hostOrConnectionString}", ` +
            `must contain "EntityPath=<your-event-hub-name>".`
        );
      }
      if (
        parsedCS.EntityPath &&
        typeof eventHubNameOrOptions === "string" &&
        eventHubNameOrOptions &&
        parsedCS.EntityPath !== eventHubNameOrOptions
      ) {
        throw new TypeError(
          `The entity path "${parsedCS.EntityPath}" in connectionString: "${hostOrConnectionString}" ` +
            `doesn't match with eventHubName: "${eventHubNameOrOptions}".`
        );
      }
      const connectionString = hostOrConnectionString;
      if (typeof eventHubNameOrOptions !== "string") {
        // connectionstring and/or options were passed to constructor
        config = EventHubConnectionConfig.create(connectionString);
        options = eventHubNameOrOptions;
      } else {
        // connectionstring, eventHubName and/or options were passed to constructor
        const eventHubName = eventHubNameOrOptions;
        config = EventHubConnectionConfig.create(connectionString, eventHubName);
        options = credentialOrOptions;
      }
      // Since connectionstring was passed, create a SharedKeyCredential
      credential = new SharedKeyCredential(config.sharedAccessKeyName, config.sharedAccessKey);
    } else {
      // host, eventHubName, a TokenCredential and/or options were passed to constructor
      const eventHubName = eventHubNameOrOptions;
      let host = hostOrConnectionString;
      credential = credentialOrOptions;
      if (!eventHubName) {
        throw new TypeError(`"eventHubName" is missing`);
      }

      if (!host.endsWith("/")) host += "/";
      const connectionString = `Endpoint=sb://${host};SharedAccessKeyName=defaultKeyName;SharedAccessKey=defaultKeyValue;EntityPath=${eventHubName}`;
      config = EventHubConnectionConfig.create(connectionString);
    }

    ConnectionConfig.validate(config);

    this._options = options ?? {};
    this._credential = credential;
    this._gatewayConnectionConfig = config;

    this._gatewayConnectionContext = ConnectionContext.create(
      this._gatewayConnectionConfig,
      this._credential,
      this._options
    );
  }

  public getGatewayConnectionContext(): ConnectionContext {
    return this._gatewayConnectionContext;
  }

  public getDirectConnectionContext({
    host,
    hostname,
    port,
    address
  }: GetDirectConnectionContextOptions): ConnectionContext {
    const config: ConnectionContextConfig = EventHubConnectionConfig.createFromConnectionConfig({
      ...this._gatewayConnectionConfig,
      host,
      hostname,
      port
    });
    config.directPartitionAddress = address;
    config.directPartitionAudience = address;

    const connectionContext = ConnectionContext.create(config, this._credential, this._options);

    // Hold onto the connectionContext so we can close it if necessary.
    this._directConnectionsSet.add(connectionContext);
    return connectionContext;
  }

  public removeDirectConnectionContext(connectionContext: ConnectionContext) {
    this._directConnectionsSet.delete(connectionContext);
  }

  public async close(): Promise<void> {
    const connectionContexts: ConnectionContext[] = [
      this._gatewayConnectionContext,
      ...Array.from(this._directConnectionsSet)
    ];

    await Promise.all(connectionContexts.map((c) => c.close()));
  }
}
