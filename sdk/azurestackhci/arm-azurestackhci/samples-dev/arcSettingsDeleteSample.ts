// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete ArcSetting resource details of HCI Cluster.
 *
 * @summary delete ArcSetting resource details of HCI Cluster.
 * x-ms-original-file: 2025-12-01-preview/DeleteArcSetting.json
 */
async function deleteArcSetting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.arcSettings.delete("test-rg", "myCluster", "default");
}

async function main(): Promise<void> {
  await deleteArcSetting();
}

main().catch(console.error);
