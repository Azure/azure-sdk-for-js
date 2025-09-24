// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary authenticate with the storage service using a connection string
 */

const { BlobServiceClient } = require("@azure/storage-blob");
const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv/config");

async function getConnectionString() {
  // Create Blob Service Client from Account connection string or SAS connection string
  // Account connection string example - `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
  // SAS connection string example - `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
  const cs = process.env.STORAGE_CONNECTION_STRING;
  if (cs) {
    return cs;
  }
  const accountName = process.env.ACCOUNT_NAME;
  const subscriptionId = process.env.SUBSCRIPTION_ID;
  const resourceGroupName = process.env.RESOURCE_GROUP;
  if (!accountName || !subscriptionId || !resourceGroupName) {
    throw new Error(
      "Either STORAGE_CONNECTION_STRING or ACCOUNT_NAME + SUBSCRIPTION_ID + RESOURCE_GROUP environment variable is required.",
    );
  }
  const mgmtClient = new StorageManagementClient(new DefaultAzureCredential(), subscriptionId);
  const { primaryEndpoints } = await mgmtClient.storageAccounts.getProperties(
    resourceGroupName,
    accountName,
  );
  const blobEndpoint = primaryEndpoints?.blob;
  if (!blobEndpoint) {
    throw new Error("Cannot get blob endpoint from storage account");
  }
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
  const connectionString = `BlobEndpoint=${blobEndpoint};SharedAccessSignature=${accountSasToken}`;
  return connectionString;
}

async function main() {
  // Note - Account connection string can only be used in node.
  const blobServiceClient = BlobServiceClient.fromConnectionString(await getConnectionString());

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
