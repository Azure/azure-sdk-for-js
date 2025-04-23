// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DependencyMapClient } = require("@azure/arm-dependencymap");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a DiscoverySourceResource
 *
 * @summary update a DiscoverySourceResource
 * x-ms-original-file: 2025-01-31-preview/DiscoverySources_Update.json
 */
async function discoverySourcesUpdateGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D6E58BDB-45F1-41EC-A884-1FC945058848";
  const client = new DependencyMapClient(credential, subscriptionId);
  const result = await client.discoverySources.update(
    "rgdependencyMap",
    "mapsTest1",
    "sourceTest1",
    { tags: {} },
  );
  console.log(result);
}

async function main() {
  await discoverySourcesUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
