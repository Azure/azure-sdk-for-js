// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an HCI cluster.
 *
 * @summary update an HCI cluster.
 * x-ms-original-file: 2025-12-01-preview/UpdateCluster.json
 */
async function updateCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusters.update("test-rg", "myCluster", {
    type: "SystemAssigned",
    cloudManagementEndpoint: "https://98294836-31be-4668-aeae-698667faf99b.waconazure.com",
    desiredProperties: { diagnosticLevel: "Basic", windowsServerSubscription: "Enabled" },
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateCluster();
}

main().catch(console.error);
