/*
  This sample demonstrates how the defer() function can be used to defer a message for later processing.

  In this sample, we have an application that gets cooking instructions out of order. It uses
  message deferral to defer the instruction that is out of order, and then processes it in order.

  See https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-deferral to learn about
  message deferral.
*/

import { Namespace, OnMessage, OnError, delay } from "../../lib";

// Define connection string and related Service Bus entity names here
const connectionString = "";
const queueName = "";

async function main(): Promise<void> {
  await sendMessages();
  await receiveMessage();
}

// Shuffle and send messages
async function sendMessages(): Promise<void> {
  const nsSend = Namespace.createFromConnectionString(connectionString);
  // If using Topics, use createTopicClient to send to a topic
  const sendClient = nsSend.createQueueClient(queueName);

  const data = [
    { step: 1, title: "Shop" },
    { step: 2, title: "Unpack" },
    { step: 3, title: "Prepare" },
    { step: 4, title: "Cook" },
    { step: 5, title: "Eat" }
  ];
  try {
    // The way we shuffle the message order is by using the scheduledEnqueueTimeUtc property
    // to schedule the queueing of the message at different times

    const now = Date.now();
    const promises: Promise<any>[] = [];
    for (let index = 0; index < data.length; index++) {
      const message = {
        body: data[index],
        label: "RecipeStep",
        contentType: "application/json",
        scheduledEnqueueTimeUtc: new Date(now + index * 30000)
      };
      promises.push(sendClient.send(message));
    }

    await Promise.all(promises);
  } finally {
    await nsSend.close();
  }
}

async function receiveMessage(): Promise<void> {
  const nsRcv = Namespace.createFromConnectionString(connectionString);

  // If using Topics, use createSubscriptionClient to receive from a topic subscription
  const receiveClient = nsRcv.createQueueClient(queueName);

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
          console.log("Message Received:", message);
          lastProcessedRecipeStep++;
          await brokeredMessage.complete();
        } else {
          // if this is not the step we expected, we defer the message, meaning that we leave it in the queue but take it out of
          // the delivery order. We put it aside. To retrieve it later, we remeber its sequence number
          const sequenceNumber = brokeredMessage.sequenceNumber;
          deferredSteps.set(message.step, sequenceNumber);
          await brokeredMessage.defer();
        }
      } else {
        // we dead-letter the message if we don't know what to do with it.
        console.log(
          "Unknown message recieved, moving it to dead-letter queue ",
          brokeredMessage.body
        );
        await brokeredMessage.deadLetter();
      }
    };
    const onError: OnError = (err) => {
      console.log(">>>>> Error occurred: ", err);
    };

    // Disabling autoComplete so we can control when message can be completed, deferred or deadlettered.
    const rcvHandler = receiveClient.receive(onMessage, onError, { autoComplete: false });
    await delay(10000);
    console.log("Deferred Messages count:", deferredSteps.size);
    // Now we process the deferred messages
    while (deferredSteps.size > 0) {
      const step = lastProcessedRecipeStep + 1;
      const sequenceNumber = deferredSteps.get(step);
      const message = await receiveClient.receiveDeferredMessage(sequenceNumber);
      if (message) {
        console.log("Received Deferral Message:", message.body);
        await message.complete();
      } else {
        console.log("No message found for step number ", step);
      }
      deferredSteps.delete(step);
      lastProcessedRecipeStep++;
    }
    await rcvHandler.stop();
  } finally {
    await nsRcv.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
