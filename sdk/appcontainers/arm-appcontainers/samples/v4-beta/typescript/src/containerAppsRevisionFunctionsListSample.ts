// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the functions for a given Container App Revision.
 *
 * @summary list the functions for a given Container App Revision.
 * x-ms-original-file: 2025-10-02-preview/ContainerAppsRevisionFunctions_List.json
 */
async function listContainerAppRevisionFunctions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789abc";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppsRevisionFunctions.list(
    "myResourceGroup",
    "myContainerApp",
    "myContainerApp-abc123",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listContainerAppRevisionFunctions();
}

main().catch(console.error);
