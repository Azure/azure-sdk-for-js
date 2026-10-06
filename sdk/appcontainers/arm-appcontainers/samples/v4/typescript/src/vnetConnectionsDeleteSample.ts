// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a VnetConnection.
 *
 * @summary delete a VnetConnection.
 * x-ms-original-file: 2026-07-01/VnetConnections_Delete.json
 */
async function deleteAVnetConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.vnetConnections.delete("myRg", "testgroup", "myVnetConnection");
}

async function main(): Promise<void> {
  await deleteAVnetConnection();
}

main().catch(console.error);
