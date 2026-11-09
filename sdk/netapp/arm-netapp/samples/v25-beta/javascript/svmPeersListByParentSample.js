// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list and describe all SVM Peers under a Cluster Peer
 *
 * @summary list and describe all SVM Peers under a Cluster Peer
 * x-ms-original-file: 2026-08-15-preview/SvmPeers_ListByParent.json
 */
async function svmPeersListByParent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.svmPeers.listByParent(
    "contosoNetAppRg",
    "contoso-external-cluster",
    "peerA",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await svmPeersListByParent();
}

main().catch(console.error);
