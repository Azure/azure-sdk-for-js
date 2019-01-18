// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as log from "./log";
import { StreamingReceiver } from "./core/streamingReceiver";
import { MessageSender } from "./core/messageSender";
import { ManagementClient, ManagementClientOptions } from "./core/managementClient";
import { ConnectionContext } from "./connectionContext";
import { Dictionary, AmqpError } from "rhea-promise";
import { Client } from "./client";
import { BatchingReceiver } from "./core/batchingReceiver";
import { ConcurrentExpiringMap } from "./util/concurrentExpiringMap";
import { MessageReceiver } from "./core/messageReceiver";
import { MessageSession } from "./session/messageSession";
import { SessionManager } from "./session/sessionManager";

/**
 * @interface ClientEntityContext
 * Provides contextual information like the underlying amqp connection, cbs session,
 * management session, tokenProvider, senders, receivers, etc. about the ServiceBus client.
 * @ignore
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
}

/**
 * @ignore
 */
export interface ClientEntityContext extends ClientEntityContextBase {
  detached(error?: AmqpError | Error): Promise<void>;
  getReceiver(name: string, sessionId?: string): MessageReceiver | MessageSession | undefined;
}

/**
 * @ignore
 */
export interface ClientEntityContextOptions {
  managementClientAddress?: string;
  managementClientAudience?: string;
  isSessionEnabled?: boolean;
}

/**
 * @ignore
 */
export namespace ClientEntityContext {
  /**
   * @ignore
   */
  export function create(
    entityPath: string,
    context: ConnectionContext,
    options?: ClientEntityContextOptions
  ): ClientEntityContext {
    if (!entityPath || typeof entityPath !== "string") {
      throw new Error("'entityPath' is a required parameter and must be of type 'string'.");
    }
    if (!context || typeof context !== "object") {
      throw new Error("'context' is a required parameter and must be of type 'object'.");
    }
    if (!options) options = {};
    const entityContext: ClientEntityContextBase = {
      namespace: context,
      entityPath: entityPath,
      requestResponseLockedMessages: new ConcurrentExpiringMap<string>(),
      isSessionEnabled: !!options.isSessionEnabled,
      messageSessions: {}
    };

    (entityContext as ClientEntityContext).sessionManager = new SessionManager(
      entityContext as ClientEntityContext
    );

    (entityContext as ClientEntityContext).getReceiver = (name: string, sessionId?: string) => {
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

    (entityContext as ClientEntityContext).detached = async (error?: AmqpError | Error) => {
      const connectionId = entityContext.namespace.connectionId;
      // reconnect the sender if present
      const sender = entityContext.sender;
      if (sender && !sender.isConnecting) {
        try {
          log.error("[%s] calling detached on sender '%s'.", connectionId, sender.name);
          await sender.detached();
        } catch (err) {
          log.error(
            "[%s] An error occurred while reconnecting the sender '%s': %O.",
            connectionId,
            sender.name,
            err
          );
        }
      }
      // reconnect the batching receiver if present
      const batchingReceiver = entityContext.batchingReceiver;
      if (batchingReceiver && !batchingReceiver.isConnecting) {
        try {
          log.error(
            "[%s] calling detached on batching receiver '%s'.",
            connectionId,
            batchingReceiver.name
          );
          await batchingReceiver.detached(error);
        } catch (err) {
          log.error(
            "[%s] An error occurred while reconnecting the sender '%s': %O.",
            connectionId,
            batchingReceiver.name,
            err
          );
        }
      }
      // reconnect the streaming receiver if present
      const streamingReceiver = entityContext.batchingReceiver;
      if (streamingReceiver && !streamingReceiver.isConnecting) {
        try {
          log.error(
            "[%s] calling detached on streaming receiver '%s'.",
            connectionId,
            streamingReceiver.name
          );
          await streamingReceiver.detached(error);
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
    let managementClient = getManagementClient(context.clients, entityPath);
    if (!managementClient) {
      const mOptions: ManagementClientOptions = {
        address: options.managementClientAddress || `${entityPath}/$management`,
        audience: options.managementClientAudience
      };
      managementClient = new ManagementClient(entityContext as ClientEntityContext, mOptions);
    }
    entityContext.managementClient = managementClient;
    log.entityCtxt("Created client entity context: %O", entityContext);
    return entityContext as ClientEntityContext;
  }
}

// Multiple Queue clients for the same queue should be using the same management client.
function getManagementClient(
  clients: Dictionary<Client>,
  name: string
): ManagementClient | undefined {
  let result: ManagementClient | undefined;
  for (const id of Object.keys(clients)) {
    if (clients[id].name === name) {
      result = (clients[id] as any)._context.managementClient;
      break;
    }
  }
  return result;
}
