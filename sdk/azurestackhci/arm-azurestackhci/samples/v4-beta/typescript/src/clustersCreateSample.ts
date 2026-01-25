// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create an HCI cluster.
 *
 * @summary create an HCI cluster.
 * x-ms-original-file: 2025-12-01-preview/CreateCluster.json
 */
async function createCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusters.create("test-rg", "myCluster", {
    typeIdentityType: "SystemAssigned",
    location: "East US",
    aadClientId: "24a6e53d-04e5-44d2-b7cc-1b732a847dfc",
    aadTenantId: "7e589cc1-a8b6-4dff-91bd-5ec0fa18db94",
    cloudManagementEndpoint: "https://98294836-31be-4668-aeae-698667faf99b.waconazure.com",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createCluster();
}

main().catch(console.error);
