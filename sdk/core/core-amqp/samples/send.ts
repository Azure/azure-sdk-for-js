/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to send messages/events to Service Bus/Event Hubs.
*/

import {
  ConnectionContextBase,
  CreateConnectionContextBaseParameters,
  CbsResponse,
  ConnectionConfig,
  TokenType,
  SharedKeyCredential
} from "@azure/core-amqp";

import { Sender, SenderOptions, EventContext, Message, Delivery } from "rhea-promise";

// Define connection string and related entity path here
const connectionString = "";
const path = "";

const connectionConfig = ConnectionConfig.create(connectionString, path);
const parameters: CreateConnectionContextBaseParameters = {
  config: connectionConfig,
  connectionProperties: {
    product: "MSJSClient",
    userAgent: "/js-core-amqp",
    version: "0.1.0"
  }
};
const connectionContext = ConnectionContextBase.create(parameters);

async function authenticate(
  audience: string,
  closeConnection: boolean = false
): Promise<CbsResponse> {
  await connectionContext.cbsSession.init();
  const sharedTokenCredential = <SharedKeyCredential>connectionContext.tokenCredential;
  const tokenObject = sharedTokenCredential.getToken(audience);
  const result = await connectionContext.cbsSession.negotiateClaim(
    audience,
    tokenObject,
    TokenType.CbsTokenTypeSas
  );
  console.log("Result is: %O", result);
  if (closeConnection) {
    await connectionContext.connection.close();
    console.log("Successfully closed the connection.");
  }
  return result;
}

async function main(): Promise<void> {
  await authenticate(`${connectionConfig.endpoint}${connectionConfig.entityPath}`, false);
  const senderName = "sender-1";
  const senderOptions: SenderOptions = {
    name: senderName,
    target: {
      // Address for EventHub Sender, it can be "<EventHubName>" or "<EventHubName>/Partitions/<PartitionId>"
      // For ServiceBus Queue, it will be "<QueueName>"
      address: `${connectionConfig.entityPath}`
    },
    onError: (context: EventContext) => {
      const senderError = context.sender && context.sender.error;
      if (senderError) {
        console.log(
          "[%s] An error occurred for sender '%s': %O.",
          connectionContext.connection.id,
          senderName,
          senderError
        );
      }
    },
    onSessionError: (context: EventContext) => {
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        console.log(
          "[%s] An error occurred for session of sender '%s': %O.",
          connectionContext.connection.id,
          senderName,
          sessionError
        );
      }
    }
  };

  const sender: Sender = await connectionContext.connection.createSender(senderOptions);
  const message: Message = {
    body: "Hello World!!",
    message_id: "12343434343434"
  };

  const delivery: Delivery = await sender.send(message);
  console.log("[%s] Delivery id: ", connectionContext.connection.id, delivery.id);

  await sender.close();
  await connectionContext.connection.close();
}

main().catch((err) => console.log(err));
