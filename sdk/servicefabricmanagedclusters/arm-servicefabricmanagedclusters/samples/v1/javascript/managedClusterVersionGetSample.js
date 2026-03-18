// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about an available Service Fabric managed cluster code version.
 *
 * @summary gets information about an available Service Fabric managed cluster code version.
 * x-ms-original-file: 2026-02-01/ManagedClusterVersionGet_example.json
 */
async function getClusterVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.managedClusterVersion.get("eastus", "7.2.477.9590");
  console.log(result);
}

async function main() {
  await getClusterVersion();
}

main().catch(console.error);
