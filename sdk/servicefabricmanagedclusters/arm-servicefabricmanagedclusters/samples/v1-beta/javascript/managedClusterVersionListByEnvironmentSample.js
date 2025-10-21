// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all available code versions for Service Fabric cluster resources by environment.
 *
 * @summary gets all available code versions for Service Fabric cluster resources by environment.
 * x-ms-original-file: 2025-06-01-preview/ManagedClusterVersionListByEnvironment.json
 */
async function listClusterVersionsByEnvironment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.managedClusterVersion.listByEnvironment("eastus", "Windows");
  console.log(result);
}

async function main() {
  await listClusterVersionsByEnvironment();
}

main().catch(console.error);
