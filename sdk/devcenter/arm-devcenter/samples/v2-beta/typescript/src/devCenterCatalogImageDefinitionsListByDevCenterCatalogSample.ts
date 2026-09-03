// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Image Definitions in the catalog.
 *
 * @summary list Image Definitions in the catalog.
 * x-ms-original-file: 2026-01-01-preview/ImageDefinitions_ListByDevCenterCatalog.json
 */
async function imageDefinitionsListByDevCenterCatalog(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.devCenterCatalogImageDefinitions.listByDevCenterCatalog(
    "rg1",
    "ContosoDevCenter",
    "TeamCatalog",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await imageDefinitionsListByDevCenterCatalog();
}

main().catch(console.error);
