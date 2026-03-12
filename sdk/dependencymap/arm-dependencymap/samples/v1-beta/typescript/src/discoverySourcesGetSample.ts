// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DependencyMapClient } from "@azure/arm-dependencymap";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a DiscoverySourceResource
 *
 * @summary get a DiscoverySourceResource
 * x-ms-original-file: 2025-01-31-preview/DiscoverySources_Get.json
 */
async function discoverySourcesGetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D6E58BDB-45F1-41EC-A884-1FC945058848";
  const client = new DependencyMapClient(credential, subscriptionId);
  const result = await client.discoverySources.get("rgdependencyMap", "mapsTest1", "sourceTest1");
  console.log(result);
}

async function main(): Promise<void> {
  await discoverySourcesGetGeneratedByMaximumSetRule();
}

main().catch(console.error);
