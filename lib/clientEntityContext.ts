// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as log from "./log";
import { StreamingReceiver } from "./streamingReceiver";
import { MessageSender } from "./messageSender";
import { ManagementClient, ManagementClientOptions } from "./managementClient";
import { ConnectionContext } from "./connectionContext";
import { Dictionary, AmqpError } from "rhea-promise";
import { Client } from "./client";
import { BatchingReceiver } from "./batchingReceiver";

/**
 * @interface ClientEntityContext
 * Provides contextual information like the underlying amqp connection, cbs session, management session,
 * tokenProvider, senders, receivers, etc. about the ServiceBus client.
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
   * @property {ManagementClient} managementSession A reference to the management session
   * ($management endpoint) on the underlying amqp connection for the ServiceBus Client.
   */
  managementSession?: ManagementClient;
  /**
   * @property {MessageReceiver} receiver The ServiceBus receiver associated with the client entity.
   */
  streamingReceiver?: StreamingReceiver;

  batchingReceiver?: BatchingReceiver;
  /**
   * @property {MessageSender} sender The ServiceBus sender associated with the client entity.
   */
  sender?: MessageSender;
}

export interface ClientEntityContext extends ClientEntityContextBase {
  detached(error?: AmqpError | Error): Promise<void>;
}

export interface ClientEntityContextOptions {
  managementSessionAddress?: string;
  managementSessionAudience?: string;
}


export namespace ClientEntityContext {

  export function create(entityPath: string, context: ConnectionContext, options?: ClientEntityContextOptions): ClientEntityContext {
    if (!entityPath || typeof entityPath !== "string") {
      throw new Error("'entityPath' is a required parameter and must be of type 'string'.");
    }
    if (!context || typeof context !== "object") {
      throw new Error("'context' is a required parameter and must be of type 'object'.");
    }
    if (!options) options = {};
    const entityContext: ClientEntityContextBase = {
      namespace: context,
      entityPath: entityPath
    };

    (entityContext as ClientEntityContext).detached = async (error?: AmqpError | Error) => {
      const connectionId = entityContext.namespace.connectionId;
      // reconnect the sender if present
      const sender = entityContext.sender;
      if (sender && !sender.isConnecting) {
        try {
          log.error("[%s] calling detached on sender '%s'.", connectionId, sender.id);
          await sender.detached();
        } catch (err) {
          log.error("[%s] An error occurred while reconnecting the sender '%s': %O.",
            connectionId, sender.id, err);
        }
      }
      // reconnect the batching receiver if present
      const batchingReceiver = entityContext.batchingReceiver;
      if (batchingReceiver && !batchingReceiver.isConnecting) {
        try {
          log.error("[%s] calling detached on batching receiver '%s'.",
            connectionId, batchingReceiver.id);
          await batchingReceiver.detached(error);
        } catch (err) {
          log.error("[%s] An error occurred while reconnecting the sender '%s': %O.",
            connectionId, batchingReceiver.id, err);
        }
      }
      // reconnect the streaming receiver if present
      const streamingReceiver = entityContext.batchingReceiver;
      if (streamingReceiver && !streamingReceiver.isConnecting) {
        try {
          log.error("[%s] calling detached on streaming receiver '%s'.",
            connectionId, streamingReceiver.id);
          await streamingReceiver.detached(error);
        } catch (err) {
          log.error("[%s] An error occurred while reconnecting the sender '%s': %O.",
            connectionId, streamingReceiver.id, err);
        }
      }
    };
    let managementSession = getManagementSession(context.clients, entityPath);
    if (!managementSession) {
      const mOptions: ManagementClientOptions = {
        address: options.managementSessionAddress,
        audience: options.managementSessionAudience
      };
      managementSession = new ManagementClient(entityContext as ClientEntityContext, mOptions);
    }
    entityContext.managementSession = managementSession;
    log.entityCtxt("Created client entity context: %O", entityContext);
    return entityContext as ClientEntityContext;
  }
}

// Multiple Queue clients for the same queue should be using the same management client.
function getManagementSession(clients: Dictionary<Client>, name: string): ManagementClient | undefined {
  let result: ManagementClient | undefined;
  for (const id of Object.keys(clients)) {
    if (clients[id].name === name) {
      result = (clients[id] as any)._context.managementSession;
      break;
    }
  }
  return result;
}
