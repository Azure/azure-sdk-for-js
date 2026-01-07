// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Pool } from "@azure/arm-batch";
import { BatchManagementClient } from "@azure/arm-batch";
import { getSubscriptionId, getResourceGroupName } from "./env-const.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { fakeTestPasswordPlaceholder2 } from "../fakeTestSecrets.js";
import { waitForNotNull } from "../helpers.js";


export async function createBatchLinuxPool(
  accountName: string,
  poolName: string,
  nodeCount: number,
): Promise<Pool> {
  const subscriptionId = getSubscriptionId();
  const resourceGroupName = getResourceGroupName();

  const client = new BatchManagementClient(createTestCredential(), subscriptionId);

  const pool = await client.poolOperations.create(resourceGroupName, accountName, poolName, {
    vmSize: "Standard_D2s_v3",
    deploymentConfiguration: {
      virtualMachineConfiguration: {
        imageReference: {
          publisher: "canonical",
          offer: "0001-com-ubuntu-server-jammy",
          sku: "22_04-lts",
        },
        nodeAgentSkuId: "batch.node.ubuntu 22.04",
      },
    },
    scaleSettings: {
      fixedScale: {
        targetDedicatedNodes: nodeCount, // For faster pool creation, we can set this to 0 and scale up later, but the function signature implies creating with nodes.
      },
    },
    startTask: {
      waitForSuccess: true,
      commandLine: "/bin/bash -c 'echo hello > hello.txt'",
    },
    userAccounts: [
      {
        name: "nonAdminUser",
        password: fakeTestPasswordPlaceholder2,
        elevationLevel: "NonAdmin",
      },
    ],
    targetNodeCommunicationMode: "Simplified",
  });
  return pool;
}

export async function deleteBatchPool(accountName: string, poolName: string): Promise<void> {
  const subscriptionId = getSubscriptionId();
  const resourceGroupName = getResourceGroupName();
  const client = new BatchManagementClient(createTestCredential(), subscriptionId);
  await client.poolOperations.beginDeleteAndWait(resourceGroupName, accountName, poolName);
}

export async function waitForPoolSteady(accountName: string, poolName: string): Promise<Pool> {
  const subscriptionId = getSubscriptionId();
  const resourceGroupName = getResourceGroupName();

  const checkPoolStable = async (): Promise<Pool | null> => {
    const client = new BatchManagementClient(createTestCredential(), subscriptionId);
    const pool = await client.poolOperations.get(resourceGroupName, accountName, poolName);

    if (pool.allocationState === "Steady") {
      return pool;
    }
    return null;
  };

  return waitForNotNull(checkPoolStable);
}
