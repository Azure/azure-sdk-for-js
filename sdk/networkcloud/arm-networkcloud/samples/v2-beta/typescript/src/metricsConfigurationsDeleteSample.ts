// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the metrics configuration of the provided cluster.
 *
 * @summary delete the metrics configuration of the provided cluster.
 * x-ms-original-file: 2026-05-01-preview/ClusterMetricsConfigurations_Delete.json
 */
async function deleteMetricsConfigurationOfCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.metricsConfigurations.delete(
    "resourceGroupName",
    "clusterName",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteMetricsConfigurationOfCluster();
}

main().catch(console.error);
