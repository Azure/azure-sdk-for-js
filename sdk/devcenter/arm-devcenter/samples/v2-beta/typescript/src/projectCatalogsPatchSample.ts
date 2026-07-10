// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to partially updates a project catalog.
 *
 * @summary partially updates a project catalog.
 * x-ms-original-file: 2026-01-01-preview/ProjectCatalogs_Patch.json
 */
async function projectCatalogsPatch(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectCatalogs.patch("rg1", "DevProject", "CentralCatalog", {
    gitHub: { path: "/environments" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await projectCatalogsPatch();
}

main().catch(console.error);
