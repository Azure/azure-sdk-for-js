// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to triggers the execution of a runtime protection scan to detect and remediate detected issues, in accordance with the cluster configuration.
 *
 * @summary triggers the execution of a runtime protection scan to detect and remediate detected issues, in accordance with the cluster configuration.
 * x-ms-original-file: 2026-05-01-preview/Clusters_ScanRuntime.json
 */
async function executeARuntimeProtectionScanOnTheCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.clusters.scanRuntime("resourceGroupName", "clusterName", {
    clusterScanRuntimeParameters: { scanActivity: "Scan" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await executeARuntimeProtectionScanOnTheCluster();
}

main().catch(console.error);
