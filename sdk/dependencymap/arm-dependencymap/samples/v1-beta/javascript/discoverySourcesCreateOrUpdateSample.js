// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DependencyMapClient } = require("@azure/arm-dependencymap");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a DiscoverySourceResource
 *
 * @summary create a DiscoverySourceResource
 * x-ms-original-file: 2025-01-31-preview/DiscoverySources_CreateOrUpdate.json
 */
async function discoverySourcesCreateOrUpdateGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D6E58BDB-45F1-41EC-A884-1FC945058848";
  const client = new DependencyMapClient(credential, subscriptionId);
  const result = await client.discoverySources.createOrUpdate(
    "rgdependencyMap",
    "mapsTest1",
    "sourceTest1",
    { tags: {}, location: "y" },
  );
  console.log(result);
}

async function main() {
  await discoverySourcesCreateOrUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
