// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists Relay namespace resource IDs assigned to a Relay cluster.
 *
 * @summary lists Relay namespace resource IDs assigned to a Relay cluster.
 * x-ms-original-file: 2026-07-01-preview/Clusters/ListNamespacesInClusterGet.json
 */
async function listNamespacesInCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.clusters.listNamespaces("myResourceGroup", "testCluster");
  console.log(result);
}

async function main() {
  await listNamespacesInCluster();
}

main().catch(console.error);
