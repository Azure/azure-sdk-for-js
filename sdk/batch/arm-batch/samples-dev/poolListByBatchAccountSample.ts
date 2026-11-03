// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the pools in the specified account.
 *
 * @summary lists all of the pools in the specified account.
 * x-ms-original-file: 2025-06-01/PoolList.json
 */
async function listPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.pool.listByBatchAccount(
    "default-azurebatch-japaneast",
    "sampleacct",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all of the pools in the specified account.
 *
 * @summary lists all of the pools in the specified account.
 * x-ms-original-file: 2025-06-01/PoolListWithFilter.json
 */
async function listPoolWithFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.pool.listByBatchAccount(
    "default-azurebatch-japaneast",
    "sampleacct",
    {
      select:
        "properties/allocationState,properties/provisioningStateTransitionTime,properties/currentDedicatedNodes,properties/currentLowPriorityNodes",
      filter:
        "startswith(name, 'po') or (properties/allocationState eq 'Steady' and properties/provisioningStateTransitionTime lt datetime'2017-02-02')",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listPool();
  await listPoolWithFilter();
}

main().catch(console.error);
