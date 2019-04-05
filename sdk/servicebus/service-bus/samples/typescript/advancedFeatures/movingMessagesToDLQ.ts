/*
    This sample demonstrates scenarios as to how a Service Bus message can be explicitly moved to
    the DLQ. For other implicit ways when Service Bus messages get moved to DLQ, refer to -
    https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues

    Run processMessagesInDLQ example after this to see how the messages in DLQ can be reprocessed.
*/

import { ServiceBusClient, ReceiveMode } from "../../../src";

// Define connection string and related Service Bus entity names here
const connectionString = "";
const queueName = "";
const ns: ServiceBusClient = ServiceBusClient.createFromConnectionString(connectionString);

async function main(): Promise<void> {
  try {
    // Sending a message to ensure that there is atleast one message in the main queue
    await sendMessage();

    await receiveMessage();
  } finally {
    await ns.close();
  }
}

async function sendMessage(): Promise<void> {
  // If sending to a Topic, use `createTopicClient` instead of `createQueueClient`
  const client = ns.createQueueClient(queueName);
  const sender = client.createSender();

  const message = {
    body: { name: "Creamy Chicken Pasta", type: "Dinner" },
    contentType: "application/json",
    label: "Recipe"
  };
  await sender.sendMessage(message);
  await client.close();
}

async function receiveMessage(): Promise<void> {
  // If receiving from a Subscription, use `createSubscriptionClient` instead of `createQueueClient`
  const client = ns.createQueueClient(queueName);
  const receiver = client.createReceiver(ReceiveMode.peekLock);

  const messages = await receiver.receiveMessages(1);

  if (messages.length) {
    console.log(
      ">>>>> Deadletter the one message received from the main queue - ",
      messages[0].body
    );
    // Deadletter the message received
    await messages[0].deadLetter({
      deadletterReason: "Incorrect Recipe type",
      deadLetterErrorDescription: "Recipe type does not  match preferences."
    });
  } else {
    console.log(">>>> Error: No messages were received from the main queue.");
  }

  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
