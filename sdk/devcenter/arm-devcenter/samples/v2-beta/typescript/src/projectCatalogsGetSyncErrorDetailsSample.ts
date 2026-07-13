// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets project catalog synchronization error details
 *
 * @summary gets project catalog synchronization error details
 * x-ms-original-file: 2026-01-01-preview/ProjectCatalogs_GetSyncErrorDetails.json
 */
async function projectCatalogsGetSyncErrorDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectCatalogs.getSyncErrorDetails(
    "rg1",
    "DevProject",
    "CentralCatalog",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await projectCatalogsGetSyncErrorDetails();
}

main().catch(console.error);
