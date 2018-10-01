// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  ConnectionContextBase, CreateConnectionContextBaseParameters, CbsResponse, EventHubConnectionConfig
} from "../lib";
import * as dotenv from "dotenv";
dotenv.config(); // Optional for loading environment configuration from a .env (config) file
import { Receiver, ReceiverOptions, EventContext, types, ReceiverEvents, delay } from "rhea-promise";

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
  await authenticate(ehConnectionConfig.getReceiverAudience("0"));
  const receiverName = "receiver-1";
  // Get messages from the past hour
  const filterClause = `amqp.annotation.x-opt-enqueued-time > '${Date.now() - 3600 * 1000}'`;
  const receiverAddress = ehConnectionConfig.getReceiverAddress("0");
  const receiverOptions: ReceiverOptions = {
    name: receiverName,
    source: {
      address: receiverAddress,
      filter: {
        "apache.org:selector-filter:string": types.wrap_described(filterClause, 0x468C00000004)
      }
    },
    onSessionError: (context: EventContext) => {
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        console.log(">>>>> [%s] An error occurred for session of receiver '%s': %O.",
          connectionContext.connection.id, receiverName, sessionError);
      }
    }
  };

  const receiver: Receiver = await connectionContext.connection.createReceiver(receiverOptions);
  receiver.on(ReceiverEvents.message, (context: EventContext) => {
    console.log("Received message: %O", context.message);
  });
  receiver.on(ReceiverEvents.receiverError, (context: EventContext) => {
    const receiverError = context.receiver && context.receiver.error;
    if (receiverError) {
      console.log(">>>>> [%s] An error occurred for receiver '%s': %O.",
        connectionContext.connection.id, receiverName, receiverError);
    }
  });
  // sleeping for 2 mins to let the receiver receive messages and then closing it.
  await delay(120000);
  await receiver.close();
  await connectionContext.connection.close();
}

main().catch(err => console.log(err));
