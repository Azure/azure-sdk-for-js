// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DependencyMapClient } = require("@azure/arm-dependencymap");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a DiscoverySourceResource
 *
 * @summary delete a DiscoverySourceResource
 * x-ms-original-file: 2025-01-31-preview/DiscoverySources_Delete.json
 */
async function discoverySourcesDeleteGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D6E58BDB-45F1-41EC-A884-1FC945058848";
  const client = new DependencyMapClient(credential, subscriptionId);
  await client.discoverySources.delete("rgdependencyMap", "mapsTest1", "sourceTest1");
}

async function main() {
  await discoverySourcesDeleteGeneratedByMaximumSetRule();
}

main().catch(console.error);
