// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a container group profile.
 *
 * @summary deletes a container group profile.
 * x-ms-original-file: 2026-07-01/ContainerGroupProfilesDelete.json
 */
async function containerGroupProfilesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  await client.cgProfile.delete("demo", "demo1");
}

async function main(): Promise<void> {
  await containerGroupProfilesDelete();
}

main().catch(console.error);
