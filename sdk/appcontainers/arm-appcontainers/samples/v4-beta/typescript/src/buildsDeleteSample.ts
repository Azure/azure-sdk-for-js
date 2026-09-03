// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a BuildResource
 *
 * @summary delete a BuildResource
 * x-ms-original-file: 2025-10-02-preview/Builds_Delete.json
 */
async function buildsDelete0(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.builds.delete("rg", "testBuilder", "testBuild");
}

async function main(): Promise<void> {
  await buildsDelete0();
}

main().catch(console.error);
