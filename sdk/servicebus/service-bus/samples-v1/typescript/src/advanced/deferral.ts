/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how the defer() function can be used to defer a message for later processing.

  In this sample, we have an application that gets cooking instructions out of order. It uses
  message deferral to defer the instruction that is out of order, and then processes it in order.

  See https://docs.microsoft.com/azure/service-bus-messaging/message-deferral to learn about
  message deferral.
*/

import { ServiceBusClient, ReceiveMode, OnMessage, OnError, delay } from "@azure/service-bus";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

export async function main() {
  await sendMessages();
  await receiveMessage();
}

// Shuffle and send messages
async function sendMessages() {
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString);
  // If sending to a Topic, use `createTopicClient` instead of `createQueueClient`
  const queueClient = sbClient.createQueueClient(queueName);
  const sender = queueClient.createSender();

  const data = [
    { step: 1, title: "Shop" },
    { step: 2, title: "Unpack" },
    { step: 3, title: "Prepare" },
    { step: 4, title: "Cook" },
    { step: 5, title: "Eat" }
  ];
  const promises = new Array();
  for (let index = 0; index < data.length; index++) {
    const message = {
      body: data[index],
      label: "RecipeStep",
      contentType: "application/json"
    };
    // the way we shuffle the message order is to introduce a tiny random delay before each of the messages is sent
    promises.push(
      delay(Math.random() * 30).then(async () => {
        try {
          await sender.send(message);
          console.log("Sent message step:", data[index].step);
        } catch (err) {
          console.log("Error while sending message", err);
        }
      })
    );
  }
  // wait until all the send tasks are complete
  await Promise.all(promises);
  await queueClient.close();
  await sbClient.close();
}

async function receiveMessage() {
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString);

  // If receiving from a Subscription, use `createSubscriptionClient` instead of `createQueueClient`
  const queueClient = sbClient.createQueueClient(queueName);

  const deferredSteps = new Map();
  let lastProcessedRecipeStep = 0;
  try {
    const onMessage: OnMessage = async (brokeredMessage) => {
      if (
        brokeredMessage.label === "RecipeStep" &&
        brokeredMessage.contentType === "application/json"
      ) {
        const message = brokeredMessage.body;
        // now let's check whether the step we received is the step we expect at this stage of the workflow
        if (message.step === lastProcessedRecipeStep + 1) {
          console.log("Process received message:", message);
          lastProcessedRecipeStep++;
          await brokeredMessage.complete();
        } else {
          // if this is not the step we expected, we defer the message, meaning that we leave it in the queue but take it out of
          // the delivery order. We put it aside. To retrieve it later, we remeber its sequence number
          const sequenceNumber = brokeredMessage.sequenceNumber;
          deferredSteps.set(message.step, sequenceNumber);
          console.log("Defer received message:", message);
          await brokeredMessage.defer();
        }
      } else {
        // we dead-letter the message if we don't know what to do with it.
        console.log(
          "Unknown message received, moving it to dead-letter queue ",
          brokeredMessage.body
        );
        await brokeredMessage.deadLetter();
      }
    };
    const onError: OnError = (err) => {
      console.log(">>>>> Error occurred: ", err);
    };

    let receiver = queueClient.createReceiver(ReceiveMode.peekLock);
    receiver.registerMessageHandler(onMessage, onError, { autoComplete: false }); // Disabling autoComplete so we can control when message can be completed, deferred or deadlettered
    await delay(10000);
    await receiver.close();
    console.log("Total number of deferred messages:", deferredSteps.size);

    receiver = queueClient.createReceiver(ReceiveMode.peekLock);
    // Now we process the deferred messages
    while (deferredSteps.size > 0) {
      const step = lastProcessedRecipeStep + 1;
      const sequenceNumber = deferredSteps.get(step);
      const message = await receiver.receiveDeferredMessage(sequenceNumber);
      if (message) {
        console.log("Process deferred message:", message.body);
        await message.complete();
      } else {
        console.log("No message found for step number ", step);
      }
      deferredSteps.delete(step);
      lastProcessedRecipeStep++;
    }
    await queueClient.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
