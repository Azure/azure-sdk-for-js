// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all file services in storage accounts
 *
 * @summary list all file services in storage accounts
 * x-ms-original-file: 2026-04-01/FileServicesList.json
 */
async function listFileServices(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileServices.list("res9290", "sto1590");
  console.log(result);
}

async function main(): Promise<void> {
  await listFileServices();
}

main().catch(console.error);
