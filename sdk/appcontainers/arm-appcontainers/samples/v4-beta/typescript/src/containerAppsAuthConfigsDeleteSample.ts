// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Container App AuthConfig.
 *
 * @summary delete a Container App AuthConfig.
 * x-ms-original-file: 2025-10-02-preview/AuthConfigs_Delete.json
 */
async function deleteContainerAppAuthConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "651f8027-33e8-4ec4-97b4-f6e9f3dc8744";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.containerAppsAuthConfigs.delete("workerapps-rg-xj", "testcanadacentral", "current");
}

async function main(): Promise<void> {
  await deleteContainerAppAuthConfig();
}

main().catch(console.error);
