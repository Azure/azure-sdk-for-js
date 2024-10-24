// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesRuntimeClient } from "@azure/arm-containerorchestratorruntime";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list BgpPeer resources by parent
 *
 * @summary list BgpPeer resources by parent
 * x-ms-original-file: 2024-03-01/BgpPeers_List.json
 */
async function bgpPeersList() {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  const resArray = new Array();
  for await (let item of client.bgpPeers.list(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  bgpPeersList();
}

main().catch(console.error);
