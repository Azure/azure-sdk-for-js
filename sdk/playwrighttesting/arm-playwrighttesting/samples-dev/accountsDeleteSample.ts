// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a Account
 *
 * @summary delete a Account
 * x-ms-original-file: 2024-12-01/Accounts_Delete.json
 */

import { AzurePlaywrightServiceClient } from "@azure/arm-playwrighttesting";
import { DefaultAzureCredential } from "@azure/identity";

async function accountsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzurePlaywrightServiceClient(credential, subscriptionId);
  await client.accounts.delete("dummyrg", "myPlaywrightAccount");
}

async function main(): Promise<void> {
  await accountsDelete();
}

main().catch(console.error);
