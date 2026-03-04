// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Service Fabric service resource created or in the process of being created in the Service Fabric managed application resource.
 *
 * @summary get a Service Fabric service resource created or in the process of being created in the Service Fabric managed application resource.
 * x-ms-original-file: 2026-02-01/ServiceGetOperation_example.json
 */
async function getAService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.services.get("resRg", "myCluster", "myApp", "myService");
  console.log(result);
}

async function main() {
  await getAService();
}

main().catch(console.error);
