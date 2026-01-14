// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Service Fabric managed application resource with the specified name.
 *
 * @summary delete a Service Fabric managed application resource with the specified name.
 * x-ms-original-file: 2025-10-01-preview/ApplicationDeleteOperation_example.json
 */
async function deleteAnApplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.applications.delete("resRg", "myCluster", "myApp");
}

async function main() {
  await deleteAnApplication();
}

main().catch(console.error);
