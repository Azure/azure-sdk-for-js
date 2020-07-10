// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @azure/azure-sdk/ts-no-namespaces */
/* eslint-disable no-inner-declarations */

import { logger, logErrorStackTrace } from "./log";
import { getRuntimeInfo } from "./util/runtimeInfo";
import { packageJsonInfo } from "./util/constants";
import { EventHubReceiver } from "./eventHubReceiver";
import { EventHubSender } from "./eventHubSender";
import {
  ConnectionContextBase,
  Constants,
  CreateConnectionContextBaseParameters,
  EventHubConnectionConfig,
  SharedKeyCredential,
  TokenCredential,
  isTokenCredential,
  parseConnectionString,
  EventHubConnectionStringModel,
  ConnectionConfig
} from "@azure/core-amqp";
import { ManagementClient, ManagementClientOptions } from "./managementClient";
import { EventHubClientOptions } from "./models/public";
import { Connection, ConnectionEvents, Dictionary, EventContext, OnAmqpEvent } from "rhea-promise";

/**
 * @internal
 * @ignore
 * Provides contextual information like the underlying amqp connection, cbs session, management session,
 * tokenProvider, senders, receivers, etc. about the EventHub client.
 */
export interface ConnectionContext extends ConnectionContextBase {
  /**
   * @property config The EventHub connection config that is created after
   * parsing the connection string.
   */
  readonly config: EventHubConnectionConfig;
  /**
   * @property wasConnectionCloseCalled Indicates whether the close() method was
   * called on theconnection object.
   */
  wasConnectionCloseCalled: boolean;
  /**
   * @property receivers A dictionary of the EventHub Receivers associated with this client.
   */
  receivers: Dictionary<EventHubReceiver>;
  /**
   * @property senders A dictionary of the EventHub Senders associated with this client.
   */
  senders: Dictionary<EventHubSender>;
  /**
   * @property managementSession A reference to the management session ($management endpoint) on
   * the underlying amqp connection for the EventHub Client.
   */
  managementSession?: ManagementClient;
  /**
   * Function returning a promise that resolves once the connectionContext is ready to open an AMQP link.
   * ConnectionContext will be ready to open an AMQP link when:
   * - The AMQP connection is already open on both sides.
   * - The AMQP connection has been closed or disconnected. In this case, a new AMQP connection is expected
   * to be created first.
   * An AMQP link cannot be opened if the AMQP connection
   * is in the process of closing or disconnecting.
   */
  readyToOpenLink(): Promise<void>;
  /**
   * Closes all AMQP links, sessions and connection.
   */
  close(): Promise<void>;
}

/**
 * Describes the members on the ConnectionContext that are only
 * used by it internally.
 * @ignore
 * @internal
 */
export interface ConnectionContextInternalMembers extends ConnectionContext {
  /**
   * Indicates whether the connection is in the process of closing.
   * When this returns `true`, a `disconnected` event will be received
   * after the connection is closed.
   *
   */
  isConnectionClosing(): boolean;
  /**
   * Resolves once the context's connection emits a `disconnected` event.
   */
  waitForDisconnectedEvent(): Promise<void>;
  /**
   * Resolves once the connection has finished being reset.
   * Connections are reset as part of reacting to a `disconnected` event.
   */
  waitForConnectionReset(): Promise<void>;
}

/**
 * @internal
 * @ignore
 */
export interface ConnectionContextOptions extends EventHubClientOptions {
  managementSessionAddress?: string;
  managementSessionAudience?: string;
}

/**
 * Helper type to get the names of all the functions on an object.
 */
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
/**
 * Helper type to get the types of all the functions on an object.
 */
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
/**
 * Helper type to get the types of all the functions on ConnectionContext
 * and the internal methods from ConnectionContextInternalMembers.
 * Note that this excludes the functions that ConnectionContext inherits.
 * Each function also has its `this` type set as `ConnectionContext`.
 */
