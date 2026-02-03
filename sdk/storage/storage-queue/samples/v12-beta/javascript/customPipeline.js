// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary use custom HTTP pipeline options when connecting to the service
 */

const { QueueServiceClient, newPipeline } = require("@azure/storage-queue");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  // Enter your storage account name
  const accountName = process.env.ACCOUNT_NAME;
  if (!accountName) {
    throw new Error("ACCOUNT_NAME environment variable is not set.");
  }

  const pipeline = newPipeline(new DefaultAzureCredential(), {
    // httpClient: MyHTTPClient, // A customized HTTP client implementing IHttpClient interface
    retryOptions: { maxTries: 4 }, // Retry options
    userAgentOptions: { userAgentPrefix: "Sample V1.0.0" }, // Customized telemetry string
    keepAliveOptions: {
      // Keep alive is enabled by default, disable keep alive by setting false
      enable: false,
    },
  });

  // List queues
  const queueServiceClient = new QueueServiceClient(
    `https://${accountName}.queue.core.windows.net`,
    pipeline,
  );

  let i = 1;
  for await (const queue of queueServiceClient.listQueues()) {
    console.log(`Queue ${i++}: ${queue.name}`);
  }

  // Create a queue
  const queueName = `newqueue${new Date().getTime()}`;
  const queueClient = queueServiceClient.getQueueClient(queueName);

  const createQueueResponse = await queueClient.create();
  console.log(`Created queue ${queueName} successfully`, createQueueResponse.requestId);

  // Delete queue
  await queueClient.delete();

  console.log("Deleted queue:", queueClient.name);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
