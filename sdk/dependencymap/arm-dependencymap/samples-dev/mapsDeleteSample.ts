// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DependencyMapClient } from "@azure/arm-dependencymap";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a MapsResource
 *
 * @summary delete a MapsResource
 * x-ms-original-file: 2025-01-31-preview/Maps_Delete.json
 */
async function mapsDeleteGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D6E58BDB-45F1-41EC-A884-1FC945058848";
  const client = new DependencyMapClient(credential, subscriptionId);
  await client.maps.delete("rgdependencyMap", "mapsTest1");
}

async function main(): Promise<void> {
  await mapsDeleteGeneratedByMaximumSetRule();
}

main().catch(console.error);
