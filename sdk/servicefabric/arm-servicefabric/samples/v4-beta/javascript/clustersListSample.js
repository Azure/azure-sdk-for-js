// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceFabricManagementClient } = require("@azure/arm-servicefabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all Service Fabric cluster resources created or in the process of being created in the subscription.
 *
 * @summary gets all Service Fabric cluster resources created or in the process of being created in the subscription.
 * x-ms-original-file: 2026-03-01-preview/ClusterListOperation_example.json
 */
async function listClusters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listClusters();
}

main().catch(console.error);
