// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a BgpPeer
 *
 * @summary delete a BgpPeer
 * x-ms-original-file: 2024-03-01/BgpPeers_Delete.json
 */

import { KubernetesRuntimeClient } from "@azure/arm-containerorchestratorruntime";
import { DefaultAzureCredential } from "@azure/identity";

async function bgpPeersDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  await client.bgpPeers.delete(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
    "testpeer",
  );
}

async function main(): Promise<void> {
  await bgpPeersDelete();
}

main().catch(console.error);
