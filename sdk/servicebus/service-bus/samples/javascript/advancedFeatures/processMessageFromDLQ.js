/*
  This sample demonstrates retrieving a message from a dead letter queue, editing it and
  sending it back to the main queue.

  Prior to running this sample, run the sample in movingMessagesToDLQ.js file to move a message
  to the Dead Letter Queue
*/

const { ServiceBusClient, ReceiveMode } = require("@azure/service-bus");

// Define connection string and related Service Bus entity names here
const connectionString = "";
const queueName = "";

// If deadlettered messages from Subscription, use `TopicClient.getDeadLetterTopicPath` instead
const deadLetterQueueName = QueueClient.getDeadLetterQueuePath(queueName);
const ns = ServiceBusClient.createFromConnectionString(connectionString);

async function main() {
  try {
    await processDeadletterMessageQueue();
  } finally {
    await ns.close();
  }
}

async function processDeadletterMessageQueue() {
  const client = ns.createQueueClient(deadLetterQueueName);
  const receiver = client.createReceiver(ReceiveMode.peekLock);

  const messages = await receiver.receiveMessages(1);

  if (messages.length > 0) {
    console.log(">>>>> Received the message from DLQ - ", messages[0].body);

    // Do something with the message retrieved from DLQ
    await fixAndResendMessage(messages[0]);

    // Mark message as complete/processed.
    await messages[0].complete();
  } else {
    console.log(">>>> Error: No messages were received from the DLQ.");
  }

  await client.close();
}

// Send repaired message back to the current queue / topic
async function fixAndResendMessage(oldMessage) {
  // If sending to a Topic, use `createTopicClient` instead of `createQueueClient`
  const client = ns.createQueueClient(queueName);
  const sender = client.createSender();

  // Inspect given message and make any changes if necessary
  const repairedMessage = oldMessage.clone();

  console.log(">>>>> Cloning the message from DLQ and resending it - ", oldMessage.body);

  await sender.sendMessage(repairedMessage);
  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
