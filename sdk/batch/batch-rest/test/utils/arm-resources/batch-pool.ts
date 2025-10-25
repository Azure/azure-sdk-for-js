// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Pool } from "@azure/arm-batch";
import { BatchManagementClient } from "@azure/arm-batch";
import { getSubscriptionId, getResourceGroupName } from "./env-const.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { fakeTestPasswordPlaceholder2 } from "../fakeTestSecrets.js";
import { waitForNotNull } from "../helpers.js";

export async function createBatchWindowsPool(
  accountName: string,
  poolName: string,
  nodeCount: number,
): Promise<Pool> {
  const subscriptionId = getSubscriptionId();
  const resourceGroupName = getResourceGroupName();

  const client = new BatchManagementClient(createTestCredential(), subscriptionId);

  const pool = await client.poolOperations.create(resourceGroupName, accountName, poolName, {
    vmSize: "STANDARD_D1_V2",
    deploymentConfiguration: {
      virtualMachineConfiguration: {
        imageReference: {
          publisher: "microsoftwindowsserver",
          offer: "windowsserver",
          sku: "2022-Datacenter",
        },
        nodeAgentSkuId: "batch.node.windows amd64",
      },
    },
    scaleSettings: {
      fixedScale: {
        targetDedicatedNodes: nodeCount,
      },
    },
    startTask: {
      waitForSuccess: true,
      commandLine: "cmd /c echo hello > hello.txt",
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
