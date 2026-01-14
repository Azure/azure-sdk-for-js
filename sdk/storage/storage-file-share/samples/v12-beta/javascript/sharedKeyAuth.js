// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary authenticate using an account name and a static key
 */

const { ShareServiceClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");
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

  // List shares
  const serviceClient = new ShareServiceClient(
    `https://${accountName}.file.core.windows.net`,
    sharedKeyCredential,
  );

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
