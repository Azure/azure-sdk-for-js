// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a SourceControl of a Container App.
 *
 * @summary get a SourceControl of a Container App.
 * x-ms-original-file: 2025-10-02-preview/SourceControls_Get.json
 */
async function getContainerAppSourceControl(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "651f8027-33e8-4ec4-97b4-f6e9f3dc8744";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsSourceControls.get(
    "workerapps-rg-xj",
    "testcanadacentral",
    "current",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getContainerAppSourceControl();
}

main().catch(console.error);
