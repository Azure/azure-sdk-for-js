// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary use `QueueServiceClient` to create a queue and send/receive/delete messages
 */

const { QueueServiceClient, StorageSharedKeyCredential } = require("@azure/storage-queue");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  // ONLY AVAILABLE IN NODE.JS RUNTIME
  // If you are using the browser, you can use the InteractiveBrowserCredential provided via @azure/identity or any other feasible implementation of TokenCredential.
  // DefaultAzureCredential will first look for Azure Active Directory (AAD)
  // client secret credentials in the following environment variables:
  //
  // - AZURE_TENANT_ID: The ID of your AAD tenant
  // - AZURE_CLIENT_ID: The ID of your AAD app registration (client)
  // - AZURE_CLIENT_SECRET: The client secret for your AAD app registration
  //
  // If those environment variables aren't found and your application is deployed
  // to an Azure VM or App Service instance, the managed service identity endpoint
  // will be used as a fallback authentication source.
  // Only available in Node.js runtime
  // const defaultAzureCredential = new DefaultAzureCredential();

  // You can find more TokenCredential implementations in the [@azure/identity](https://www.npmjs.com/package/@azure/identity) library
  // to use client secrets, certificates, or managed identities for authentication.

  // Use AnonymousCredential when url already includes a SAS signature
  // const anonymousCredential = new AnonymousCredential();

  // List queues
  const queueServiceClient = new QueueServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.queue.core.windows.net`,
    sharedKeyCredential
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
    `Created queue ${queueClient.name} successfully, service assigned request ID: ${createQueueResponse.requestId}`
  );

  // Send a message into the queue using the sendMessage method.
  const enqueueQueueResponse = await queueClient.sendMessage("Hello World!");
  console.log(
    `Sent message successfully, service assigned message ID: ${enqueueQueueResponse.messageId}, service assigned request ID: ${enqueueQueueResponse.requestId}`
  );

  // Peek a message using peekMessages method.
  const peekQueueResponse = await queueClient.peekMessages();
  console.log(`The peeked message is: ${peekQueueResponse.peekedMessageItems[0].messageText}`);

  // You de-queue a message in two steps. Call GetMessage at which point the message becomes invisible to any other code reading messages
  // from this queue for a default period of 30 seconds. To finish removing the message from the queue, you call DeleteMessage.
  // This two-step process ensures that if your code fails to process a message due to hardware or software failure, another instance
  // of your code can get the same message and try again.
  const dequeueResponse = await queueClient.receiveMessages();
  if (dequeueResponse.receivedMessageItems.length == 1) {
    const dequeueMessageItem = dequeueResponse.receivedMessageItems[0];
    console.log(`Processing & deleting message with content: ${dequeueMessageItem.messageText}`);
    const deleteMessageResponse = await queueClient.deleteMessage(
      dequeueMessageItem.messageId,
      dequeueMessageItem.popReceipt
    );
    console.log(
      `Deleted message successfully, service assigned request ID: ${deleteMessageResponse.requestId}`
    );
  }

  // Delete the queue.
  const deleteQueueResponse = await queueClient.delete();
  console.log(
    `Deleted queue ${queueClient.name} successfully, service assigned request ID: ${deleteQueueResponse.requestId}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
