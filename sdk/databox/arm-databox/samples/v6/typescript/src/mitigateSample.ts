// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxManagementClient } from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to request to mitigate for a given job
 *
 * @summary request to mitigate for a given job
 * x-ms-original-file: 2025-07-01/JobMitigate.json
 */
async function mitigate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  await client.mitigate("TestJobName1", "YourResourceGroupName", {
    serialNumberCustomerResolutionMap: {
      "testDISK-1": "MoveToCleanUpDevice",
      "testDISK-2": "Resume",
    },
  });
}

async function main(): Promise<void> {
  await mitigate();
}

main().catch(console.error);
