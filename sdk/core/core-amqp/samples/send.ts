/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to send messages/events to Service Bus/Event Hubs
  by authenticating the sender link using the shared key information in the connection string
*/

import {
  ConnectionContextBase,
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
const parameters = {
  config: connectionConfig,
  connectionProperties: {
    product: "MSJSClient",
    userAgent: "/js-core-amqp",
    version: "0.1.0"
  }
};
const connectionContext = ConnectionContextBase.create(parameters);

async function authenticate(audience: string): Promise<CbsResponse> {
  await connectionContext.cbsSession.init();
  // We use the shared key information in the connection string to perform the authentication.
  // If you want to use Azure Active Directory, then refer `cbsAuthUsingAad.ts` sample.
  const sharedKeyCredential = <SharedKeyCredential>connectionContext.tokenCredential;
  const tokenObject = sharedKeyCredential.getToken(audience);
  const result = await connectionContext.cbsSession.negotiateClaim(
    audience,
    tokenObject,
    TokenType.CbsTokenTypeSas
  );
  console.log("Result is: %O", result);
  return result;
}

async function main(): Promise<void> {
  await authenticate(`${connectionConfig.endpoint}${connectionConfig.entityPath}`);
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
