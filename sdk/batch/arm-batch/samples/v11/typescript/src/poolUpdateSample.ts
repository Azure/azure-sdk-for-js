// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the properties of an existing pool.
 *
 * @summary updates the properties of an existing pool.
 * x-ms-original-file: 2025-06-01/PoolUpdate_EnableAutoScale.json
 */
async function updatePoolEnableAutoscale(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.update(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    { scaleSettings: { autoScale: { formula: "$TargetDedicatedNodes=34" } } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates the properties of an existing pool.
 *
 * @summary updates the properties of an existing pool.
 * x-ms-original-file: 2025-06-01/PoolUpdate_OtherProperties.json
 */
async function updatePoolOtherProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.update(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      applicationPackages: [
        {
          id: "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.Batch/batchAccounts/sampleacct/pools/testpool/applications/app_1234",
        },
        {
          id: "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.Batch/batchAccounts/sampleacct/pools/testpool/applications/app_5678",
          version: "1.0",
        },
      ],
      metadata: [{ name: "key1", value: "value1" }],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates the properties of an existing pool.
 *
 * @summary updates the properties of an existing pool.
 * x-ms-original-file: 2025-06-01/PoolUpdate_RemoveStartTask.json
 */
async function updatePoolRemoveStartTask(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.update(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    { startTask: {} },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates the properties of an existing pool.
 *
 * @summary updates the properties of an existing pool.
 * x-ms-original-file: 2025-06-01/PoolUpdate_ResizePool.json
 */
async function updatePoolResizePool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.update(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      scaleSettings: {
        fixedScale: {
          nodeDeallocationOption: "TaskCompletion",
          resizeTimeout: "PT8M",
          targetDedicatedNodes: 5,
          targetLowPriorityNodes: 0,
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updatePoolEnableAutoscale();
  await updatePoolOtherProperties();
  await updatePoolRemoveStartTask();
  await updatePoolResizePool();
}

main().catch(console.error);
