// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { StreamingReceiver } from "./core/streamingReceiver";
import { MessageSender } from "./core/messageSender";
import { ManagementClient, ManagementClientOptions } from "./core/managementClient";
import { ConnectionContext } from "./connectionContext";
import { Dictionary, AmqpError } from "rhea-promise";
import { ClientType } from "./client";
import { BatchingReceiver } from "./core/batchingReceiver";
import { ConcurrentExpiringMap } from "./util/concurrentExpiringMap";
import { MessageReceiver } from "./core/messageReceiver";
import { MessageSession } from "./session/messageSession";
import { SessionManager } from "./session/sessionManager";

/**
 * @interface ClientEntityContext
 * Provides contextual information like the underlying amqp connection, cbs session,
 * management session, tokenProvider, senders, receivers, etc. about the ServiceBus client.
 * @internal
 */
export interface ClientEntityContextBase {
  /**
   * @property {ConnectionContext} namespace Describes the context with common properties at
   * the namespace level.
   */
  namespace: ConnectionContext;
  /**
   * @property {string} entityPath - The name/path of the entity (queue/topic/subscription) to which
   * the connection needs to happen.
   */
  entityPath: string;
  /**
   * @property {boolean} [isSessionEnabled] Indicates whether the client entity is session enabled.
   * Default: `false`.
   */
  isSessionEnabled?: boolean;
  /**
   * @property {ManagementClient} [managementClient] A reference to the management client
   * ($management endpoint) on the underlying amqp connection for the ServiceBus Client.
   */
  managementClient?: ManagementClient;
  /**
   * @property {StreamingReceiver} [receiver] The ServiceBus receiver associated with the
   * client entity for streaming messages.
   */
  streamingReceiver?: StreamingReceiver;
  /**
   * @property {BatchingReceiver} [batchingReceiver] The ServiceBus receiver associated with the
   * client entity for receiving a batch of messages.
   */
  batchingReceiver?: BatchingReceiver;
  /**
   * @property {Dictionary<MessageSession>} messageSessions A dictionary of the MessageSession
   * objects associated with this client.
   */
  messageSessions: Dictionary<MessageSession>;
  /**
   * @property {Dictionary<MessageSession>} expiredMessageSessions A dictionary that stores expired message sessions IDs.
   */
  expiredMessageSessions: Dictionary<Boolean>;
  /**
   * @property {MessageSender} [sender] The ServiceBus sender associated with the client entity.
   */
  sender?: MessageSender;
  /**
   * @property {ConcurrentExpiringMap<string>} [requestResponseLockedMessages] A map of locked
   * messages received using the management client.
   */
  requestResponseLockedMessages: ConcurrentExpiringMap<string>;
  /**
   * @property {SessionManager} [sessionManager] SessionManager is responsible for efficiently
   * receiving messages from multiple message sessions.
   */
  sessionManager?: SessionManager;

  /**
   * @property {ClientType} [clientType] Type of the client, used mostly for logging
   */
  clientType: ClientType;

  /**
   * @property {string} [clientId] Unique Id of the client for which this context is created
   */
  clientId: string;

  /**
   * @property {boolean} [isClosed] Denotes if close() was called on this client.
   */
  isClosed: boolean;
}

/**
 * @internal
 */
export interface ClientEntityContext extends ClientEntityContextBase {
  onDetached(error?: AmqpError | Error): Promise<void>;
  getReceiver(name: string, sessionId?: string): MessageReceiver | MessageSession | undefined;
  close(): Promise<void>;
}

/**
 * @internal
 */
export interface ClientEntityContextOptions {
  managementClientAddress?: string;
  managementClientAudience?: string;
  isSessionEnabled?: boolean;
}

/**
 * @internal
 */
