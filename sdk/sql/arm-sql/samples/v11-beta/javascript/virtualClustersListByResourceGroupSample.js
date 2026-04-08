// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of virtual clusters in a resource group.
 *
 * @summary gets a list of virtual clusters in a resource group.
 * x-ms-original-file: 2025-02-01-preview/VirtualClusterListByResourceGroup.json
 */
async function listVirtualClustersByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualClusters.listByResourceGroup("testrg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVirtualClustersByResourceGroup();
}

main().catch(console.error);
