// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as os from "os";
import * as process from "process";
import * as debugModule from "debug";
import * as uuid from "uuid/v4";
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

export function sendRequest(connection: any, link: RequestResponseLink, request: AmqpMessage, timeoutInSeconds?: number): Promise<any> {
  if (!connection) {
    throw new Error("connection is a required parameter and must be of type 'object'.");
  }

  if (!link) {
    throw new Error("link is a required parameter and must be of type 'object'.");
  }

  if (!request) {
    throw new Error("request is a required parameter and must be of type 'object'.");
  }

  if (!request.message_id) request.message_id = uuid();

  if (!timeoutInSeconds) {
    timeoutInSeconds = 30;
  }

  return new Promise((resolve: any, reject: any) => {
    let waitTimer: any;
    let timeOver: boolean = false;

    const messageCallback = (context: Context) => {
      // remove the event listener as this will be registered next time when someone makes a request.
      link.receiver.removeListener(Constants.message, messageCallback);
      const code: number = context.message!.application_properties![Constants.statusCode];
      const desc: string = context.message!.application_properties![Constants.statusDescription];
      const errorCondition: string | undefined = context.message!.application_properties![Constants.errorCondition];
      const responseCorrelationId = context.message!.correlation_id;
      debug(`[${connection.options.id}] ${request.to} response: `, context.message);
      if (code > 199 && code < 300) {
        if (request.message_id === responseCorrelationId || request.correlation_id === responseCorrelationId) {
          if (!timeOver) {
            clearTimeout(waitTimer);
          }
          debug("[%s] request-messageId | '%s' == '%s' | response-correlationId.", connection.options.id, request.message_id, responseCorrelationId);
          return resolve(context.message!.body);
        } else {
          debug("[%s] request-messageId | '%s' != '%s' | response-correlationId. Hence dropping this response and waiting for the next one.",
            connection.options.id, request.message_id, responseCorrelationId);
        }
      } else {
        const condition = errorCondition || ConditionStatusMapper[code] || "amqp:internal-error";
        const e: AmqpError = {
          condition: condition,
          description: desc
        };
        return reject(translate(e));
      }
    };

    const actionAfterTimeout = () => {
      timeOver = true;
      link.receiver.removeListener(Constants.message, messageCallback);
      const address = link.receiver.options && link.receiver.options.source && link.receiver.options.source.address
        ? link.receiver.options.source.address
        : "address";
      const desc: string = `The request with message_id "${request.message_id}" to "${address}" ` +
        `endpoint timed out. Please try again later.`;
      const e: AmqpError = {
        condition: ConditionStatusMapper[408],
        description: desc
      };
      return reject(translate(e));
    };

    link.receiver.on(Constants.message, messageCallback);
    waitTimer = setTimeout(actionAfterTimeout, timeoutInSeconds! * 1000);
    clearTimeout(waitTimer);
    debug(`[${connection.options.id}] ${request.to} request sent: `, request);
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

