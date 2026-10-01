// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a StorageAccount by name.
 *
 * @summary gets a StorageAccount by name.
 * x-ms-original-file: 2023-12-01/StorageAccountGet.json
 */
async function storageAccountGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.get(
    "testedgedevice",
    "blobstorageaccount1",
    "GroupForEdgeAutomation",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountGet();
}

main().catch(console.error);
