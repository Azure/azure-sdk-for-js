// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create new or update the existing metrics configuration of the provided cluster.
 *
 * @summary create new or update the existing metrics configuration of the provided cluster.
 * x-ms-original-file: 2026-05-01-preview/ClusterMetricsConfigurations_Create.json
 */
async function createOrUpdateMetricsConfigurationOfCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.metricsConfigurations.createOrUpdate(
    "resourceGroupName",
    "clusterName",
    "default",
    {
      extendedLocation: {
        name: "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ExtendedLocation/customLocations/clusterExtendedLocationName",
        type: "CustomLocation",
      },
      location: "location",
      collectionInterval: 15,
      enabledMetrics: ["metric1", "metric2"],
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateMetricsConfigurationOfCluster();
}

main().catch(console.error);
