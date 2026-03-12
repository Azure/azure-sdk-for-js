// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a DiscoverySourceResource
 *
 * @summary delete a DiscoverySourceResource
 * x-ms-original-file: 2025-01-31-preview/DiscoverySources_Delete.json
 */

import { DependencyMapClient } from "@azure/arm-dependencymap";
import { DefaultAzureCredential } from "@azure/identity";

async function discoverySourcesDeleteGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D6E58BDB-45F1-41EC-A884-1FC945058848";
  const client = new DependencyMapClient(credential, subscriptionId);
  await client.discoverySources.delete("rgdependencyMap", "mapsTest1", "sourceTest1");
}

async function main(): Promise<void> {
  await discoverySourcesDeleteGeneratedByMaximumSetRule();
}

main().catch(console.error);