type ConnectionContextMethods = Omit<
  FunctionProperties<ConnectionContextInternalMembers>,
  FunctionPropertyNames<ConnectionContextBase>
> &
  ThisType<ConnectionContextInternalMembers>;

/**
 * @internal
 * @ignore
 */
export namespace ConnectionContext {
  /**
   * @property userAgent The user agent string for the EventHubs client.
   * See guideline at https://github.com/Azure/azure-sdk/blob/master/docs/design/Telemetry.mdk
   */
  const userAgent: string = `azsdk-js-azureeventhubs/${
    packageJsonInfo.version
  } (${getRuntimeInfo()})`;

  export function getUserAgent(options: ConnectionContextOptions): string {
    const finalUserAgent = options.userAgent ? `${userAgent},${options.userAgent}` : userAgent;
    if (finalUserAgent.length > Constants.maxUserAgentLength) {
      throw new Error(
        `The user-agent string cannot be more than ${Constants.maxUserAgentLength} characters in length.` +
          `The given user-agent string is: ${finalUserAgent} with length: ${finalUserAgent.length}`
      );
    }
    return finalUserAgent;
  }

  export function create(
    config: EventHubConnectionConfig,
    tokenCredential: SharedKeyCredential | TokenCredential,
    options?: ConnectionContextOptions
  ): ConnectionContext {
    if (!options) options = {};

    config.webSocket = options.webSocketOptions && options.webSocketOptions.webSocket;
    config.webSocketEndpointPath = "$servicebus/websocket";
    config.webSocketConstructorOptions =
      options.webSocketOptions && options.webSocketOptions.webSocketConstructorOptions;

    const parameters: CreateConnectionContextBaseParameters = {
      config: config,
      tokenCredential: tokenCredential,
      // re-enabling this will be a post-GA discussion.
      // dataTransformer: options.dataTransformer,
      isEntityPathRequired: true,
      connectionProperties: {
        product: "MSJSClient",
        userAgent: getUserAgent(options),
        version: packageJsonInfo.version
      }
    };
    // Let us create the base context and then add EventHub specific ConnectionContext properties.
    const connectionContext = ConnectionContextBase.create(parameters) as ConnectionContext;
    connectionContext.wasConnectionCloseCalled = false;
    connectionContext.senders = {};
    connectionContext.receivers = {};
    const mOptions: ManagementClientOptions = {
      address: options.managementSessionAddress,
      audience: options.managementSessionAudience
    };
    connectionContext.managementSession = new ManagementClient(connectionContext, mOptions);

    let waitForDisconnectResolve: () => void;
    let waitForDisconnectPromise: Promise<void> | undefined;

    Object.assign<ConnectionContext, ConnectionContextMethods>(connectionContext, {
      isConnectionClosing() {
        // When the connection is not open, but the remote end is open,
        // then the rhea connection is in the process of terminating.
        return Boolean(!this.connection.isOpen() && this.connection.isRemoteOpen());
      },
      async readyToOpenLink() {
        // Check that the connection isn't in the process of closing.
        // This can happen when the idle timeout has been reached but
        // the underlying socket is waiting to be destroyed.
        if (this.isConnectionClosing()) {
          // Wait for the disconnected event that indicates the underlying socket has closed.
          await this.waitForDisconnectedEvent();
        }
        // Check if the connection is currently in the process of disconnecting.
        if (waitForDisconnectPromise) {
          // Wait for the connection to be reset.
          await this.waitForConnectionReset();
        }
      },
      waitForDisconnectedEvent() {
        return new Promise((resolve) => {
          logger.verbose(
            `[${this.connectionId}] Attempting to reinitialize connection` +
              ` but the connection is in the process of closing.` +
              ` Waiting for the disconnect event before continuing.`
          );
          this.connection.once(ConnectionEvents.disconnected, resolve);
        });
      },
      waitForConnectionReset() {
        if (waitForDisconnectPromise) {
          return waitForDisconnectPromise;
        }
        return Promise.resolve();
      },
      async close() {
        try {
          if (this.connection.isOpen()) {
            // Close all the senders.
            for (const senderName of Object.keys(this.senders)) {
              await this.senders[senderName].close();
            }
            // Close all the receivers.
            for (const receiverName of Object.keys(this.receivers)) {
              await this.receivers[receiverName].close();
            }
            // Close the cbs session;
            await this.cbsSession.close();
            // Close the management session
            await this.managementSession!.close();
            await this.connection.close();
            this.wasConnectionCloseCalled = true;
            logger.info("Closed the amqp connection '%s' on the client.", this.connectionId);
          }
        } catch (err) {
          const errorDescription =
            err instanceof Error ? `${err.name}: ${err.message}` : JSON.stringify(err);
          logger.warning(
            `An error occurred while closing the connection "${this.connectionId}":\n${errorDescription}`
          );
          logErrorStackTrace(err);
          throw err;
        }
      }
    });

    // Define listeners to be added to the connection object for
    // "connection_open" and "connection_error" events.
    const onConnectionOpen: OnAmqpEvent = () => {
      connectionContext.wasConnectionCloseCalled = false;
      logger.verbose(
        "[%s] setting 'wasConnectionCloseCalled' property of connection context to %s.",
        connectionContext.connection.id,
        connectionContext.wasConnectionCloseCalled
      );
    };

    const onDisconnected: OnAmqpEvent = async (context: EventContext) => {
      if (waitForDisconnectPromise) {
        return;
      }
      waitForDisconnectPromise = new Promise((resolve) => {
        waitForDisconnectResolve = resolve;
      });

      logger.verbose(
        "[%s] 'disconnected' event occurred on the amqp connection.",
        connectionContext.connection.id
      );

      if (context.connection && context.connection.error) {
        logger.verbose(
          "[%s] Accompanying error on the context.connection: %O",
          connectionContext.connection.id,
          context.connection && context.connection.error
        );
      }
      if (context.error) {
        logger.verbose(
          "[%s] Accompanying error on the context: %O",
          connectionContext.connection.id,
          context.error
        );
      }
      const state: Readonly<{
        wasConnectionCloseCalled: boolean;
        numSenders: number;
        numReceivers: number;
      }> = {
        wasConnectionCloseCalled: connectionContext.wasConnectionCloseCalled,
        numSenders: Object.keys(connectionContext.senders).length,
        numReceivers: Object.keys(connectionContext.receivers).length
      };
      logger.verbose(
        "[%s] Closing all open senders and receivers in the state: %O",
        connectionContext.connection.id,
        state
      );

      // Clear internal map maintained by rhea to avoid reconnecting of old links once the
      // connection is back up.
      connectionContext.connection.removeAllSessions();

      // Close the cbs session to ensure all the event handlers are released.
      await connectionContext.cbsSession.close().catch(() => {
        /* error already logged, swallow it here */
      });
      // Close the management session to ensure all the event handlers are released.
      await connectionContext.managementSession!.close().catch(() => {
        /* error already logged, swallow it here */
      });

      // Close all senders and receivers to ensure clean up of timers & other resources.
      if (state.numSenders || state.numReceivers) {
        for (const senderName of Object.keys(connectionContext.senders)) {
          const sender = connectionContext.senders[senderName];
          await sender.close().catch(() => {
            /* error already logged, swallow it here */
          });
        }
        for (const receiverName of Object.keys(connectionContext.receivers)) {
          const receiver = connectionContext.receivers[receiverName];
          await receiver.close().catch(() => {
            /* error already logged, swallow it here */
          });
        }
      }

      await refreshConnection(connectionContext);
      waitForDisconnectResolve();
      waitForDisconnectPromise = undefined;
    };

    const protocolError: OnAmqpEvent = async (context: EventContext) => {
      logger.verbose(
        "[%s] 'protocol_error' event occurred on the amqp connection.",
        connectionContext.connection.id
      );

      if (context.connection && context.connection.error) {
        logger.verbose(
          "[%s] Accompanying error on the context.connection: %O",
          connectionContext.connection.id,
          context.connection && context.connection.error
        );
      }
      if (context.error) {
        logger.verbose(
          "[%s] Accompanying error on the context: %O",
          connectionContext.connection.id,
          context.error
        );
      }
    };

    const error: OnAmqpEvent = async (context: EventContext) => {
      logger.verbose(
        "[%s] 'error' event occurred on the amqp connection.",
        connectionContext.connection.id
      );

      if (context.connection && context.connection.error) {
        logger.verbose(
          "[%s] Accompanying error on the context.connection: %O",
          connectionContext.connection.id,
          context.connection && context.connection.error
        );
      }
      if (context.error) {
        logger.verbose(
          "[%s] Accompanying error on the context: %O",
          connectionContext.connection.id,
          context.error
        );
      }
    };

    function addConnectionListeners(connection: Connection) {
      // Add listeners on the connection object.
      connection.on(ConnectionEvents.connectionOpen, onConnectionOpen);
      connection.on(ConnectionEvents.disconnected, onDisconnected);
      connection.on(ConnectionEvents.protocolError, protocolError);
      connection.on(ConnectionEvents.error, error);
    }

    function cleanConnectionContext(connectionContext: ConnectionContext) {
      // Remove listeners from the connection object.
      connectionContext.connection.removeListener(
        ConnectionEvents.connectionOpen,
        onConnectionOpen
      );
      connectionContext.connection.removeListener(ConnectionEvents.disconnected, onDisconnected);
      connectionContext.connection.removeListener(ConnectionEvents.protocolError, protocolError);
      connectionContext.connection.removeListener(ConnectionEvents.error, error);
      // Close the connection
      return connectionContext.connection.close();
    }

    async function refreshConnection(connectionContext: ConnectionContext) {
      const originalConnectionId = connectionContext.connectionId;
      try {
        await cleanConnectionContext(connectionContext);
      } catch (err) {
        logger.verbose(
          `[${connectionContext.connectionId}] There was an error closing the connection before reconnecting: %O`,
          err
        );
      }

      // Create a new connection, id, locks, and cbs client.
      connectionContext.refreshConnection();
      addConnectionListeners(connectionContext.connection);
      logger.verbose(
        `The connection "${originalConnectionId}" has been updated to "${connectionContext.connectionId}".`
      );
    }

    addConnectionListeners(connectionContext.connection);

    logger.verbose("[%s] Created connection context successfully.", connectionContext.connectionId);
    return connectionContext;
  }
}

/**
 * Helper method to create a ConnectionContext from the input passed to either
 * EventHubProducerClient or EventHubConsumerClient constructors
 *
 * @ignore
 * @internal
 */
export function createConnectionContext(
  hostOrConnectionString: string,
  eventHubNameOrOptions?: string | EventHubClientOptions,
  credentialOrOptions?: TokenCredential | EventHubClientOptions,
  options?: EventHubClientOptions
): ConnectionContext {
  let connectionString;
  let config;
  let credential: TokenCredential | SharedKeyCredential;
  hostOrConnectionString = String(hostOrConnectionString);

  if (!isTokenCredential(credentialOrOptions)) {
    const parsedCS = parseConnectionString<EventHubConnectionStringModel>(hostOrConnectionString);
    if (
      !(parsedCS.EntityPath || (typeof eventHubNameOrOptions === "string" && eventHubNameOrOptions))
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
    connectionString = hostOrConnectionString;
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
    connectionString = `Endpoint=sb://${host};SharedAccessKeyName=defaultKeyName;SharedAccessKey=defaultKeyValue;EntityPath=${eventHubName}`;
    config = EventHubConnectionConfig.create(connectionString);
  }

  ConnectionConfig.validate(config);

  return ConnectionContext.create(config, credential, options);
}
