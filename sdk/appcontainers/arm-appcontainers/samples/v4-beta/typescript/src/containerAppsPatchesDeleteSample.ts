// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete specific Container Apps Patch by patch name.
 *
 * @summary delete specific Container Apps Patch by patch name.
 * x-ms-original-file: 2025-10-02-preview/ContainerAppsPatches_Delete.json
 */
async function containerAppsPatchesDelete0(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.containerAppsPatches.delete("rg", "test-app", "testPatch-25fe4b");
}

async function main(): Promise<void> {
  await containerAppsPatchesDelete0();
}

main().catch(console.error);
