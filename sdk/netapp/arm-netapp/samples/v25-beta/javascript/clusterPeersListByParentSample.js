// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all Cluster Peers under an External Cluster
 *
 * @summary list all Cluster Peers under an External Cluster
 * x-ms-original-file: 2026-08-15-preview/ClusterPeers_ListByParent.json
 */
async function clusterPeersListByParent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusterPeers.listByParent(
    "contosoNetAppRg",
    "contoso-external-cluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await clusterPeersListByParent();
}

main().catch(console.error);
