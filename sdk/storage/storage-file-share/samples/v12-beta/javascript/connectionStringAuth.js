// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary authenticate with the storage service using a connection string
 */

const { ShareServiceClient } = require("@azure/storage-file-share");
const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv/config");

async function getConnectionString() {
  // Create File Service Client from Account connection string or SAS connection string
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
  const fileEndpoint = primaryEndpoints?.file;
  if (!fileEndpoint) {
    throw new Error("Cannot get file endpoint from storage account");
  }
  const { accountSasToken } = await mgmtClient.storageAccounts.listAccountSAS(
    resourceGroupName,
    accountName,
    {
      permissions: "rwdlacup",
      services: "f",
      resourceTypes: "sco",
      keyToSign: "key2",
      sharedAccessExpiryTime: new Date(Date.now() + 60 * 1000),
    },
  );
  if (!accountSasToken) {
    throw new Error("Cannot get SAS token from storage account");
  }
  const connectionString = `FileEndpoint=${fileEndpoint};SharedAccessSignature=${accountSasToken}`;
  return connectionString;
}

async function main() {
  // Note - Account connection string can only be used in node.
  const serviceClient = ShareServiceClient.fromConnectionString(await getConnectionString());

  console.log("Shares:");
  for await (const share of serviceClient.listShares()) {
    console.log(`- ${share.name}`);
  }

  // Create a share
  const shareName = `newshare${new Date().getTime()}`;
  const shareClient = serviceClient.getShareClient(shareName);
  await shareClient.create();
  console.log(`Created share ${shareClient.name} successfully.`);

  // Delete share
  await shareClient.delete();
  console.log(`Deleted share ${shareClient.name}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
