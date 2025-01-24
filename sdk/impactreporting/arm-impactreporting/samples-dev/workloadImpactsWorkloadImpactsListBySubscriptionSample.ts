// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactClient } from "@azure/arm-impactreporting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list WorkloadImpact resources by subscription ID
 *
 * @summary list WorkloadImpact resources by subscription ID
 * x-ms-original-file: 2024-05-01-preview/WorkloadImpacts_ListBySubscription.json
 */
async function listWorkloadImpactResourcesBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.workloadImpacts.WorkloadImpacts_listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listWorkloadImpactResourcesBySubscription();
}

main().catch(console.error);
