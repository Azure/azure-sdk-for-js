// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KubernetesRuntimeClient } = require("@azure/arm-containerorchestratorruntime");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a BgpPeer
 *
 * @summary create a BgpPeer
 * x-ms-original-file: 2024-03-01/BgpPeers_CreateOrUpdate.json
 */
async function bgpPeersCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  const result = await client.bgpPeers.createOrUpdate(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
    "testpeer",
    { properties: { myAsn: 64500, peerAsn: 64501, peerAddress: "10.0.0.1" } },
  );
  console.log(result);
}

async function main() {
  bgpPeersCreateOrUpdate();
}

main().catch(console.error);
