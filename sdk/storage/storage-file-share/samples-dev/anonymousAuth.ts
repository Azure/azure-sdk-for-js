// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary authenticate anonymously using a SAS-encoded URL
 * @azsdk-weight 85
 */

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import { ShareServiceClient, AnonymousCredential } from "@azure/storage-file-share";

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
      "Either ACCOUNT_SAS or ACCOUNT_NAME + SUBSCRIPTION_ID + RESOURCE_GROUP environment variable is required.",
    );
  }
  const mgmtClient = new StorageManagementClient(new DefaultAzureCredential(), subscriptionId);
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
  return accountSasToken;
}

export async function main(): Promise<void> {
  // Enter your storage account name
  const accountName = process.env.ACCOUNT_NAME;
  if (!accountName) {
    throw new Error("ACCOUNT_NAME environment variable is not set.");
  }

  // Use AnonymousCredential when url already includes a SAS signature
  const anonymousCredential = new AnonymousCredential();

  // List shares
  const serviceClient = new ShareServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or the account supports public access
    `https://${accountName}.file.core.windows.net?${await getAccountSas(accountName)}`,
    anonymousCredential,
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
