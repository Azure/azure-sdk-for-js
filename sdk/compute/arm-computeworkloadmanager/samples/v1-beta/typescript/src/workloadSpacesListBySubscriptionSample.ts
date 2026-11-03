// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadManagerClient } from "@azure/arm-computeworkloadmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists workload spaces in a subscription.
 *
 * @summary lists workload spaces in a subscription.
 * x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_ListBySubscription.json
 */
async function listWorkloadSpacesInASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workloadSpaces.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listWorkloadSpacesInASubscription();
}

main().catch(console.error);
