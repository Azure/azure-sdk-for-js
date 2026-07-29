// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Container Apps Patch resources by ContainerApp.
 *
 * @summary list Container Apps Patch resources by ContainerApp.
 * x-ms-original-file: 2025-10-02-preview/ContainerAppsPatches_ListByContainerApp.json
 */
async function containerAppsPatchesListByContainerApp0(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppsPatches.listByContainerApp("rg", "test-app")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await containerAppsPatchesListByContainerApp0();
}

main().catch(console.error);
