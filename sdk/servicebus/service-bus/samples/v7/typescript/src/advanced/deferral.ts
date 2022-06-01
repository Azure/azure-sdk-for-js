// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT Licence.

/**
 * This sample demonstrates how the deferMessage() function can be used to defer a message for later processing.
 *
 * In this sample, we have an application that gets cooking instructions out of order. It uses
 * message deferral to defer the instruction that is out of order, and then processes it in order.
 *
 * See https://docs.microsoft.com/azure/service-bus-messaging/message-deferral to learn about
 * message deferral.
 *
 * @summary Demonstrates how to defer a message for later processing.
 */

import {
  ServiceBusClient,
  delay,
  ProcessErrorArgs,
  ServiceBusReceivedMessage,
  ServiceBusMessage,
} from "@azure/service-bus";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

export async function main() {
  await sendMessages();
  await receiveMessage();
}

// Shuffle and send messages
async function sendMessages() {
  const sbClient = new ServiceBusClient(connectionString);
  // createSender() can also be used to create a sender for a topic.
  const sender = sbClient.createSender(queueName);

  const data = [
    { step: 1, title: "Shop" },
    { step: 2, title: "Unpack" },
    { step: 3, title: "Prepare" },
    { step: 4, title: "Cook" },
    { step: 5, title: "Eat" },
  ];
  const promises = new Array();
  for (let index = 0; index < data.length; index++) {
    const message: ServiceBusMessage = {
      body: data[index],
      subject: "RecipeStep",
      contentType: "application/json",
    };
    // the way we shuffle the message order is to introduce a tiny random delay before each of the messages is sent
    promises.push(
      delay(Math.random() * 30).then(async () => {
        try {
          await sender.sendMessages(message);
          console.log("Sent message step:", data[index].step);
        } catch (err: any) {
          console.log("Error while sending message", err);
        }
      })
    );
  }
  // wait until all the send tasks are complete
  await Promise.all(promises);
  await sender.close();
  await sbClient.close();
}

async function receiveMessage() {
  const sbClient = new ServiceBusClient(connectionString);

  // If receiving from a subscription, you can use the createReceiver(topicName, subscriptionName) overload
  let receiver = sbClient.createReceiver(queueName);

  const deferredSteps = new Map();
  let lastProcessedRecipeStep = 0;
  try {
    const processMessage = async (brokeredMessage: ServiceBusReceivedMessage) => {
      if (
        brokeredMessage.subject === "RecipeStep" &&
        brokeredMessage.contentType === "application/json"
      ) {
        const message = brokeredMessage.body;
        // now let's check whether the step we received is the step we expect at this stage of the workflow
        if (message.step === lastProcessedRecipeStep + 1) {
          console.log("Process received message:", message);
          lastProcessedRecipeStep++;
          await receiver.completeMessage(brokeredMessage);
        } else {
          // if this is not the step we expected, we defer the message, meaning that we leave it in the queue but take it out of
          // the delivery order. We put it aside. To retrieve it later, we remeber its sequence number
          const sequenceNumber = brokeredMessage.sequenceNumber;
          deferredSteps.set(message.step, sequenceNumber);
          console.log("Defer received message:", message);
          await receiver.deferMessage(brokeredMessage);
        }
      } else {
        // we dead-letter the message if we don't know what to do with it.
        console.log(
          "Unknown message received, moving it to dead-letter queue ",
          brokeredMessage.body
        );
        await receiver.deadLetterMessage(brokeredMessage);
      }
    };
    const processError = async (args: ProcessErrorArgs) => {
      console.log(`>>>>> Error from error source ${args.errorSource} occurred: `, args.error);
    };

    receiver.subscribe(
      { processMessage, processError },
      {
        autoCompleteMessages: false,
      }
    ); // Disabling autoCompleteMessages so we can control when message can be completed, deferred or deadlettered
    await delay(10000);
    await receiver.close();
    console.log("Total number of deferred messages:", deferredSteps.size);

    receiver = sbClient.createReceiver(queueName);
    // Now we process the deferred messages
    while (deferredSteps.size > 0) {
      const step = lastProcessedRecipeStep + 1;
      const sequenceNumber = deferredSteps.get(step);
      const [message] = await receiver.receiveDeferredMessages(sequenceNumber);
      if (message) {
        console.log("Process deferred message:", message.body);
        await receiver.completeMessage(message);
      } else {
        console.log("No message found for step number ", step);
      }
      deferredSteps.delete(step);
      lastProcessedRecipeStep++;
    }
    await receiver.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Deferral Sample - Error occurred: ", err);
  process.exit(1);
});
