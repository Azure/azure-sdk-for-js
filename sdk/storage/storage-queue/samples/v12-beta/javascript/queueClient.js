// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary use `QueueServiceClient` to create a queue and send/receive/delete messages
 */

const { QueueServiceClient } = require("@azure/storage-queue");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  // Enter your storage account name
  const accountName = process.env.ACCOUNT_NAME;
  if (!accountName) {
    throw new Error("ACCOUNT_NAME environment variable is not set.");
  }

  // List queues
  const queueServiceClient = new QueueServiceClient(
    `https://${accountName}.queue.core.windows.net`,
    new DefaultAzureCredential(),
  );

  console.log(`Queues`);
  for await (const queue of queueServiceClient.listQueues()) {
    console.log(`- ${queue.name}`);
  }

  // Create a new queue.
  const queueName = `newqueue${new Date().getTime()}`;
  const queueClient = queueServiceClient.getQueueClient(queueName);
  const createQueueResponse = await queueClient.create();
  console.log(
    `Created queue ${queueClient.name} successfully, service assigned request ID: ${createQueueResponse.requestId}`,
  );

  // Send three messages into the queue using the sendMessage method.
  const messages = ["First message", "Second Message", "Third Message"];
  for (let i = 0; i < messages.length; i++) {
    const enqueueQueueResponse = await queueClient.sendMessage(messages[i]);
    console.log(
      `Sent message successfully, service assigned message ID: ${enqueueQueueResponse.messageId}, service assigned request ID: ${enqueueQueueResponse.requestId}`,
    );
  }

  // Peek a message using peekMessages method.
  const peekQueueResponse = await queueClient.peekMessages();
  console.log(`The peeked message is: ${peekQueueResponse.peekedMessageItems[0].messageText}`);

  // You de-queue a message in two steps. Call GetMessage at which point the message becomes invisible to any other code reading messages
  // from this queue for a default period of 30 seconds. To finish removing the message from the queue, you call DeleteMessage.
  // This two-step process ensures that if your code fails to process a message due to hardware or software failure, another instance
  // of your code can get the same message and try again.
  const dequeueResponse = await queueClient.receiveMessages();
  if (dequeueResponse.receivedMessageItems.length === 1) {
    const dequeueMessageItem = dequeueResponse.receivedMessageItems[0];
    console.log(`Processing & deleting message with content: ${dequeueMessageItem.messageText}`);
    const deleteMessageResponse = await queueClient.deleteMessage(
      dequeueMessageItem.messageId,
      dequeueMessageItem.popReceipt,
    );
    console.log(
      `Deleted message successfully, service assigned request ID: ${deleteMessageResponse.requestId}`,
    );
  }

  // You can also receive a batch of messages (up to 32) in one call by specifying options.numberOfMessages.
  const batchDequeueResponse = await queueClient.receiveMessages({ numberOfMessages: 2 });
  if (batchDequeueResponse.receivedMessageItems.length === 2) {
    for (let i = 0; i < batchDequeueResponse.receivedMessageItems.length; i++) {
      const dequeueMessageItem = batchDequeueResponse.receivedMessageItems[i];
      console.log(`Processing & deleting message with content: ${dequeueMessageItem.messageText}`);
      const deleteMessageResponse = await queueClient.deleteMessage(
        dequeueMessageItem.messageId,
        dequeueMessageItem.popReceipt,
      );
      console.log(
        `Deleted message successfully, service assigned request ID: ${deleteMessageResponse.requestId}`,
      );
    }
  }

  // Delete the queue.
  const deleteQueueResponse = await queueClient.delete();
  console.log(
    `Deleted queue ${queueClient.name} successfully, service assigned request ID: ${deleteQueueResponse.requestId}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
