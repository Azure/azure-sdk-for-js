// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get properties of specified deleted account resource.
 *
 * @summary Get properties of specified deleted account resource.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/DeletedAccountGet.json
 */
async function deletedAccountGet(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const deletedAccountName = "sto1125";
  const location = "eastus";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.deletedAccounts.get(deletedAccountName, location);
  console.log(result);
}

async function main(): Promise<void> {
  await deletedAccountGet();
}

main().catch(console.error);
