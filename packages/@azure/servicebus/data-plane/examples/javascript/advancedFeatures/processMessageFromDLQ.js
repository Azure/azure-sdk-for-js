/*
  This sample demonstrates retrieving a message from a dead letter queue, editing it and
  sending it back to the main queue.

  Prior to running this sample, run the sample in movingMessagesToDLQ.js file to move a message
  to the Dead Letter Queue
*/

const Namespace = require("@azure/service-bus").Namespace;

// Define connection string and related Service Bus entity names here
const connectionString = "";
const queueName = "";

const ns = Namespace.createFromConnectionString(connectionString);
const deadLetterQueueName = Namespace.getDeadLetterQueuePath(queueName);
// const deadLetterQueueName = Namespace.getDeadLetterTopicPath(topicName, subscriptionName);



async function main() {
  try {
    await processDeadletterMessageQueue();
  } finally {
    await ns.close();
  }
}

async function processDeadletterMessageQueue() {
  const client = ns.createQueueClient(deadLetterQueueName);
  const receiver = client.getReceiver();

  const message = await receiver.receiveBatch(1);

  if (message.length > 0) {
    console.log(">>>>> Received the message from DLQ - ", message[0].body);

    // Do something with the message retrieved from DLQ
    await fixAndResendMessage(message[0]);

    // Mark message as complete/processed.
    await message[0].complete();
  } else {
    console.log(">>>> Error: No messages were received from the DLQ.");
  }

  await client.close();
}

// Send repaired message back to the current queue / topic
async function fixAndResendMessage(oldMessage) {
  // If using Topics, use createTopicClient to send to a topic
  const client = ns.createQueueClient(queueName);
  const sender = client.getSender();

  // Inspect given message and make any changes if necessary
  const repairedMessage = oldMessage.clone();

  console.log(">>>>> Cloning the message from DLQ and resending it - ", oldMessage.body);

  await sender.send(repairedMessage);
  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
