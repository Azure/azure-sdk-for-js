// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the Container App AuthConfigs in a given resource group.
 *
 * @summary get the Container App AuthConfigs in a given resource group.
 * x-ms-original-file: 2025-10-02-preview/AuthConfigs_ListByContainer.json
 */
async function listAuthConfigsByContainerApps(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "651f8027-33e8-4ec4-97b4-f6e9f3dc8744";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppsAuthConfigs.listByContainerApp(
    "workerapps-rg-xj",
    "testcanadacentral",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAuthConfigsByContainerApps();
}

main().catch(console.error);
