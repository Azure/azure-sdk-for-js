// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the lists of unsupported vm sizes for Service Fabric Managed Clusters.
 *
 * @summary get the lists of unsupported vm sizes for Service Fabric Managed Clusters.
 * x-ms-original-file: 2026-02-01/managedUnsupportedVMSizesList_example.json
 */
async function listUnsupportedVmSizes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedUnsupportedVMSizes.list("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listUnsupportedVmSizes();
}

main().catch(console.error);
