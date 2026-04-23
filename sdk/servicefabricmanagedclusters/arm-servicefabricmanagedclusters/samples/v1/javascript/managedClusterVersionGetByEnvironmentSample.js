// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about an available Service Fabric cluster code version by environment.
 *
 * @summary gets information about an available Service Fabric cluster code version by environment.
 * x-ms-original-file: 2026-02-01/ManagedClusterVersionGetByEnvironment_example.json
 */
async function getClusterVersionByEnvironment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.managedClusterVersion.getByEnvironment(
    "eastus",
    "Windows",
    "7.2.477.9590",
  );
  console.log(result);
}

async function main() {
  await getClusterVersionByEnvironment();
}

main().catch(console.error);
