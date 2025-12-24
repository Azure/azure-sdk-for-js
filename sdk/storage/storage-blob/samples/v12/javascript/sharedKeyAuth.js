// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary authenticate using an account name and a static key
 */

const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv/config");

async function getAccountKey(accountName) {
  const accountKey = process.env.ACCOUNT_KEY;
  if (accountKey) {
    return accountKey;
  }
  const subscriptionId = process.env.SUBSCRIPTION_ID;
  const resourceGroupName = process.env.RESOURCE_GROUP;
  if (!subscriptionId || !resourceGroupName || !accountName) {
    throw new Error(
      "Either ACCOUNT_KEY or SUBSCRIPTION_ID + RESOURCE_GROUP + ACCOUNT_NAME environment variable is required.",
    );
  }
  const mgmtClient = new StorageManagementClient(new DefaultAzureCredential(), subscriptionId);
  const { keys } = await mgmtClient.storageAccounts.listKeys(resourceGroupName, accountName);
  const key = keys?.[0].value;
  if (!key) {
    throw new Error("Cannot get account key from storage account");
  }
  return key;
}

async function main() {
  // Enter your storage account name
  const accountName = process.env.ACCOUNT_NAME;
  if (!accountName) {
    throw new Error("ACCOUNT_NAME environment variable is not set.");
  }

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    await getAccountKey(accountName),
  );

  // List containers
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential,
  );

  let i = 1;
  for await (const container of blobServiceClient.listContainers()) {
    console.log(`Container ${i++}: ${container.name}`);
  }

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const createContainerResponse = await containerClient.create();
  console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);

  // Delete container
  await containerClient.delete();

  console.log("deleted container");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
