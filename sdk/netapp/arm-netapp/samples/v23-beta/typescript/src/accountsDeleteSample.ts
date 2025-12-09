// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the specified NetApp account
 *
 * @summary delete the specified NetApp account
 * x-ms-original-file: 2025-09-01-preview/Accounts_Delete.json
 */
async function accountsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.accounts.delete("myRG", "account1");
}

async function main(): Promise<void> {
  await accountsDelete();
}

main().catch(console.error);