export namespace ClientEntityContext {
  /**
   * @internal
   */
  export function create(
    entityPath: string,
    clientType: ClientType,
    context: ConnectionContext,
    clientId: string,
    options?: ClientEntityContextOptions
  ): ClientEntityContext {
    log.entityCtxt(
      "[%s] Creating client entity context for %s: %O",
      context.connectionId,
      clientId
    );

    if (!options) options = {};
    const entityContext: ClientEntityContextBase = {
      namespace: context,
      entityPath: entityPath,
      clientType: clientType,
      clientId: clientId,
      isClosed: false,
      requestResponseLockedMessages: new ConcurrentExpiringMap<string>(),
      isSessionEnabled: !!options.isSessionEnabled,
      messageSessions: {},
      expiredMessageSessions: {}
    };

    (entityContext as ClientEntityContext).sessionManager = new SessionManager(
      entityContext as ClientEntityContext
    );

    (entityContext as ClientEntityContext).getReceiver = (name: string, sessionId?: string) => {
      if (sessionId && entityContext.expiredMessageSessions[sessionId]) {
        const error = new Error(
          `The session lock has expired on the session with id ${sessionId}.`
        );
        error.name = "SessionLockLostError";
        throw error;
      }

      let receiver: MessageReceiver | MessageSession | undefined = undefined;
      if (
        sessionId != undefined &&
        entityContext.messageSessions[sessionId] &&
        entityContext.messageSessions[sessionId].name === name
      ) {
        receiver = entityContext.messageSessions[sessionId];
      } else if (entityContext.streamingReceiver && entityContext.streamingReceiver.name === name) {
        receiver = entityContext.streamingReceiver;
      } else if (entityContext.batchingReceiver && entityContext.batchingReceiver.name === name) {
        receiver = entityContext.batchingReceiver;
      }
      return receiver;
    };

    (entityContext as ClientEntityContext).onDetached = async (error?: AmqpError | Error) => {
      const connectionId = entityContext.namespace.connectionId;
      // reconnect the sender if present
      const sender = entityContext.sender;
      if (sender && !sender.isConnecting) {
        try {
          log.error("[%s] calling detached on sender '%s'.", connectionId, sender.name);
          await sender.onDetached();
        } catch (err) {
          log.error(
            "[%s] An error occurred while reconnecting the sender '%s': %O.",
            connectionId,
            sender.name,
            err
          );
        }
      }

      const batchingReceiver = entityContext.batchingReceiver;
      if (batchingReceiver && !batchingReceiver.isConnecting) {
        log.error(
          "[%s] Receiver '%s' with address '%s' is a Batching Receiver, so we will not be " +
            "re-establishing the receiver link.",
          connectionId,
          batchingReceiver.name,
          batchingReceiver.address
        );
      }
      // reconnect the streaming receiver if present
      const streamingReceiver = entityContext.streamingReceiver;
      if (streamingReceiver && !streamingReceiver.isConnecting) {
        try {
          log.error(
            "[%s] calling detached on streaming receiver '%s'.",
            connectionId,
            streamingReceiver.name
          );
          await streamingReceiver.onDetached(error);
        } catch (err) {
          log.error(
            "[%s] An error occurred while reconnecting the sender '%s': %O.",
            connectionId,
            streamingReceiver.name,
            err
          );
        }
      }
    };

    const isManagementClientSharedWithOtherClients = (): boolean => {
      for (const id of Object.keys(context.clientContexts)) {
        if (
          context.clientContexts[id].entityPath === entityContext.entityPath &&
          context.clientContexts[id].clientId !== entityContext.clientId
        ) {
          return true;
        }
      }
      return false;
    };

    (entityContext as ClientEntityContext).close = async () => {
      if (!context.connection || !context.connection.isOpen()) {
        return;
      }

      log.entityCtxt(
        "[%s] Closing client entity context for %s: %O",
        context.connectionId,
        clientId
      );

      // Close sender
      if (entityContext.sender) {
        await entityContext.sender.close();
      }

      // Close batching receiver
      if (entityContext.batchingReceiver) {
        await entityContext.batchingReceiver.close();
      }

      // Close streaming receiver
      if (entityContext.streamingReceiver) {
        await entityContext.streamingReceiver.close();
      }

      // Close all the MessageSessions.
      for (const messageSessionId of Object.keys(entityContext.messageSessions)) {
        await entityContext.messageSessions[messageSessionId].close();
      }

      // Close the sessionManager.
      if (entityContext.sessionManager) {
        entityContext.sessionManager.close();
      }

      // Make sure that we clear the map of deferred messages
      entityContext.requestResponseLockedMessages.clear();

      // Delete the reference in ConnectionContext
      delete context.clientContexts[clientId];

      // Close the managementClient unless it is shared with other clients
      if (entityContext.managementClient && !isManagementClientSharedWithOtherClients()) {
        await entityContext.managementClient.close();
        entityContext.managementClient = undefined;
      }

      entityContext.isClosed = true;

      log.entityCtxt(
        "[%s] Closed client entity context for %s: %O",
        context.connectionId,
        clientId
      );
    };

    let managementClient = getManagementClient(context.clientContexts, entityPath);
    if (!managementClient) {
      const mOptions: ManagementClientOptions = {
        address: options.managementClientAddress || `${entityPath}/$management`,
        audience: options.managementClientAudience
      };
      managementClient = new ManagementClient(entityContext as ClientEntityContext, mOptions);
    }
    entityContext.managementClient = managementClient;

    const clientEntityContext = entityContext as ClientEntityContext;
    context.clientContexts[entityContext.clientId] = clientEntityContext;

    log.entityCtxt("[%s] Created client entity context for %s: %O", context.connectionId, clientId);

    return clientEntityContext;
  }
}

// Multiple clients for the same Service Bus entity should be using the same management client.
function getManagementClient(
  clients: Dictionary<ClientEntityContext>,
  entityPath: string
): ManagementClient | undefined {
  let result: ManagementClient | undefined;
  for (const id of Object.keys(clients)) {
    if (clients[id].entityPath === entityPath) {
      result = clients[id].managementClient;
      break;
    }
  }
  return result;
}
