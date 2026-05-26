// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all table services for the storage account.
 *
 * @summary list all table services for the storage account.
 * x-ms-original-file: 2025-08-01/TableServicesList.json
 */
async function tableServicesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.tableServices.list("res9290", "sto1590");
  console.log(result);
}

async function main(): Promise<void> {
  await tableServicesList();
}

main().catch(console.error);
