// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the resource description of the specified Event Hubs Cluster.
 *
 * @summary gets the resource description of the specified Event Hubs Cluster.
 * x-ms-original-file: 2026-01-01/Clusters/ClusterGet.json
 */
async function clusterGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.clusters.get("myResourceGroup", "testCluster");
  console.log(result);
}

async function main() {
  await clusterGet();
}

main().catch(console.error);
