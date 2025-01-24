// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactClient } from "@azure/arm-impactreporting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a WorkloadImpact
 *
 * @summary delete a WorkloadImpact
 * x-ms-original-file: 2024-05-01-preview/WorkloadImpact_Delete.json
 */
async function deleteWorkloadImpactResourceByNameExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  await client.workloadImpacts.WorkloadImpacts_delete("impact-001");
}

async function main(): Promise<void> {
  await deleteWorkloadImpactResourceByNameExample();
}

main().catch(console.error);
