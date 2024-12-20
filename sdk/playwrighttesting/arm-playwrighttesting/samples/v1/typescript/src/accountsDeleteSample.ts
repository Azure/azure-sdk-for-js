// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzurePlaywrightServiceClient } from "@azure/arm-playwrighttesting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Account
 *
 * @summary delete a Account
 * x-ms-original-file: 2024-12-01/Accounts_Delete.json
 */
async function accountsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzurePlaywrightServiceClient(credential, subscriptionId);
  await client.accounts.delete("dummyrg", "myPlaywrightAccount");
}

async function main() {
  accountsDelete();
}

main().catch(console.error);
