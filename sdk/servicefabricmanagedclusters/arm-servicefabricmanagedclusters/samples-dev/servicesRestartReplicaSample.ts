// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2025-10-01-preview/ServiceActionRestartReplica_example.json
 */
async function restartReplicas(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.services.restartReplica("resRg", "myCluster", "myApp", "myService", {
    partitionId: "00000000-0000-0000-0000-000000000000",
    replicaIds: [123456789012345680],
    restartKind: "Simultaneous",
    forceRestart: false,
    timeout: 60,
  });
}

async function main(): Promise<void> {
  await restartReplicas();
}

main().catch(console.error);
