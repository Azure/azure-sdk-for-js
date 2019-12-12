// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* 
 Setup: Enter your storage account name and shared key in main()
*/

const { QueueServiceClient, StorageSharedKeyCredential } = require("@azure/storage-queue");

const { runSample } = require("./sampleHelpers");

async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only avaiable in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  // Enter your proxy information
  const proxyOptions = {
    host: process.env.PROXY_HOST || "",
    port: parseInt(process.env.PROXY_PORT || "3128"),
    username: process.env.PROXY_USERNAME || "",
    password: process.env.PROXY_PASSWORD || ""
  };

  if (proxyOptions.host === "") {
    console.warn("Proxy information not provided, but it is required to run this sample. Exiting.");
    return;
  }

  const queueServiceClient = new QueueServiceClient(
    `https://${account}.queue.core.windows.net`,
    sharedKeyCredential,
    {
      // if proxy is undefined, the library tries to load the proxy settings from the environment variables like HTTP_PROXY
      proxyOptions
    }
  );

  // Create a new queue
  const queueName = `newqueue${new Date().getTime()}`;
  const queueClient = queueServiceClient.getQueueClient(queueName);
  const createQueueResponse = await queueClient.create();
  console.log(
    `Create queue ${queueName} successfully, service assigned request Id: ${createQueueResponse.requestId}`
  );

  // Delete the queue.
  const deleteQueueResponse = await queueClient.delete();
  console.log(
    `Delete queue successfully, service assigned request Id: ${deleteQueueResponse.requestId}`
  );
}

runSample(main).catch((err) => {
  console.error("Error running sample:", err.message);
});

module.exports = { main };
