// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to trigger an inspection of the cluster to perform validation and optional corrective actions based on the supplied additional actions and filters.
 *
 * @summary trigger an inspection of the cluster to perform validation and optional corrective actions based on the supplied additional actions and filters.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Inspect.json
 */
async function inspectCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusters.inspect("resourceGroupName", "clusterName", {
    clusterInspectParameters: {
      additionalActions: ["ResetHardware"],
      filterDevices: { bareMetalMachineNames: ["machine1", "machine2"], rackNames: ["rack1"] },
    },
  });
  console.log(result);
}

async function main() {
  await inspectCluster();
}

main().catch(console.error);
