// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as dotenv from "dotenv";
dotenv.config(); // Optional for loading environment configuration from a .env (config) file
import { Receiver, ReceiverOptions, EventContext, ReceiverEvents, delay, types } from "rhea-promise";
import { authenticate, connectionContext, connectionConfig, path } from "./cbsAuth";

async function main(): Promise<void> {
  await authenticate(`${connectionConfig.endpoint}${path}`);
  const receiverName = "receiver-1";
  const filterClause = `amqp.annotation.x-opt-enqueued-time > '${Date.now() - 3600 * 1000}'`; // Get messages from the past hour
  const receiverAddress = `${path}/ConsumerGroups/$default/Partitions/0`; // For ServiceBus "<QueueName>"
  const receiverOptions: ReceiverOptions = {
    name: receiverName,
    source: {
      address: receiverAddress,
      filter: { // May not be required for ServiceBus. The current example is for EventHubs.
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
