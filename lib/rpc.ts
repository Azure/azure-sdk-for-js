// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as os from "os";
import * as process from "process";
import * as debugModule from "debug";
import { defaultLock } from "./util/utils";
import {
  ReceiverOptions, SenderOptions, createSession,
  createSender, createReceiver, connect, ConnectionOptions,
  OnAmqpEvent, AmqpError, createReceiverWithHandlers, Context
} from "./rhea-promise";
import * as Constants from "./util/constants";
import { ConnectionContext } from "./connectionContext";
import { ConditionStatusMapper, translate } from "./errors";
import { AmqpMessage } from ".";
const debug = debugModule("azure:event-hubs:rpc");

export interface RequestResponseLink {
  sender: any;
  receiver: any;
  session: any;
}

export interface ReceiverLink {
  receiver: any;
  session: any;
}

export interface SenderLink {
  sender: any;
  session: any;
}

export interface LinkOptions {
  connection: any;
}

export interface ReceiverLinkOptions extends LinkOptions {
  onMessage: OnAmqpEvent;
  onError: OnAmqpEvent;
  receiverOptions: ReceiverOptions;
}

export async function createRequestResponseLink(connection: any, senderOptions: SenderOptions, receiverOptions: ReceiverOptions): Promise<RequestResponseLink> {
  if (!connection) {
    throw new Error(`Please provide a connection to create the sender/receiver link on the same session.`);
  }
  if (!senderOptions) {
    throw new Error(`Please provide sender options.`);
  }
  if (!receiverOptions) {
    throw new Error(`Please provide receiver options.`);
  }
  const session = await createSession(connection);
  const [sender, receiver] = await Promise.all([
    createSender(session, senderOptions),
    createReceiver(session, receiverOptions)
  ]);
  debug(`[${connection.options.id}] Successfully created the sender and receiver links on the same session.`);
  return {
    session: session,
    sender: sender,
    receiver: receiver
  };
}

export async function createReceiverLink(connection: any, receiverOptions: ReceiverOptions): Promise<ReceiverLink> {
  if (!connection) {
    throw new Error(`Please provide a connection to create the receiver link on a session.`);
  }

  if (!receiverOptions) {
    throw new Error(`Please provide receiver options.`);
  }
  const session = await createSession(connection);
  const receiver = await createReceiver(session, receiverOptions);
  debug(`[${connection.options.id}] Successfully created the receiver link on a dedicated session for it.`);
  return {
    session: session,
    receiver: receiver
  };
}

export async function createReceiverLinkWithHandlers(options: ReceiverLinkOptions): Promise<ReceiverLink> {
  if (!options.connection) {
    throw new Error(`Please provide a connection to create the receiver link on a session.`);
  }

  if (!options.receiverOptions) {
    throw new Error(`Please provide receiver options.`);
  }
  if (!options.onError) {
    throw new Error(`Please provide onError.`);
  }
  if (!options.onMessage) {
    throw new Error(`Please provide onMessage.`);
  }
  const session = await createSession(options.connection);
  const receiver = await createReceiverWithHandlers(session, options.onMessage, options.onError, options.receiverOptions);
  debug(`[${options.connection.options.id}] Successfully created the receiver link on a dedicated session for it.`);
  return {
    session: session,
    receiver: receiver
  };
}

export async function createSenderLink(connection: any, senderOptions: SenderOptions): Promise<SenderLink> {
  if (!connection) {
    throw new Error(`Please provide a connection to create the sender link on a session.`);
  }
  if (!senderOptions) {
    throw new Error(`Please provide sender options.`);
  }
  const session = await createSession(connection);
  const sender = await createSender(session, senderOptions);
  debug(`[${connection.options.id}] Successfully created the sender link on a dedicated session for it.`);
  return {
    session: session,
    sender: sender
  };
}

export function sendRequest(connection: any, link: RequestResponseLink, request: AmqpMessage): Promise<any> {
  if (!connection) {
    throw new Error("connection is a required parameter and must be of type 'object'.");
  }

  if (!link) {
    throw new Error("link is a required parameter and must be of type 'object'.");
  }

  if (!request) {
    throw new Error("request is a required parameter and must be of type 'object'.");
  }
  return new Promise((resolve: any, reject: any) => {
    // TODO: Handle timeout incase SB/EH does not send a response.
    const messageCallback = (context: Context) => {
      // remove the event listener as this will be registered next time when someone makes a request.
      link.receiver.removeListener(Constants.message, messageCallback);
      const code: number = context.message!.application_properties![Constants.statusCode];
      const desc: string = context.message!.application_properties![Constants.statusDescription];
      const errorCondition: string | undefined = context.message!.application_properties![Constants.errorCondition];
      debug(`[${connection.options.id}] $management request: \n`, request);
      debug(`[${connection.options.id}] $management response: \n`, context.message);
      if (code > 199 && code < 300) {
        return resolve(context.message!.body);
      } else {
        const condition = errorCondition || ConditionStatusMapper[code] || "amqp:internal-error";
        const e: AmqpError = {
          condition: condition,
          description: desc
        };
        return reject(translate(e));
      }
    };
    link.receiver.on(Constants.message, messageCallback);
    link.sender.send(request);
  });

}

/**
 * Opens the AMQP connection to the Event Hub for this client, returning a promise
 * that will be resolved when the connection is completed.
 *
 * @param {ConnectionContext} context The connection context.
 * @param {boolean} [useSaslPlain]   True for using sasl plain mode for authentication, false otherwise.
 * @returns {Promise<void>}
 */
export async function open(context: ConnectionContext, useSaslPlain?: boolean): Promise<void> {
  try {
    await defaultLock.acquire("connect", () => { return _open(context, useSaslPlain); });
  } catch (err) {
    debug(err);
    throw err;
  }
}

async function _open(context: ConnectionContext, useSaslPlain?: boolean): Promise<void> {
  if (useSaslPlain && typeof useSaslPlain !== "boolean") {
    throw new Error("'useSaslPlain' must be of type 'boolean'.");
  }
  if (!context.connection) {
    const connectOptions: ConnectionOptions = {
      transport: Constants.TLS,
      host: context.config.host,
      hostname: context.config.host,
      username: context.config.sharedAccessKeyName,
      port: 5671,
      reconnect_limit: Constants.reconnectLimit,
      properties: {
        product: "MSJSClient",
        version: Constants.packageJsonInfo.version || "0.1.0",
        platform: `(${os.arch()}-${os.type()}-${os.release()})`,
        framework: `Node/${process.version}`,
        "user-agent": ConnectionContext.userAgent
      }
    };
    if (useSaslPlain) {
      connectOptions.password = context.config.sharedAccessKey;
    }
    debug(`Dialing the amqp connection with options.`, connectOptions);
    context.connection = await connect(connectOptions);
    context.connectionId = context.connection.options.id;
    debug(`Successfully established the amqp connection "${context.connectionId}".`);
  }
}

