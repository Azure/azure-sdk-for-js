// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ReceiverOptions, SenderOptions, createSession, createSender, createReceiver } from "./rhea-promise";
import * as debugModule from "debug";
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
