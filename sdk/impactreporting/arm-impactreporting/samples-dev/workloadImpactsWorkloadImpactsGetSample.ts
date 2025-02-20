// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactClient } from "@azure/arm-impactreporting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a WorkloadImpact
 *
 * @summary get a WorkloadImpact
 * x-ms-original-file: 2024-05-01-preview/WorkloadImpact_Get.json
 */
async function getWorkloadImpactResourceByNameExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.workloadImpacts.WorkloadImpacts_get("impact-001");
  console.log(result);
}

async function main(): Promise<void> {
  getWorkloadImpactResourceByNameExample();
}

main().catch(console.error);
