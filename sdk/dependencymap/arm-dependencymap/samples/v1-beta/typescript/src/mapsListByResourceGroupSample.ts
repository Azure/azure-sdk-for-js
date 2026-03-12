// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DependencyMapClient } from "@azure/arm-dependencymap";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list MapsResource resources by resource group
 *
 * @summary list MapsResource resources by resource group
 * x-ms-original-file: 2025-01-31-preview/Maps_ListByResourceGroup.json
 */
async function mapsListByResourceGroupGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D6E58BDB-45F1-41EC-A884-1FC945058848";
  const client = new DependencyMapClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maps.listByResourceGroup("rgdependencyMap")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await mapsListByResourceGroupGeneratedByMaximumSetRule();
}

main().catch(console.error);
