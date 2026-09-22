// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerPlatformClient } from "@azure/arm-powerplatform";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an account.
 *
 * @summary delete an account.
 * x-ms-original-file: 2020-10-30-preview/deleteAccount.json
 */
async function deleteAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new PowerPlatformClient(credential, subscriptionId);
  await client.accounts.delete("account", "resourceGroup");
}

async function main(): Promise<void> {
  await deleteAccount();
}

main().catch(console.error);
