// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to action to get Az Resiliency Status of all the Base resources constituting Service Fabric Managed Clusters.
 *
 * @summary action to get Az Resiliency Status of all the Base resources constituting Service Fabric Managed Clusters.
 * x-ms-original-file: 2025-06-01-preview/managedAzResiliencyStatusGet_example.json
 */
async function azResiliencyStatusOfBaseResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.managedAzResiliencyStatus.get("resourceGroup1", "mycluster1");
  console.log(result);
}

async function main() {
  await azResiliencyStatusOfBaseResources();
}

main().catch(console.error);
