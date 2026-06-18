// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the StorageAccount on the Data Box Edge/Data Box Gateway device.
 *
 * @summary deletes the StorageAccount on the Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/StorageAccountDelete.json
 */
async function storageAccountDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.storageAccounts.delete(
    "testedgedevice",
    "storageaccount1",
    "GroupForEdgeAutomation",
  );
}

async function main(): Promise<void> {
  await storageAccountDelete();
}

main().catch(console.error);
