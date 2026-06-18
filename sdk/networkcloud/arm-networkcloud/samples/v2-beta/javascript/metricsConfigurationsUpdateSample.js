// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch properties of metrics configuration for the provided cluster, or update the tags associated with it. Properties and tag updates can be done independently.
 *
 * @summary patch properties of metrics configuration for the provided cluster, or update the tags associated with it. Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-05-01-preview/ClusterMetricsConfigurations_Patch.json
 */
async function patchMetricsConfigurationOfCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.metricsConfigurations.update(
    "resourceGroupName",
    "clusterName",
    "default",
    {
      metricsConfigurationUpdateParameters: {
        collectionInterval: 15,
        enabledMetrics: ["metric1", "metric2"],
        tags: { key1: "myvalue1", key2: "myvalue2" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await patchMetricsConfigurationOfCluster();
}

main().catch(console.error);
