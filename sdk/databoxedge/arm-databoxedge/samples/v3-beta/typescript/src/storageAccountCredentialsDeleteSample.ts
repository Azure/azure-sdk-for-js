// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the storage account credential.
 *
 * @summary deletes the storage account credential.
 * x-ms-original-file: 2023-12-01/SACDelete.json
 */
async function sacDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.storageAccountCredentials.delete("testedgedevice", "sac1", "GroupForEdgeAutomation");
}

async function main(): Promise<void> {
  await sacDelete();
}

main().catch(console.error);
