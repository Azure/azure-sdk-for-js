// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Container Apps Build resource
 *
 * @summary delete a Container Apps Build resource
 * x-ms-original-file: 2025-10-02-preview/ContainerAppsBuilds_Delete.json
 */
async function containerAppsBuildsDelete0(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.containerAppsBuilds.delete("rg", "testCapp", "testBuild");
}

async function main(): Promise<void> {
  await containerAppsBuildsDelete0();
}

main().catch(console.error);
