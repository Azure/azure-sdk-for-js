// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as dotenv from "dotenv";
dotenv.config(); // Optional for loading environment configuration from a .env (config) file
import { Sender, SenderOptions, EventContext, Message, Delivery } from "rhea-promise";
import { authenticate, connectionContext, connectionConfig, path } from "./cbsAuth";

async function main(): Promise<void> {
  await authenticate(`${connectionConfig.endpoint}${path}`);
  const senderName = "sender-1";
  const senderOptions: SenderOptions = {
    name: senderName,
    target: {
      // Address for EventHub Sender, it can be "<EventHubName>" or "<EventHubName>/Partitions/<PartitionId>"
      // For ServiceBus Queue, it will be "<QueueName>"
      address: `${path}`
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
