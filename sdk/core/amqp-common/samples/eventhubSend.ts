// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  ConnectionContextBase, CreateConnectionContextBaseParameters, CbsResponse, EventHubConnectionConfig
} from "../lib";
import * as dotenv from "dotenv";
dotenv.config(); // Optional for loading environment configuration from a .env (config) file
import { Sender, SenderOptions, EventContext, Message, Delivery } from "rhea-promise";

const str = process.env.CONNECTION_STRING || "";
const path = process.env.ENTITY_PATH;
const ehConnectionConfig = EventHubConnectionConfig.create(str, path);
const parameters: CreateConnectionContextBaseParameters = {
  config: ehConnectionConfig,
  connectionProperties: {
    product: "MSJSClient",
    userAgent: "/js-amqp-common",
    version: "0.1.0"
  }
};
const connectionContext = ConnectionContextBase.create(parameters);

async function authenticate(audience: string, closeConnection = false): Promise<CbsResponse> {
  await connectionContext.cbsSession.init();
  const tokenObject = await connectionContext.tokenProvider.getToken(audience);
  const result = await connectionContext.cbsSession.negotiateClaim(audience, tokenObject);
  console.log("Result is: %O", result);
  if (closeConnection) {
    await connectionContext.connection.close();
    console.log("Successfully closed the connection.");
  }
  return result;
}

async function main(): Promise<void> {
  await authenticate(ehConnectionConfig.getSenderAudience());
  const senderName = "sender-1";
  const senderOptions: SenderOptions = {
    name: senderName,
    target: {
      address: ehConnectionConfig.getSenderAddress()
    },
    onError: (context: EventContext) => {
      const senderError = context.sender && context.sender.error;
      if (senderError) {
        console.log(">>>>> [%s] An error occurred for sender '%s': %O.",
          connectionContext.connection.id, senderName, senderError);
      }
    },
    onSessionError: (context: EventContext) => {
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        console.log(">>>>> [%s] An error occurred for session of sender '%s': %O.",
          connectionContext.connection.id, senderName, sessionError);
      }
    }
  };

  const sender: Sender = await connectionContext.connection.createSender(senderOptions);
  const message: Message = {
    body: "Hello World!!",
    message_id: "12343434343434"
  };

  const delivery: Delivery = await sender.send(message);
  console.log(">>>>>[%s] Delivery id: ", connectionContext.connection.id, delivery.id);

  await sender.close();
  await connectionContext.connection.close();
}

main().catch(err => console.log(err));
