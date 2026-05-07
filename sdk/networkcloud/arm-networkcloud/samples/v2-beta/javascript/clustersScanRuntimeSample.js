// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to triggers the execution of a runtime protection scan to detect and remediate detected issues, in accordance with the cluster configuration.
 *
 * @summary triggers the execution of a runtime protection scan to detect and remediate detected issues, in accordance with the cluster configuration.
 * x-ms-original-file: 2026-05-01-preview/Clusters_ScanRuntime.json
 */
async function executeARuntimeProtectionScanOnTheCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusters.scanRuntime("resourceGroupName", "clusterName", {
    clusterScanRuntimeParameters: { scanActivity: "Scan" },
  });
  console.log(result);
}

async function main() {
  await executeARuntimeProtectionScanOnTheCluster();
}

main().catch(console.error);
