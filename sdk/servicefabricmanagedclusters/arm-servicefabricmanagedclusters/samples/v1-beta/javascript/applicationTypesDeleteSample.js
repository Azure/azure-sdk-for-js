// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Service Fabric managed application type name resource with the specified name.
 *
 * @summary delete a Service Fabric managed application type name resource with the specified name.
 * x-ms-original-file: 2025-10-01-preview/ApplicationTypeNameDeleteOperation_example.json
 */
async function deleteAnApplicationType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.applicationTypes.delete("resRg", "myCluster", "myAppType");
}

async function main() {
  await deleteAnApplicationType();
}

main().catch(console.error);
