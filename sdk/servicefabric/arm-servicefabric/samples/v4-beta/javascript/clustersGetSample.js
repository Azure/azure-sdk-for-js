// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceFabricManagementClient } = require("@azure/arm-servicefabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Service Fabric cluster resource created or in the process of being created in the specified resource group.
 *
 * @summary get a Service Fabric cluster resource created or in the process of being created in the specified resource group.
 * x-ms-original-file: 2026-03-01-preview/ClusterGetOperation_example.json
 */
async function getACluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.clusters.get("resRg", "myCluster");
  console.log(result);
}

async function main() {
  await getACluster();
}

main().catch(console.error);
