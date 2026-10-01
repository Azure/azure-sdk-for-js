// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an Image Definition from the catalog
 *
 * @summary gets an Image Definition from the catalog
 * x-ms-original-file: 2026-01-01-preview/ImageDefinitions_GetByDevCenterCatalog.json
 */
async function imageDefinitionsGetByDevCenterCatalog(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.devCenterCatalogImageDefinitions.getByDevCenterCatalog(
    "rg1",
    "ContosoDevCenter",
    "TeamCatalog",
    "WebDevBox",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await imageDefinitionsGetByDevCenterCatalog();
}

main().catch(console.error);
