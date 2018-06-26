// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as debugModule from "debug";
import { StreamingReceiver } from "./streamingReceiver";
import { MessageSender } from "./messageSender";
import { ManagementClient, ManagementClientOptions } from "./managementClient";
import { ConnectionContext } from "./connectionContext";
import { Dictionary } from "./rhea-promise";
import { Client } from "./client";
import { BatchingReceiver } from "./batchingReceiver";

const debug = debugModule("azure:service-bus:ClientEntityContext");

/**
 * @interface ClientEntityContext
 * Provides contextual information like the underlying amqp connection, cbs session, management session,
 * tokenProvider, senders, receivers, etc. about the ServiceBus client.
 */
export interface ClientEntityContext {
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
    const clientEntityContext: ClientEntityContext = {
      namespace: context,
      entityPath: entityPath
    };
    let managementSession = getManagementSession(context.clients, entityPath);
    if (!managementSession) {
      const mOptions: ManagementClientOptions = {
        address: options.managementSessionAddress,
        audience: options.managementSessionAudience
      };
      managementSession = new ManagementClient(clientEntityContext, mOptions);
    }
    clientEntityContext.managementSession = managementSession;
    debug("Created client entity context: %O", clientEntityContext);
    return clientEntityContext;
  }
}

// Multiple Queue clients for the same queue should be using the same management client.
function getManagementSession(clients: Dictionary<Client>, name: string): ManagementClient | undefined {
  let result: ManagementClient | undefined;
  for (const client of Object.values(clients)) {
    if (client.name === name) {
      result = (client as any)._context.managementSession;
      break;
    }
  }
  return result;
}
