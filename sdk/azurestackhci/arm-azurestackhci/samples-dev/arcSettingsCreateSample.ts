// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create ArcSetting for HCI cluster.
 *
 * @summary create ArcSetting for HCI cluster.
 * x-ms-original-file: 2025-12-01-preview/PutArcSetting.json
 */
async function createArcSetting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.arcSettings.create("test-rg", "myCluster", "default", {});
  console.log(result);
}

async function main(): Promise<void> {
  await createArcSetting();
}

main().catch(console.error);
