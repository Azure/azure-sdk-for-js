// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get properties of specified deleted account resource.
 *
 * @summary get properties of specified deleted account resource.
 * x-ms-original-file: 2025-08-01/DeletedAccountGet.json
 */
async function deletedAccountGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.deletedAccounts.get("sto1125", "eastus");
  console.log(result);
}

async function main(): Promise<void> {
  await deletedAccountGet();
}

main().catch(console.error);
