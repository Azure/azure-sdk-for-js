// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get unsupported vm size for Service Fabric Managed Clusters.
 *
 * @summary get unsupported vm size for Service Fabric Managed Clusters.
 * x-ms-original-file: 2026-02-01/managedUnsupportedVMSizesGet_example.json
 */
async function getUnsupportedVmSizes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.managedUnsupportedVMSizes.get("eastus", "Standard_B1ls1");
  console.log(result);
}

async function main() {
  await getUnsupportedVmSizes();
}

main().catch(console.error);
