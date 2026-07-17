// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a project catalog resource.
 *
 * @summary deletes a project catalog resource.
 * x-ms-original-file: 2026-01-01-preview/ProjectCatalogs_Delete.json
 */
async function projectCatalogsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.projectCatalogs.delete("rg1", "DevProject", "CentralCatalog");
}

async function main(): Promise<void> {
  await projectCatalogsDelete();
}

main().catch(console.error);
