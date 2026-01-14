// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary authenticate anonymously using a SAS-encoded URL
 * @azsdk-weight 85
 */

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import { QueueServiceClient, AnonymousCredential } from "@azure/storage-queue";

// Load the .env file if it exists
import "dotenv/config";

async function getAccountSas(accountName: string): Promise<string> {
  const sas = process.env.ACCOUNT_SAS;
  if (sas) {
    return sas;
  }
  const subscriptionId = process.env.SUBSCRIPTION_ID;
  const resourceGroupName = process.env.RESOURCE_GROUP;
  if (!subscriptionId || !resourceGroupName) {
    throw new Error(
      "Either STORAGE_CONNECTION_STRING or ACCOUNT_NAME + SUBSCRIPTION_ID + RESOURCE_GROUP environment variable is required.",
    );
  }
  const mgmtClient = new StorageManagementClient(new DefaultAzureCredential(), subscriptionId);
  const { accountSasToken } = await mgmtClient.storageAccounts.listAccountSAS(
    resourceGroupName,
    accountName,
    {
      permissions: "rwdlacup",
      services: "bfqt",
      resourceTypes: "sco",
      keyToSign: "key2",
      sharedAccessExpiryTime: new Date(Date.now() + 60 * 1000),
    },
  );
  if (!accountSasToken) {
    throw new Error("Cannot get SAS token from storage account");
  }
  return accountSasToken;
}

async function main(): Promise<void> {
  // Enter your storage account name
  const accountName = process.env.ACCOUNT_NAME;
  if (!accountName) {
    throw new Error("ACCOUNT_NAME environment variable is not set.");
  }

  // List queues
  const queueServiceClient = new QueueServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or the account supports public access
    `https://${accountName}.queue.core.windows.net?${await getAccountSas(accountName)}`,
    new AnonymousCredential(),
  );

  console.log("Queues:");
  for await (const queue of queueServiceClient.listQueues()) {
    console.log(`- ${queue.name}`);
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
