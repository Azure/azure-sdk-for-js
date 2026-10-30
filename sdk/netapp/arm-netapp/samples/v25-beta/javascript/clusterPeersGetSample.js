// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the Cluster Peer
 *
 * @summary get the Cluster Peer
 * x-ms-original-file: 2026-08-15-preview/ClusterPeers_Get.json
 */
async function clusterPeersGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.clusterPeers.get(
    "contosoNetAppRg",
    "contoso-external-cluster",
    "peerA",
  );
  console.log(result);
}

async function main() {
  await clusterPeersGet();
}

main().catch(console.error);
