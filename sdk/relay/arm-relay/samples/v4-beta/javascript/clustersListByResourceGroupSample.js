// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists Relay clusters in a resource group.
 *
 * @summary lists Relay clusters in a resource group.
 * x-ms-original-file: 2026-07-01-preview/Clusters/ClustersListByResourceGroup.json
 */
async function clustersListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new RelayAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await clustersListByResourceGroup();
}

main().catch(console.error);
