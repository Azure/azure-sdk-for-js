// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Service Fabric managed service resource with the specified name.
 *
 * @summary delete a Service Fabric managed service resource with the specified name.
 * x-ms-original-file: 2025-06-01-preview/ServiceDeleteOperation_example.json
 */
async function deleteAService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.services.delete("resRg", "myCluster", "myApp", "myService");
}

async function main() {
  await deleteAService();
}

main().catch(console.error);
