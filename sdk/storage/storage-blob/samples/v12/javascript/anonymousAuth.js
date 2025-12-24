// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary authenticate anonymously using a SAS-encoded URL
 */

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient, AnonymousCredential } = require("@azure/storage-blob");

// Load the .env file if it exists
require("dotenv/config");

async function getAccountSas(accountName) {
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

async function main() {
  // Enter your storage account name
  const accountName = process.env.ACCOUNT_NAME;
  if (!accountName) {
    throw new Error("ACCOUNT_NAME environment variable is not set.");
  }

  // List containers
  const blobServiceClient = new BlobServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or the account supports public access
    `https://${accountName}.blob.core.windows.net?${await getAccountSas(accountName)}`,
    new AnonymousCredential(),
  );

  console.log("Containers:");
  for await (const container of blobServiceClient.listContainers()) {
    console.log(`- ${container.name}`);
  }

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const createContainerResponse = await containerClient.create();
  console.log(`Created container ${containerName} successfully`, createContainerResponse.requestId);

  // Delete container
  await containerClient.delete();

  console.log("Deleted container:", containerClient.containerName);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
