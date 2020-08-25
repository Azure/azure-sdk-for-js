/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates usage of SessionState.

  We take for example the context of an online shopping app and see how we can use Session State
  to implement the maintaining of shopping cart information completely on server side i.e.,
  remembering the users' shopped items even if they leave the site and return later.

  The scenario in sample walks through user activity of two customers Alice and Bob.
  Alice adds 3 items to the shopping cart and checks out, whereas Bob adds 3 items and leaves without
  checking out to likely return later.
  The session state keeps track of the cart items accordingly.

  Setup: To run this sample, you would need session enabled Queue/Subscription.

  See https://docs.microsoft.com/azure/service-bus-messaging/message-sessions#message-session-state
  to learn about session state.
*/

import { ServiceBusClient, ReceiveMode } from "@azure/service-bus";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";
const sbClient = ServiceBusClient.createFromConnectionString(connectionString);

export async function main() {
  try {
    await runScenario();
  } finally {
    await sbClient.close();
  }
}

async function runScenario() {
  // User activity data for Alice and Bob
  const shoppingEventsDataAlice = [
    { event_name: "Add Item", event_details: "Milk" },
    { event_name: "Add Item", event_details: "Bread" },
    { event_name: "Add Item", event_details: "Eggs" },
    { event_name: "Checkout", event_details: "Success" }
  ];

  const shoppingEventsDataBob = [
    { event_name: "Add Item", event_details: "Pencil" },
    { event_name: "Add Item", event_details: "Paper" },
    { event_name: "Add Item", event_details: "Stapler" }
  ];

  // Simulating user events
  await sendMessagesForSession(shoppingEventsDataAlice, "alice");
  await sendMessagesForSession(shoppingEventsDataBob, "bob");

  await processMessageFromSession("alice");
  await processMessageFromSession("alice");

  // Displaying snapshot of Alice's shopping cart (SessionState) after processing 2 events
  // This will show two items
  await getSessionState("alice");

  await processMessageFromSession("alice");
  await processMessageFromSession("alice");
  await processMessageFromSession("bob");
  await processMessageFromSession("bob");
  await processMessageFromSession("bob");

  // Displaying snapshot of Alice's shopping cart (SessionState) after processing remaining events
  // This will show null as Alice checksout and cart is cleared
  await getSessionState("alice");
  // Displaying snapshot of Bob's shopping cart (SessionState) after processing all the events
  // This will show three items
  await getSessionState("bob");
}

async function getSessionState(sessionId: string) {
  // If receiving from a Subscription, use `createSubscriptionClient` instead of `createQueueClient`
  const queueClient = sbClient.createQueueClient(queueName);

  const sessionReceiver = queueClient.createReceiver(ReceiveMode.peekLock, {
    sessionId: sessionId
  });

  const sessionState = await sessionReceiver.getState();
  if (sessionState) {
    // Get list of items
    console.log(`\nItems in cart for ${sessionId}: ${sessionState}\n`);
  } else {
    console.log(`\nNo Items were added to cart for ${sessionId}\n`);
  }

  await sessionReceiver.close();
  await queueClient.close();
}

async function sendMessagesForSession(shoppingEvents: any[], sessionId: string) {
  // If sending to a Topic, use `createTopicClient` instead of `createQueueClient`
  const queueClient = sbClient.createQueueClient(queueName);
  const sender = queueClient.createSender();

  for (let index = 0; index < shoppingEvents.length; index++) {
    const message = {
      sessionId: sessionId,
      body: shoppingEvents[index],
      label: "Shopping Step"
    };
    await sender.send(message);
  }
  await queueClient.close();
}

async function processMessageFromSession(sessionId: string) {
  // If receiving from a Subscription, use `createSubscriptionClient` instead of `createQueueClient`
  const queueClient = sbClient.createQueueClient(queueName);

  const sessionReceiver = queueClient.createReceiver(ReceiveMode.peekLock, {
    sessionId: sessionId
  });

  const messages = await sessionReceiver.receiveMessages(1, 10);

  // Custom logic for processing the messages
  if (messages.length > 0) {
    // Update sessionState
    if (messages[0].body.event_name === "Checkout") {
      // Clear cart if customer exits, else retain items.
      await sessionReceiver.setState(JSON.stringify([]));
    } else if (messages[0].body.event_name === "Add Item") {
      // Update cart if customer adds items and store it in session state.
      const currentSessionState = await sessionReceiver.getState();
      let newSessionState: string[] = [];
      if (currentSessionState) {
        newSessionState = JSON.parse(currentSessionState);
      }
      newSessionState.push(messages[0].body.event_details);
      await sessionReceiver.setState(JSON.stringify(newSessionState));
    }

    console.log(
      `Received message: Customer '${sessionReceiver.sessionId}': '${messages[0].body.event_name} ${messages[0].body.event_details}'`
    );
    await messages[0].complete();
  } else {
    console.log(`No events were received for Customer: ${sessionId}\n`);
  }

  await sessionReceiver.close();
  await queueClient.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
