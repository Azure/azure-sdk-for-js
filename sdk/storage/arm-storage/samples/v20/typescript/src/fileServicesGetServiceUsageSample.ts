// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the usage of file service in storage account including account limits, file share limits and constants used in recommendations and bursting formula.
 *
 * @summary gets the usage of file service in storage account including account limits, file share limits and constants used in recommendations and bursting formula.
 * x-ms-original-file: 2026-04-01/FileServicesGetUsage.json
 */
async function getFileServiceUsage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileServices.getServiceUsage("res4410", "sto8607");
  console.log(result);
}

async function main(): Promise<void> {
  await getFileServiceUsage();
}

main().catch(console.error);
